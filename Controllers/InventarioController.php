<?php

namespace Modulos_ERP\InventarioKrsft\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modulos_ERP\InventarioKrsft\Models\Producto;
use Modulos_ERP\InventarioKrsft\Models\Reporte;

class InventarioController extends Controller
{
    public function index()
    {
        $moduleName = basename(dirname(__DIR__));
        return Inertia::render("{$moduleName}/Index", [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    /**
     * Listar todos los productos del inventario
     */
    public function list(Request $request)
    {
        $products = Producto::query()
            ->where(function ($q) {
                $q->where('apartado', false)
                    ->orWhereNull('apartado');
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'products' => $products,
            'total' => $products->count()
        ]);
    }

    /**
     * Obtener estadísticas del inventario
     */
    public function stats()
    {
        $totalItems = Producto::count();
        $activeItems = Producto::where('estado', 'activo')->count();
        $stockAlert = Producto::where('cantidad', '<=', 5)->count();

        // Calcular valor total en USD con una sola consulta SQL
        $exchangeRate = floatval(config('modules.inventario.exchange_rate', 3.75));
        $totalValueUsd = Producto::selectRaw(
            'COALESCE(SUM(CASE WHEN moneda = ? THEN precio * cantidad ELSE (precio / ?) * cantidad END), 0) as total',
            ['USD', $exchangeRate]
        )->value('total');

        return response()->json([
            'success' => true,
            'stats' => [
                'total_products' => $totalItems,
                'active_products' => $activeItems,
                'total_value_usd' => round(floatval($totalValueUsd), 2),
                'stock_alert' => $stockAlert
            ]
        ]);
    }

    /**
     * Detalle de producto
     */
    public function show($id)
    {
        $product = Producto::find($id);

        if (!$product) {
            return response()->json(['success' => false, 'message' => 'Producto no encontrado'], 404);
        }

        return response()->json([
            'success' => true,
            'product' => $product
        ]);
    }

    /**
     * Crear producto
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'sku' => 'required|string',
            'cantidad' => 'required|integer'
        ]);

        $product = Producto::create([
            'nombre' => $request->input('nombre'),
            'descripcion' => $request->input('descripcion'),
            'sku' => $request->input('sku'),
            'cantidad' => $request->input('cantidad'),
            'precio' => $request->input('precio', 0),
            'categoria' => $request->input('categoria', 'Otros'),
            'unidad' => $request->input('unidad', 'UND'),
            'moneda' => $request->input('moneda', 'PEN'),
            'estado' => $request->input('estado', 'activo'),
            'ubicacion' => $request->input('ubicacion'),
            'apartado' => false,
            'estado_ubicacion' => $request->input('ubicacion') ? 'asignada' : null
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Producto creado correctamente',
            'data' => $product
        ]);
    }

    /**
     * Actualizar producto
     */
    public function update(Request $request, $id)
    {
        $product = Producto::find($id);
        if (!$product) {
            return response()->json(['success' => false, 'message' => 'Producto no encontrado'], 404);
        }

        $product->update($request->only([
            'nombre',
            'descripcion',
            'sku',
            'cantidad',
            'precio',
            'categoria',
            'unidad',
            'moneda',
            'estado',
            'ubicacion'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Producto actualizado correctamente',
            'id' => $id
        ]);
    }

    /**
     * Eliminar producto
     */
    public function destroy($id)
    {
        $product = Producto::find($id);
        if ($product) {
            $product->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Producto eliminado correctamente',
            'id' => $id
        ]);
    }

    /**
     * Agregar items desde compras pagadas (llamado desde ComprasKrsft)
     * POST /api/inventario_krsft/add-from-purchase
     */
    public function addPurchasedItems(Request $request)
    {
        try {
            $items = $request->input('items', []);
            $projectId = $request->input('project_id');
            $projectName = $request->input('project_name');
            $batchId = $request->input('batch_id');

            if (!$items || count($items) === 0) {
                return response()->json(['success' => false, 'message' => 'No hay items para agregar'], 400);
            }

            $addedItems = [];

            foreach ($items as $item) {
                $sku = 'INV-' . substr(md5($batchId . ($item['description'] ?? '') . microtime()), 0, 8);

                // Verificar que el SKU no exista
                if (Producto::where('sku', $sku)->exists()) {
                    continue;
                }

                $product = Producto::create([
                    'nombre' => $item['description'] ?? 'Material sin descripción',
                    'sku' => $sku,
                    'descripcion' => $item['description'] ?? '',
                    'cantidad' => $item['qty'] ?? 1,
                    'unidad' => $item['unit'] ?? 'UND',
                    'precio' => $item['subtotal'] ?? 0,
                    'moneda' => $item['currency'] ?? 'PEN',
                    'categoria' => 'Materiales Comprados',
                    'ubicacion' => null,
                    'estado' => 'activo',
                    'apartado' => true,
                    'nombre_proyecto' => $projectName,
                    'estado_ubicacion' => 'pendiente',
                    'project_id' => $projectId,
                    'batch_id' => $batchId,
                    'diameter' => $item['diameter'] ?? null,
                    'series' => $item['series'] ?? null,
                    'material_type' => $item['material_type'] ?? null,
                    'amount' => $item['subtotal'] ?? 0,
                    'amount_pen' => $item['amount_pen'] ?? ($item['subtotal'] ?? 0)
                ]);

                $addedItems[] = $product;
            }

            Log::info('Items agregados a inventario desde compras', [
                'batch_id' => $batchId,
                'project_id' => $projectId,
                'items_count' => count($addedItems)
            ]);

            return response()->json([
                'success' => true,
                'message' => count($addedItems) . ' items agregados al inventario',
                'items' => $addedItems
            ]);

        } catch (\Exception $e) {
            Log::error('Error agregando items a inventario: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error interno al agregar items'], 500);
        }
    }

    /**
     * Obtener items apartados (pendientes de ubicación)
     * GET /api/inventario_krsft/reserved-items
     */
    public function getReservedItems(Request $request)
    {
        try {
            $items = Producto::where('apartado', true)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'reserved_items' => $items,
                'total' => $items->count()
            ]);

        } catch (\Exception $e) {
            Log::error('Error en getReservedItems', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Error interno al obtener items reservados'], 500);
        }
    }

    /**
     * Asignar ubicación a item apartado
     * POST /api/inventario_krsft/assign-location
     */
    public function assignLocation(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|integer',
                'zona' => 'required|string|size:1',
                'nivel' => 'required|integer|min:1|max:4',
                'posicion' => 'required|integer|min:1|max:8'
            ]);

            $productId = $request->input('product_id');
            $zona = $request->input('zona');
            $nivel = $request->input('nivel');
            $posicion = $request->input('posicion');

            $locationCode = "{$zona}-{$nivel}-{$posicion}";

            // Validar que la ubicación no esté duplicada
            if (!$this->isLocationAvailable($locationCode, $productId)) {
                return response()->json([
                    'success' => false,
                    'message' => "La ubicación {$locationCode} ya está ocupada"
                ], 409);
            }

            $product = Producto::find($productId);
            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Producto no encontrado'
                ], 404);
            }

            $product->update([
                'ubicacion' => $locationCode,
                'estado_ubicacion' => 'asignada'
            ]);

            return response()->json([
                'success' => true,
                'message' => "Ubicación {$locationCode} asignada correctamente",
                'location' => $locationCode
            ]);

        } catch (\Exception $e) {
            Log::error('Error en assignLocation', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Error interno al asignar ubicación'], 500);
        }
    }

    /**
     * Validar que una ubicación no esté duplicada
     */
    private function isLocationAvailable(string $location, int $productId = 0): bool
    {
        return !Producto::where('ubicacion', $location)
            ->where('id', '!=', $productId)
            ->exists();
    }

    /**
     * Verificar producto
     * POST /api/inventario_krsft/verify/{id}
     */
    public function verify(Request $request, $id)
    {
        try {
            $request->validate([
                'usuario' => 'required|string'
            ]);

            $product = Producto::find($id);
            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Producto no encontrado'
                ], 404);
            }

            $product->update([
                'verificado_at' => now(),
                'verificado_por' => $request->input('usuario')
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Producto verificado correctamente',
                'data' => [
                    'verificado_at' => $product->verificado_at,
                    'verificado_por' => $product->verificado_por
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error en verify', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Error interno al verificar producto'], 500);
        }
    }

    /**
     * Crear reporte de material no recibido en obra
     * POST /api/inventario_krsft/reportes
     */
    public function createReporte(Request $request)
    {
        try {
            $request->validate([
                'producto_id' => 'required|integer',
                'motivo' => 'required|string',
                'reportado_por' => 'required|string'
            ]);

            $product = Producto::find($request->input('producto_id'));
            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Producto no encontrado'
                ], 404);
            }

            $reporte = Reporte::create([
                'producto_id' => $product->id,
                'producto_nombre' => $product->nombre,
                'producto_sku' => $product->sku,
                'proyecto_nombre' => $product->nombre_proyecto ?? 'Sin proyecto',
                'motivo' => $request->input('motivo'),
                'reportado_por' => $request->input('reportado_por'),
                'estado' => 'pendiente'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Reporte creado correctamente',
                'data' => $reporte
            ]);

        } catch (\Exception $e) {
            Log::error('Error en createReporte', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Error interno al crear reporte'], 500);
        }
    }

    /**
     * Listar todos los reportes
     * GET /api/inventario_krsft/reportes
     */
    public function listReportes(Request $request)
    {
        try {
            $reportes = Reporte::orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'reportes' => $reportes,
                'total' => $reportes->count()
            ]);

        } catch (\Exception $e) {
            Log::error('Error en listReportes', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Error interno al listar reportes'], 500);
        }
    }

    /**
     * Actualizar estado de reporte
     * PUT /api/inventario_krsft/reportes/{id}
     */
    public function updateReporte(Request $request, $id)
    {
        try {
            $reporte = Reporte::find($id);
            if (!$reporte) {
                return response()->json([
                    'success' => false,
                    'message' => 'Reporte no encontrado'
                ], 404);
            }

            $data = $request->only(['estado', 'notas', 'solucion', 'resuelto_por']);
            
            if ($request->has('estado') && $request->input('estado') === 'revisado') {
                $data['revisado_at'] = now();
                $data['revisado_por'] = $request->input('revisado_por', 'Sistema');
            }

            if ($request->has('estado') && $request->input('estado') === 'resuelto') {
                $data['resuelto_at'] = now();
                $data['resuelto_por'] = $request->input('resuelto_por', 'Sistema');
            }

            $reporte->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Reporte actualizado correctamente',
                'data' => $reporte
            ]);

        } catch (\Exception $e) {
            Log::error('Error en updateReporte', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Error interno al actualizar reporte'], 500);
        }
    }

    public function deleteReporte($id)
    {
        try {
            $reporte = Reporte::find($id);
            if (!$reporte) {
                return response()->json([
                    'success' => false,
                    'message' => 'Reporte no encontrado'
                ], 404);
            }

            $reporte->delete();

            return response()->json([
                'success' => true,
                'message' => 'Reporte eliminado correctamente'
            ]);

        } catch (\Exception $e) {
            Log::error('Error en deleteReporte', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Error interno al eliminar reporte'], 500);
        }
    }
}

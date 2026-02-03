<?php

namespace Modulos_ERP\InventarioKrsft\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Modulos_ERP\InventarioKrsft\Models\Producto;

class InventarioController extends Controller
{
    // Mock Data simulating DB records
    private $mockProducts = [
        [
            'id' => 1,
            'nombre' => 'Laptop Gamer HP',
            'sku' => 'LAP-001',
            'descripcion' => 'Laptop de alto rendimiento',
            'cantidad' => 15,
            'unidad' => 'UND',
            'precio' => 1200.00,
            'moneda' => 'USD',
            'categoria' => 'Electrónica',
            'ubicacion' => 'A-1-1',
            'estado' => 'activo',
            'apartado' => false,
            'nombre_proyecto' => null,
            'estado_ubicacion' => null
        ],
        [
            'id' => 2,
            'nombre' => 'Monitor 24" Dell',
            'sku' => 'MON-023',
            'descripcion' => 'Monitor IPS Full HD',
            'cantidad' => 30,
            'unidad' => 'UND',
            'precio' => 180.50,
            'moneda' => 'USD',
            'categoria' => 'Electrónica',
            'ubicacion' => 'A-1-2',
            'estado' => 'activo',
            'apartado' => false,
            'nombre_proyecto' => null,
            'estado_ubicacion' => null
        ],
        [
            'id' => 3,
            'nombre' => 'Ácido Sulfúrico',
            'sku' => 'CHEM-001',
            'descripcion' => 'Bidón de 5L',
            'cantidad' => 50,
            'unidad' => 'Galón',
            'precio' => 45.00,
            'moneda' => 'USD',
            'categoria' => 'Químicos',
            'ubicacion' => 'B-2-1',
            'estado' => 'pendiente',
            'apartado' => false,
            'nombre_proyecto' => null,
            'estado_ubicacion' => null
        ],
        [
            'id' => 4,
            'nombre' => 'Silla Ergonómica',
            'sku' => 'FUR-005',
            'descripcion' => 'Silla de oficina con soporte lumbar',
            'cantidad' => 10,
            'unidad' => 'UND',
            'precio' => 850.00,
            'moneda' => 'PEN',
            'categoria' => 'Mobiliario',
            'ubicacion' => 'C-1-1',
            'estado' => 'rechazado',
            'apartado' => false,
            'nombre_proyecto' => null,
            'estado_ubicacion' => null
        ],
        [
            'id' => 5,
            'nombre' => 'Casco de Seguridad',
            'sku' => 'SAFE-99',
            'descripcion' => 'Casco industrial amarillo',
            'cantidad' => 100,
            'unidad' => 'UND',
            'precio' => 25.00,
            'moneda' => 'PEN',
            'categoria' => 'EPP',
            'ubicacion' => 'D-3-4',
            'estado' => 'activo',
            'apartado' => false,
            'nombre_proyecto' => null,
            'estado_ubicacion' => null
        ]
    ];

    public function index()
    {
        $moduleName = basename(dirname(__DIR__));
        return Inertia::render("{$moduleName}/Index");
    }

    /**
     * Listar todos los productos (Mock)
     */
    public function list(Request $request)
    {
        return response()->json([
            'success' => true,
            'products' => $this->mockProducts,
            'total' => count($this->mockProducts)
        ]);
    }

    /**
     * Obtener estadísticas (Mock)
     */
    public function stats()
    {
        $totalItems = count($this->mockProducts);
        $totalValueUsd = 0;
        
        foreach ($this->mockProducts as $p) {
            if ($p['moneda'] === 'USD') {
                $totalValueUsd += ($p['precio'] * $p['cantidad']);
            } else {
                // Simple conversion for mock
                $totalValueUsd += (($p['precio'] / 3.75) * $p['cantidad']);
            }
        }

        return response()->json([
            'success' => true,
            'stats' => [
                'total_products' => $totalItems,
                'active_products' => $totalItems,
                'total_value_usd' => round($totalValueUsd, 2),
                'stock_alert' => 1 // Mock alert count
            ]
        ]);
    }

    /**
     * Detalle de producto (Mock)
     */
    public function show($id)
    {
        $product = collect($this->mockProducts)->firstWhere('id', (int)$id);

        if (!$product) {
            return response()->json(['success' => false, 'message' => 'Producto no encontrado'], 404);
        }

        return response()->json([
            'success' => true,
            'product' => $product
        ]);
    }

    /**
     * Crear producto (Mock - No guarda)
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'sku' => 'required|string',
            'cantidad' => 'required|integer'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Producto creado correctamente (Simulación)',
            'data' => $request->all()
        ]);
    }

    /**
     * Actualizar producto (Mock - No guarda)
     */
    public function update(Request $request, $id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Producto actualizado correctamente (Simulación)',
            'id' => $id
        ]);
    }

    /**
     * Eliminar producto (Mock - No guarda)
     */
    public function destroy($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Producto eliminado correctamente (Simulación)',
            'id' => $id
        ]);
    }

    /**
     * Agregar items desde compras pagadas
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
                $newProduct = [
                    'nombre' => $item['description'] ?? 'Material sin descripción',
                    'sku' => 'QP-' . substr(md5($batchId . $item['description']), 0, 8),
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
                ];

                // Guardar en mock (en producción sería DB::table)
                $addedItems[] = $newProduct;
            }

            return response()->json([
                'success' => true,
                'message' => count($addedItems) . ' items agregados al inventario como apartados',
                'items' => $addedItems
            ]);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Obtener items apartados (pendientes de ubicación)
     * GET /api/inventario_krsft/reserved-items
     */
    public function getReservedItems(Request $request)
    {
        try {
            // En mock, retornamos empty. En producción:
            // $items = Producto::where('apartado', true)->get();
            
            return response()->json([
                'success' => true,
                'reserved_items' => [],
                'total' => 0
            ]);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
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
            if (!$this->isLocationAvailable($locationCode)) {
                return response()->json([
                    'success' => false,
                    'message' => "La ubicación {$locationCode} ya está ocupada"
                ], 409);
            }

            // En producción:
            // $product = Producto::find($productId);
            // $product->update([
            //     'ubicacion' => $locationCode,
            //     'estado_ubicacion' => 'asignada',
            //     'apartado' => false
            // ]);

            return response()->json([
                'success' => true,
                'message' => "Ubicación {$locationCode} asignada correctamente",
                'location' => $locationCode
            ]);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Validar que una ubicación no esté duplicada
     */
    private function isLocationAvailable(string $location): bool
    {
        // En producción:
        // return !Producto::where('ubicacion', $location)->exists();
        
        // En mock, siempre disponible
        return true;
    }
}


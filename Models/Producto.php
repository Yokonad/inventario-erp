<?php

namespace Modulos_ERP\InventarioKrsft\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'inventario_productos';
    
    protected $fillable = [
        'nombre',
        'descripcion',
        'sku',
        'cantidad',
        'precio',
        'categoria',
        'unidad',
        'moneda',
        'estado',
        'ubicacion',
        'project_id',
        'apartado',
        'nombre_proyecto',
        'estado_ubicacion',
        'batch_id',
        'diameter',
        'series',
        'material_type',
        'amount',
        'amount_pen'
    ];

    protected $casts = [
        'apartado' => 'boolean',
        'cantidad' => 'integer',
        'price' => 'float'
    ];
}

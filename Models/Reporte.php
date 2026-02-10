<?php

namespace Modulos_ERP\InventarioKrsft\Models;

use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    protected $table = 'inventario_reportes';
    
    protected $fillable = [
        'producto_id',
        'producto_nombre',
        'producto_sku',
        'proyecto_nombre',
        'motivo',
        'reportado_por',
        'estado',
        'notas',
        'revisado_at',
        'revisado_por'
    ];

    protected $casts = [
        'revisado_at' => 'datetime',
    ];

    /**
     * Relación con producto
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}

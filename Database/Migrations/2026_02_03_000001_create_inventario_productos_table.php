<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventario_productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->string('sku')->unique();
            $table->integer('cantidad')->default(0);
            $table->decimal('precio', 12, 2)->default(0);
            $table->string('categoria')->nullable();
            $table->string('unidad')->default('UND');
            $table->string('moneda', 10)->default('PEN');
            $table->string('estado')->default('activo');
            $table->string('ubicacion')->nullable();
            $table->unsignedBigInteger('project_id')->nullable();
            $table->boolean('apartado')->default(false);
            $table->string('nombre_proyecto')->nullable();
            $table->string('estado_ubicacion')->nullable();
            $table->string('batch_id')->nullable();
            $table->string('diameter')->nullable();
            $table->string('series')->nullable();
            $table->string('material_type')->nullable();
            $table->decimal('amount', 12, 2)->nullable();
            $table->decimal('amount_pen', 12, 2)->nullable();
            $table->timestamps();

            $table->index('project_id');
            $table->index('batch_id');
            $table->index('apartado');
            $table->index('estado');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventario_productos');
    }
};

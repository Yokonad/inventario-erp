<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventario_reportes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('producto_id');
            $table->string('producto_nombre');
            $table->string('producto_sku');
            $table->string('proyecto_nombre');
            $table->text('motivo');
            $table->string('reportado_por');
            $table->enum('estado', ['pendiente', 'revisado', 'resuelto'])->default('pendiente');
            $table->text('notas')->nullable();
            $table->timestamp('revisado_at')->nullable();
            $table->string('revisado_por')->nullable();
            $table->timestamps();
            
            $table->foreign('producto_id')->references('id')->on('inventario_productos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventario_reportes');
    }
};

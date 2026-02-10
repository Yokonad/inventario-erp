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
        Schema::table('inventario_productos', function (Blueprint $table) {
            $table->timestamp('verificado_at')->nullable()->after('updated_at');
            $table->string('verificado_por')->nullable()->after('verificado_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventario_productos', function (Blueprint $table) {
            $table->dropColumn(['verificado_at', 'verificado_por']);
        });
    }
};

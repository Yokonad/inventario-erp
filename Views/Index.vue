<template>
    <div class="inventario-layout">
        <div class="inventario-bg"></div>
        
        <div class="inventario-container">
            <header class="module-header">
                <div class="header-left">
                    <button @click="goBack" class="btn-primary" style="margin-right: 20px;">
                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Volver
                    </button>
                    <h1>
                        <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                             <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                             <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                             <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                        GESTIÓN DE INVENTARIO
                    </h1>
                </div>
            </header>

            <main class="module-content">
                <div style="text-align: center; padding: 40px; color: var(--inventario-text-dark);">
                    <h2>Bienvenido al Módulo de Inventario</h2>
                    <p style="color: var(--inventario-text-gray);">El estilo visual ha sido cargado correctamente.</p>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import './inventario_theme.css';
import './inventario.css';

const goBack = () => {
    window.location.href = '/';
};
</script>

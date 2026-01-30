<template>
    <div class="inventario-layout">
        <div class="inventario-bg"></div>
        <div class="inventario-container">
            <div class="module-header">
                <div class="header-left">
                    <h1>
                        <div class="title-icon">
                            <!-- Icono SVG -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                        </div>
                        Inventario KRSFT
                    </h1>
                </div>
            </div>

            <div class="module-content">
                <div class="bg-white rounded-lg shadow p-6">
                    <p class="text-xl text-gray-700">{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import './inventario_theme.css';
import './inventario.css';

defineProps({
    message: String
});

// 3. Dropdowns Estándar
const categories = [
    { value: 'quimicos', label: 'Químicos' },
    { value: 'accesorios', label: 'Accesorios' },
    { value: 'materiales', label: 'Materiales' },
    { value: 'herramientas', label: 'Herramientas' },
    { value: 'otros', label: 'Otros' }
];

const units = [
    { value: 'unidad', label: 'Unidad' },
    { value: 'galon', label: 'Galón' },
    { value: 'metro', label: 'Metro' },
    { value: 'kg', label: 'Kg' },
    { value: 'litro', label: 'Litro' },
    { value: 'caja', label: 'Caja' }
];
</script>

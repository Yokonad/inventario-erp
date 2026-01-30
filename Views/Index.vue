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
                        INVENTARIO DE MATERIALES
                    </h1>
                </div>
                <div class="header-right">
                    <button class="btn-primary" @click="openModal()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Nuevo Material
                    </button>
                </div>
            </header>

            <main class="module-content">
                
                <!-- Barra de Filtros -->
                <div style="background: white; padding: 15px 20px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 200px;">
                        <label style="display: block; font-size: 0.75rem; color: #666; margin-bottom: 4px; font-weight: 600;">BUSCAR</label>
                        <div style="position: relative;">
                            <input type="text" placeholder="Buscar por nombre..." style="width: 100%; padding: 8px 10px 8px 35px; border-radius: 6px; border: 1px solid #ddd; outline: none;" v-model="searchQuery">
                            <svg style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #999;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>
                    <div style="min-width: 150px;">
                        <label style="display: block; font-size: 0.75rem; color: #666; margin-bottom: 4px; font-weight: 600;">CATEGORÍA</label>
                        <select style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #ddd;" v-model="filterCategory">
                            <option value="">Todas</option>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                    </div>
                    <div style="min-width: 150px;">
                        <label style="display: block; font-size: 0.75rem; color: #666; margin-bottom: 4px; font-weight: 600;">ESTADO</label>
                        <select style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #ddd;" v-model="filterStatus">
                            <option value="">Todos</option>
                            <option value="activo">Activo</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="rechazado">Rechazado</option>
                        </select>
                    </div>
                </div>

                <!-- Tabla de Datos -->
                <div style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                            <tr>
                                <th style="padding: 12px 20px; text-align: left; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Producto</th>
                                <th style="padding: 12px 20px; text-align: left; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Categoría</th>
                                <th style="padding: 12px 20px; text-align: center; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Unidad</th>
                                <th style="padding: 12px 20px; text-align: center; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Cant.</th>
                                <th style="padding: 12px 20px; text-align: left; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Ubicación</th>
                                <th style="padding: 12px 20px; text-align: center; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Estado</th>
                                <th style="padding: 12px 20px; text-align: center; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in filteredItems" :key="item.id" style="border-bottom: 1px solid #f1f5f9; transition: background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                                <td style="padding: 12px 20px;">
                                    <div style="font-weight: 600; color: #334155;">{{ item.nombre }}</div>
                                    <div style="font-size: 0.8rem; color: #94a3b8;">{{ item.sku }}</div>
                                </td>
                                <td style="padding: 12px 20px; color: #475569;">{{ item.categoria }}</td>
                                <td style="padding: 12px 20px; text-align: center; color: #475569;">{{ item.unidad }}</td>
                                <td style="padding: 12px 20px; text-align: center; font-weight: 600; color: #334155;">{{ item.cantidad }}</td>
                                <td style="padding: 12px 20px;">
                                    <span class="location-code">{{ item.ubicacion }}</span>
                                </td>
                                <td style="padding: 12px 20px; text-align: center;">
                                    <span class="status-badge" 
                                        :class="{
                                            'approved': item.estado === 'activo',
                                            'pending': item.estado === 'pendiente',
                                            'rejected': item.estado === 'rechazado'
                                        }">
                                        {{ item.estado === 'activo' ? 'Aprobado' : (item.estado === 'pendiente' ? 'Sin Aprobar' : 'Rechazado') }}
                                    </span>
                                </td>
                                <td style="padding: 12px 20px; text-align: center;">
                                    <div style="display: flex; gap: 8px; justify-content: center;">
                                        <button @click="openModal(item)" title="Editar" style="background: none; border: none; cursor: pointer; color: #3b82f6; padding: 4px; border-radius: 4px;" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='none'">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        </button>
                                        <button title="Eliminar" style="background: none; border: none; cursor: pointer; color: #ef4444; padding: 4px; border-radius: 4px;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='none'">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- Paginación Mock -->
                    <div style="padding: 15px 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                        <div style="font-size: 0.85rem; color: #64748b;">Mostrando <strong>1-{{ filteredItems.length }}</strong> de <strong>{{ filteredItems.length }}</strong> resultados</div>
                        <div style="display: flex; gap: 5px;">
                            <button disabled style="padding: 5px 10px; border: 1px solid #e2e8f0; background: white; border-radius: 6px; color: #cbd5e1; cursor: not-allowed;">&lt; Anterior</button>
                            <button style="padding: 5px 12px; border: 1px solid var(--inventario-primary); background: var(--inventario-primary); border-radius: 6px; color: white; font-weight: 600;">1</button>
                            <button disabled style="padding: 5px 10px; border: 1px solid #e2e8f0; background: white; border-radius: 6px; color: #cbd5e1; cursor: not-allowed;">Siguiente &gt;</button>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Modal Formulario Registro -->
            <Teleport to="body">
                <div v-if="showModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 100; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(4px);">
                    <div style="background: white; width: 600px; max-width: 90%; border-radius: 16px; padding: 0; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden; animation: slideUp 0.3s ease-out;">
                        <div style="padding: 20px 24px; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
                            <h2 style="margin: 0; font-size: 1.25rem; color: #1e293b;">{{ isEditing ? 'Editar Material' : 'Nuevo Material' }}</h2>
                            <button @click="closeModal" style="background: none; border: none; font-size: 1.5rem; color: #64748b; cursor: pointer;">&times;</button>
                        </div>
                        
                        <div style="padding: 24px;">
                            <form @submit.prevent="saveMaterial">
                                <!-- Sección 1: Información -->
                                <h3 style="font-size: 0.9rem; text-transform: uppercase; color: #94a3b8; margin: 0 0 16px 0; font-weight: 700;">Información General</h3>
                                
                                <div style="margin-bottom: 16px;">
                                    <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #475569; margin-bottom: 6px;">Nombre del Material</label>
                                    <input v-model="form.nombre" type="text" class="input-field" placeholder="Ej: Laptop HP Pavilion" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;" required />
                                </div>

                                <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                                    <div style="flex: 1;">
                                        <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #475569; margin-bottom: 6px;">Categoría</label>
                                        <select v-model="form.categoria" class="input-field" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;" required>
                                            <option value="">Seleccionar...</option>
                                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                                        </select>
                                    </div>
                                    <div style="flex: 1;">
                                        <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #475569; margin-bottom: 6px;">Unidad</label>
                                        <select v-model="form.unidad" class="input-field" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;" required>
                                            <option value="">Seleccionar...</option>
                                            <option v-for="unit in units" :key="unit" :value="unit">{{ unit }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div style="margin-bottom: 24px;">
                                    <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #475569; margin-bottom: 6px;">Cantidad</label>
                                    <input v-model.number="form.cantidad" type="number" min="0" class="input-field" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;" required />
                                </div>

                                <!-- Sección 2: Ubicación ZNP -->
                                <h3 style="font-size: 0.9rem; text-transform: uppercase; color: #94a3b8; margin: 0 0 16px 0; font-weight: 700; border-top: 1px solid #f0f0f0; padding-top: 20px;">Ubicación (Sistema ZNP)</h3>
                                
                                <div style="background: rgba(74, 144, 226, 0.05); padding: 16px; border-radius: 10px; border: 1px dashed var(--inventario-primary);">
                                    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                                        <div style="flex: 1;">
                                            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: #475569; margin-bottom: 4px;">Zona</label>
                                            <select v-model="form.zona" class="input-field" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1;">
                                                <option v-for="z in ['A','B','C','D','E']" :key="z" :value="z">{{ z }}</option>
                                            </select>
                                        </div>
                                        <div style="flex: 1;">
                                            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: #475569; margin-bottom: 4px;">Nivel</label>
                                            <select v-model="form.nivel" class="input-field" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1;">
                                                <option v-for="n in [1,2,3,4]" :key="n" :value="n">{{ n }}</option>
                                            </select>
                                        </div>
                                        <div style="flex: 1;">
                                            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: #475569; margin-bottom: 4px;">Posición</label>
                                            <select v-model="form.posicion" class="input-field" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1;">
                                                <option v-for="p in 8" :key="p" :value="p">{{ p }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div style="text-align: center;">
                                        <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 4px;">CÓDIGO DE UBICACIÓN</div>
                                        <div class="location-code" style="font-size: 1.2rem; display: inline-block; padding: 4px 12px;">{{ computedLocationCode }}</div>
                                    </div>
                                </div>

                                <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
                                    <button type="button" @click="closeModal" style="padding: 10px 20px; border: 1px solid #cbd5e1; background: white; border-radius: 8px; font-weight: 600; color: #64748b; cursor: pointer;">Cancelar</button>
                                    <button type="submit" class="btn-primary">Guardar Material</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Teleport>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import './inventario_theme.css';
import './inventario.css';

// Constantes
const categories = ['Electrónica', 'Químicos', 'Mobiliario', 'EPP', 'Accesorios', 'Herramientas', 'Otros'];
const units = ['Unidad', 'Galón', 'Metro', 'Kg', 'Litro', 'Caja'];

// Estado
const products = ref([]);
const searchQuery = ref('');
const filterCategory = ref('');
const filterStatus = ref('');
const showModal = ref(false);
const isEditing = ref(false);

const form = ref({
    id: null,
    nombre: '',
    categoria: '',
    unidad: '',
    cantidad: 1,
    zona: 'A',
    nivel: 1,
    posicion: 1
});

// API Fetch (Simulado)
const fetchProducts = async () => {
    try {
        const response = await fetch('/api/inventario_krsft/list');
        const data = await response.json();
        if (data.success) {
            products.value = data.products;
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Computed: Filtros
const filteredItems = computed(() => {
    return products.value.filter(item => {
        const matchSearch = item.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                            item.sku.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchCat = filterCategory.value ? item.categoria === filterCategory.value : true;
        const matchStatus = filterStatus.value ? item.estado === filterStatus.value : true;
        
        return matchSearch && matchCat && matchStatus;
    });
});

// Computed: Location Code
const computedLocationCode = computed(() => {
    return `${form.value.zona}-${form.value.nivel}-${form.value.posicion}`;
});

// Actions
const openModal = (item = null) => {
    isEditing.value = !!item;
    if (item) {
        // Parsear ubicación ZNP si existe (Ej: A-1-1)
        const parts = item.ubicacion ? item.ubicacion.split('-') : ['A', '1', '1'];
        form.value = {
            id: item.id,
            nombre: item.nombre,
            categoria: item.categoria,
            unidad: item.unidad,
            cantidad: item.cantidad,
            zona: parts[0] || 'A',
            nivel: parseInt(parts[1]) || 1,
            posicion: parseInt(parts[2]) || 1
        };
    } else {
        form.value = {
            id: null,
            nombre: '',
            categoria: '',
            unidad: '',
            cantidad: 1,
            zona: 'A',
            nivel: 1,
            posicion: 1
        };
    }
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const saveMaterial = () => {
    alert(`Guardando material: ${form.value.nombre} en ubicación ${computedLocationCode.value}`);
    closeModal();
};

onMounted(() => {
    fetchProducts();
});

const goBack = () => {
    window.location.href = '/';
};
</script>

<style>
@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
</style>

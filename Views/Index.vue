<template>
    <div class="inventario-layout">
        <div class="inventario-bg"></div>
        
        <div class="inventario-container">
            <header class="module-header">
                <div class="header-left">
                    <button @click="goBack" class="btn-primary btn-back">
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
                    <button @click="toggleDarkMode" class="theme-toggle" title="Cambiar tema">
                        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="5"/>
                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                        </svg>
                        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    </button>
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
                
                <!-- Tabs de Navegación -->
                <div class="tabs-nav">
                    <button 
                        @click="currentTab = 'inventario'" 
                        :class="['tab-btn', { 'is-active': currentTab === 'inventario' }]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        </svg>
                        Inventario
                        <span class="tab-badge">{{ filteredItems.length }}</span>
                    </button>
                    <button 
                        @click="currentTab = 'reportes'" 
                        :class="['tab-btn', { 'is-active': currentTab === 'reportes' }]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                        Reportes
                        <span v-if="reportes.filter(r => r.estado === 'pendiente').length > 0" class="tab-badge tab-badge--alert">{{ reportes.filter(r => r.estado === 'pendiente').length }}</span>
                    </button>
                </div>
                
                <!-- Vista de Inventario -->
                <div v-show="currentTab === 'inventario'" class="tab-content">
                
                <!-- Barra de Filtros -->
                <div class="filter-bar">
                    <div class="filter-field filter-field--search">
                        <label class="filter-label">BUSCAR</label>
                        <div class="filter-input-wrapper">
                            <input type="text" placeholder="Buscar por nombre..." class="filter-input" v-model="searchQuery">
                            <svg class="filter-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label">CATEGORÍA</label>
                        <select class="filter-select" v-model="filterCategory">
                            <option value="">Todas</option>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label">ESTADO</label>
                        <select class="filter-select" v-model="filterStatus">
                            <option value="">Todos</option>
                            <option value="activo">Activo</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="rechazado">Rechazado</option>
                        </select>
                    </div>
                </div>

                <!-- Tabla de Datos -->
                <div class="table-card">
                    <table class="inventory-table">
                        <thead class="table-head">
                            <tr>
                                <th class="table-head-cell">Producto</th>
                                <th class="table-head-cell">Categoría</th>
                                <th class="table-head-cell is-center">Cant.</th>
                                <th class="table-head-cell">Proyecto</th>
                                <th class="table-head-cell">Ubicación</th>
                                <th class="table-head-cell is-center">Estado</th>
                                <th class="table-head-cell is-center">Verificación</th>
                                <th class="table-head-cell is-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in filteredItems" :key="item.id" :class="['table-row', { 'is-apartado': item.apartado }]">
                                <td class="table-cell">
                                    <div class="product-name">{{ item.nombre }}</div>
                                    <div class="product-sku">{{ item.sku }}</div>
                                </td>
                                <td class="table-cell">{{ item.categoria }}</td>
                                <td class="table-cell is-center">{{ item.cantidad }}</td>
                                <td class="table-cell">
                                    <div v-if="item.apartado" class="apartado-info">
                                        <span class="apartado-badge">
                                            <svg class="icon icon-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M12 22s6-4 6-10a6 6 0 0 0-12 0c0 6 6 10 6 10z"/>
                                                <circle cx="12" cy="12" r="2"/>
                                            </svg>
                                            APARTADO
                                        </span>
                                        <span class="project-pill" :style="getProjectPillStyle(item)">
                                            {{ item.nombre_proyecto }}
                                        </span>
                                    </div>
                                    <span v-else class="text-muted">-</span>
                                </td>
                                <td class="table-cell">
                                    <div v-if="item.ubicacion">
                                        <span class="location-code">{{ item.ubicacion }}</span>
                                    </div>
                                    <div v-else-if="item.apartado" class="pending-info">
                                        <svg class="icon icon-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                            <line x1="12" y1="9" x2="12" y2="13"/>
                                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                                        </svg>
                                        Pendiente
                                    </div>
                                    <span v-else class="text-muted">-</span>
                                </td>
                                <td class="table-cell is-center">
                                    <span class="status-badge" 
                                        :class="{
                                            'approved': item.estado === 'activo',
                                            'pending': item.estado === 'pendiente',
                                            'rejected': item.estado === 'rechazado'
                                        }">
                                        {{ item.estado === 'activo' ? 'Aprobado' : (item.estado === 'pendiente' ? 'Sin Aprobar' : 'Rechazado') }}
                                    </span>
                                </td>
                                <td class="table-cell is-center">
                                    <div v-if="item.verificado_at" class="verification-info" :title="`Verificado por: ${item.verificado_por}`">
                                        <span class="verification-date">{{ formatDate(item.verificado_at) }}</span>
                                    </div>
                                    <span v-else class="text-muted">-</span>
                                </td>
                                <td class="table-cell is-center">
                                    <div class="action-menu-wrapper">
                                        <button @click="openMenuId = openMenuId === item.id ? null : item.id" class="action-menu-trigger" title="Opciones">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                                <circle cx="12" cy="5" r="2"/>
                                                <circle cx="12" cy="12" r="2"/>
                                                <circle cx="12" cy="19" r="2"/>
                                            </svg>
                                        </button>
                                        <div v-if="openMenuId === item.id" class="action-dropdown">
                                            <button v-if="item.apartado && item.nombre_proyecto" @click="openReportModal(item); openMenuId = null" class="dropdown-item dropdown-item--report">
                                                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                                    <line x1="12" y1="9" x2="12" y2="13"/>
                                                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                                                </svg>
                                                <span>Reportar Problema</span>
                                            </button>
                                            <button @click="verifyProduct(item); openMenuId = null" class="dropdown-item dropdown-item--verify">
                                                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M9 11l3 3L22 4"/>
                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                                                </svg>
                                                <span>Verificar</span>
                                            </button>
                                            <button @click="openModal(item); openMenuId = null" class="dropdown-item dropdown-item--edit">
                                                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                                <span>Editar</span>
                                            </button>
                                            <button @click="deleteProduct(item); openMenuId = null" class="dropdown-item dropdown-item--delete">
                                                <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path>
                                                </svg>
                                                <span>Eliminar</span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- Paginación Mock -->
                    <div class="pagination">
                        <div class="pagination-info">Mostrando <strong>1-{{ filteredItems.length }}</strong> de <strong>{{ filteredItems.length }}</strong> resultados</div>
                        <div class="pagination-actions">
                            <button disabled class="pagination-btn is-disabled">&lt; Anterior</button>
                            <button class="pagination-btn is-active">1</button>
                            <button disabled class="pagination-btn is-disabled">Siguiente &gt;</button>
                        </div>
                    </div>
                </div>
                </div>

                <!-- Vista de Reportes -->
                <div v-show="currentTab === 'reportes'" class="tab-content">
                    <div class="table-card">
                        <div class="reportes-header">
                            <h3 class="reportes-title">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                    <line x1="16" y1="13" x2="8" y2="13"/>
                                    <line x1="16" y1="17" x2="8" y2="17"/>
                                    <polyline points="10 9 9 9 8 9"/>
                                </svg>
                                Reportes de Materiales
                            </h3>
                            <div class="reportes-filters">
                                <button 
                                    @click="filterReporteEstado = ''"
                                    :class="['filter-estado-btn', { 'is-active': filterReporteEstado === '' }]">
                                    Todos
                                    <span class="filter-badge">{{ reportes.length }}</span>
                                </button>
                                <button 
                                    @click="filterReporteEstado = 'pendiente'"
                                    :class="['filter-estado-btn filter-estado-btn--pending', { 'is-active': filterReporteEstado === 'pendiente' }]">
                                    Pendientes
                                    <span class="filter-badge">{{ reportes.filter(r => r.estado === 'pendiente').length }}</span>
                                </button>
                                <button 
                                    @click="filterReporteEstado = 'revisado'"
                                    :class="['filter-estado-btn filter-estado-btn--reviewed', { 'is-active': filterReporteEstado === 'revisado' }]">
                                    Revisados
                                    <span class="filter-badge">{{ reportes.filter(r => r.estado === 'revisado').length }}</span>
                                </button>
                                <button 
                                    @click="filterReporteEstado = 'resuelto'"
                                    :class="['filter-estado-btn filter-estado-btn--resolved', { 'is-active': filterReporteEstado === 'resuelto' }]">
                                    Resueltos
                                    <span class="filter-badge">{{ reportes.filter(r => r.estado === 'resuelto').length }}</span>
                                </button>
                            </div>
                        </div>

                        <table class="inventory-table">
                            <thead class="table-head">
                                <tr>
                                    <th class="table-head-cell">Producto</th>
                                    <th class="table-head-cell">Proyecto</th>
                                    <th class="table-head-cell">Motivo</th>
                                    <th class="table-head-cell">Reportado por</th>
                                    <th class="table-head-cell">Fecha</th>
                                    <th class="table-head-cell is-center">Estado</th>
                                    <th class="table-head-cell is-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="reporte in filteredReportes" :key="reporte.id" class="table-row table-row--clickable" @click="openReporteDetail(reporte)">
                                    <td class="table-cell">
                                        <div class="product-name">{{ reporte.producto_nombre }}</div>
                                        <div class="product-sku">{{ reporte.producto_sku }}</div>
                                    </td>
                                    <td class="table-cell">
                                        <span class="project-badge">{{ reporte.proyecto_nombre }}</span>
                                    </td>
                                    <td class="table-cell">
                                        <div class="reporte-motivo">{{ reporte.motivo }}</div>
                                    </td>
                                    <td class="table-cell">{{ reporte.reportado_por }}</td>
                                    <td class="table-cell">
                                        <div class="reporte-date">{{ formatDate(reporte.created_at) }}</div>
                                    </td>
                                    <td class="table-cell is-center">
                                        <span class="status-badge" 
                                            :class="{
                                                'pending': reporte.estado === 'pendiente',
                                                'reviewed': reporte.estado === 'revisado',
                                                'approved': reporte.estado === 'resuelto'
                                            }">
                                            {{ reporte.estado === 'pendiente' ? 'Pendiente' : (reporte.estado === 'revisado' ? 'Revisado' : 'Resuelto') }}
                                        </span>
                                    </td>
                                    <td class="table-cell is-center" @click.stop>
                                        <div class="action-buttons">
                                            <button @click="openReporteDetail(reporte)" title="Ver detalles" class="action-btn action-btn--view">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                    <circle cx="12" cy="12" r="3"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="filteredReportes.length === 0">
                                    <td colspan="7" class="table-cell is-center" style="padding: 40px; color: var(--inventario-text-gray);">
                                        <svg style="width: 48px; height: 48px; margin: 0 auto 12px; display: block; opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                        No hay reportes {{ filterReporteEstado ? `con estado "${filterReporteEstado}"` : 'registrados' }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <!-- Modal Formulario Registro -->
            <Teleport to="body">
                <div v-if="showModal" class="modal-overlay">
                    <div class="modal-card">
                        <div class="modal-header">
                            <div class="modal-header-text">
                                <h2 class="modal-title">NUEVO MATERIAL</h2>
                                <p class="modal-subtitle">Registra un nuevo material para control de stock y ubicación ZNP.</p>
                            </div>
                        </div>
                        
                        <div class="modal-body">
                            <form @submit.prevent="saveMaterial">
                                <!-- Sección 1: Información -->
                                <h3 class="section-title">Información General</h3>
                                
                                <div class="form-group">
                                    <label class="form-label">Nombre del Material</label>
                                    <input v-model="form.nombre" type="text" class="input-field" placeholder="Ej: Laptop HP Pavilion" required />
                                </div>

                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label">Categoría</label>
                                        <select v-model="form.categoria" class="input-field" required>
                                            <option value="">Seleccionar...</option>
                                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Unidad</label>
                                        <input v-model="form.unidad" type="text" class="input-field" placeholder="Ej: UND, KG, M, LT" required />
                                    </div>
                                </div>

                                <div class="form-group form-group--spaced">
                                    <label class="form-label">Cantidad</label>
                                    <input v-model.number="form.cantidad" type="number" min="0" class="input-field" required />
                                </div>

                                <!-- Sección 2: Ubicación ZNP -->
                                <h3 class="section-title section-title--border">Ubicación (Sistema ZNP)</h3>
                                
                                <div class="znp-box">
                                    <div class="form-row form-row--compact">
                                        <div class="form-group">
                                            <label class="form-label form-label--small">Zona</label>
                                            <select v-model="form.zona" class="input-field input-field--compact">
                                                <option v-for="z in ['A','B','C','D','E']" :key="z" :value="z">{{ z }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label form-label--small">Nivel</label>
                                            <select v-model="form.nivel" class="input-field input-field--compact">
                                                <option v-for="n in [1,2,3,4]" :key="n" :value="n">{{ n }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label form-label--small">Posición</label>
                                            <select v-model="form.posicion" class="input-field input-field--compact">
                                                <option v-for="p in 8" :key="p" :value="p">{{ p }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="location-preview">
                                        <div class="location-label">CÓDIGO DE UBICACIÓN</div>
                                        <div class="location-code location-code--large">{{ computedLocationCode }}</div>
                                    </div>
                                </div>

                                <div class="modal-actions">
                                    <button type="button" @click="closeModal" class="btn-secondary is-danger">Cancelar</button>
                                    <button type="submit" class="btn-primary">Guardar Material</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Modal Asignar Ubicación a Item Apartado -->
                <div v-if="showLocationModal" class="modal-overlay">
                    <div class="modal-card modal-card--compact">
                        <div class="modal-header modal-header--warning">
                            <h2 class="modal-title modal-title--warning">
                                <svg class="icon icon-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                Asignar Ubicación ZNP
                            </h2>
                        </div>
                        
                        <div class="modal-body">
                            <div class="material-card">
                                <div class="material-label">
                                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                                    </svg>
                                    Material
                                </div>
                                <div class="material-name">{{ selectedReservedItem?.nombre }}</div>
                                <div class="material-project">Proyecto: <span>{{ selectedReservedItem?.nombre_proyecto }}</span></div>
                            </div>

                            <form @submit.prevent="saveLocation">
                                <h3 class="section-title">Código de Ubicación (Sistema ZNP)</h3>
                                
                                <div class="znp-box znp-box--spaced">
                                    <div class="form-row form-row--compact">
                                        <div class="form-group">
                                            <label class="form-label form-label--small">Zona (A-E)</label>
                                            <select v-model="locationForm.zona" class="input-field input-field--compact" required>
                                                <option value="">Seleccionar...</option>
                                                <option v-for="z in ['A','B','C','D','E']" :key="z" :value="z">{{ z }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label form-label--small">Nivel (1-4)</label>
                                            <select v-model="locationForm.nivel" class="input-field input-field--compact" required>
                                                <option value="">Seleccionar...</option>
                                                <option v-for="n in [1,2,3,4]" :key="n" :value="n">{{ n }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label form-label--small">Posición (1-8)</label>
                                            <select v-model="locationForm.posicion" class="input-field input-field--compact" required>
                                                <option value="">Seleccionar...</option>
                                                <option v-for="p in 8" :key="p" :value="p">{{ p }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="location-final">
                                        <div class="location-label location-label--warning">Código Final</div>
                                        <div class="location-code location-code--xlarge">{{ computedReservedLocationCode }}</div>
                                    </div>
                                </div>

                                <div class="modal-actions">
                                    <button type="button" @click="closeLocationModal" class="btn-secondary is-danger">Cancelar</button>
                                    <button type="submit" class="btn-warning">
                                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M12 22s6-4 6-10a6 6 0 0 0-12 0c0 6 6 10 6 10z"/>
                                            <circle cx="12" cy="12" r="2"/>
                                        </svg>
                                        Guardar Ubicación
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Teleport>

            <!-- Modal de Verificación -->
            <Teleport to="body">
                <div v-if="showVerifyModal" class="modal-overlay" @click.self="closeVerifyModal">
                    <div class="modal-verify">
                        <div class="modal-verify-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 11l3 3L22 4"/>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                            </svg>
                        </div>
                        <h3 class="modal-verify-title">Verificar Material</h3>
                        <p class="modal-verify-text">¿Confirmas la verificación de:</p>
                        <div class="modal-verify-product">{{ verifyingProduct?.nombre }}</div>
                        <div class="modal-verify-user">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            <span>{{ currentUserName }}</span>
                        </div>
                        <div class="modal-verify-actions">
                            <button type="button" @click="closeVerifyModal" class="btn-verify-cancel">
                                Cancelar
                            </button>
                            <button type="button" @click="confirmVerify" class="btn-verify-confirm">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Verificar
                            </button>
                        </div>
                    </div>
                </div>
            </Teleport>

            <!-- Modal de Reporte -->
            <Teleport to="body">
                <div v-if="showReportModal" class="modal-overlay" @click.self="closeReportModal">
                    <div class="modal-report">
                        <div class="modal-report-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                <line x1="12" y1="9" x2="12" y2="13"/>
                                <line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                        </div>
                        <h3 class="modal-report-title">Reportar Material</h3>
                        <p class="modal-report-subtitle">Material no recibido en obra</p>
                        
                        <div class="modal-report-product">
                            <div class="report-product-name">{{ reportingProduct?.nombre }}</div>
                            <div class="report-product-project">Proyecto: {{ reportingProduct?.nombre_proyecto }}</div>
                        </div>

                        <form @submit.prevent="confirmReport">
                            <div class="form-group">
                                <label class="form-label">Motivo del reporte</label>
                                <textarea 
                                    v-model="reportMotivo" 
                                    class="textarea-field" 
                                    placeholder="Describe el problema (ej: Material no llegó a obra, se necesita verificar si está en inventario o no se compró)" 
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            <div class="modal-report-actions">
                                <button type="button" @click="closeReportModal" class="btn-report-cancel">
                                    Cancelar
                                </button>
                                <button type="submit" class="btn-report-confirm">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                    </svg>
                                    Enviar Reporte
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Teleport>

            <!-- Modal de Detalle de Reporte -->
            <Teleport to="body">
                <div v-if="showReporteDetailModal" class="modal-overlay" @click.self="closeReporteDetail">
                    <div class="modal-card modal-card--large">
                        <div class="modal-header">
                            <div class="modal-header-text">
                                <h2 class="modal-title">DETALLE DEL REPORTE</h2>
                                <p class="modal-subtitle">Información completa del problema reportado</p>
                            </div>
                        </div>
                        
                        <div class="modal-body" v-if="selectedReporte">
                            <!-- Sección de Información del Producto -->
                            <div class="detail-section">
                                <h3 class="section-title">Información del Material</h3>
                                <div class="detail-grid">
                                    <div class="detail-item">
                                        <label class="detail-label">Producto</label>
                                        <div class="detail-value">{{ selectedReporte.producto_nombre }}</div>
                                    </div>
                                    <div class="detail-item">
                                        <label class="detail-label">SKU</label>
                                        <div class="detail-value">{{ selectedReporte.producto_sku }}</div>
                                    </div>
                                    <div class="detail-item">
                                        <label class="detail-label">Proyecto</label>
                                        <div class="detail-value">
                                            <span class="project-badge">{{ selectedReporte.proyecto_nombre }}</span>
                                        </div>
                                    </div>
                                    <div class="detail-item">
                                        <label class="detail-label">Estado Actual</label>
                                        <div class="detail-value">
                                            <span class="status-badge" 
                                                :class="{
                                                    'pending': selectedReporte.estado === 'pendiente',
                                                    'reviewed': selectedReporte.estado === 'revisado',
                                                    'approved': selectedReporte.estado === 'resuelto'
                                                }">
                                                {{ selectedReporte.estado === 'pendiente' ? 'Pendiente' : (selectedReporte.estado === 'revisado' ? 'Revisado' : 'Resuelto') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Sección del Problema -->
                            <div class="detail-section">
                                <h3 class="section-title">Problema Reportado</h3>
                                <div class="detail-item">
                                    <label class="detail-label">Motivo</label>
                                    <div class="detail-value detail-value--text">{{ selectedReporte.motivo }}</div>
                                </div>
                                <div class="detail-grid">
                                    <div class="detail-item">
                                        <label class="detail-label">Reportado por</label>
                                        <div class="detail-value">{{ selectedReporte.reportado_por }}</div>
                                    </div>
                                    <div class="detail-item">
                                        <label class="detail-label">Fecha de Reporte</label>
                                        <div class="detail-value">{{ formatDate(selectedReporte.created_at) }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Sección de Solución -->
                            <div class="detail-section">
                                <h3 class="section-title">Solución</h3>
                                <div class="form-group">
                                    <label class="form-label">Descripción de la solución</label>
                                    <textarea 
                                        v-model="solucionReporte" 
                                        class="textarea-field" 
                                        placeholder="Describe cómo se resolvió el problema o acciones tomadas..."
                                        rows="4"
                                        :disabled="selectedReporte.estado === 'resuelto'"
                                    ></textarea>
                                </div>
                                <div v-if="selectedReporte.solucion" class="solution-display">
                                    <label class="detail-label">Solución Registrada</label>
                                    <div class="detail-value detail-value--text">{{ selectedReporte.solucion }}</div>
                                    <div class="solution-meta" v-if="selectedReporte.resuelto_por">
                                        <span>Resuelto por: <strong>{{ selectedReporte.resuelto_por }}</strong></span>
                                        <span v-if="selectedReporte.resuelto_at">el {{ formatDate(selectedReporte.resuelto_at) }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Acciones -->
                            <div class="modal-actions">
                                <button @click="closeReporteDetail" class="btn-secondary">
                                    Cerrar
                                </button>
                                <div class="actions-right">
                                    <button 
                                        v-if="selectedReporte.estado === 'pendiente'" 
                                        @click="cambiarEstadoReporte('revisado')" 
                                        class="btn-warning">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                        Marcar como Revisado
                                    </button>
                                    <button 
                                        v-if="selectedReporte.estado !== 'resuelto'" 
                                        @click="cambiarEstadoReporte('resuelto')" 
                                        class="btn-success"
                                        :disabled="!solucionReporte.trim() && !selectedReporte.solucion">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        Resolver Problema
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Teleport>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import './inventario_theme.css';
import './inventario.css';

// Props
const props = defineProps({
    auth: {
        type: Object,
        required: true
    }
});

const currentUserName = computed(() => props.auth?.user?.name || 'Usuario');

// Polling interval para tiempo real
let pollingInterval = null;
const POLLING_INTERVAL_MS = 3000; // 3 segundos

// ============= SISTEMA DE CACHÉ =============
const CACHE_PREFIX = 'inventario_cache_';

// Helper para comparar y evitar re-renders
const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Guardar en caché
const saveToCache = (key, data) => {
    try {
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (e) { console.warn('Cache save error:', e); }
};

// Cargar desde caché
const loadFromCache = (key) => {
    try {
        const cached = localStorage.getItem(CACHE_PREFIX + key);
        if (cached) {
            const { data } = JSON.parse(cached);
            return data;
        }
    } catch (e) { console.warn('Cache load error:', e); }
    return null;
};

// Constantes
const categories = ['Electrónica', 'Químicos', 'Mobiliario', 'EPP', 'Accesorios', 'Herramientas', 'Otros'];
const units = ['Unidad', 'Galón', 'Metro', 'Kg', 'Litro', 'Caja'];

// Estado
const products = ref([]);
const reservedItems = ref([]);
const reportes = ref([]);
const currentTab = ref('inventario');
const searchQuery = ref('');
const filterCategory = ref('');
const filterStatus = ref('');
const filterReporteEstado = ref('');
const openMenuId = ref(null);
const showModal = ref(false);
const showLocationModal = ref(false);
const showVerifyModal = ref(false);
const showReportModal = ref(false);
const showReporteDetailModal = ref(false);
const isEditing = ref(false);
const selectedReservedItem = ref(null);
const verifyingProduct = ref(null);
const reportingProduct = ref(null);
const reportMotivo = ref('');
const loadingLocation = ref(false);
const selectedReporte = ref(null);
const solucionReporte = ref('');

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

const locationForm = ref({
    zona: 'A',
    nivel: 1,
    posicion: 1
});

const projectColors = [
    '#0AA4A4',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
    '#ef4444',
    '#06b6d4',
    '#6366f1',
    '#84cc16'
];

const getProjectPillStyle = (item) => {
    if (!item) return {};
    const projectId = item.project_id ?? item.proyecto_id ?? item.id_proyecto ?? null;
    let color = null;

    if (typeof projectId === 'number') {
        color = projectColors[projectId % projectColors.length];
    }

    if (!color && item.nombre_proyecto) {
        let hash = 0;
        const name = item.nombre_proyecto;
        for (let i = 0; i < name.length; i += 1) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % projectColors.length;
        color = projectColors[index];
    }

    if (!color) return {};

    return {
        backgroundColor: color,
        color: '#ffffff'
    };
};

// API Fetch - Con sistema de caché para carga instantánea
const fetchProducts = async () => {
    try {
        const response = await fetch('/api/inventario_krsft/list');
        const data = await response.json();
        if (data.success) {
            const newProducts = data.products || [];
            // Solo actualizar UI si hay cambios reales
            if (!arraysEqual(products.value, newProducts)) {
                products.value = newProducts;
                saveToCache('products', newProducts);
            }
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Computed: Filtros
const filteredItems = computed(() => {
    // Combinar items normales y apartados
    const allItems = [...products.value, ...reservedItems.value];
    
    return allItems.filter(item => {
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

const computedReservedLocationCode = computed(() => {
    return `${locationForm.value.zona}-${locationForm.value.nivel}-${locationForm.value.posicion}`;
});

// Computed: Filtered Reportes
const filteredReportes = computed(() => {
    if (!filterReporteEstado.value) {
        return reportes.value;
    }
    return reportes.value.filter(r => r.estado === filterReporteEstado.value);
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

const openLocationModal = (item) => {
    selectedReservedItem.value = item;
    locationForm.value = {
        zona: 'A',
        nivel: 1,
        posicion: 1
    };
    showLocationModal.value = true;
};

const closeLocationModal = () => {
    showLocationModal.value = false;
    selectedReservedItem.value = null;
};

const saveLocation = async () => {
    if (!selectedReservedItem.value) {
        alert('Error: No hay item seleccionado');
        return;
    }

    try {
        loadingLocation.value = true;
        const response = await fetch('/api/inventario_krsft/assign-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_id: selectedReservedItem.value.id,
                zona: locationForm.value.zona,
                nivel: locationForm.value.nivel,
                posicion: locationForm.value.posicion
            })
        });

        const data = await response.json();
        if (data.success) {
            // Actualizar el item localmente
            selectedReservedItem.value.ubicacion = computedReservedLocationCode.value;
            selectedReservedItem.value.estado_ubicacion = 'asignada';
            alert(`✓ Ubicación ${data.location} asignada correctamente`);
            closeLocationModal();
            fetchReservedItems();
        } else {
            alert(`❌ ${data.message}`);
        }
    } catch (error) {
        console.error('Error al asignar ubicación:', error);
        alert('Error al asignar ubicación');
    } finally {
        loadingLocation.value = false;
    }
};

const saveMaterial = async () => {
    if (!form.value.nombre || !form.value.categoria || !form.value.unidad) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }

    try {
        const ubicacion = computedLocationCode.value;
        const url = isEditing.value 
            ? `/api/inventario_krsft/${form.value.id}` 
            : '/api/inventario_krsft/create';
        const method = isEditing.value ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify({
                nombre: form.value.nombre,
                descripcion: form.value.nombre,
                sku: `SKU-${Date.now()}`,
                categoria: form.value.categoria,
                unidad: form.value.unidad,
                cantidad: form.value.cantidad,
                precio: 0,
                moneda: 'PEN',
                estado: 'activo',
                ubicacion: ubicacion
            })
        });

        const data = await response.json();
        if (data.success) {
            alert(`✓ Material ${isEditing.value ? 'actualizado' : 'creado'} correctamente`);
            closeModal();
            fetchProducts();
        } else {
            alert(`❌ Error: ${data.message || 'No se pudo guardar'}`);
        }
    } catch (error) {
        console.error('Error al guardar material:', error);
        alert('Error al guardar el material');
    }
};

const deleteProduct = async (item) => {
    if (!confirm(`¿Estás seguro de eliminar "${item.nombre}"?`)) {
        return;
    }

    try {
        const response = await fetch(`/api/inventario_krsft/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            }
        });

        const data = await response.json();
        if (data.success) {
            alert('✓ Producto eliminado correctamente');
            // Actualizar listas
            fetchProducts();
            fetchReservedItems();
        } else {
            alert(`❌ Error: ${data.message || 'No se pudo eliminar'}`);
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto');
    }
};

const fetchReservedItems = async () => {
    try {
        const response = await fetch('/api/inventario_krsft/reserved-items');
        const data = await response.json();
        if (data.success) {
            const newItems = data.reserved_items || [];
            if (!arraysEqual(reservedItems.value, newItems)) {
                reservedItems.value = newItems;
                saveToCache('reservedItems', newItems);
            }
        }
    } catch (error) {
        console.error("Error fetching reserved items:", error);
    }
};

// Inicializar datos desde caché inmediatamente
const initFromCache = () => {
    const cachedProducts = loadFromCache('products');
    const cachedReserved = loadFromCache('reservedItems');
    if (cachedProducts) products.value = cachedProducts;
    if (cachedReserved) reservedItems.value = cachedReserved;
};

const applyDarkMode = (enabled) => {
    document.body.classList.toggle('dark-mode', enabled);
};

const toggleDarkMode = () => {
    const isDark = document.body.classList.contains('dark-mode');
    const next = !isDark;
    applyDarkMode(next);
    localStorage.setItem('darkMode', String(next));
};

const initDarkMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true' || document.body.classList.contains('dark-mode')) {
        applyDarkMode(true);
    }
};

const handleStorage = (event) => {
    if (event.key === 'darkMode') {
        applyDarkMode(event.newValue === 'true');
    }
};

onMounted(() => {
    initDarkMode();
    window.addEventListener('storage', handleStorage);
    // 1. Cargar datos cacheados INMEDIATAMENTE (sin esperar fetch)
    initFromCache();
    
    // 2. Fetch en background para actualizar si hay cambios
    fetchProducts();
    fetchReservedItems();
    fetchReportes();
    
    // 3. Iniciar polling para tiempo real
    pollingInterval = setInterval(() => {
        fetchProducts();
        fetchReservedItems();
        fetchReportes();
    }, POLLING_INTERVAL_MS);
    
    // 4. Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.action-menu-wrapper')) {
            openMenuId.value = null;
        }
    });
});

onUnmounted(() => {
    // Limpiar polling al salir del componente
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
    window.removeEventListener('storage', handleStorage);
});

const goBack = () => {
    window.location.href = '/';
};

const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const verifyProduct = (item) => {
    verifyingProduct.value = item;
    showVerifyModal.value = true;
};

const closeVerifyModal = () => {
    showVerifyModal.value = false;
    verifyingProduct.value = null;
};

const confirmVerify = async () => {
    if (!verifyingProduct.value) return;

    const usuario = currentUserName.value;
    const productId = verifyingProduct.value.id;

    try {
        const response = await fetch(`/api/inventario_krsft/verify/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify({ usuario })
        });

        const data = await response.json();
        if (data.success) {
            closeVerifyModal();
            fetchProducts();
            fetchReservedItems();
        } else {
            alert(`❌ Error: ${data.message || 'No se pudo verificar'}`);
        }
    } catch (error) {
        console.error('Error al verificar producto:', error);
        alert('Error al verificar el producto');
    }
};

// Funciones de Reportes
const fetchReportes = async () => {
    try {
        const response = await fetch('/api/inventario_krsft/reportes');
        const data = await response.json();
        if (data.success) {
            reportes.value = data.reportes || [];
        }
    } catch (error) {
        console.error("Error fetching reportes:", error);
    }
};

const openReportModal = (item) => {
    reportingProduct.value = item;
    reportMotivo.value = '';
    showReportModal.value = true;
};

const closeReportModal = () => {
    showReportModal.value = false;
    reportingProduct.value = null;
    reportMotivo.value = '';
};

const confirmReport = async () => {
    if (!reportingProduct.value || !reportMotivo.value.trim()) {
        alert('Por favor describe el motivo del reporte');
        return;
    }

    try {
        const response = await fetch('/api/inventario_krsft/reportes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify({
                producto_id: reportingProduct.value.id,
                motivo: reportMotivo.value,
                reportado_por: currentUserName.value
            })
        });

        const data = await response.json();
        if (data.success) {
            closeReportModal();
            fetchReportes();
            currentTab.value = 'reportes';
        } else {
            alert(`❌ Error: ${data.message || 'No se pudo crear el reporte'}`);
        }
    } catch (error) {
        console.error('Error al crear reporte:', error);
        alert('Error al crear el reporte');
    }
};

const marcarRevisado = async (reporte) => {
    if (!confirm(`¿Marcar como revisado el reporte de "${reporte.producto_nombre}"?`)) {
        return;
    }

    try {
        const response = await fetch(`/api/inventario_krsft/reportes/${reporte.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify({
                estado: 'revisado',
                revisado_por: currentUserName.value
            })
        });

        const data = await response.json();
        if (data.success) {
            alert('✓ Reporte marcado como revisado');
            fetchReportes();
        } else {
            alert(`❌ Error: ${data.message || 'No se pudo actualizar'}`);
        }
    } catch (error) {
        console.error('Error al actualizar reporte:', error);
        alert('Error al actualizar el reporte');
    }
};

// Funciones para el modal de detalle de reporte
const openReporteDetail = (reporte) => {
    selectedReporte.value = reporte;
    solucionReporte.value = reporte.solucion || '';
    showReporteDetailModal.value = true;
};

const closeReporteDetail = () => {
    showReporteDetailModal.value = false;
    selectedReporte.value = null;
    solucionReporte.value = '';
};

const cambiarEstadoReporte = async (nuevoEstado) => {
    if (!selectedReporte.value) return;

    // Validar que haya solución si se va a resolver
    if (nuevoEstado === 'resuelto' && !solucionReporte.value.trim() && !selectedReporte.value.solucion) {
        alert('⚠️ Por favor, describe la solución antes de marcar como resuelto');
        return;
    }

    const mensaje = nuevoEstado === 'revisado' 
        ? `¿Marcar como REVISADO el reporte de "${selectedReporte.value.producto_nombre}"?`
        : `¿Marcar como RESUELTO el reporte de "${selectedReporte.value.producto_nombre}"?`;

    if (!confirm(mensaje)) {
        return;
    }

    try {
        const body = {
            estado: nuevoEstado
        };

        if (nuevoEstado === 'revisado') {
            body.revisado_por = currentUserName.value;
        } else if (nuevoEstado === 'resuelto') {
            body.solucion = solucionReporte.value.trim() || selectedReporte.value.solucion;
            body.resuelto_por = currentUserName.value;
        }

        const response = await fetch(`/api/inventario_krsft/reportes/${selectedReporte.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (data.success) {
            alert(`✓ Reporte marcado como ${nuevoEstado === 'revisado' ? 'REVISADO' : 'RESUELTO'}`);
            fetchReportes();
            closeReporteDetail();
        } else {
            alert(`❌ Error: ${data.message || 'No se pudo actualizar'}`);
        }
    } catch (error) {
        console.error('Error al cambiar estado del reporte:', error);
        alert('Error al actualizar el reporte');
    }
};

</script>

<style>
@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
</style>

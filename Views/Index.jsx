/**
 * INVENTARIO — Index.jsx (Orchestrator)
 *
 * Slim entry component that composes hooks, UI components, and modals.
 * All business logic lives in hooks/useInventarioData.
 * All SVG icons live in components/Icons.jsx.
 *
 * Per Vercel React best practices:
 * - bundle-barrel-imports: Direct imports, no barrel re-exports
 * - rerender-memo: Extracted heavy sections into their own components
 * - rendering-hoist-jsx: All static JSX (icons) hoisted outside
 * - async-parallel: Data fetching uses Promise.all in custom hook
 */

// CSS Imports
import './css/inventario-layout.css';
import './css/inventario-table.css';
import './css/inventario-form.css';
import './css/inventario-modal.css';
import './css/inventario-reportes.css';

import { useInventarioData } from './hooks/useInventarioData';

// UI Components
import FilterBar from './components/FilterBar';
import InventarioTable from './components/InventarioTable';
import ReportesTab from './components/ReportesTab';

// Modals
import MaterialModal from './components/modals/MaterialModal';
import LocationModal from './components/modals/LocationModal';
import VerifyModal from './components/modals/VerifyModal';
import ReportModal from './components/modals/ReportModal';
import ReporteDetailModal from './components/modals/ReporteDetailModal';

// Icons
import {
    BackIcon, BoxIcon, PlusIcon,
    InventarioTabIcon, WarningTriangleIcon,
} from './components/Icons';

// ============= MAIN COMPONENT =============
export default function InventarioIndex({ auth }) {
    const inv = useInventarioData(auth);

    return (
        <div className="inventario-layout">
            {/* Fondo degradado animado del módulo */}
            <div className="inventario-bg" />

            <div className="inventario-container">
                {/* ====== HEADER ====== */}
                <header className="module-header">
                    <div className="module-title">
                        <button onClick={inv.goBack} className="btn-back">
                            {BackIcon}
                            Volver
                        </button>
                        <div className="title-icon-wrapper">
                            {BoxIcon}
                        </div>
                        <h1>INVENTARIO DE MATERIALES</h1>
                    </div>
                </header>

                {/* ====== MAIN CONTENT ====== */}
                <main className="module-content">
                    {/* Tabs */}
                    <div className="tabs-container">
                        <button
                            onClick={() => inv.setCurrentTab('inventario')}
                            className={`tab-button${inv.currentTab === 'inventario' ? ' tab-active' : ''}`}
                        >
                            {InventarioTabIcon}
                            Inventario
                            <span className="badge-pill badge-success">{inv.filteredItems.length}</span>
                        </button>
                        <button
                            onClick={() => inv.setCurrentTab('reportes')}
                            className={`tab-button tab-reportes${inv.currentTab === 'reportes' ? ' tab-active' : ''}`}
                        >
                            {WarningTriangleIcon}
                            Reportes
                            {inv.pendingReportesCount > 0 && (
                                <span className="badge-pill badge-danger">{inv.pendingReportesCount}</span>
                            )}
                        </button>
                    </div>

                    {/* ====== TAB: INVENTARIO ====== */}
                    <div className={inv.currentTab === 'inventario' ? 'block' : 'hidden'}>
                        <FilterBar
                            searchQuery={inv.searchQuery}
                            onSearchChange={inv.setSearchQuery}
                            filterCategory={inv.filterCategory}
                            onCategoryChange={inv.setFilterCategory}
                            filterStatus={inv.filterStatus}
                            onStatusChange={inv.setFilterStatus}
                            onAddClick={() => inv.openModal()}
                        />
                        <InventarioTable
                            filteredItems={inv.filteredItems}
                            openMenuId={inv.openMenuId}
                            setOpenMenuId={inv.setOpenMenuId}
                            openReportModal={inv.openReportModal}
                            verifyProduct={inv.verifyProduct}
                            openModal={inv.openModal}
                            deleteProduct={inv.deleteProduct}
                        />
                    </div>

                    {/* ====== TAB: REPORTES ====== */}
                    <div className={inv.currentTab === 'reportes' ? 'block' : 'hidden'}>
                        <ReportesTab
                            reportes={inv.reportes}
                            filteredReportes={inv.filteredReportes}
                            filterReporteEstado={inv.filterReporteEstado}
                            setFilterReporteEstado={inv.setFilterReporteEstado}
                            openReporteDetail={inv.openReporteDetail}
                        />
                    </div>
                </main>
            </div>

            {/* ====== MODALS (per bundle-dynamic-imports — rendered via createPortal) ====== */}
            {inv.showModal && (
                <MaterialModal
                    form={inv.form}
                    updateForm={inv.updateForm}
                    computedLocationCode={inv.computedLocationCode}
                    isEditing={inv.isEditing}
                    saveMaterial={inv.saveMaterial}
                    closeModal={inv.closeModal}
                />
            )}

            {inv.showLocationModal && (
                <LocationModal
                    selectedReservedItem={inv.selectedReservedItem}
                    locationForm={inv.locationForm}
                    updateLocationForm={inv.updateLocationForm}
                    computedReservedLocationCode={inv.computedReservedLocationCode}
                    saveLocation={inv.saveLocation}
                    closeLocationModal={inv.closeLocationModal}
                />
            )}

            {inv.showVerifyModal && (
                <VerifyModal
                    verifyingProduct={inv.verifyingProduct}
                    currentUserName={inv.currentUserName}
                    confirmVerify={inv.confirmVerify}
                    closeVerifyModal={inv.closeVerifyModal}
                />
            )}

            {inv.showReportModal && (
                <ReportModal
                    reportingProduct={inv.reportingProduct}
                    reportMotivo={inv.reportMotivo}
                    setReportMotivo={inv.setReportMotivo}
                    confirmReport={inv.confirmReport}
                    closeReportModal={inv.closeReportModal}
                />
            )}

            {inv.showReporteDetailModal && (
                <ReporteDetailModal
                    selectedReporte={inv.selectedReporte}
                    solucionReporte={inv.solucionReporte}
                    setSolucionReporte={inv.setSolucionReporte}
                    cambiarEstadoReporte={inv.cambiarEstadoReporte}
                    eliminarReporte={inv.eliminarReporte}
                    closeReporteDetail={inv.closeReporteDetail}
                />
            )}
        </div>
    );
}

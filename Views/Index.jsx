/**
 * INVENTARIO — Index.jsx (Orchestrator)
 *
 * Slim entry component that composes hooks, UI components, and modals.
 * All business logic lives in hooks/useInventarioData.
 * All SVG icons live in components/Icons.jsx.
 * All CSS is split into modular files under css/.
 *
 * Per Vercel React best practices:
 * - bundle-barrel-imports: Direct imports, no barrel re-exports
 * - rerender-memo: Extracted heavy sections into their own components
 * - rendering-hoist-jsx: All static JSX (icons) hoisted outside
 * - async-parallel: Data fetching uses Promise.all in custom hook
 */
import { useDarkMode } from './hooks/useDarkMode';
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
    BackIcon, BoxIcon, SunIcon, MoonIcon, PlusIcon,
    InventarioTabIcon, WarningTriangleIcon,
} from './components/Icons';

// CSS — theme + modular styles
import './inventario_theme.css';
import './css/inventario-base.css';
import './css/inventario-table.css';
import './css/inventario-modals.css';
import './css/inventario-reportes.css';

// ============= MAIN COMPONENT =============
export default function InventarioIndex({ auth }) {
    const { toggleDarkMode } = useDarkMode();

    const inv = useInventarioData(auth);

    return (
        <div className="marketplace-layout">
            <div className="inventario-bg" />

            <div className="marketplace-container">
                {/* ====== HEADER ====== */}
                <header className="module-header">
                    <div className="header-left">
                        <button onClick={inv.goBack} className="btn-primary btn-back">
                            {BackIcon}
                            Volver
                        </button>
                        <h1>
                            {BoxIcon}
                            INVENTARIO DE MATERIALES
                        </h1>
                    </div>
                    <div className="header-right">
                        <button onClick={toggleDarkMode} className="theme-toggle" title="Cambiar tema">
                            {SunIcon}
                            {MoonIcon}
                        </button>
                        <button className="btn-primary" onClick={() => inv.openModal()}>
                            {PlusIcon}
                            Nuevo Material
                        </button>
                    </div>
                </header>

                {/* ====== MAIN CONTENT ====== */}
                <main className="module-content">
                    {/* Tabs */}
                    <div className="tabs-nav">
                        <button
                            onClick={() => inv.setCurrentTab('inventario')}
                            className={`tab-btn${inv.currentTab === 'inventario' ? ' is-active' : ''}`}
                        >
                            {InventarioTabIcon}
                            Inventario
                            <span className="tab-badge">{inv.filteredItems.length}</span>
                        </button>
                        <button
                            onClick={() => inv.setCurrentTab('reportes')}
                            className={`tab-btn tab-btn--reportes${inv.currentTab === 'reportes' ? ' is-active' : ''}`}
                        >
                            {WarningTriangleIcon}
                            Reportes
                            {inv.pendingReportesCount > 0 && (
                                <span className="tab-badge tab-badge--alert">{inv.pendingReportesCount}</span>
                            )}
                        </button>
                    </div>

                    {/* ====== TAB: INVENTARIO ====== */}
                    <div className="tab-content" style={{ display: inv.currentTab === 'inventario' ? 'block' : 'none' }}>
                        <FilterBar
                            searchQuery={inv.searchQuery}
                            onSearchChange={inv.setSearchQuery}
                            filterCategory={inv.filterCategory}
                            onCategoryChange={inv.setFilterCategory}
                            filterStatus={inv.filterStatus}
                            onStatusChange={inv.setFilterStatus}
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
                    <div className="tab-content" style={{ display: inv.currentTab === 'reportes' ? 'block' : 'none' }}>
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

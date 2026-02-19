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

// Tailwind tokens
import {
    LAYOUT_CLASSES, HEADER_CLASSES, TAB_CLASSES, BUTTON_CLASSES,
} from './tokens';

// ============= MAIN COMPONENT =============
export default function InventarioIndex({ auth }) {
    const inv = useInventarioData(auth);

    return (
        <div className={LAYOUT_CLASSES.viewport}>
            {/* Fondo degradado animado del módulo */}
            <div className={LAYOUT_CLASSES.bg} />

            <div className={LAYOUT_CLASSES.container}>
                {/* ====== HEADER ====== */}
                <header className={HEADER_CLASSES.wrapper}>
                    <div className={HEADER_CLASSES.left}>
                        <button onClick={inv.goBack} className={BUTTON_CLASSES.back}>
                            {BackIcon}
                            Volver
                        </button>
                        <h1 className={HEADER_CLASSES.title}>
                            <span className={HEADER_CLASSES.title_icon}>{BoxIcon}</span>
                            INVENTARIO DE MATERIALES
                        </h1>
                    </div>
                </header>

                {/* ====== MAIN CONTENT ====== */}
                <main className={LAYOUT_CLASSES.content}>
                    {/* Tabs */}
                    <div className={TAB_CLASSES.nav}>
                        <button
                            onClick={() => inv.setCurrentTab('inventario')}
                            className={`${TAB_CLASSES.btn}${inv.currentTab === 'inventario' ? ` ${TAB_CLASSES.btn_active}` : ''}`}
                        >
                            {InventarioTabIcon}
                            Inventario
                            <span className={TAB_CLASSES.badge}>{inv.filteredItems.length}</span>
                        </button>
                        <button
                            onClick={() => inv.setCurrentTab('reportes')}
                            className={`${TAB_CLASSES.btn} ${TAB_CLASSES.btn_reportes}${inv.currentTab === 'reportes' ? ` ${TAB_CLASSES.btn_reportes_active}` : ''}`}
                        >
                            {WarningTriangleIcon}
                            Reportes
                            {inv.pendingReportesCount > 0 && (
                                <span className={`${TAB_CLASSES.badge} ${TAB_CLASSES.badge_alert}`}>{inv.pendingReportesCount}</span>
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

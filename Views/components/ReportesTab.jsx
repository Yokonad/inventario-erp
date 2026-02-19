import { formatDate } from '../utils/helpers';
import { DocLinesIcon, EyeIcon, ClockIcon } from './Icons';
import { reporteBadgeClass } from './utils/classHelpers';

/**
 * Reportes tab with filter buttons and report table.
 * Per rerender-memo — isolated from inventory tab to reduce re-renders.
 * Styles: CSS via inventario-reportes.css
 */
export default function ReportesTab({
    reportes,
    filteredReportes,
    filterReporteEstado, setFilterReporteEstado,
    openReporteDetail,
}) {
    if (reportes.length === 0) {
        return (
            <div className="reportes-container">
                <div className="reportes-empty">
                    {ClockIcon}
                    <h3>Sin Reportes</h3>
                    <p>No hay reportes de materiales registrados</p>
                </div>
            </div>
        );
    }

    return (
        <div className="reportes-container">
            <div className="reportes-header">
                <h3 className="reportes-title">
                    {DocLinesIcon}
                    Reportes de Materiales
                </h3>
                <div className="reportes-filters">
                    <button
                        onClick={() => setFilterReporteEstado('')}
                        className={`reportes-filter-btn${filterReporteEstado === '' ? ' active' : ''}`}
                    >
                        Todos
                        <span className="reportes-filter-badge">{reportes.length}</span>
                    </button>
                    <button
                        onClick={() => setFilterReporteEstado('pendiente')}
                        className={`reportes-filter-btn pending${filterReporteEstado === 'pendiente' ? ' active' : ''}`}
                    >
                        Pendientes
                        <span className="reportes-filter-badge">{reportes.filter((r) => r.estado === 'pendiente').length}</span>
                    </button>
                    <button
                        onClick={() => setFilterReporteEstado('revisado')}
                        className={`reportes-filter-btn reviewed${filterReporteEstado === 'revisado' ? ' active' : ''}`}
                    >
                        Revisados
                        <span className="reportes-filter-badge">{reportes.filter((r) => r.estado === 'revisado').length}</span>
                    </button>
                    <button
                        onClick={() => setFilterReporteEstado('resuelto')}
                        className={`reportes-filter-btn resolved${filterReporteEstado === 'resuelto' ? ' active' : ''}`}
                    >
                        Resueltos
                        <span className="reportes-filter-badge">{reportes.filter((r) => r.estado === 'resuelto').length}</span>
                    </button>
                </div>
            </div>

            <div className="reportes-table-wrapper">
                <table className="reportes-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Proyecto</th>
                            <th>Motivo</th>
                            <th>Reportado por</th>
                            <th>Fecha</th>
                            <th className="text-center">Estado</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReportes.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center" style={{ paddingTop: '40px', paddingBottom: '40px', color: '#94a3b8' }}>
                                    No hay reportes para este estado
                                </td>
                            </tr>
                        ) : (
                            filteredReportes.map((reporte) => (
                                <tr key={reporte.id} onClick={() => openReporteDetail(reporte)}>
                                    <td>
                                        <div className="reportes-cell-producto">
                                            <div className="reportes-cell-nombre">{reporte.producto_nombre}</div>
                                            <div className="reportes-cell-sku">{reporte.producto_sku}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="reportes-cell-proyecto">{reporte.proyecto_nombre}</span>
                                    </td>
                                    <td>
                                        <div className="reportes-cell-motivo">{reporte.motivo}</div>
                                    </td>
                                    <td>{reporte.reportado_por}</td>
                                    <td>
                                        <div className="reportes-cell-fecha">{formatDate(reporte.created_at)}</div>
                                    </td>
                                    <td className="text-center">
                                        <span className={`reportes-badge-estado reportes-badge-${reporte.estado}`}>
                                            {reporte.estado === 'pendiente' ? 'Pendiente' : reporte.estado === 'revisado' ? 'Revisado' : 'Resuelto'}
                                        </span>
                                    </td>
                                    <td className="text-center" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => openReporteDetail(reporte)}
                                            title="Ver detalles"
                                            className="reportes-action-btn"
                                        >
                                            {EyeIcon}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

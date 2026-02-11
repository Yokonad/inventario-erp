import { formatDate } from '../utils/helpers';
import { DocLinesIcon, EyeIcon, ClockIcon } from './Icons';

/**
 * Reportes tab with filter buttons and report table.
 * Per rerender-memo — isolated from inventory tab to reduce re-renders.
 */
export default function ReportesTab({
    reportes,
    filteredReportes,
    filterReporteEstado, setFilterReporteEstado,
    openReporteDetail,
}) {
    return (
        <div className="table-card">
            <div className="reportes-header">
                <h3 className="reportes-title">
                    {DocLinesIcon}
                    Reportes de Materiales
                </h3>
                <div className="reportes-filters">
                    <button
                        onClick={() => setFilterReporteEstado('')}
                        className={`filter-estado-btn${filterReporteEstado === '' ? ' is-active' : ''}`}
                    >
                        Todos
                        <span className="filter-badge">{reportes.length}</span>
                    </button>
                    <button
                        onClick={() => setFilterReporteEstado('pendiente')}
                        className={`filter-estado-btn filter-estado-btn--pending${filterReporteEstado === 'pendiente' ? ' is-active' : ''}`}
                    >
                        Pendientes
                        <span className="filter-badge">{reportes.filter((r) => r.estado === 'pendiente').length}</span>
                    </button>
                    <button
                        onClick={() => setFilterReporteEstado('revisado')}
                        className={`filter-estado-btn filter-estado-btn--reviewed${filterReporteEstado === 'revisado' ? ' is-active' : ''}`}
                    >
                        Revisados
                        <span className="filter-badge">{reportes.filter((r) => r.estado === 'revisado').length}</span>
                    </button>
                    <button
                        onClick={() => setFilterReporteEstado('resuelto')}
                        className={`filter-estado-btn filter-estado-btn--resolved${filterReporteEstado === 'resuelto' ? ' is-active' : ''}`}
                    >
                        Resueltos
                        <span className="filter-badge">{reportes.filter((r) => r.estado === 'resuelto').length}</span>
                    </button>
                </div>
            </div>

            <table className="inventory-table">
                <thead className="table-head">
                    <tr>
                        <th className="table-head-cell">Producto</th>
                        <th className="table-head-cell">Proyecto</th>
                        <th className="table-head-cell">Motivo</th>
                        <th className="table-head-cell">Reportado por</th>
                        <th className="table-head-cell">Fecha</th>
                        <th className="table-head-cell is-center">Estado</th>
                        <th className="table-head-cell is-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReportes.map((reporte) => (
                        <tr key={reporte.id} className="table-row table-row--clickable" onClick={() => openReporteDetail(reporte)}>
                            <td className="table-cell">
                                <div className="product-name">{reporte.producto_nombre}</div>
                                <div className="product-sku">{reporte.producto_sku}</div>
                            </td>
                            <td className="table-cell">
                                <span className="project-badge">{reporte.proyecto_nombre}</span>
                            </td>
                            <td className="table-cell">
                                <div className="reporte-motivo">{reporte.motivo}</div>
                            </td>
                            <td className="table-cell">{reporte.reportado_por}</td>
                            <td className="table-cell">
                                <div className="reporte-date">{formatDate(reporte.created_at)}</div>
                            </td>
                            <td className="table-cell is-center">
                                <span
                                    className={`status-badge${reporte.estado === 'pendiente' ? ' pending' : reporte.estado === 'revisado' ? ' reviewed' : ' approved'}`}
                                >
                                    {reporte.estado === 'pendiente' ? 'Pendiente' : reporte.estado === 'revisado' ? 'Revisado' : 'Resuelto'}
                                </span>
                            </td>
                            <td className="table-cell is-center" onClick={(e) => e.stopPropagation()}>
                                <div className="action-buttons">
                                    <button onClick={() => openReporteDetail(reporte)} title="Ver detalles" className="action-btn action-btn--view">
                                        {EyeIcon}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filteredReportes.length === 0 && (
                        <tr>
                            <td colSpan="7" className="table-cell is-center" style={{ padding: 40, color: 'var(--text-gray)' }}>
                                {ClockIcon}
                                No hay reportes {filterReporteEstado ? `con estado "${filterReporteEstado}"` : 'registrados'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

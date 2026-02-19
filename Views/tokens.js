// ════════════════════════════════════════════════════════════════
// ESTILOS TAILWIND — MÓDULO INVENTARIO
// Color: blue-500 (#4A90E2)
// Módulo: inventario_krsft v3.4.0
// ════════════════════════════════════════════════════════════════

// SECCIÓN 1: COLORES (Del módulo — extraídos de inventario_theme.css)
export const COLORS = {
    // Color principal del módulo Inventario
    primary: 'blue-500',            // #4A90E2 (inventario_theme.css --inventario-primary)
    primary_light: 'blue-100',      // Fondo suave azul

    // Grises estándar (IGUALES en todos los módulos)
    gray_50: 'gray-50',             // #f9fafb
    gray_100: 'gray-100',           // #f3f4f6
    gray_200: 'gray-200',           // #e5e7eb
    gray_300: 'gray-300',           // #d1d5db (borders)
    gray_400: 'gray-400',           // #9ca3af
    gray_500: 'gray-500',           // #6b7280 (text-muted)
    gray_600: 'gray-600',           // #475569 (labels)
    gray_700: 'gray-700',           // #374151
    gray_900: 'gray-900',           // #1e293b (text-dark)

    // Estados
    error: 'red-500',               // #ef4444
    success: 'green-500',           // #22c55e / #10b981
    warning: 'yellow-500',          // #f59e0b
    info: 'blue-400',               // Info

    // Colores de badges de estado (del módulo)
    badge_success_bg: 'green-100',
    badge_success_text: 'green-600',
    badge_warning_bg: 'yellow-100',
    badge_warning_text: 'yellow-600',
    badge_danger_bg: 'red-100',
    badge_danger_text: 'red-500',
};

// SECCIÓN 2: ESPACIOS (UNIFORME en todos)
export const SPACING = {
    xs: '2',    // 8px
    sm: '3',    // 12px
    md: '4',    // 16px
    lg: '6',    // 24px
    xl: '8',    // 32px
};

// SECCIÓN 3: BORDER RADIUS
export const RADIUS = {
    sm: 'rounded-md',      // 6px (inventario-radius-sm)
    md: 'rounded-lg',      // 8px (inventario-radius-md)
    lg: 'rounded-xl',      // 12px (inventario-radius-lg)
    xl: 'rounded-2xl',     // 16px (inventario-radius-xl)
    full: 'rounded-full',  // 9999px
};

// SECCIÓN 4: SOMBRAS
export const SHADOWS = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
};

// SECCIÓN 5: ICONOS
export const ICON_CLASSES = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-12 h-12',
};

// SECCIÓN 6: CLASES COMPLEJAS — LAYOUT
export const LAYOUT_CLASSES = {
    // Viewport completo con fondo degradado del módulo
    viewport: 'relative w-screen h-screen overflow-hidden',
    // Fondo animado del módulo (gradiente azul)
    bg: 'absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600 z-0',
    // Contenedor principal flotante con márgenes para mostrar el fondo
    container: 'relative z-10 flex flex-col h-full max-w-[98%] max-h-[96%] m-auto bg-white rounded-2xl shadow-2xl overflow-hidden',
    // Contenido scrollable
    content: 'flex-1 overflow-y-auto overflow-x-hidden scrollbar-none p-8',
};

// SECCIÓN 7: CLASES COMPLEJAS — HEADER
export const HEADER_CLASSES = {
    wrapper: 'flex items-center justify-between px-8 py-5 border-b-2 border-gray-100 bg-white shrink-0 shadow-sm',
    left: 'flex items-center gap-6',
    right: 'flex items-center gap-4',
    title: 'flex items-center gap-3 text-2xl font-extrabold text-gray-900 tracking-tight',
    title_icon: 'text-blue-500 w-7 h-7',
};

// SECCIÓN 8: CLASES COMPLEJAS — TABS
export const TAB_CLASSES = {
    nav: 'flex gap-2 mb-6 border-b-2 border-gray-100 pb-0',
    btn: 'inline-flex items-center gap-2.5 px-6 py-3.5 bg-transparent border-0 border-b-[3px] border-transparent text-[0.95rem] font-bold text-gray-500 cursor-pointer transition-all duration-200 -mb-[2px] hover:text-blue-500 hover:bg-blue-50/30 rounded-t-lg',
    btn_active: 'text-blue-600 border-b-blue-500 bg-blue-50/40',
    btn_reportes: 'hover:text-red-500 hover:bg-red-50/30',
    btn_reportes_active: 'text-red-600 border-b-red-500 bg-red-50/40',
    badge: 'inline-flex items-center justify-center min-w-[24px] h-[24px] px-2 bg-green-100 text-green-700 rounded-full text-xs font-bold shadow-sm',
    badge_alert: 'bg-red-100 text-red-600 animate-pulse shadow-sm',
};

// SECCIÓN 9: CLASES COMPLEJAS — BOTONES
export const BUTTON_CLASSES = {
    primary: 'inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer border-0',
    secondary: 'inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer border-0',
    danger: 'inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors duration-200 cursor-pointer border-0',
    back: 'inline-flex items-center gap-2.5 px-6 py-2.5 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 border-2 border-blue-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md',
    icon: 'p-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-blue-500 transition-all duration-200 cursor-pointer',
    theme_toggle: 'p-2 rounded-lg border border-gray-300 bg-transparent cursor-pointer transition-colors duration-200',
};

// SECCIÓN 10: CLASES COMPLEJAS — FILTROS
export const FILTER_CLASSES = {
    bar: 'flex flex-wrap items-end gap-4 p-5 mb-6 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-200 shadow-sm',
    field: 'min-w-[160px] flex-1',
    field_search: 'flex-[2] min-w-[260px]',
    field_action: 'flex flex-col justify-end min-w-0',
    label: 'block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider',
    input_wrapper: 'relative',
    input: 'w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-gray-400 font-medium',
    select: 'w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium cursor-pointer',
    search_icon: 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5',
    add_btn: 'inline-flex items-center gap-2 h-[48px] px-6 bg-blue-500 text-white font-bold text-sm rounded-lg hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap cursor-pointer border-0',
};

// SECCIÓN 11: CLASES COMPLEJAS — TABLA
export const TABLE_CLASSES = {
    card: 'bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden',
    table: 'w-full border-collapse',
    head: 'bg-gradient-to-r from-gray-50 to-blue-50/40 border-b-2 border-gray-200',
    head_cell: 'px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider',
    head_cell_center: 'px-6 py-4 text-center text-xs font-extrabold text-gray-500 uppercase tracking-wider',
    row: 'border-b border-gray-100 transition-all duration-150 hover:bg-blue-50/30',
    row_apartado: 'bg-yellow-50/60',
    row_clickable: 'cursor-pointer',
    cell: 'px-6 py-4 text-sm text-gray-700',
    cell_center: 'px-6 py-4 text-sm text-gray-700 text-center',
    product_name: 'font-bold text-gray-900 text-base',
    product_sku: 'text-xs text-gray-400 mt-1 font-mono',
    text_muted: 'text-gray-400',
};

// SECCIÓN 12: CLASES COMPLEJAS — BADGES
export const BADGE_CLASSES = {
    // Apartado
    apartado: 'inline-flex items-center gap-1.5 bg-yellow-500 text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase shadow-sm',
    // Proyecto pill (color dinámico via inline style)
    project_pill: 'inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide shadow-md',
    // Estado
    pending: 'inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-yellow-100 text-yellow-700 border-2 border-yellow-300 shadow-sm',
    approved: 'inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-green-100 text-green-700 border-2 border-green-300 shadow-sm',
    rejected: 'inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-100 text-red-600 border-2 border-red-300 shadow-sm',
    reviewed: 'inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700 border-2 border-blue-300 shadow-sm',
    // Verificación
    verified: 'inline-block text-sm font-bold text-green-700 px-3 py-1.5 bg-green-50 rounded-lg border-2 border-green-200 shadow-sm',
    // Ubicación
    location_code: 'font-mono font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border-2 border-dashed border-blue-400 text-sm shadow-sm',
    location_code_lg: 'font-mono font-extrabold text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-md border-2 border-dashed border-blue-400 text-lg shadow-sm',
    location_code_xl: 'font-mono font-extrabold text-blue-600 bg-blue-50 px-4 py-2 rounded-md border-2 border-dashed border-blue-400 text-xl tracking-widest shadow-sm',
    // Pending info
    pending_info: 'inline-flex items-center gap-1.5 text-yellow-600 font-bold text-sm',
};

// SECCIÓN 13: CLASES COMPLEJAS — MENÚ DE ACCIONES
export const ACTION_MENU_CLASSES = {
    wrapper: 'relative inline-block',
    trigger: 'inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white border-2 border-gray-200 text-gray-700 cursor-pointer hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md',
    dropdown: 'absolute right-0 top-[calc(100%+8px)] bg-white border-2 border-gray-200 rounded-xl shadow-xl min-w-[200px] z-[1000] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200',
    item: 'flex items-center gap-3 w-full px-4 py-3 bg-transparent border-0 text-gray-700 text-left cursor-pointer text-sm font-semibold transition-all duration-150',
    item_report: 'hover:bg-yellow-50 hover:text-yellow-600 hover:pl-5',
    item_verify: 'hover:bg-green-50 hover:text-green-600 hover:pl-5',
    item_edit: 'hover:bg-blue-50 hover:text-blue-600 hover:pl-5',
    item_delete: 'hover:bg-red-50 hover:text-red-600 hover:pl-5',
};

// SECCIÓN 14: CLASES COMPLEJAS — MODALES
export const MODAL_CLASSES = {
    overlay: 'fixed inset-0 bg-slate-900/45 z-[100] flex justify-center items-center backdrop-blur-[4px]',
    card: 'bg-white w-[600px] max-w-[90%] rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300',
    card_compact: 'bg-white w-[500px] max-w-[90%] rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300',
    card_large: 'bg-white w-[90%] max-w-[750px] max-h-[88vh] overflow-y-auto rounded-2xl shadow-xl animate-in slide-in-from-bottom-5 duration-300',
    header: 'flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gray-50',
    header_warning: 'flex items-center justify-between px-6 py-5 bg-yellow-500',
    header_text: 'flex flex-col gap-1.5',
    title: 'text-xl font-bold text-gray-900 flex items-center gap-2.5 m-0',
    title_warning: 'text-xl font-bold text-white flex items-center gap-2.5 m-0',
    subtitle: 'text-sm text-gray-500 m-0',
    body: 'p-6',
    footer: 'flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50',
    // Modal de reporte (centrado, sin card estándar)
    report: 'bg-white w-[420px] max-w-[90%] rounded-2xl shadow-xl p-8 text-center animate-in zoom-in-95 duration-300',
    report_icon: 'flex justify-center mb-4',
    report_title: 'text-xl font-bold text-gray-900 mb-1',
    report_subtitle: 'text-sm text-gray-500 mb-5',
    report_product: 'bg-gray-50 rounded-xl p-4 mb-5 text-left border border-gray-200',
    report_product_name: 'font-semibold text-gray-900 text-base',
    report_product_project: 'text-sm text-gray-500 mt-1',
    report_actions: 'flex gap-3 justify-center mt-5',
    // Modal de verificación
    verify: 'bg-white w-[380px] max-w-[90%] rounded-2xl shadow-xl p-8 text-center animate-in zoom-in-95 duration-300',
    verify_icon: 'flex justify-center mb-4',
    verify_title: 'text-xl font-bold text-gray-900 mb-2',
    verify_text: 'text-sm text-gray-500 mb-2',
    verify_product: 'font-bold text-gray-900 text-base mb-4',
    verify_user: 'inline-flex items-center gap-2 text-sm text-gray-500 mb-6',
    verify_actions: 'flex gap-3 justify-center',
};

// SECCIÓN 15: CLASES COMPLEJAS — FORMULARIOS
export const FORM_CLASSES = {
    group: 'mb-4',
    group_spaced: 'mb-4',
    row: 'flex gap-4 mb-3',
    row_compact: 'flex gap-3 mb-3',
    label: 'block text-sm font-semibold text-gray-600 mb-1',
    label_small: 'block text-xs font-semibold text-gray-500 mb-1',
    section_title: 'text-xs font-bold text-gray-400 uppercase tracking-wide mb-2.5',
    section_title_border: 'text-xs font-bold text-gray-400 uppercase tracking-wide mb-2.5 border-t border-gray-200 pt-5',
};

// SECCIÓN 16: CLASES COMPLEJAS — INPUTS
export const INPUT_CLASSES = {
    base: 'w-full px-3 py-2.5 rounded-lg border-[1.5px] border-gray-300 bg-white text-gray-900 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400',
    compact: 'w-full px-2.5 py-2 rounded-md border-[1.5px] border-gray-300 bg-white text-gray-900 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
    textarea: 'w-full px-3 py-2.5 rounded-lg border-[1.5px] border-gray-300 bg-white text-gray-900 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400 resize-none',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-200',
    disabled: 'bg-gray-100 cursor-not-allowed opacity-60',
};

// SECCIÓN 17: CLASES COMPLEJAS — ZNP (Sistema de ubicación)
export const ZNP_CLASSES = {
    box: 'bg-blue-50/60 rounded-xl p-4 border border-blue-100 mb-4',
    box_spaced: 'bg-blue-50/60 rounded-xl p-4 border border-blue-100 mb-4 mt-2',
    preview: 'mt-3 text-center',
    preview_label: 'text-xs text-gray-400 mb-1',
};

// SECCIÓN 18: CLASES COMPLEJAS — REPORTES TAB
export const REPORTES_CLASSES = {
    header: 'flex items-center justify-between px-5 py-4 border-b border-gray-100',
    title: 'flex items-center gap-2 text-base font-bold text-gray-900',
    filters: 'flex gap-2',
    filter_btn: 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-500 bg-transparent border border-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-50',
    filter_btn_active: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600',
    filter_btn_pending: 'hover:text-yellow-600 hover:border-yellow-300',
    filter_btn_pending_active: 'bg-yellow-500 text-white border-yellow-500',
    filter_btn_reviewed: 'hover:text-blue-500 hover:border-blue-300',
    filter_btn_reviewed_active: 'bg-blue-500 text-white border-blue-500',
    filter_btn_resolved: 'hover:text-green-600 hover:border-green-300',
    filter_btn_resolved_active: 'bg-green-500 text-white border-green-500',
    filter_badge: 'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-white/30 rounded-full text-xs font-bold',
    empty_cell: 'text-center p-10 text-gray-400',
};

// SECCIÓN 19: CLASES COMPLEJAS — DETAIL MODAL (Reportes)
export const DETAIL_CLASSES = {
    section: 'mb-5',
    grid: 'grid grid-cols-2 gap-4',
    item: 'flex flex-col gap-1',
    label: 'text-xs font-semibold text-gray-400 uppercase tracking-wide',
    value: 'text-sm text-gray-900 font-medium',
    value_code: 'font-mono font-bold text-blue-500',
    actions: 'flex gap-3 flex-wrap',
    btn_resolve: 'inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 cursor-pointer border-0',
    btn_delete: 'inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200 cursor-pointer border-0',
    btn_cancel: 'inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer border-0',
};

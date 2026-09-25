// ============================================
// BASE DE PROYECTOS
// Para agregar uno nuevo: copiá un objeto y editalo.
// El campo "icono" acepta hasta 2-3 letras.
// "variante" controla el color del gradiente:
//   1 = naranja→magenta   (por defecto)
//   2 = magenta→violeta
//   3 = violeta→naranja
// ============================================
const PROYECTOS = [
  {
    nombre: "Planillas de Obra Social",
    descripcion: "Gestión y carga de planillas para obras sociales.",
    url: "https://tiagoraminelli.github.io/planillas-de-obra-social-/",
    lenguaje: "JavaScript",
    actualizado: "Hace 1 semana",
    icono: "OS",
    variante: 1
  },
  {
    nombre: "Planilla de Viáticos",
    descripcion: "Registro y control de viáticos del personal.",
    url: "https://tiagoraminelli.github.io/viaticos/",
    lenguaje: "JavaScript",
    actualizado: "Hace 2 días",
    icono: "V",
    variante: 2
  },
  {
    nombre: "Planilla de Pedidos",
    descripcion: "Sistema de pedidos y seguimiento.",
    url: "https://tiagoraminelli.github.io/pedidos/",
    lenguaje: "JavaScript",
    actualizado: "Hace 4 días",
    icono: "P",
    variante: 3
  },
  {
    nombre: "Tickets de Laboratorio",
    descripcion: "Solicitud e impresión de análisis clínicos.",
    url: "https://tiagoraminelli.github.io/TICKETS-DE-LABORATORIO/",
    lenguaje: "HTML",
    actualizado: "Hace 1 semana",
    icono: "TL",
    variante: 1
  },
  {
    nombre: "Proyecto P.A.M.I",
    descripcion: "Sistema para gestión PAMI.",
    url: "https://tiagoraminelli.github.io/PROYECTO-P.A.M.I/",
    lenguaje: "JavaScript",
    actualizado: "Hace 3 días",
    icono: "PA",
    variante: 2
  },
  {
    nombre: "Creador de Notas",
    descripcion: "Herramientas para gestión judicial.",
    url: "https://tiagoraminelli.github.io/PROYECTO-JUICIO/",
    lenguaje: "CSS",
    actualizado: "Ayer",
    icono: "PJ",
    variante: 3
  },
  {
    nombre: "Tickets Médicos",
    descripcion: "Emisión de tickets y comprobantes médicos.",
    url: "https://tiagoraminelli.github.io/TICKETS-MEDIC/",
    lenguaje: "HTML",
    actualizado: "Reciente",
    icono: "TM",
    variante: 1
  }
];

// ============================================
// UTILIDADES
// ============================================
function escapeHtml(s){
  if (s === undefined || s === null) return '';
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function normalizar(s){
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// ============================================
// RENDER
// ============================================
function renderProyectos(lista){
  const grid = document.getElementById('gridProyectos');
  const vacio = document.getElementById('sinResultados');

  if (lista.length === 0){
    grid.innerHTML = '';
    vacio.hidden = false;
    return;
  }
  vacio.hidden = true;

  grid.innerHTML = lista.map(p => {
    const varianteClass = p.variante === 2 ? 'v2' : p.variante === 3 ? 'v3' : '';
    return `
      <a class="card" href="${escapeHtml(p.url)}" target="_blank" rel="noopener">
        <div class="card-head">
          <div class="card-icon ${varianteClass}">${escapeHtml(p.icono || '')}</div>
          <div class="card-title">${escapeHtml(p.nombre)}</div>
        </div>
        <div class="card-desc">${escapeHtml(p.descripcion || '')}</div>
        <div class="card-meta">
          <span class="badge"><span class="dot"></span>${escapeHtml(p.lenguaje || '')}</span>
          <span>${escapeHtml(p.actualizado || '')}</span>
        </div>
      </a>
    `;
  }).join('');
}

// ============================================
// FILTRO
// ============================================
function filtrar(texto){
  const q = normalizar(texto);
  if (!q) return PROYECTOS;

  return PROYECTOS.filter(p => {
    const campos = [
      p.nombre,
      p.descripcion,
      p.lenguaje,
      p.actualizado
    ].map(normalizar).join(' ');
    return campos.includes(q);
  });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  renderProyectos(PROYECTOS);

  const input = document.getElementById('buscador');
  if (input){
    input.addEventListener('input', (e) => {
      renderProyectos(filtrar(e.target.value));
    });
    // Atajo: "/" enfoca el buscador
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input){
        e.preventDefault();
        input.focus();
      }
      if (e.key === 'Escape' && document.activeElement === input){
        input.value = '';
        renderProyectos(PROYECTOS);
        input.blur();
      }
    });
  }
});
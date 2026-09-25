// ============================================
// ESTRUCTURA POR DEPARTAMENTOS
//
// Para agregar una herramienta: sumala al array
// "herramientas" del departamento correspondiente.
//
// Para agregar un departamento nuevo: copiá un
// objeto completo { nombre, descripcion, herramientas }
// y editalo.
//
// "variante": 1 (naranja→magenta) | 2 (magenta→violeta) | 3 (violeta→naranja)
// ============================================
const DEPARTAMENTOS = [
  {
    nombre: "AREAS GENERALES",
    descripcion: "Herramientas para Gestión General del Hospital ",
    herramientas: [
      {
        nombre: "Creador de Notas",
        descripcion: "Herramientas para gestión judicial.",
        url: "https://tiagoraminelli.github.io/PROYECTO-JUICIO/",
        lenguaje: "CSS",
        actualizado: "Ayer",
        icono: "PJ",
        variante: 3
      }
    ]
  },
  {
    nombre: "Consejo Asesor",
    descripcion: "Herramientas de gestión administrativa",
    herramientas: [
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
        nombre: "Planillas de Obra Social",
        descripcion: "Gestión y carga de planillas para obras sociales.",
        url: "https://tiagoraminelli.github.io/planillas-de-obra-social-/",
        lenguaje: "JavaScript",
        actualizado: "Hace 1 semana",
        icono: "OS",
        variante: 1
      }
    ]
  },
  {
    nombre: "Facturación de Obra Social",
    descripcion: "Sistemas de facturación y prestaciones",
    herramientas: [
      {
        nombre: "Proyecto P.A.M.I",
        descripcion: "Sistema para gestión PAMI.",
        url: "https://tiagoraminelli.github.io/PROYECTO-P.A.M.I/",
        lenguaje: "JavaScript",
        actualizado: "Hace 3 días",
        icono: "PA",
        variante: 2
      }
    ]
  },
  {
    nombre: "Laboratorio",
    descripcion: "Solicitudes y análisis clínicos",
    herramientas: [
      {
        nombre: "Tickets de Laboratorio",
        descripcion: "Solicitud e impresión de análisis clínicos.",
        url: "https://tiagoraminelli.github.io/TICKETS-DE-LABORATORIO/",
        lenguaje: "HTML",
        actualizado: "Hace 1 semana",
        icono: "TL",
        variante: 1
      }
    ]
  },
  {
    nombre: "Médicos",
    descripcion: "Emisión de tickets y comprobantes médicos",
    herramientas: [
      {
        nombre: "Tickets Médicos",
        descripcion: "Emisión de tickets y comprobantes médicos.",
        url: "https://tiagoraminelli.github.io/TICKETS-MEDIC/",
        lenguaje: "HTML",
        actualizado: "Reciente",
        icono: "TM",
        variante: 3
      }
    ]
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
// RENDER CARD
// ============================================
function renderCard(h){
  const varianteClass = h.variante === 2 ? 'v2' : h.variante === 3 ? 'v3' : '';
  return `
    <a class="card" href="${escapeHtml(h.url)}" target="_blank" rel="noopener">
      <div class="card-head">
        <div class="card-icon ${varianteClass}">${escapeHtml(h.icono || '')}</div>
        <div class="card-title">${escapeHtml(h.nombre)}</div>
      </div>
      <div class="card-desc">${escapeHtml(h.descripcion || '')}</div>
      <div class="card-meta">
        <span class="badge"><span class="dot"></span>${escapeHtml(h.lenguaje || '')}</span>
        <span>${escapeHtml(h.actualizado || '')}</span>
      </div>
    </a>
  `;
}

// ============================================
// RENDER DEPARTAMENTOS
// ============================================
function renderDepartamentos(filtro){
  const contenido = document.getElementById('contenido');
  const vacio = document.getElementById('sinResultados');

  const q = normalizar(filtro || '');

  const departamentosFiltrados = DEPARTAMENTOS
    .map(dep => {
      const herramientasFiltradas = dep.herramientas.filter(h => {
        if (!q) return true;
        const campos = [
          h.nombre, h.descripcion, h.lenguaje, h.actualizado,
          dep.nombre, dep.descripcion
        ].map(normalizar).join(' ');
        return campos.includes(q);
      });
      return { ...dep, herramientas: herramientasFiltradas };
    })
    .filter(dep => dep.herramientas.length > 0);

  if (departamentosFiltrados.length === 0){
    contenido.innerHTML = '';
    vacio.hidden = false;
    return;
  }
  vacio.hidden = true;

  contenido.innerHTML = departamentosFiltrados.map(dep => {
    const total = dep.herramientas.length;
    const etiqueta = total === 1 ? '1 herramienta' : `${total} herramientas`;

    return `
      <section class="departamento">
        <div class="departamento-head">
          <div class="departamento-marca"></div>
          <div class="departamento-titulo">
            <h2>${escapeHtml(dep.nombre)}</h2>
            ${dep.descripcion ? `<p>${escapeHtml(dep.descripcion)}</p>` : ''}
          </div>
          <div class="departamento-contador">${etiqueta}</div>
        </div>

        <div class="grid">
          ${dep.herramientas.map(h => renderCard(h)).join('')}
        </div>
      </section>
    `;
  }).join('');
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  renderDepartamentos('');

  const input = document.getElementById('buscador');
  if (input){
    input.addEventListener('input', (e) => {
      renderDepartamentos(e.target.value);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input){
        e.preventDefault();
        input.focus();
      }
      if (e.key === 'Escape' && document.activeElement === input){
        input.value = '';
        renderDepartamentos('');
        input.blur();
      }
    });
  }
});

import './style.css'
import Typed from 'typed.js';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faFacebook, faWhatsapp   } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faArrowRight, faArrowDown, faPhone, faCarBurst } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Swal from 'sweetalert2'

import { CountUp } from 'countup.js';


// Agregás los íconos que vas a usar
library.add(faInstagram, faFacebook, faEnvelope, faArrowRight, faArrowDown, faWhatsapp, faPhone, faCarBurst);

// Esto los inyecta automáticamente en el DOM (carga los íconos cuando encuentra el tag <i>)
dom.watch();

 // header

fetch('/components/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;
  }); 

// main
  fetch('/components/main.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('main-container').innerHTML = html;
  });

// sobre nosotros
fetch('/components/sobrenos.html')
.then(res => res.text())
.then(html => {
  document.getElementById('sobrenos-container').innerHTML = html;
      // 🧠 Ahora que el HTML está en el DOM, iniciamos los contadores
      iniciarContadoresCuandoSeanVisibles();
});

// servicios
  fetch('/components/servicios.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('servicios-container').innerHTML = html;
  });

// footer
  fetch('/components/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer-container').innerHTML = html;
        // Una vez insertado el footer, activamos el acordeón
        initFAQAccordion();
  });

  

// FUNCION DONDE TIPEA LOS TEXTOS EN EL MAIN
    function iniciarTyped() {
      const el = document.getElementById("texto-dinamico");
      if (!el) return;
    
      new Typed(el, {
        strings: ["Derecho Penal", "Despidos", "Accidentes Laborales", "Accidentes de Tránsito"],
        typeSpeed: 80,
        backSpeed: 100,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
    }
    
    // Esperar a que el componente esté en el DOM
    const observer = new MutationObserver(() => {
      const el = document.getElementById("texto-dinamico");
      if (el) {
        iniciarTyped();
        observer.disconnect(); // Dejar de observar una vez que lo encuentra
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });




// FUNCION COMPLETA PARA INICIALIZAR EL MAPA EN EL FOOTER
    // Esperar a que el DOM cargue para inicializar el mapa
    function initMap() {
      const mapContainer = document.getElementById('map');
    
      if (!mapContainer) {
        console.log('🛑 No se encontró el div con id="map"');
        return;
      }
    
      console.log('✅ Se encontró el div#map, inicializando mapa...');
    
      const map = L.map('map').setView([-34.7235672, -58.2563502], 17);
    
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
    
      L.marker([-34.7235672, -58.2563502])
        .addTo(map)
        .bindPopup('Lavalle 695, Piso 3 D, Quilmes')
        .openPopup();
    }
    
    
    // Observador del DOM para detectar cuando aparece #map
    const observador = new MutationObserver(() => {
      const mapDiv = document.getElementById('map');
      if (mapDiv) {
        initMap();
        observador.disconnect(); // dejá de observar después de inicializar
      }
    });
    
    observador.observe(document.body, { childList: true, subtree: true });

    

// 🧩 Lógica de animación con IntersectionObserver
function iniciarContadoresCuandoSeanVisibles() {
  const targets = [
    { id: 'clientes', end: 5000, prefix: '+', duration: 4 },
    { id: 'experiencias', end: 25, prefix: '+', duration: 4 },
    { id: 'tasa', end: 97, suffix: '%', duration: 4 }
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      if (entry.isIntersecting && !entry.target.classList.contains('animado')) {
        const targetConfig = targets.find(t => t.id === id);
        if (targetConfig) {
          const { end, prefix = '', suffix = '', duration = 2 } = targetConfig;

          const countUp = new CountUp(id, end, {
            prefix,
            suffix,
            duration,
            separator: '.',
          });

          if (!countUp.error) {
            countUp.start();
            entry.target.classList.add('animado'); // Marcamos como animado
          } else {
            console.error(countUp.error);
          }
        }
      }
    });
  }, { threshold: 0.6 });

  // Observamos cada contador individualmente
  targets.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}



// FUNCIONALIDAD DEL ACORDEÓN
function initFAQAccordion() {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('span');

      const isOpen = !answer.classList.contains('hidden');

      // Toggle respuesta
      answer.classList.toggle('hidden');

      // Cambiar el símbolo + / –
      icon.textContent = isOpen ? '+' : '–';
    });
  });
}


// SWEET ALERT: PORQUE ELEGIRNOS

Swal.fire({
  title: '<strong style=" font-weight: 800; color: #F5E7C6;">¿POR QUÉ ELEGIRNOS?</strong>',
  html: `
    <p style="color: #F5E7C6;  text-transform: uppercase; font-size: 1rem; margin-bottom: 1.2rem;">
      Asistencia legal clara y eficaz.<br>
      Defensa comprometida en cada etapa del proceso.
    </p>
    <button id="saberMasBtn" style="
      background-color: #F5E7C6;
      border: 3px solid black;
      padding: 8px 16px;
      font-family: monospace;
      font-weight: bold;
      border-radius: 0.5rem;
      cursor: pointer;
      box-shadow: 5px 5px 0 black;
      transition: all 0.2s ease;
    ">SABER MÁS</button>
  `,
  showConfirmButton: false,
  background: '#FF6D1F', // Naranja fuerte
  color: '#222',
  customClass: {
    popup: 'rounded-xl p-6',
  },
  didOpen: () => {
    document.getElementById('saberMasBtn').addEventListener('click', () => {
      Swal.close();
      // Podés redirigir o abrir otra modal si querés
    });
  }
});
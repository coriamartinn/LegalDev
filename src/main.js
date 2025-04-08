import './style.css'
import Typed from 'typed.js';
import html from "./components/main.html?raw";
import { setupCounter } from './counter.js'
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { CountUp } from 'countup.js';


// Agregás los íconos que vas a usar
library.add(faInstagram, faFacebook, faEnvelope, faArrowRight, faArrowDown);

// Esto los inyecta automáticamente en el DOM (carga los íconos cuando encuentra el tag <i>)
dom.watch();

// header

fetch('/src/components/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;
  });

// main
  fetch('/src/components/main.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('main-container').innerHTML = html;
  });

// sobre nosotros
fetch('/src/components/sobrenos.html')
.then(res => res.text())
.then(html => {
  document.getElementById('sobrenos-container').innerHTML = html;
      // 🧠 Ahora que el HTML está en el DOM, iniciamos los contadores
      iniciarContadoresCuandoSeanVisibles();
});

// servicios
  fetch('/src/components/servicios.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('servicios-container').innerHTML = html;
  });

// footer
  fetch('/src/components/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer-container').innerHTML = html;
  });


  console.log('Cargando header...');
  fetch('/src/components/header.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('header-container').innerHTML = html;
      console.log('Header cargado con éxito');
    })
    .catch(err => console.error('Error cargando header:', err));
  

  

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
    { id: 'experiencias', end: 30, prefix: '+', duration: 4 },
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


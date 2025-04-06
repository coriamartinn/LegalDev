import './style.css'
import Typed from 'typed.js';
import html from "./components/main.html?raw";
import { setupCounter } from './counter.js'


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
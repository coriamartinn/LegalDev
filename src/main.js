import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


// src/main.js

fetch('/src/components/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;

    // Código para abrir/cerrar menú mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  });


  console.log('Cargando header...');
  fetch('/src/components/header.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('header-container').innerHTML = html;
      console.log('Header cargado con éxito');
    })
    .catch(err => console.error('Error cargando header:', err));
  

  
    
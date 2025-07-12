const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav .menu a');
const sections = document.querySelectorAll('.secao');
const btnVoltarTopo = document.getElementById('btn-voltar-topo');

// Carrega a preferência de tema do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else {
        // Padrão para light-mode se nenhuma preferência for salva
        body.classList.add('light-mode');
    }
    // O ícone do botão de tema NÃO é mais alterado aqui, ele permanece como definido no HTML (lua)
});

// Alterna o tema ao clicar no botão
themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
    // O ícone do botão de tema NÃO é mais alterado aqui
});

// Alternar menu hamburguer
hamburgerMenu.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
    // Adiciona ou remove overflow-hidden no body para evitar scroll quando o menu está aberto
    body.classList.toggle('menu-open');
});

// Fecha o menu ao clicar em um link de navegação (para mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Funcionalidade do botão "Voltar ao topo"
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Mostra o botão após rolar 300px
        btnVoltarTopo.classList.add('show');
    } else {
        btnVoltarTopo.classList.remove('show');
    }
});

btnVoltarTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Link ativo na rolagem
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Ajusta o offset para o cabeçalho
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(current)) {
            link.classList.add('active');
        }
    });
});

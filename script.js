// --- Seletores de Elementos do DOM ---
const menuLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('.secao');
const backToTopBtn = document.getElementById('btn-voltar-topo');
const hamburgerButton = document.querySelector('.hamburger-menu');
const mainNavigation = document.querySelector('.main-nav');
const navbar = document.querySelector('.navbar');
const themeToggleBtn = document.getElementById('theme-toggle'); // Novo: Seleciona o botão de alternar tema
const body = document.body; // Novo: Referência direta ao body

// --- Variáveis de Configuração ---
const SCROLL_OFFSET = 200;
const SCROLL_DURATION_DELAY = 300;
const THEME_STORAGE_KEY = 'theme-preference'; // Chave para salvar a preferência no localStorage

// --- Funções Auxiliares ---

/**
 * Ativa a seção correspondente e o link de menu na navegação.
 * Remove classes 'ativa' e 'active' de todos os elementos e as aplica ao elemento correto.
 * @param {string} sectionId - O ID da seção a ser ativada (ex: 'sobre', 'projetos').
 */
function activateSectionAndNavLink(sectionId) {
    sections.forEach(section => section.classList.remove('ativa'));
    menuLinks.forEach(link => link.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('ativa');
    }

    const targetNavLink = document.querySelector(`.menu a[href="#${sectionId}"]`);
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
}

/**
 * Fecha o menu hambúrguer e atualiza atributos de acessibilidade (ARIA).
 */
function closeHamburgerMenu() {
    mainNavigation.classList.remove('active');
    hamburgerButton.classList.remove('active');
    hamburgerButton.setAttribute('aria-expanded', 'false');
    mainNavigation.setAttribute('aria-hidden', 'true');
}

/**
 * Abre o menu hambúrguer e atualiza atributos de acessibilidade (ARIA).
 */
function openHamburgerMenu() {
    mainNavigation.classList.add('active');
    hamburgerButton.classList.add('active');
    hamburgerButton.setAttribute('aria-expanded', 'true');
    mainNavigation.setAttribute('aria-hidden', 'false');
}

/**
 * Alterna o estado do menu hambúrguer (abrir/fechar) e gerencia a acessibilidade.
 */
function toggleHamburgerMenu() {
    const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
        closeHamburgerMenu();
    } else {
        openHamburgerMenu();
    }
}

/**
 * Aplica o tema especificado ('light' ou 'dark') e salva a preferência.
 * @param {string} theme - 'light' para tema claro, 'dark' para tema escuro.
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone de sol para tema escuro
        themeToggleBtn.setAttribute('aria-label', 'Alternar para tema claro');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone de lua para tema claro
        themeToggleBtn.setAttribute('aria-label', 'Alternar para tema escuro');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme); // Salva a preferência
}

/**
 * Alterna entre o tema claro e escuro.
 */
function toggleTheme() {
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}


// --- Event Listeners ---

// 1. Navegação pelo Menu (Scroll Suave e Ativação de Seção)
menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            
            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });

            setTimeout(() => {
                activateSectionAndNavLink(targetId);
            }, SCROLL_DURATION_DELAY);

            closeHamburgerMenu();
        }
    });
});

// 2. Lógica para o Botão "Voltar ao Topo"
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 3. Detecção de Rolagem (Scroll Handler Principal)
window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_OFFSET) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    let currentActiveSectionId = 'sobre';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 1;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentActiveSectionId = section.id;
        }
    });

    activateSectionAndNavLink(currentActiveSectionId);
});

// 4. Lógica do Menu Hambúrguer (Mobile)
hamburgerButton.addEventListener('click', toggleHamburgerMenu);

// 5. Lógica do Botão de Alternar Tema (Dark/Light Mode)
themeToggleBtn.addEventListener('click', toggleTheme);

// --- Inicialização da Página ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Tenta carregar a preferência de tema do localStorage
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
        applyTheme(savedTheme); // Aplica o tema salvo
    } else {
        // Se não houver preferência salva, verifica a preferência do sistema operacional
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark'); // Se o sistema estiver em modo escuro, aplica dark mode
        } else {
            applyTheme('light'); // Caso contrário, aplica light mode (ou o padrão do HTML)
        }
    }

    // Garante que o menu hambúrguer esteja fechado e com ARIA correto
    closeHamburgerMenu();
    // Ativa a seção "Sobre" e seu link de menu ao carregar a página
    activateSectionAndNavLink('sobre');
});

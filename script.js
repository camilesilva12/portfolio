// --- Seletores de Elementos do DOM ---
const menuLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('.secao'); // Renomeado para 'sections' para clareza
const backToTopBtn = document.getElementById('btn-voltar-topo'); // Renomeado para 'backToTopBtn'
const hamburgerButton = document.querySelector('.hamburger-menu'); // Renomeado para 'hamburgerButton'
const mainNavigation = document.querySelector('.main-nav'); // Renomeado para 'mainNavigation'
const navbar = document.querySelector('.navbar'); // Adicionado para otimizar a busca da navbar height

// --- Variáveis de Configuração ---
const SCROLL_OFFSET = 200; // Posição do scroll para mostrar o botão "Voltar ao Topo"
const SCROLL_DURATION_DELAY = 300; // Atraso para ativar o link após o scroll (em milissegundos)

// --- Funções Auxiliares ---

/**
 * Ativa a seção correspondente e o link de menu na navegação.
 * Remove classes 'ativa' e 'active' de todos os elementos e as aplica ao elemento correto.
 * @param {string} sectionId - O ID da seção a ser ativada (ex: 'sobre', 'projetos').
 */
function activateSectionAndNavLink(sectionId) {
    // Remove a classe 'ativa' de todas as seções
    sections.forEach(section => section.classList.remove('ativa'));
    // Remove a classe 'active' de todos os links do menu
    menuLinks.forEach(link => link.classList.remove('active'));

    // Adiciona a classe 'ativa' à seção correspondente
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('ativa');
    }

    // Adiciona a classe 'active' ao link de menu correspondente
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
    hamburgerButton.setAttribute('aria-expanded', 'false'); // A11y: Menu está fechado
    mainNavigation.setAttribute('aria-hidden', 'true'); // A11y: Menu está oculto para leitores de tela
}

/**
 * Abre o menu hambúrguer e atualiza atributos de acessibilidade (ARIA).
 */
function openHamburgerMenu() {
    mainNavigation.classList.add('active');
    hamburgerButton.classList.add('active');
    hamburgerButton.setAttribute('aria-expanded', 'true'); // A11y: Menu está aberto
    mainNavigation.setAttribute('aria-hidden', 'false'); // A11y: Menu está visível para leitores de tela
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

// --- Event Listeners ---

// 1. Navegação pelo Menu (Scroll Suave e Ativação de Seção)
menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); // Impede o comportamento padrão de salto instantâneo

        const targetId = link.getAttribute('href').substring(1); // Obtém o ID da seção alvo (ex: "sobre" de "#sobre")
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Garante que a altura da navbar seja obtida, prevenindo erro se navbar não existir
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            
            // Rola suavemente até a seção, ajustando pela altura da navbar fixa
            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });

            // Adiciona um pequeno atraso para a classe 'active' ser aplicada
            // Isso garante que a ativação visual ocorra após o início do scroll
            setTimeout(() => {
                activateSectionAndNavLink(targetId);
            }, SCROLL_DURATION_DELAY);

            // Fecha o menu hambúrguer após clicar em um link (útil para mobile/tablets)
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
    // O 'scroll' event listener principal cuidará da ativação do link 'Sobre' quando rolar para o topo.
});

// 3. Detecção de Rolagem (Scroll Handler Principal)
// Esta função é executada a cada rolagem da página para atualizar o estado da navegação
// e a visibilidade do botão "Voltar ao Topo".
window.addEventListener('scroll', () => {
    // Lógica para mostrar/esconder o botão "Voltar ao Topo"
    if (window.scrollY > SCROLL_OFFSET) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    // Lógica para ativar o link do menu com base na posição de scroll
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    let currentActiveSectionId = 'sobre'; // Padrão: 'Sobre' é a seção ativa no topo da página

    // Itera sobre as seções para determinar qual está mais próxima ou visível
    sections.forEach(section => {
        // Ajusta o 'top' da seção para compensar a altura da navbar e um pequeno offset
        // O -1px ajuda a ativar a seção um pouco antes de ela atingir o topo exato
        const sectionTop = section.offsetTop - navbarHeight - 1;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Se a posição de scroll estiver dentro dos limites da seção atual
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentActiveSectionId = section.id;
        }
    });

    // Atualiza a classe 'active' no menu de navegação apenas uma vez
    activateSectionAndNavLink(currentActiveSectionId);
});

// 4. Lógica do Menu Hambúrguer (Mobile)
hamburgerButton.addEventListener('click', toggleHamburgerMenu);

// --- Inicialização da Página ---
// Garante que o estado inicial do menu hambúrguer e dos atributos de acessibilidade estejam corretos,
// e que a seção 'Sobre' esteja ativa ao carregar a página.
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o menu esteja fechado e com os atributos ARIA corretos ao carregar a página
    closeHamburgerMenu();
    // Ativa a seção "Sobre" e seu link de menu ao carregar a página (útil para recargas)
    activateSectionAndNavLink('sobre');
});

// Seletores de elementos
const menuLinks = document.querySelectorAll('.menu a');
const secoes = document.querySelectorAll('.secao');
const btnVoltarTopo = document.getElementById('btn-voltar-topo');
const hamburgerMenu = document.querySelector('.hamburger-menu'); // Novo: Botão hambúrguer
const mainNav = document.querySelector('.main-nav'); // Novo: Navegação principal

// --- Funções Auxiliares ---

// Função para ativar uma seção e o link de menu correspondente
function ativarSecao(id) {
    // Remove a classe 'ativa' de todas as seções e 'active' de todos os links do menu
    secoes.forEach(secao => secao.classList.remove('ativa'));
    menuLinks.forEach(link => link.classList.remove('active'));

    // Adiciona a classe 'ativa' à seção correspondente
    const secaoAtiva = document.getElementById(id);
    if (secaoAtiva) {
        secaoAtiva.classList.add('ativa');
    }

    // Adiciona a classe 'active' ao link de menu correspondente
    const linkAtivo = document.querySelector(`.menu a[href="#${id}"]`);
    if (linkAtivo) {
        linkAtivo.classList.add('active');
    }
}

// Função para fechar o menu hambúrguer (se estiver aberto)
function closeHamburgerMenu() {
    mainNav.classList.remove('active');
    hamburgerMenu.classList.remove('active');
}

// --- Event Listeners ---

// 1. Navegação pelo Menu (Scroll Suave e Ativação de Seção)
menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); // Impede o comportamento padrão de salto
        const targetId = link.getAttribute('href').substring(1); // Obtém o ID da seção alvo
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Rola suavemente até a seção
            window.scrollTo({
                top: targetSection.offsetTop - (document.querySelector('.navbar').offsetHeight), // Ajusta para a altura da navbar
                behavior: 'smooth'
            });

            // Adiciona um pequeno atraso para a classe 'active' ser aplicada
            // Isso evita que a ativação visual ocorra antes do scroll começar
            setTimeout(() => {
                // Ativa a seção e o link correspondente
                ativarSecao(targetId);
            }, 300); // Ajuste o tempo se necessário

            // Fecha o menu hambúrguer após clicar em um link (para mobile)
            closeHamburgerMenu();
        }
    });
});

// 2. Lógica para o Botão "Voltar ao Topo"
btnVoltarTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    // Não precisa chamar ativarSecao('sobre') aqui, pois o scrollHandler cuidará disso.
});

// 3. Detecção de Rolagem (Scroll Handler)
// Isso vai ativar o link do menu e mostrar/esconder o botão "Voltar ao Topo"
window.addEventListener('scroll', () => {
    // Mostrar/Esconder o botão "Voltar ao Topo"
    if (window.scrollY > 200) {
        btnVoltarTopo.classList.add('show');
    } else {
        btnVoltarTopo.classList.remove('show');
    }

    // Ativar o link do menu com base na posição de scroll
    let currentActiveSectionId = 'sobre'; // Padrão, se nenhuma seção estiver visível no topo

    secoes.forEach(secao => {
        const secaoTop = secao.offsetTop - (document.querySelector('.navbar').offsetHeight); // Posição do topo da seção, ajustado pela navbar
        const secaoBottom = secaoTop + secao.offsetHeight;

        // Se a posição de scroll estiver dentro da seção atual
        // E o topo da seção estiver visível na janela de visualização (ou ligeiramente acima)
        if (window.scrollY >= secaoTop && window.scrollY < secaoBottom) {
            currentActiveSectionId = secao.id;
        }
    });

    // Atualiza a classe 'active' no menu de navegação
    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentActiveSectionId) {
            link.classList.add('active');
        }
    });
});

// 4. Lógica do Menu Hambúrguer (Mobile)
hamburgerMenu.addEventListener('click', () => {
    mainNav.classList.toggle('active'); //

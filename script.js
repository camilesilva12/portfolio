// Função que controla a troca das seções
function trocaSecao(id) {
  // Esconde todas as seções
  document.querySelectorAll('.secao').forEach(secao => {
    secao.classList.remove('ativa');
  });

  // Mostra a seção desejada
  const destino = document.getElementById(id);
  if (destino) {
    destino.classList.add('ativa');
  }

  // Rola suavemente para o topo
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Controla clique no menu e links com href que iniciam com #
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const id = link.getAttribute('href').substring(1);
    trocaSecao(id);
  });
});

// Botão fixo voltar ao topo
const btnVoltarTopo = document.getElementById('btn-voltar-topo');

// Mostra o botão quando o scroll desce 200px
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    btnVoltarTopo.classList.add('show');
  } else {
    btnVoltarTopo.classList.remove('show');
  }
});

// Clique no botão volta para "sobre"
btnVoltarTopo.addEventListener('click', () => {
  trocaSecao('sobre');
});

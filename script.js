const menuLinks = document.querySelectorAll('.menu a');
const secoes = document.querySelectorAll('.secao');
const btnVoltarTopo = document.getElementById('btn-voltar-topo');

function ativarSecao(id) {
  secoes.forEach(secao => {
    secao.classList.remove('ativa');
  });
  const secaoAtiva = document.getElementById(id);
  if (secaoAtiva) {
    secaoAtiva.classList.add('ativa');
  }

  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === id) {
      link.classList.add('active');
    }
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').substring(1);
    ativarSecao(id);
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    btnVoltarTopo.classList.add('show');
  } else {
    btnVoltarTopo.classList.remove('show');
  }
});

btnVoltarTopo.addEventListener('click', () => {
  ativarSecao('sobre');
});

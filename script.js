document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const id = link.getAttribute('href').substring(1);
    const destino = document.getElementById(id);

    // Esconde todas as seções
    document.querySelectorAll('.secao').forEach(secao => {
      secao.classList.remove('ativa');
    });

    // Mostra apenas a seção clicada
    destino.classList.add('ativa');

    // Rola suavemente para o topo
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});


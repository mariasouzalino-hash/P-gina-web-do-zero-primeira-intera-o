/* ==========================================================================
   DIÁRIO DA SELVA - COMPORTAMENTOS INTERATIVOS (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização dos componentes
  initFiltrosECampos();
  calcularTempoLeitura();
  initEfeitosScroll();
});

/**
  1. SISTEMA DE FILTRAGEM DE CATEGORIAS E BUSCA EM TEMPO REAL
 */
function initFiltrosECampos() {
  const botoesFiltro = document.querySelectorAll('.btn-filtro');
  const campoBusca = document.getElementById('inputBusca');
  const cards = document.querySelectorAll('.card-materia');
  const gridMaterias = document.getElementById('gridMaterias');

  let categoriaAtiva = 'todos';
  let termoBusca = '';

  // Função central para aplicar ambos os filtros simultaneamente
  function aplicarFiltros() {
    let visiveis = 0;

    cards.forEach(card => {
      const categoriaCard = card.getAttribute('data-categoria');
      const tituloCard = card.querySelector('h3').textContent.toLowerCase();
      const resumoCard = card.querySelector('p').textContent.toLowerCase();

      // Verifica correspondência de categoria
      const atendeCategoria = (categoriaAtiva === 'todos' || categoriaCard === categoriaAtiva);

      // Verifica correspondência de busca
      const atendeBusca = tituloCard.includes(termoBusca) || resumoCard.includes(termoBusca);

      if (atendeCategoria && atendeBusca) {
        card.style.display = 'flex';
        visiveis++;
      } else {
        card.style.display = 'none';
      }
    });

    // Exibe mensagem caso nenhum card seja encontrado
    gerenciarMensagemVazia(visiveis);
  }

  // Evento de clique nos botões de categoria
  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', (e) => {
      botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
      e.currentTarget.classList.add('ativo');

      categoriaAtiva = e.currentTarget.getAttribute('data-filtro');
      aplicarFiltros();
    });
  });

  // Evento de digitação na barra de busca (com debounce)
  if (campoBusca) {
    campoBusca.addEventListener('input', (e) => {
      termoBusca = e.target.value.toLowerCase().trim();
      aplicarFiltros();
    });
  }

  // Gerencia o bloco "Nenhuma matéria encontrada"
  function gerenciarMensagemVazia(quantidadeVisivel) {
    let msgVazia = document.getElementById('mensagemSemResultados');

    if (quantidadeVisivel === 0) {
      if (!msgVazia) {
        msgVazia = document.createElement('div');
        msgVazia.id = 'mensagemSemResultados';
        msgVazia.className = 'sem-resultados';
        msgVazia.innerHTML = `
          <h3>Nenhum rastro encontrado! 🐾</h3>
          <p>Tente buscar por outro animal ou selecione a opção "Todos".</p>
        `;
        gridMaterias.appendChild(msgVazia);
      }
    } else if (msgVazia) {
      msgVazia.remove();
    }
  }
}

/**
  2. CÁLCULO AUTOMÁTICO DE TEMPO DE LEITURA
 */
function calcularTempoLeitura() {
  const cards = document.querySelectorAll('.card-materia');

  cards.forEach(card => {
    const texto = card.querySelector('p').textContent;
    const palavras = texto.trim().split(/\s+/).length;
    // Média de leitura: 200 palavras por minuto
    const minutos = Math.max(1, Math.ceil(palavras / 40)); 

    const elementoTempo = card.querySelector('.tempo-leitura');
    if (elementoTempo) {
      elementoTempo.textContent = `⏱️ ${minutos} min de leitura`;
    }
  });
}

/**
  3. EFEITOS VISUAIS E SCROLL
 */
function initEfeitosScroll() {
  // Animação leve de entrada dos cards ao carregar
  const cards = document.querySelectorAll('.card-materia');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.4s ease-out';

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * index);
  });
}

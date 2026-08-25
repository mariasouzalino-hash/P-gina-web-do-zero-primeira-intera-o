/* ===================================================
   THE PINK BURN BOOK - SCRIPT JAVASCRIPT DINÂMICO
   =================================================== */

// 1. GERADOR DE FRASES DOS FILMES
const frases2000s = [
  { frase: "Às quartas-feiras nós usamos rosa!", filme: "Meninas Malvadas" },
  { frase: "O que, como se fosse difícil?", filme: "Legalmente Loira" },
  { frase: "Trinta, durona e próspera!", filme: "De Repente 30" },
  { frase: "A coragem não é a ausência de medo, mas a decisão de que algo é mais importante que ele.", filme: "O Diário da Princesa" },
  { frase: "Segure meu poodle!", filme: "As Branquelas" },
  { frase: "Você é um garoto muito bonito... quer dizer, garota!", filme: "Ela é o Cara" },
  { frase: "A espera pelo seu príncipe pode demorar, mas a pizza chega em 30 minutos.", filme: "A Nova Cinderela" }
];

function gerarQuote() {
  const display = document.getElementById('quote-display');
  if (!display) return;

  const indiceAleatorio = Math.floor(Math.random() * frases2000s.length);
  const selecao = frases2000s[indiceAleatorio];

  // Animação simples de transição
  display.style.opacity = 0;
  
  setTimeout(() => {
    display.innerText = `"${selecao.frase}" — ${selecao.filme}`;
    display.style.opacity = 1;
    display.style.transition = 'opacity 0.4s ease-in-out';
  }, 200);
}

// 2. SISTEMA DE "CURTIR" COM CONTADOR NOS CARDS DOS FILMES
function inicializarBotoesCurtir() {
  const posts = document.querySelectorAll('.post-card');

  posts.forEach((post, index) => {
    // Cria o container do botão de curtir
    const likeArea = document.createElement('div');
    likeArea.className = 'like-area';
    likeArea.style.marginTop = '15px';
    likeArea.style.display = 'flex';
    likeArea.style.alignItems = 'center';
    likeArea.style.gap = '10px';

    let curtidas = Math.floor(Math.random() * 50) + 100; // Valor inicial aleatório nostálgico

    likeArea.innerHTML = `
      <button class="btn-like" style="
        background: var(--rosa-medio);
        color: white;
        border: none;
        padding: 6px 14px;
        border-radius: 20px;
        cursor: pointer;
        font-family: 'Fredoka', sans-serif;
        font-size: 0.9rem;
        transition: transform 0.2s;
      ">💖 Amamos! (<span class="count">${curtidas}</span>)</button>
    `;

    post.appendChild(likeArea);

    const btnLike = likeArea.querySelector('.btn-like');
    const countSpan = likeArea.querySelector('.count');
    let jaCurtiu = false;

    btnLike.addEventListener('click', () => {
      if (!jaCurtiu) {
        curtidas++;
        countSpan.innerText = curtidas;
        btnLike.style.background = 'var(--rosa-pink)';
        btnLike.style.transform = 'scale(1.1)';
        setTimeout(() => btnLike.style.transform = 'scale(1)', 200);
        jaCurtiu = true;
      } else {
        curtidas--;
        countSpan.innerText = curtidas;
        btnLike.style.background = 'var(--rosa-medio)';
        jaCurtiu = false;
      }
    });
  });
}

// 3. EFEITO DE RASTRO DE GLITTER / ESTRELAS NO CURSOR (NOSTALGIA Y2K)
function ativarGlitterCursor() {
  const simbolos = ['✨', '💖', '★', '🌸'];

  document.addEventListener('mousemove', (e) => {
    // Criar elemento esporadicamente para não travar a tela
    if (Math.random() > 0.85) {
      const el = document.createElement('span');
      el.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
      el.style.position = 'fixed';
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      el.style.fontSize = (Math.random() * 12 + 10) + 'px';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      el.style.opacity = '1';
      el.style.transition = 'all 0.8s ease-out';

      document.body.appendChild(el);

      setTimeout(() => {
        el.style.top = (e.clientY + 20) + 'px';
        el.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        el.remove();
      }, 850);
    }
  });
}

// 4. PLAYER DE MÚSICA SIMULADO NA SIDEBAR
function inicializarPlaylistInterativa() {
  const musicas = document.querySelectorAll('.playlist-list li');

  musicas.forEach((musica) => {
    musica.style.cursor = 'pointer';
    musica.title = 'Clique para tocar o trecho';

    musica.addEventListener('click', () => {
      // Remove destaque dos outros
      musicas.forEach(m => m.style.color = 'inherit');
      
      // Destaque para a tocando atualmente
      musica.style.color = 'var(--rosa-pink)';
      
      const nomeMusica = musica.innerText;
      alert(`🎧 Tocando agora no seu MP3 Player:\n${nomeMusica}`);
    });
  });
}

// EXECUTA AS FUNÇÕES QUANDO O DOCUMENTO CARREGAR
document.addEventListener('DOMContentLoaded', () => {
  inicializarBotoesCurtir();
  ativarGlitterCursor();
  inicializarPlaylistInterativa();
});
// 5. CONTROLE DO PLAYER DE ÁUDIO DA BRITNEY
function alternarMusica() {
  const audio = document.getElementById('musica-britney');
  const botao = document.getElementById('btn-player');

  if (audio.paused) {
    audio.play();
    botao.innerText = '⏸️ Pausar: Gimme More';
    botao.style.backgroundColor = 'var(--rosa-chiclete)';
  } else {
    audio.pause();
    botao.innerText = '▶️ Tocar Gimme More - Britney';
    botao.style.backgroundColor = 'var(--rosa-pink)';
  }
}

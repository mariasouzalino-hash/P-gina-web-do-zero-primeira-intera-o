// Função para alternar a exibição das curiosidades
function mostrarCuriosidade(idElemento) {
  // Busca o elemento no HTML através do ID passado como argumento
  const elemento = document.getElementById(idElemento);
  
  // Verifica se o elemento existe na página
  if (!elemento) return;

  // Verifica se o elemento está visível
  if (elemento.style.display === "block") {
    // Se estiver visível, esconde
    elemento.style.display = "none";
  } else {
    // Se estiver escondido, mostra
    elemento.style.display = "block";
  }
}

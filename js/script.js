// . VARIÁVEIS GLOBAIS (Armazenam o estado do jogo)
// O que é: Variável que guarda qual jogador está jogando agora
// Por que 'X': O jogo sempre começa com o jogador X
// Como muda: Alterna entre 'X' e 'O' a cada jogada
// O que é: Um array (lista) com 9 posições vazias
// Representa: O tabuleiro 3x3 (9 casas)
// Posições:
// Exemplo durante o jogo: ['X', 'O', '', 'X', '', '', '', 'O', '']
// O que é: Controla se o jogo ainda está ativo
// true: Pode continuar jogando
// false: Jogo acabou (alguém ganhou ou empatou)
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// 2. CONDIÇÕES DE VITÓRIA
// O que é: Lista de todas as combinações possíveis para ganhar
// Como funciona: Se as posições [0, 1, 2] tiverem todas 'X', o X ganhou!
// Total: 8 formas diferentes de ganhar
// Visualização:
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// 3. FUNÇÃO initializeBoard() (Cria o tabuleiro)
// O que faz: Cria as 9 células do tabuleiro na tela
// O que faz: Pega o elemento HTML com id="board"
// board: Agora guarda referência para a div do tabuleiro
// O que faz: Limpa tudo que está dentro do tabuleiro
// Por quê: Para começar um jogo novo sem células antigas
// O que faz: Loop que repete 9 vezes (i vai de 0 a 8)
// Por quê: Precisamos criar 9 células
// O que faz: Cria um elemento <button> novo
// cell: Variável temporária que guarda este botão
// O que faz: Adiciona a classe CSS "cell" ao botão
// Por quê: Para aplicar os estilos (cor, tamanho, etc)
// O que faz: Adiciona um atributo data-index ao botão
// Exemplo: O primeiro botão fica <button data-index="0">
// Por quê: Para saber qual posição foi clicada depois
// O que faz: Quando clica neste botão, chama a função handleCellClick
// addEventListener: "Escuta" o evento de clique
// O que faz: Adiciona o botão criado dentro da div do tabuleiro
// Resultado: O botão aparece na tela
// updateTurnIndicator(): Mostra "Vez de: Jogador X" na tela
function initializeBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  updateTurnIndicator();
}

// 4. FUNÇÃO handleCellClick() (Quando clica em uma célula)
// event: Objeto que contém informações sobre o clique
// event.target: Pega exatamente qual elemento foi clicado
// cell: Agora guarda referência para o botão clicado
// cell.dataset.index: Pega o número que salvamos antes (0 a 8)
// parseInt(): Converte de texto para número
// Exemplo: Se clicou na célula do meio, index = 4
// gameBoard[index] !== '': Verifica se a célula já está ocupada
// !gameActive: Verifica se o jogo ainda está ativo
// return: Se qualquer condição for verdadeira, sai da função (não faz nada)
// Por quê: Não pode jogar em célula ocupada ou em jogo finalizado
// O que faz: Coloca 'X' ou 'O' no array gameBoard
// Exemplo: gameBoard[4] = 'X' (coloca X no centro)
// O que faz: Mostra 'X' ou 'O' visualmente no botão
// textContent: Altera o texto dentro do elemento
// classList.add(): Adiciona classes CSS ao elemento
// 'taken': Marca que a célula está ocupada
// currentPlayer.toLowerCase(): Adiciona 'x' ou 'o' (minúsculo)
// Resultado: <button class="cell taken x">X</button>
// Por quê: A classe 'x' deixa o texto vermelho, 'o' deixa azul
// O que faz: Verifica se alguém ganhou após esta jogada
function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index);

  if (gameBoard[index] !== "" || !gameActive) {
    return;
  }

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken", currentPlayer.toLowerCase());

  checkResult();
}

// 5. FUNÇÃO checkResult() (Verifica vitória ou empate)
// roundWon: Variável que indica se alguém ganhou (começa falsa)
// for...of: Loop que percorre cada combinação de vitória
// condition: Vai ser [0,1,2], depois [3,4,5], depois [6,7,8], etc.
// Desestruturação: Pega os 3 números do array
// Exemplo: Se condition = [0, 1, 2], então a=0, b=1, c=2
// gameBoard[a]: Verifica se não está vazio
// gameBoard[a] === gameBoard[b]: Verifica se posições a e b são iguais
// gameBoard[a] === gameBoard[c]: Verifica se posições a e c são iguais
// Exemplo: Se gameBoard[0]='X', gameBoard[1]='X', gameBoard[2]='X' → VITÓRIA!
// roundWon = true: Marca que alguém ganhou
// break: Sai do loop (não precisa verificar outras combinações)
// Operador ternário: condição ? valor_se_verdadeiro : valor_se_falso
// Se currentPlayer é 'X': winnerName = 'Jogador X'
// Senão: winnerName = 'Jogador O'
// Template string (javascript
// gameActive = false;
// return;
// }
// javascript
// if (!gameBoard.includes('')) {
// javascript
// showWinnerMessage('Empate! 🤝', 'draw');
// gameActive = false;
// return;
// }
// javascript
// currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
// javascript
// updateTurnIndicator();
// }
function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    const winnerName = currentPlayer === "X" ? "Jogador X" : "Jogador O";
    showWinnerMessage(`${winnerName} ganhou! 🎉`, currentPlayer);
    gameActive = false;
    return;
  }

  if (!gameBoard.includes("")) {
    showWinnerMessage("Empate! 🤝", "draw");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnIndicator();
}

// const winnerMessageEl = document.getElementById('winner-message');
// const turnIndicator = document.getElementById('turn-indicator');
// javascript
// winnerMessageEl.textContent = message;
// javascript
// winnerMessageEl.className = 'winner-message show';
// javascript
// if (winner === 'X') {
// winnerMessageEl.classList.add('x-wins');
// } else if (winner === 'O') {
// winnerMessageEl.classList.add('o-wins');
// } else {
// winnerMessageEl.classList.add('draw');
// }
// javascript
// turnIndicator.textContent = '';
// }
// javascript
function showWinnerMessage(message, winner) {
  const winnerMessageEl = document.getElementById("winner-message");
  const turnIndicator = document.getElementById("turn-indicator");

  winnerMessageEl.textContent = message;
  winnerMessageEl.className = "winner-message show";

  if (winner === "X") {
    winnerMessageEl.classList.add("x-wins");
  } else if (winner === "O") {
    winnerMessageEl.classList.add("o-wins");
  } else {
    winnerMessageEl.classList.add("draw");
  }

  turnIndicator.textContent = "";
}

// function updateTurnIndicator() {
// if (!gameActive) return;
// javascript
// const turnIndicator = document.getElementById('turn-indicator');
// const playerName = currentPlayer === 'X' ? 'Jogador X' : 'Jogador O';
// const playerColor = currentPlayer === 'X' ? '#ff6b6b' : '#4ecdc4';
// javascript
// turnIndicator.textContent = Vez de: ${playerName};
// turnIndicator.style.color = playerColor;
function updateTurnIndicator() {
  if (!gameActive) return;

  const turnIndicator = document.getElementById("turn-indicator");
  const playerName = currentPlayer === "X" ? "Jogador X" : "Jogador O";
  const playerColor = currentPlayer === "X" ? "#ff6b6b" : "#4ecdc4";

  turnIndicator.textContent = `Vez de: ${playerName}`;
  turnIndicator.style.color = playerColor;
}

// function resetGame() {
// currentPlayer = 'X';
// gameBoard = ['', '', '', '', '', '', '', '', ''];
// gameActive = true;
// javascript
// const winnerMessageEl = document.getElementById('winner-message');
// winnerMessageEl.textContent = '';
// winnerMessageEl.className = 'winner-message';
// javascript
// initializeBoard();
// }
// javascript
// document.getElementById('reset-button').addEventListener('click', resetGame);
// javascript
// initializeBoard();
// - **Cria o tabuleiro** assim que a página carrega
// - **É a primeira coisa que acontece**: Monta o jogo
function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  const winnerMessageEl = document.getElementById("winner-message");
  winnerMessageEl.textContent = "";
  winnerMessageEl.className = "winner-message";

  initializeBoard();
}

document.getElementById("reset-button").addEventListener("click", resetGame);

initializeBoard();

// ## 🔄 **FLUXO COMPLETO DE UMA JOGADA:**

// 1. **Clica em célula** → `handleCellClick()` é chamada
// 2. **Verifica se pode jogar** → Célula vazia? Jogo ativo?
// 3. **Marca no array** → `gameBoard[index] = 'X'`
// 4. **Mostra na tela** → Coloca 'X' no botão
// 5. **Verifica vitória** → `checkResult()` checa todas combinações
// 6. **Se ganhou** → Mostra mensagem e desativa jogo
// 7. **Se não ganhou** → Troca jogador (X → O)
// 8. **Atualiza "Vez de:"** → Mostra próximo jogador

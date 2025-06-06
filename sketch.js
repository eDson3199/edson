let progress = 0; // de 0 (campo) até 1 (cidade)
let treeVisibility = []; // Visibilidade das árvores

function setup() {
  createCanvas(800, 400);
  frameRate(30);

  // Gerar posições fixas para as árvores e definir visibilidade inicial
  let spacing = 100;
  for (let x = 50; x < width; x += spacing) {
    treeVisibility.push(1); // Todas as árvores começam visíveis
  }
}

function draw() {
  background(135, 206, 235); // céu azul

  // Sol
  fill(255, 204, 0);
  ellipse(100, 80, 80, 80);

  // Progresso
  progress += 0.002;
  progress = constrain(progress, 0, 1);

  drawGround();
  
  // Atualizar visibilidade das árvores com base no progresso
  updateTreeVisibility(progress);
  
  // Desenhar árvores, prédios e carro
  drawTrees();
  drawBuildings(progress); // prédios aparecem
  drawCar(progress); // carro entra

  // Texto explicativo
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("Do campo à cidade", width / 2, 30);
}

function drawGround() {
  fill(34, 139, 34);
  rect(0, height * 0.75, width, height * 0.25);
}

function drawTrees() {
  for (let i = 0; i < treeVisibility.length; i++) {
    if (treeVisibility[i] > 0) { // Desenha a árvore somente se ela for visível
      let x = 50 + i * 100;
      fill(139, 69, 19);
      rect(x, 250, 20, 80); // tronco
      fill(34, 139, 34);
      ellipse(x + 10, 240, 60, 60); // copa
    }
  }
}

function updateTreeVisibility(progress) {
  // Atualiza a visibilidade das árvores conforme o progresso
  for (let i = 0; i < treeVisibility.length; i++) {
    treeVisibility[i] = 1 - progress; // Visibilidade diminui conforme o progresso
  }
}

function drawBuildings(amount) {
  let numBuildings = int(map(amount, 0, 1, 0, 6));
  for (let i = 0; i < numBuildings; i++) {
    let x = 150 + i * 100;
    fill(150);
    rect(x, 200, 60, 150);
    fill(0);
    for (let y = 210; y < 340; y += 20) {
      for (let wx = x + 10; wx < x + 50; wx += 20) {
        rect(wx, y, 10, 10);
      }
    }
  }
}

function drawCar(amount) {
  if (amount > 0.3) {
    let x = map(amount, 0.3, 1, -100, width);
    fill(255, 0, 0);
    rect(x, 330, 80, 30);
    fill(0);
    ellipse(x + 15, 360, 20, 20);
    ellipse(x + 65, 360, 20, 20);
  }
}

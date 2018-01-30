var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var cube = [];
var count = 0;
var timer = 0;
var stop = 0;


canvas.onclick = function(event) {
  var positionX = event.offsetX;
  var positionY = event.offsetY;
  console.log(positionX);
  console.log(positionY);
  positionX = Math.floor(positionX/10); //Ширина поля 300, 300/10 = 30
  positionY = Math.floor(positionY/10);
  cube[positionY][positionX] = 1;
  console.log(cube);
  drawField();
}

function goLife() {
  var x = 30; //1 клетка занимает 10пикселей, всего 30 клеток по гор и верт
  var y = 30;
  for (var i = 0; i < x; i++) {
    cube[i] = [];
    for (var j = 0; j < y; j++) {
      cube[i][j] = 0;
    }
  }
}

goLife();

function drawField() {
  ctx.clearRect(0, 0, 300, 300);
   for (var i = 0; i < 30; i++) {
      for (var j = 0; j < 30; j++) {
        if (cube[i][j] == 1) {
          ctx.fillRect(j*10, i*10, 10, 10);
      }
    }
  }
}

// Логика игры

function startLife() {    //Моделирование жизни в клетке
  var cube2 = [];
  for (var i = 0; i < 30; i++) {
    if(stop == 1){
        break;
      }
    cube2[i] = [];
    for (var j = 0; j < 30; j++) {
      var neighbor = 0;
      if (cube[recountIndexForAdd(i) - 1][j] == 1) neighbor++; //Верхний сосед
      if (cube[i][recountIndexSubtraction(j) + 1] == 1) neighbor++; //Сосед справа
      if (cube[recountIndexSubtraction(i) + 1][j] == 1) neighbor++; //Сосед снизу
      if (cube[i][recountIndexForAdd(j) - 1] == 1) neighbor++; //Сосед слева
      if (cube[recountIndexForAdd(i) - 1][recountIndexSubtraction(j) + 1] == 1) neighbor++;
      if (cube[recountIndexSubtraction(i) + 1][recountIndexSubtraction(j) + 1] == 1) neighbor++;
      if (cube[recountIndexSubtraction(i) + 1][recountIndexForAdd(j) - 1] == 1) neighbor++;
      if (cube[recountIndexForAdd(i) - 1][recountIndexForAdd(j) - 1] == 1) neighbor++;
      (neighbor == 2 || neighbor == 3) ? cube2[i][j] = 1 : cube2[i][j] == 0;
    }  
  }
  cube = cube2;
  drawField();
  count++;
  document.getElementById('count').innerHTML = count;
  timer = setTimeout(startLife, 300);
}

function recountIndexForAdd(i) { //Если сосед принимает значение индекса меньше 0, то возвращаем к 30
  if (i == 0) {
    return 30;
  } else {
    return i;
  }
}

function recountIndexSubtraction(i) { 
  if (i == 29) {
    return -1;
  } else {
    return i;
  }
}

document.getElementById('start').onclick = startLife;

function stopGame() {
  stop = 1;
}

document.getElementById('stop').onclick = stopGame;
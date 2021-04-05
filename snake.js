
const wallButton = document.getElementById('withWalls')
wallButton.addEventListener('click', withWalls)
let playerName = ''
function withWalls() {
  document.getElementById('highScores').innerHTML = null

  playerName = document.getElementById('name').value
  document.getElementById('game_board').style.display = 'flex'
  document.getElementById('score_board').style.display = 'none'
  document.getElementById('highScores').style.display = 'none'
  const eatSound = document.getElementById('dinner')
  const grid = document.querySelector('.grid')
  const width = 12
  const height = 9
  let cells = []
  let snake = [77, 78, 79]
  let score = 0
  let movement = null
  let number = Math.floor(Math.random() * (height * width))
  let food = number
  let direction = ''
  let currentSpeed = 700

  document.querySelector('.grid').innerHTML = null

  for (let index = 0; index < width * height; index++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    grid.appendChild(cell)
    cells.push(cell)
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / height}%`
  }

  function snakeEats() {
    if (food === snake[0]) {
      eatSound.play()
      cells[food].classList.remove('food')
      number = Math.floor(Math.random() * (height * width))
      while (snake.indexOf(number) != -1) {
        number = Math.floor(Math.random() * (height * width))
      }
      food = number
      cells[food].classList.add('food')
      score += 100
      document.getElementById('trackScore').innerHTML = `Score: ${score}`
      return true
    }
    return false
  }


  cells[food].classList.add('food')
  eraseSnake()
  drawSnake()


  function drawSnake() {
    cells[snake[0]].classList.add('snake')
    if (snake.length > 1) {
      for (let i = 1; i < snake.length - 1; i++) {

        if ((snake[i - 1] === snake[i] - 1) && (snake[i + 1] === snake[i] + 1)) {

          cells[snake[i]].classList.add('snake-body-straight')

        } else if ((snake[i - 1] === snake[i] - width) && (snake[i + 1] === snake[i] + width)) {

          cells[snake[i]].classList.add('snake-body-verticle')

        } else if ((snake[i - 1] === snake[i] + 1) && (snake[i + 1] === snake[i] - 1)) {

          cells[snake[i]].classList.add('snake-body-straight')

        } else if ((snake[i - 1] === snake[i] + width) && (snake[i + 1] === snake[i] - width)) {

          cells[snake[i]].classList.add('snake-body-verticle')

        } else if ((snake[i - 1] === snake[i] - width) && (snake[i + 1] === snake[i] - 1)) {

          cells[snake[i]].classList.add('snake-curve1')

        } else if ((snake[i + 1] === snake[i] - width) && (snake[i - 1] === snake[i] - 1)) {

          cells[snake[i]].classList.add('snake-curve1')

        } else if ((snake[i - 1] === snake[i] - width) && (snake[i + 1] === snake[i] + 1)) {

          cells[snake[i]].classList.add('snake-curve2')
        } else if ((snake[i + 1] === snake[i] - width) && (snake[i - 1] === snake[i] + 1)) {

          cells[snake[i]].classList.add('snake-curve2')

        } else if ((snake[i + 1] === snake[i] + width) && (snake[i - 1] === snake[i] + 1)) {

          cells[snake[i]].classList.add('snake-curve3')
        } else if ((snake[i - 1] === snake[i] + width) && (snake[i + 1] === snake[i] + 1)) {

          cells[snake[i]].classList.add('snake-curve3')
        } else if ((snake[i - 1] === snake[i] + width) && (snake[i + 1] === snake[i] - 1)) {

          cells[snake[i]].classList.add('snake-curve4')
        } else if ((snake[i + 1] === snake[i] + width) && (snake[i - 1] === snake[i] - 1)) {

          cells[snake[i]].classList.add('snake-curve4')
        }
        if ((snake[snake.length - 2]) === (snake[snake.length - 1] - 1)) {
          cells[snake[snake.length - 1]].classList.add('snake-tail1')
        } else if ((snake[snake.length - 2]) === (snake[snake.length - 1] + 1)) {
          cells[snake[snake.length - 1]].classList.add('snake-tail3')
        } else if ((snake[snake.length - 2]) === (snake[snake.length - 1] - width)) {
          cells[snake[snake.length - 1]].classList.add('snake-tail2')
        } else if ((snake[snake.length - 2]) === (snake[snake.length - 1] + width)) {
          cells[snake[snake.length - 1]].classList.add('snake-tail4')
        }
      }
    }
  }

  function eraseSnake() {
    cells[snake[0]].classList.remove('snake')
    if (snake.length > 1) {
      for (let i = 1; i < snake.length - 1; i++) {
        cells[snake[i]].classList.remove('snake-body-straight')
        cells[snake[i]].classList.remove('snake-body-verticle')
        cells[snake[i]].classList.remove('snake-curve1')
        cells[snake[i]].classList.remove('snake-curve2')
        cells[snake[i]].classList.remove('snake-curve3')
        cells[snake[i]].classList.remove('snake-curve4')
      }
      cells[snake[snake.length - 1]].classList.remove('snake-tail1')
      cells[snake[snake.length - 1]].classList.remove('snake-tail2')
      cells[snake[snake.length - 1]].classList.remove('snake-tail3')
      cells[snake[snake.length - 1]].classList.remove('snake-tail4')
    }
  }


  function offsetSnake(offset) {
    const positions = [...snake]
    for (let i = 1; i < snake.length; i++) {
      snake[i] = parseInt(positions[i - 1])
    }
    snake[0] += offset
  }

  function checkVector(pos1, pos2) {
    const vector = pos1 - pos2
    return vector
  }

  function extendSnake() {
    if (snake.length === 1) {
      if (direction === 'w') {
        snake.push(snake[0] + width)
      } else if (direction === 's') {
        snake.push(snake[0] - width)
      } else if (direction === 'd') {
        snake.push(snake[0] - 1)
      } else if (direction === 'a') {
        snake.push(snake[0] + 1)
      }
    } else if (snake.length === 2) {
      if (direction === 'w') {
        snake.push(snake[1] + width)
      } else if (direction === 's') {
        snake.push(snake[1] - width)
      } else if (direction === 'd') {
        snake.push(snake[1] - 1)
      } else if (direction === 'a') {
        snake.push(snake[1] + 1)
      }
    } else {
      const vector = checkVector(snake[snake.length - 1], snake[snake.length - 2])
      if (vector === 1) {
        snake.push(snake[snake.length - 1] + 1)
      } else if (vector === -1) {
        snake.push(snake[snake.length - 1] - 1)
      } else if (vector > 0) {
        snake.push(snake[snake.length - 1] + width)
      } else if (vector < 0) {
        snake.push(snake[snake.length - 1] - width)
      }
    }
  }




  document.addEventListener('keyup', (event) => {
    const key = event.key
      
    snakeMovements(key)
  })

  function snakeMovements(key) {
    if (key === 'd') {
      if (direction !== 'a') {
        direction = key.toLowerCase()
      }
    } else if (key === 'a') {
      if (direction !== 'd') {
        direction = key.toLowerCase()
      }
    } else if (key === 'w') {
      if (direction !== 's') {
        direction = key.toLowerCase()
      }
    } else if (key === 's') {
      if (direction !== 'w') {
        direction = key.toLowerCase()
      }
    }
  }

  function init() {
    movement = setInterval(moveSnake, currentSpeed)
  }

  init()

  function moveSnake() {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0] === snake[i]) {
        lost()
        return
      }
    }
    if ((direction === 'd' || direction === 'D') && !(snake[0] % width === width - 1)) {
      eraseSnake()
      offsetSnake(1)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }
    } else if ((direction === 'd' || direction === 'D') && (snake[0] % width === width - 1)) {
      lost()
    } else if ((direction === 'a' || direction === 'A') && !(snake[0] % width === 0)) {

      eraseSnake()
      offsetSnake(-1)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }
    } else if ((direction === 'a' || direction === 'A') && (snake[0] % width === 0)) {
      lost()
    } else if ((direction === 's' || direction === 'S') && !((snake[0] + width) >= (width * height))) {
      eraseSnake()
      offsetSnake(width)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }
    } else if ((direction === 's' || direction === 'S') && ((snake[0] + width) >= (width * height))) {
      lost()
    } else if ((direction === 'w' || direction === 'W') && !(snake[0] < width)) {

      eraseSnake()
      offsetSnake(-width)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }

    } else if ((direction === 'w' || direction === 'W') && (snake[0] < width)) {
      lost()
    }
  }

  function lost() {
    alert('You Lose')
    clearInterval(movement)
    document.getElementById('game_board').style.display = 'none'
    document.getElementById('score_board').style.display = 'block'
    document.getElementById('highScores').style.display = 'block'
    document.getElementById('score_board').innerHTML = '<h1>YOUR SCORE IS: ' + score + '</h1>'
    let ranking = localStorage.getItem("ranking-With-Walls")
    let rankingArray = JSON.parse(ranking)


    if (rankingArray === null) {
      rankingArray = []
    }
    let find = rankingArray.findIndex(element => element.name === playerName)
    if (find === -1) {
      rankingArray.push({ name: playerName, score: score })
    } else {
      if (score > rankingArray[find].score) {
        rankingArray[find] = { name: playerName, score: score }
      }
    }

    function compare(a, b) {
      if (a.score < b.score) {
        return 1
      }
      if (a.score > b.score) {
        return -1
      }
      return 0
    }
    rankingArray.sort(compare)
    localStorage.setItem("ranking-With-Walls", JSON.stringify(rankingArray))
    for (let i = 0; i < rankingArray.length; i++) {
      document.getElementById('highScores').innerHTML += '<h2><br>' + '<ul>' + '<li>' + 'Name:' + ' ' + rankingArray[i].name + ' ' + 'Score:' + ' ' + rankingArray[i].score + '</li>' + '</h2>'

    }

  }
}
const noWallButton = document.getElementById('withoutWalls')
noWallButton.addEventListener('click', withoutWalls)
function withoutWalls() {
  document.getElementById('highScores').innerHTML = null
  playerName = document.getElementById('name').value
  document.getElementById('game_board').style.display = 'flex'
  document.getElementById('score_board').style.display = 'none'
  document.getElementById('highScores').style.display = 'none'
  const eatSound = document.getElementById('dinner')
  const grid = document.querySelector('.grid')
  const width = 12
  const height = 9
  let cells = []
  let snake = [77, 78, 79]
  let score = 0
  let movement = null
  let number = Math.floor(Math.random() * (height * width))
  let food = number
  let direction = ''
  let currentSpeed = 700

  document.querySelector('.grid').innerHTML = null

  for (let index = 0; index < width * height; index++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    grid.appendChild(cell)
    cells.push(cell)
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / height}%`
  }

  function snakeEats() {
    if (food === snake[0]) {
      eatSound.play()
      cells[food].classList.remove('food')
      number = Math.floor(Math.random() * (height * width))
      while (snake.indexOf(number) !== -1) {
        number = Math.floor(Math.random() * (height * width))
      }
      food = number
      cells[food].classList.add('food')
      score += 100
      document.getElementById('trackScore').innerHTML = `Score: ${score}`
      return true
    }
    return false
  }


  cells[food].classList.add('food')
  eraseSnake()
  drawSnake()


  function drawSnake() {
    cells[snake[0]].classList.add('snake')
    if (snake.length > 1) {
      for (let i = 1; i < snake.length - 1; i++) {

        if ((snake[i - 1] === snake[i] - 1) && (snake[i + 1] === snake[i] + 1)) {

          cells[snake[i]].classList.add('snake-body-straight')

        } else if ((snake[i - 1] === snake[i] - width) && (snake[i + 1] === snake[i] + width)) {

          cells[snake[i]].classList.add('snake-body-verticle')

        } else if ((snake[i - 1] === snake[i] + 1) && (snake[i + 1] === snake[i] - 1)) {

          cells[snake[i]].classList.add('snake-body-straight')

        } else if ((snake[i - 1] === snake[i] + width) && (snake[i + 1] === snake[i] - width)) {

          cells[snake[i]].classList.add('snake-body-verticle')

        } else if ((snake[i - 1] === snake[i] - width) && (snake[i + 1] === snake[i] - 1)) {

          cells[snake[i]].classList.add('snake-curve1')

        } else if ((snake[i + 1] === snake[i] - width) && (snake[i - 1] === snake[i] - 1)) {

          cells[snake[i]].classList.add('snake-curve1')

        } else if ((snake[i - 1] === snake[i] - width) && (snake[i + 1] === snake[i] + 1)) {

          cells[snake[i]].classList.add('snake-curve2')
        } else if ((snake[i + 1] === snake[i] - width) && (snake[i - 1] === snake[i] + 1)) {

          cells[snake[i]].classList.add('snake-curve2')

        } else if ((snake[i + 1] === snake[i] + width) && (snake[i - 1] === snake[i] + 1)) {

          cells[snake[i]].classList.add('snake-curve3')
        } else if ((snake[i - 1] === snake[i] + width) && (snake[i + 1] === snake[i] + 1)) {

          cells[snake[i]].classList.add('snake-curve3')
        } else if ((snake[i - 1] === snake[i] + width) && (snake[i + 1] === snake[i] - 1)) {

          cells[snake[i]].classList.add('snake-curve4')
        } else if ((snake[i + 1] === snake[i] + width) && (snake[i - 1] === snake[i] - 1)) {

          cells[snake[i]].classList.add('snake-curve4')
        } else {

          if ((direction === 'w') || (direction === 's')) {
            cells[snake[i]].classList.add('snake-body-verticle')
          } else {
            cells[snake[i]].classList.add('snake-body-straight')
          }

        }

        if ((snake[snake.length - 2]) === (snake[snake.length - 1] - 1)) {
          cells[snake[snake.length - 1]].classList.add('snake-tail1')
        } else if ((snake[snake.length - 2]) === (snake[snake.length - 1] + 1)) {
          cells[snake[snake.length - 1]].classList.add('snake-tail3')
        } else if ((snake[snake.length - 2]) === (snake[snake.length - 1] - width)) {
          cells[snake[snake.length - 1]].classList.add('snake-tail2')
        } else if ((snake[snake.length - 2]) === (snake[snake.length - 1] + width)) {
          cells[snake[snake.length - 1]].classList.add('snake-tail4')
        } else {
          if (direction === 'w') {
            cells[snake[snake.length - 1]].classList.add('snake-tail2')
          } else if (direction === 's') {
            cells[snake[snake.length - 1]].classList.add('snake-tail4')
          } else if (direction === 'a') {
            cells[snake[snake.length - 1]].classList.add('snake-tail1')
          } else if (direction === 'd') {
            cells[snake[snake.length - 1]].classList.add('snake-tail3')
          }
        }
      }
    }
  }

  function eraseSnake() {
    cells[snake[0]].classList.remove('snake')
    if (snake.length > 1) {
      for (let i = 1; i < snake.length - 1; i++) {
        cells[snake[i]].classList.remove('snake-body-straight')
        cells[snake[i]].classList.remove('snake-body-verticle')
        cells[snake[i]].classList.remove('snake-curve1')
        cells[snake[i]].classList.remove('snake-curve2')
        cells[snake[i]].classList.remove('snake-curve3')
        cells[snake[i]].classList.remove('snake-curve4')
      }
      if (cells[snake[snake.length - 1]] !== 'undefined') {
        cells[snake[snake.length - 1]].classList.remove('snake-tail1')
        cells[snake[snake.length - 1]].classList.remove('snake-tail2')
        cells[snake[snake.length - 1]].classList.remove('snake-tail3')
        cells[snake[snake.length - 1]].classList.remove('snake-tail4')
      }

    }
  }


  function offsetSnake(offset) {
    const positions = [...snake]
    for (let i = 1; i < snake.length; i++) {
      snake[i] = parseInt(positions[i - 1])
    }
    snake[0] += offset
  }

  function checkVector(pos1, pos2) {
    const vector = pos1 - pos2
    return vector
  }

  function extendSnake() {
    if (snake.length === 1) {
      if (direction === 'w') {
        snake.push(snake[0] + width)
      } else if (direction === 's') {
        snake.push(snake[0] - width)
      } else if (direction === 'd') {
        snake.push(snake[0] - 1)
      } else if (direction === 'a') {
        snake.push(snake[0] + 1)
      }
    } else if (snake.length === 2) {
      if (direction === 'w') {
        snake.push(snake[1] + width)
      } else if (direction === 's') {
        snake.push(snake[1] - width)
      } else if (direction === 'd') {
        snake.push(snake[1] - 1)
      } else if (direction === 'a') {
        snake.push(snake[1] + 1)
      }
    } else {
      const vector = checkVector(snake[snake.length - 1], snake[snake.length - 2])
      if (vector === 1) {
        snake.push(snake[snake.length - 1] - 1)
      } else if (vector === -1) {
        snake.push(snake[snake.length - 1] + 1)
      } else if (vector < 0) {
        snake.push(snake[snake.length - 1] + width)
      } else if (vector > 0) {
        snake.push(snake[snake.length - 1] - width)
      }
    }
  }




  document.addEventListener('keyup', (event) => {
    const key = event.key
      
    snakeMovements(key)
  })

  function snakeMovements(key) {
    if (key === 'd') {
      if (direction !== 'a') {
        direction = key.toLowerCase()
      }
    } else if (key === 'a') {
      if (direction !== 'd') {
        direction = key.toLowerCase()
      }
    } else if (key === 'w') {
      if (direction !== 's') {
        direction = key.toLowerCase()
      }
    } else if (key === 's') {
      if (direction !== 'w') {
        direction = key.toLowerCase()
      }
    }
  }

  function init() {
    movement = setInterval(moveSnake, currentSpeed)
  }

  init()

  function moveSnake() {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0] === snake[i]) {
        lost()
      }
    }
    if ((direction === 'd' || direction === 'D') && !(snake[0] % width === width - 1)) {
      eraseSnake()
      offsetSnake(1)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }
    } else if ((direction === 'd' || direction === 'D') && (snake[0] % width === width - 1)) {
      eraseSnake()
      offsetSnake(-width + 1)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }
    } else if ((direction === 'a' || direction === 'A') && !(snake[0] % width === 0)) {

      eraseSnake()
      offsetSnake(-1)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }
    } else if ((direction === 'a' || direction === 'A') && (snake[0] % width === 0)) {
      eraseSnake()
      offsetSnake(width - 1)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }
    } else if ((direction === 's' || direction === 'S') && !((snake[0] + width) >= (width * height))) {
      eraseSnake()
      offsetSnake(width)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }
    } else if ((direction === 's' || direction === 'S') && ((snake[0] + width) >= (width * height))) {
      eraseSnake()
      offsetSnake(- (height - 1) * width)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }
    } else if ((direction === 'w' || direction === 'W') && !(snake[0] < width)) {

      eraseSnake()
      offsetSnake(-width)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }

    } else if ((direction === 'w' || direction === 'W') && (snake[0] < width)) {
      eraseSnake()
      offsetSnake((height - 1) * width)
      drawSnake()
      if (snakeEats()) {
        extendSnake()
        if (currentSpeed > 200) {
          clearInterval(movement)
          currentSpeed -= 25
          movement = setInterval(moveSnake, currentSpeed)
        }
      }
    }
  }
  function lost() {
    alert('You Lose')
    clearInterval(movement)
    document.getElementById('game_board').style.display = 'none'
    document.getElementById('score_board').style.display = 'block'
    document.getElementById('highScores').style.display = 'block'
    document.getElementById('score_board').innerHTML = '<h1>YOUR SCORE IS: ' + score + '</h1>'
    let ranking = localStorage.getItem("ranking-Without-Walls")
    let rankingArray = JSON.parse(ranking)
    if (rankingArray === null) {
      rankingArray = []
    }
    let find = rankingArray.findIndex(element => element.name === playerName)
    if (find === -1) {
      rankingArray.push({ name: playerName, score: score })
    } else {
      if (score > rankingArray[find].score) {
        rankingArray[find] = { name: playerName, score: score }
      }
    }

    function compare(a, b) {
      if (a.score < b.score) {
        return 1
      }
      if (a.score > b.score) {
        return -1
      }
      return 0
    }
    rankingArray.sort(compare)
    localStorage.setItem("ranking-Without-Walls", JSON.stringify(rankingArray))
    for (let i = 0; i < rankingArray.length; i++) {
      document.getElementById('highScores').innerHTML += '<h2><br>' + '<ul>' + '<li>' + 'Name:' + ' ' + rankingArray[i].name + ' ' + 'Score:' + ' ' + rankingArray[i].score + '</li>' + '</h2>'

    }
  }
}




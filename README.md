# Project-1
### Software Engineering Immersive
Snake Game

# Overview
This was the first development project, as part of my education with GA's Software Engineering Immersive bootcamp.

The task was to **build one of the nine suggested grid based games** using JavaScript, CSS and HTML.

Seeing as im an avid naruto fan i chose snake as one of the characters is a snakelike.

This was a solo project and we were given one week to complete it.

If you love snake or naruto, please feel free to check out my game here! (https://shammyb.github.io/Project-1/ )

To start the game you need to chose is you want to play with or without walls and use the WASD keys to move the snake.


### The Brief

![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Snake

> **Difficulty level: 1**

![snake](https://media.git.generalassemb.ly/user/15120/files/4e9c4180-5144-11e9-944d-1b0b76a247c9)

Snake is a single-player game where the player earns points by guiding the snake to eat food randomly placed on the game board. Each item of food the snake eats the longer it grows. The game is over if the snake hits the edge of the board, or itself. To make things even more challenging, the snake increases speed as the longer it gets!

The aim of the game is to stay alive as long as possible.

## Resources

* [Most dramatic Snake gameplay ever](https://www.youtube.com/watch?v=lg2n2aiF3RY)
* [Snake (video game genre)](https://en.wikipedia.org/wiki/Snake_(video_game_genre))

## Requirements

* The snake should be able to eat food to grow bigger
* The game should end when the snake hits the wall or itself
* Snake speeds up as it eats more

## Suggested enhancements

* Responsive design
* Multi-player mode
* High score table

## Challenges

While not immediately obvious, the logic required to make the game work is relatively straightforward. Some of the enhancements are a little challenging, in particular making the game mobile-friendly.

## Tips

* Make sure you spend plenty of time planning _before_ you start coding
* Make sure you understand all of the rules of the game
* Make a checklist of all the features you want to add to the game
* Keep It Stupid Simple
* Refactor your code as you go
* Make sure you have a good idea of what your MVP is and only add extra features once you have achieved it
* Do just enough styling to get started, then once you have your MVP polish up the styling before moving on

### Technologies & frameworks used
JavaScript
CSS 
HTML

### Approach

Using Ziteboard I wrote out all the steps from creating the grid to getting the snake to move to extending the snake when it eats in pseudo code. As an MVP I decided to make the game with walls, and if i had time i would give the user an option to play without walls too!

### The Basics
To start this game I needed a grid and an array for the snake. This part was relatively simple as i created the grid and assigned 3 squares of those grids to the array. I did it like this:
```javascript
<div class="grid" id="game_board">
</div>
The above from the index.html file made a single square. i manipulated this in the snake.js file:
const grid = document.querySelector('.grid')
const width = 12
const height = 9 
for (let index = 0; index < width * height; index++) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / height}%`
  }
and assigned three parts of the snake like so...
let snake = [77, 78, 79]
```

### Drawing the snake
The most important part of any snake game is having a snake to play with. The snakes body will have to change based on the direction it is going. Looking back on this code now i could have done this in a much more tidy way. The key was to choose which picture i wanted dependant on the the other parts of the snake were as can be seen below:
```javascript
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
  ```
### Snake Movement
```javascript
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
```

Prior to creating the offset snake function the snake would  move weirdly if it had more than just a head as all the pieces would move in the same direction rather than following the bodypart before it. The offset function fixed that issue as can be seen below i created a copy of the snake and made the rest of the array equal the copy while the head would change. 
```javascript
function offsetSnake(offset) {
    const positions = [...snake]
    for (let i = 1; i < snake.length; i++) {
      snake[i] = parseInt(positions[i - 1])
    }
    snake[0] += offset
  }
```
### Extending the snake
This was the most challenging part of this project for me. The struggle was how and where do i insert the extra part of the body, and then insert it there. I thought back to GCSE mathematics and came to the conclusion that using vectors was the best way.
```javascript
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
```
### Snake Eats

Compared to the rest of the project this was fairly simple. Essentially if the head of the snake is equal to the food that it eats then it will call the function to extend the snake, erase the food and put the food somewhere else on the grid.
```javascript
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
  ```
This function is called whenever the snake moves

### Losing
Every time the snake moves there are conditions set to check if the player has lost. Once the player has lost the game will stop and you will be allerted that you have lost. You will then be able to submit your high score on local storage (you will only be able to see the scores on that browser) and you will see where you rank compared to others who have played on your device.This will also make the game board dissapear.

```javascript

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
```

### With and without walls

I had put both of these games in a fuction, one called with walls and one called without walls and assigned them to two buttons on top of the grid. The are very simmilar with some slight variations on the movement code. Aslo you will only be able to compatre scores of similar modes.


### final thoughts
Although this game was a great success, i would like to go back and add a few more features like a backend so users don't have to be on the same PC to compare high scores as it was done with local storage and make the game mobile friendly.




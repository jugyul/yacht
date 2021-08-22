const rollBtn = document.querySelector(".rollbtn")
const moveLefts = document.querySelectorAll(".move-left")
const rotates = document.querySelectorAll(".rotate")
const tipRotates = document.querySelectorAll(".tip-rotate")
const saveSpaces = document.querySelectorAll(".save-space")
const rollCount = document.querySelector(".roll-count div")
let currentDiceArray = []
let savedDiceArray = []
let currentEmptyPosition = []
let saveEmptyPosition = [0, 1, 2, 3, 4]
let rollBtnClickCount = 0
let phaseCount = 0
let turnCount = 1

const obj1 = {
  name: "rotate",
  size: "big",
  type: "random"
}
const obj2 = {
  name: "move-left",
  size: "small",
  type: "saved"
}
const obj3 = {
  name: "tip-rotate"
}

let TIME_ANIMATION_FINISHED
let TIME_ROLL_INTERVAL_FINISHED

let madeDiceCount = 0;

function clearDice() {
  const dices = document.querySelectorAll(`.${this.type}-dice`)
  dices.forEach(element => element.remove())
}

function makeDiceImage(number) {
  const dice = document.createElement("div")
  dice.classList.add(`${this.type}-dice`)
  dice.classList.add("emphazising")

  for (let i = 0; i < number; i++) {
    const pip = document.createElement("span")
    pip.classList.add("pip")
    pip.classList.add(`${this.size}-pip`)
    dice.appendChild(pip)
  }
  return dice
}


function moveToSaved(event) {
  //move dice in screen
  const clickedDice = event.target
  const foundDice = currentDiceArray.find(item => item.id === parseInt(clickedDice.id))
  const savedDice = makeDiceImage.call(obj2, foundDice.value)
  savedDice.id = foundDice.id

  currentEmptyPosition.push(foundDice.position)
  currentEmptyPosition.sort()
  const newPosition = parseInt(saveEmptyPosition.shift())
  foundDice.position = newPosition
  saveSpaces[newPosition].appendChild(savedDice)

  //move array item
  currentDiceArray = currentDiceArray.filter((item) => item.id !== parseInt(clickedDice.id))
  savedDiceArray.push(foundDice)
  savedDice.addEventListener("click", moveToRandom)

  clickedDice.remove()
}


function moveToRandom(event) {
  //move dice in screen
  if (rollBtnClickCount !== 3) {
    const clickedDice = event.target
    const foundDice = savedDiceArray.find(item => item.id === parseInt(clickedDice.id))
    const randomDice = makeDiceImage.call(obj1, foundDice.value)
    randomDice.id = foundDice.id

    saveEmptyPosition.push(foundDice.position)
    saveEmptyPosition.sort()
    const newPosition = parseInt(currentEmptyPosition.shift())
    foundDice.position = newPosition
    tipRotates[newPosition].appendChild(randomDice)

    //move array item
    savedDiceArray = savedDiceArray.filter((item) => item.id !== parseInt(clickedDice.id))
    currentDiceArray.push(foundDice)
    randomDice.addEventListener("click", moveToSaved)

    clickedDice.remove()
  }
}


function rollDice() {
  //make currentDiceArray
  const randomValue = Math.floor(Math.random() * 6 + 1)
  const currentDiceObject = {}
  currentDiceObject.value = randomValue
  currentDiceObject.id = Date.now()
  currentDiceObject.position = madeDiceCount
  currentDiceArray.push(currentDiceObject)

  //make RandomDices in screen
  const randomDice = makeDiceImage.call(obj1, randomValue)
  randomDice.id = currentDiceObject.id
  tipRotates[madeDiceCount].appendChild(randomDice)

  madeDiceCount++
  randomDice.addEventListener("click", moveToSaved)
}


function restartAnimation(element, index) {
  element.classList.remove(`${this.name}${index + 1}`)
  void element.offsetWidth,
    element.classList.add(`${this.name}${index + 1}`)
}


function automove() {
  const randomDices = document.querySelectorAll(".random-dice")
  randomDices.forEach((element) => element.remove())
  currentDiceArray.forEach(function (dice) {
    const savedDice = makeDiceImage.call(obj2, dice.value)
    const newPosition = parseInt(saveEmptyPosition.shift())
    saveSpaces[newPosition].appendChild(savedDice)
  })
}


function onRollBtnClick() {

  TIME_ANIMATION_FINISHED = 4500 - savedDiceArray.length * 500
  TIME_ROLL_INTERVAL_FINISHED = 550 - savedDiceArray.length * 100

  //clear dice
  clearDice.call(obj1)
  currentDiceArray = []
  madeDiceCount = 0;

  //reset animation 
  rotates.forEach(restartAnimation.bind(obj1))
  moveLefts.forEach(restartAnimation.bind(obj2))
  tipRotates.forEach(restartAnimation.bind(obj3))

  //reset postion 
  let positionArray = [0, 1, 2, 3, 4]
  currentEmptyPosition = (savedDiceArray.length === 0) ? [] : positionArray.slice(-(savedDiceArray.length))

  //hide table value
  const turnElements = document.querySelectorAll(".turn")
  turnElements.forEach(element => element.classList.add("hidden"))

  //make randomDices & show table  
  const rollInterval = setInterval(rollDice, 100)
  setTimeout(function () {
    clearInterval(rollInterval)
    showTable(turnElements)
  }, TIME_ROLL_INTERVAL_FINISHED)

  //block button for making id of random values & showing Table
  rollBtnClickCount++
  rollCount.innerText = rollBtnClickCount
  if (rollBtnClickCount < 3) {
    rollBtn.removeEventListener("click", onRollBtnClick)
    setTimeout(function () {
      rollBtn.addEventListener("click", onRollBtnClick)
    }, TIME_ANIMATION_FINISHED + 1000)
  } else {
    rollBtn.removeEventListener("click", onRollBtnClick)
    setTimeout(automove, TIME_ANIMATION_FINISHED)
  }

}

rollBtn.addEventListener("click", onRollBtnClick)








const allFakeValues = document.querySelectorAll(".fakevalue")
const subtotal = document.querySelectorAll(".subtotal")
const total = document.querySelectorAll(".total")
let subtotalScore = 0
let totalScore = 0

function checkBonus(bonusTurn) {
  bonusTurn.innerText = "✓"
  bonusTurn.classList.remove("check")

}

function fixTableValue(event) {
  const fakeValue = event.target
  const realValue = fakeValue.parentElement.querySelector(".realvalue")
  realValue.innerText = fakeValue.innerText

  const totalTurn = document.querySelector(".total-turn")
  totalScore = parseInt(totalTurn.innerText) + parseInt(fakeValue.innerText)
  totalTurn.innerText = totalScore

  if (fakeValue.className.includes("subvalue")) {
    //sum subtotal
    const subtotalTurn = document.querySelector(".subtotal-turn")
    subtotalScore = parseInt(subtotalTurn.innerText) + parseInt(fakeValue.innerText)
    subtotalTurn.innerText = `${subtotalScore}/63`

    if (subtotalScore >= 63) {
      setTimeout(checkBonus, 1000, subtotalTurn)
      subtotalTurn.classList.add("check")
    }
  }

  //fix & turn
  fakeValue.classList.add("fixed")
  allFakeValues.forEach(element => element.classList.toggle("turn"))
  allFakeValues.forEach(element => element.innerText = "")
  allFakeValues.forEach(element => element.removeEventListener("click", fixTableValue))
  subtotal.forEach(element => element.classList.toggle("subtotal-turn"))
  total.forEach(element => element.classList.toggle("total-turn"))

  phaseCount++
  if (phaseCount === 2) {
    phaseCount = 0
    turnCount++
    const turnNumber = document.querySelector(".turn-number")
    turnNumber.innerText = `${turnCount}/12`
  }

  //reset
  if (rollBtnClickCount === 3) { rollBtn.addEventListener("click", onRollBtnClick) }
  clearDice.call(obj1)
  clearDice.call(obj2)
  savedDiceArray = []
  currentEmptyPosition = []
  saveEmptyPosition = [0, 1, 2, 3, 4]
  rollBtnClickCount = 0
  rollCount.innerText = 0
}

const TIME_DUDUNG_ANIMATION_FINISHED = 500

function restartdudung(text) {
  text.classList.remove("hidden")
  text.parentElement.classList.remove("dudung")
  void text.parentElement.offsetWidth,
  text.parentElement.classList.add("dudung")
  setTimeout(function () {
    text.classList.add("hidden")
  }, TIME_DUDUNG_ANIMATION_FINISHED+1000)
}

let choice = 0
let countDiceNumber = []
let count = 0

function showTable(turnElements) {
  //counting
  countDiceNumber = []
  for (let i = 1; i <= 6; i++) {
    count = 0
    savedDiceArray.forEach(function (dice) {
      if (dice.value === i) { count++ }
    })
    currentDiceArray.forEach(function (dice) {
      if (dice.value === i) { count++ }
    })
    countDiceNumber.push(count)
  }

  //reveal table value
  setTimeout(function () {
    turnElements.forEach(element => element.classList.remove("hidden"))
  }, TIME_ANIMATION_FINISHED)


  //Aces~bonus
  for (let j = 0; j < 6; j++) {
    turnElements[j].innerText = (j + 1) * countDiceNumber[j]
    turnElements[j].addEventListener("click", fixTableValue)
  }

  //choice
  choice = 0;
  savedDiceArray.forEach((dice) => choice += dice.value)
  currentDiceArray.forEach((dice) => choice += dice.value)

  turnElements[6].innerText = choice
  turnElements[6].addEventListener("click", fixTableValue)


  const CONDITION_OF_4_OF_A_KIND = countDiceNumber.includes(4)
  const CONDITION_OF_FULL_HOUSE = (countDiceNumber.includes(3)) && (countDiceNumber.includes(2))
  const con1 = countDiceNumber.slice(0, 4).every(value => value >= 1) //1234
  const con2 = countDiceNumber.slice(1, 5).every(value => value >= 1) //2345
  const con3 = countDiceNumber.slice(2, 6).every(value => value >= 1) //3456
  const CONDITION_OF_SMALL_STRAIGHT = con1 || con2 || con3
  const con4 = countDiceNumber.slice(0, 5).every(value => value >= 1) //12345
  const con5 = countDiceNumber.slice(1, 6).every(value => value >= 1) //23456
  const CONDITION_OF_LARGE_STRAIGHT = con4 || con5
  const CONDITION_OF_YACHT = countDiceNumber.includes(5)
  
  const dudungText = document.querySelector(".dudung-text")

  setTimeout(function () {
    if (CONDITION_OF_YACHT) {
      dudungText.innerText = "Yacht"
      restartdudung(dudungText)
    } else if (CONDITION_OF_4_OF_A_KIND) {
      dudungText.innerText = "4 of a Kind"
      restartdudung(dudungText)
    } else if (CONDITION_OF_FULL_HOUSE) {
      dudungText.innerText = "Full House"
      restartdudung(dudungText)
    } else if (CONDITION_OF_LARGE_STRAIGHT) {
      dudungText.innerText = "Large Straight"
      restartdudung(dudungText)
    } else if (CONDITION_OF_SMALL_STRAIGHT) {
      dudungText.innerText = "Small Straight"
      restartdudung(dudungText)
    }
  }, TIME_ANIMATION_FINISHED)


  //4 of a Kind
  turnElements[7].innerText = CONDITION_OF_4_OF_A_KIND ? choice : "0"
  turnElements[7].addEventListener("click", fixTableValue)

  //Full House
  turnElements[8].innerText = CONDITION_OF_FULL_HOUSE ? choice : "0"
  turnElements[8].addEventListener("click", fixTableValue)

  //S.Straight
  turnElements[9].innerText = CONDITION_OF_SMALL_STRAIGHT ? "15" : "0"
  turnElements[9].addEventListener("click", fixTableValue)

  //L.Straight
  turnElements[10].innerText = CONDITION_OF_LARGE_STRAIGHT ? "30" : "0"
  turnElements[10].addEventListener("click", fixTableValue)

  //Yacht
  turnElements[11].innerText = CONDITION_OF_YACHT ? "50" : "0"
  turnElements[11].addEventListener("click", fixTableValue)

}


const cactus = document.querySelector(".cactus")
cactus.addEventListener("click", blinkEyes)

function blinkEyes(event) {
  for(let i = 0 ; i<2 ; i++){
  cactus.children[i].classList.remove("eyes")
  void cactus.children[i].offsetWidth,
  cactus.children[i].classList.add("eyes")
  }
}
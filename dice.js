const rollBtn = document.getElementById("rollBtn")
const finishBtn = document.getElementById("finishBtn")
let savedDiceValues = []
let countDicesValue = []
let rollBtnClickCount = 0

function moveToRandom(event) {
  if (rollBtnClickCount !== 3) {
    const clickedDice = event.target
    const value = clickedDice.innerText
    const newTryOfRolling = document.querySelector("#dices .randomDices .trialOfRolling")
    createRandomDice(value, newTryOfRolling)
    savedDiceValues = savedDiceValues.filter((value) => value.id !== clickedDice.id)
    clickedDice.remove()
  }
}

function saveValue(element) {
  const valueObj = {}
  valueObj.value = element.innerText
  valueObj.id = element.id
  savedDiceValues.push(valueObj)
}

function moveToSaved(event) {
  const clickedDice = event.target
  const savedDices = document.querySelector("#dices .savedDices")
  const savedDice = document.createElement("div")
  savedDice.classList.add("savedDice")
  savedDice.classList.add("clicked")
  savedDice.id = clickedDice.id
  savedDice.innerText = clickedDice.innerText
  savedDices.appendChild(savedDice)
  saveValue(clickedDice)
  savedDice.addEventListener("click", moveToRandom)
  clickedDice.remove()
}

function createRandomDice(value, newTryOfRolling) {
  const randomDice = document.createElement("div")
  randomDice.classList.add("randomDice")
  randomDice.classList.add("clicked")
  randomDice.innerText = value
  randomDice.id = Date.now()
  newTryOfRolling.appendChild(randomDice)
  randomDice.addEventListener("click", moveToSaved)
}

function resetDices() {
  const randomDices = document.querySelector("#dices .randomDices")
  const tryOfRolling = randomDices.querySelector(".trialOfRolling")
  tryOfRolling.remove()
  const newTryOfRolling = document.createElement("div")
  newTryOfRolling.classList.add("trialOfRolling")
  randomDices.appendChild(newTryOfRolling)
  return newTryOfRolling
}

function rolling(newTryOfRolling) {
  const value = Math.floor(Math.random() * 6 + 1)
  createRandomDice(value, newTryOfRolling)
}

function stopRolling(interval) {
  clearInterval(interval)
}

function onRollBtnClick() {
  const newTryOfRolling = resetDices() //가독성 ??
  const interval = setInterval(rolling, 100, newTryOfRolling)
  setTimeout(stopRolling, 550 - savedDiceValues.length * 100, interval)

  rollBtnClickCount++
  if (rollBtnClickCount === 3) {
    rollBtn.classList.add("hidden")
  }
}

rollBtn.addEventListener("click", onRollBtnClick)
finishBtn.addEventListener("click", onFinishBtnClick)




//table    
function analyzeDice(dice) {
  if (parseInt(dice.value) === i) {
    count++
  }
}
const subtotal = document.querySelectorAll(".subtotal")
const total = document.querySelectorAll(".total")
const bonus = document.querySelectorAll(".bonus")
let subtotalSum = 0
let totalScore = 0
function checkBonus(bonusTurn) {
  bonusTurn.innerText = "✓"
  bonusTurn.classList.remove("check")
}

const allFakeValue = document.querySelectorAll(".fakevalue")

function fixTableValue(event) {
  const fakeValue = event.target
  const realValue = fakeValue.parentElement.querySelector(".realvalue")
  realValue.innerText = fakeValue.innerText

  const totalTurn = document.querySelector(".total_turn")
  if (fakeValue.className.includes("subvalue")) {
    //sum subtotal
    const subtotalTurn = document.querySelector(".subtotal_turn")
    subtotalSum = parseInt(subtotalTurn.innerText) + parseInt(fakeValue.innerText)
    subtotalTurn.innerText = subtotalSum
    totalScore = parseInt(totalTurn.innerText) + parseInt(fakeValue.innerText)
    totalTurn.innerText = totalScore
    //bonus
    const bonusTurn = document.querySelector(".bonus_turn")
    bonusTurn.innerText = `${subtotalSum}/63`
    if (subtotalSum >= 63) {
      setTimeout(checkBonus, 1000, bonusTurn)
      bonusTurn.classList.add("check")
    }
  } else {
    totalScore = parseInt(totalTurn.innerText) + parseInt(fakeValue.innerText)
    totalTurn.innerText = totalScore
  }

  //fix & turn
  fakeValue.classList.add("fixed")
  allFakeValue.forEach(element => element.parentElement.classList.toggle("turn_color"))
  allFakeValue.forEach(element => element.classList.toggle("hidden"))
  allFakeValue.forEach(element => element.classList.toggle("turn"))
  allFakeValue.forEach(element => element.innerText = "")
  allFakeValue.forEach(element => element.removeEventListener("click", fixTableValue))
  subtotal.forEach(element => element.classList.toggle("subtotal_turn"))
  total.forEach(element => element.classList.toggle("total_turn"))
  bonus.forEach(element => element.classList.toggle("bonus_turn"))

  //reset
  const savedDices = document.querySelectorAll(".savedDice")
  savedDices.forEach(element => element.remove())
  rollBtn.classList.remove("hidden")
  countDicesValue = []
  savedDiceValues = []
  choice = 0
  rollBtnClickCount = 0

}

let count = 0
let i = 1
let choice = 0


function onFinishBtnClick() {
  //counting
  if ((rollBtnClickCount === 3) && (savedDiceValues.length === 5)) {
    for (i = 1; i <= 6; i++) {
      count = 0
      savedDiceValues.forEach(analyzeDice)
      countDicesValue.push(count)
    }

    //Aces~bonus
    const turnElement = document.getElementsByClassName("turn")
    for (let j = 0; j < 6; j++) {
      turnElement[j].innerText = (j + 1) * countDicesValue[j]
      turnElement[j].addEventListener("click", fixTableValue)
    }

    //choice
    savedDiceValues.forEach(dice => choice += parseInt(dice.value))
    turnElement[6].innerText = choice
    turnElement[6].addEventListener("click", fixTableValue)

    //4 of a Kind
    turnElement[7].innerText = (countDicesValue.includes(4)) ? choice : "0"
    turnElement[7].addEventListener("click", fixTableValue)

    //Full House
    turnElement[8].innerText = (countDicesValue.includes(3)) && (countDicesValue.includes(2)) ? choice : "0"
    turnElement[8].addEventListener("click", fixTableValue)

    //S.Straight
    const con1 = countDicesValue.slice(0.4).every(value => value >= 1) //1234
    const con2 = countDicesValue.slice(1, 5).every(value => value >= 1) //2345
    const con3 = countDicesValue.slice(2, 6).every(value => value >= 1) //3456
    turnElement[9].innerText = (con1 || con2 || con3) ? "15" : "0"
    turnElement[9].addEventListener("click", fixTableValue)

    //L.Straight
    const con4 = countDicesValue.slice(0.5).every(value => value >= 1) //12345
    const con5 = countDicesValue.slice(1, 6).every(value => value >= 1) //23456
    turnElement[10].innerText = (con4 || con5) ? "30" : "0"
    turnElement[10].addEventListener("click", fixTableValue)

    //Yacht
    turnElement[11].innerText = (countDicesValue.includes(5)) ? "50" : "0"
    turnElement[11].addEventListener("click", fixTableValue)

    //totalScore

  }

}
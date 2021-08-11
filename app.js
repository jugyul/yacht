const rollBtn = document.getElementById("rollBtn")
const savedDiceValues =[]

function createRandomDice(value, newTryOfRolling){
  const randomDice = document.createElement("div")
  randomDice.classList.add("randomDice")
  randomDice.innerText = value;
  newTryOfRolling.appendChild(randomDice)
  randomDice.addEventListener("click", onRanDiceClick)  
}

function onSavedDiceClick(event){
  const clickedDice = event.target
  const value = clickedDice.innerText
  const newTryOfRolling = document.querySelector("#dices .randomDices .trialOfRolling")
  createRandomDice(value, newTryOfRolling)
  clickedDice.remove()
}

function onRanDiceClick(event){
  const clickedDice = event.target
  const value = clickedDice.innerText //saved를 만들기
  savedDiceValues.push(value)
  const savedDices = document.querySelector("#dices .savedDices")
  const savedDice = document.createElement("div")
  savedDice.classList.add("savedDice")
  savedDice.innerText=value
  savedDices.appendChild(savedDice)
  savedDice.addEventListener("click", onSavedDiceClick)
  clickedDice.remove()
}

function resetDices(){
  const randomDices = document.querySelector("#dices .randomDices")
  const tryOfRolling = randomDices.querySelector(".trialOfRolling")
  tryOfRolling.remove()
  const newTryOfRolling = document.createElement("div")
  newTryOfRolling.classList.add("trialOfRolling")
  randomDices.appendChild(newTryOfRolling)
  return newTryOfRolling
}



function onRollBtnClick(){
  const newTryOfRolling = resetDices() //가독성 ??

  for (let i =0 ; i<5 ;i++){
    const value = Math.floor(Math.random()*6+1)
    createRandomDice(value, newTryOfRolling)
  }


}


rollBtn.addEventListener("click", onRollBtnClick)


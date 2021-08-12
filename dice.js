const rollBtn = document.getElementById("rollBtn")
let savedDiceValues =[]
let rollBtnClickCount=0


function createRandomDice(value, newTryOfRolling){
  const randomDice = document.createElement("div")
  randomDice.classList.add("randomDice")
  randomDice.classList.add("clicked")
  randomDice.innerText = value
  randomDice.id=Date.now()
  newTryOfRolling.appendChild(randomDice)
  randomDice.addEventListener("click", moveToSaved)  
}



function moveToRandom(event){
  const clickedDice = event.target
  const value = clickedDice.innerText
  const newTryOfRolling = document.querySelector("#dices .randomDices .trialOfRolling")
  createRandomDice(value, newTryOfRolling)
  savedDiceValues = savedDiceValues.filter((value)=>value.id !== clickedDice.id)
  clickedDice.remove()
}

function moveToSaved(event){
  const clickedDice = event.target
  const savedDices = document.querySelector("#dices .savedDices")
  const savedDice = document.createElement("div")
  savedDice.classList.add("savedDice")
  savedDice.classList.add("clicked")
  savedDice.id=clickedDice.id
  savedDice.innerText=clickedDice.innerText
  savedDices.appendChild(savedDice)
  saveValue(clickedDice)
  savedDice.addEventListener("click", moveToRandom)
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


function rolling (newTryOfRolling){
  const value = Math.floor(Math.random()*6+1)
  createRandomDice(value, newTryOfRolling)
}

function stopRolling(interval){
  clearInterval(interval)
}

function saveValue(element){
  const valueObj={}
  valueObj.value = element.innerText
  valueObj.id=element.id
  savedDiceValues.push(valueObj)
}

function onRollBtnClick(){
  const newTryOfRolling = resetDices() //가독성 ??
  const interval = setInterval(rolling,100,newTryOfRolling)
  setTimeout(stopRolling,510-savedDiceValues.length*100,interval)

  rollBtnClickCount++
  if( rollBtnClickCount===3){
    rollBtn.classList.add("hidden")
  
  }

}




rollBtn.addEventListener("click", onRollBtnClick)

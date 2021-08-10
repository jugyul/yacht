const randomValue = []
const rollingBtn = document.getElementById("rollingBtn")

function onRollingBtnClick(){
  for (let i =0 ; i<5 ;i++){
    const value = Math.floor(Math.random()*6+1)
    const randomDice = document.getElementById(`d${i}`);
    randomDice.innerText = value;
  }
}

rollingBtn.addEventListener("click", onRollingBtnClick)
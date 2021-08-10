const randomValue = []
const rollingBtn = document.getElementById("rollingBtn")

function onRollingBtnClick(){
  for (let i =0 ; i<5 ;i++){
    const value = Math.floor(Math.random()*6+1)
    randomValue.push(value)
  }
}

rollingBtn.addEventListener("click", onRollingBtnClick)
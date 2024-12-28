const h1DOM = document.querySelector("h1");
const boardDOM = document.getElementById("board");
const nCols = 7;
const nRows  = 6;
let currentPlayer = 1;

function createCircles (){
    for (let i = 0; i < nCols; i++){
        for (let j = 0; j < nRows; j++){
            const circleDiv = document.createElement("div");
            boardDOM.appendChild(circleDiv);
            circleDiv.classList.add("circle"); 
            circleDiv.setAttribute("id", i + "," + j)   
        }
    }
}

createCircles()

const circles = document.querySelectorAll(".circle");

boardDOM.addEventListener("click", (e) => {
    const clickedCircle = e.target;
    if (clickedCircle.classList.contains("circle")){
        const colIndex = parseInt(clickedCircle.id.match(/^(\d+),(\d+)$/)[0]);
        for (let rowIndex = nRows - 1; rowIndex >= 0; rowIndex--){
            const circle = document.getElementById(`${colIndex},${rowIndex}`);
            if (!circle.classList.contains("player-one") && !circle.classList.contains("player-two")){
                if (currentPlayer == 1){
                    circle.classList.add("player-one");
                    currentPlayer = 2;
                } else {
                    circle.classList.add("player-two");
                    currentPlayer = 1;
                }
                break;
            }
        }
    }
})
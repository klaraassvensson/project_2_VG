const h1DOM = document.querySelector("h1");
const boardDOM = document.getElementById("board");
const nCols = 7;
const nRows  = 6;
let currentPlayer = 1;

function createCircles (){
    for (let i = 0; i < nCols; i++){
        const columnDiv = document.createElement("div");
        boardDOM.appendChild(columnDiv);
        columnDiv.setAttribute("id", i + 1);
        columnDiv.classList.add("column")
        for (let j = 0; j < nRows; j++){
            const circleDiv = document.createElement("div");
            columnDiv.appendChild(circleDiv);
            circleDiv.classList.add("circle"); 
            circleDiv.setAttribute("id", i + "," + j)   
        }
    }
}

function checkWinner (){
    for (let row = 0; row < nRows; row++){
        for (let col = 0; col < nCols; col++){
            let circle = document.getElementById(`${col},${row}`);
            if (circle.classList.contains("player-one") || circle.classList.contains("player-two")){
                let playerClass = circle.classList.contains("player-one") ? "player-one" : "player-two";
            }
        }
    }
}

createCircles()

const columnsAll = document.querySelectorAll(".column");

columnsAll.forEach((e) => {
    e.addEventListener("click", () => {
        for (let i = 5; i >= 0; i--){
            let circle = e.children[i]
            if (!circle.classList.contains("player-one") && !circle.classList.contains("player-two")){
                if(currentPlayer == 1){
                    circle.classList.add("player-one");
                    currentPlayer = 2
                    break;
                } else if(currentPlayer == 2){
                    circle.classList.add("player-two");
                    currentPlayer = 1
                    break;
                }
                
            }
        }
        if (checkWinner()){
            console.log("hej")
        }
    })
})
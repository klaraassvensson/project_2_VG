const h1DOM = document.querySelector("h1");
const boardDOM = document.getElementById("board");
const resetButton = document.querySelector("button")
const title = document.querySelector("title");
const spanRed = document.querySelector("#redCounter");
const spanGreen = document.querySelector("#greenCounter");
const nCols = 7;
const nRows  = 6;
let currentPlayer = 1;
let counterRed = 0;
let counterGreen = 0;

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
                if (col + 3 < nCols &&
                    document.getElementById(`${col + 1},${row}`).classList.contains(playerClass) &&
                    document.getElementById(`${col + 2},${row}`).classList.contains(playerClass) &&
                    document.getElementById(`${col + 3},${row}`).classList.contains(playerClass)){
                        document.getElementById(`${col},${row}`).classList.add("winner")
                        document.getElementById(`${col + 1},${row}`).classList.add("winner");
                        document.getElementById(`${col + 2},${row}`).classList.add("winner");
                        document.getElementById(`${col + 3},${row}`).classList.add("winner");
                        return playerClass;
                }
                if (row + 3 < nRows &&
                    document.getElementById(`${col},${row + 1}`).classList.contains(playerClass) &&
                    document.getElementById(`${col},${row + 2}`).classList.contains(playerClass) &&
                    document.getElementById(`${col},${row + 3}`).classList.contains(playerClass)){
                        document.getElementById(`${col},${row}`).classList.add("winner");
                        document.getElementById(`${col},${row + 1}`).classList.add("winner");
                        document.getElementById(`${col},${row + 2}`).classList.add("winner");
                        document.getElementById(`${col},${row + 3}`).classList.add("winner");
                        return playerClass;
                }
                if(col + 3 < nCols && row + 3 < nRows &&
                    document.getElementById(`${col + 1},${row + 1}`).classList.contains(playerClass) &&
                    document.getElementById(`${col + 2},${row + 2}`).classList.contains(playerClass) &&
                    document.getElementById(`${col + 3},${row + 3}`).classList.contains(playerClass)){
                        document.getElementById(`${col},${row}`).classList.add("winner");
                        document.getElementById(`${col + 1},${row + 1}`).classList.add("winner");
                        document.getElementById(`${col + 2},${row + 2}`).classList.add("winner");
                        document.getElementById(`${col + 3},${row + 3}`).classList.add("winner");
                        return playerClass;
                }
                if(col - 3 >= 0 && row + 3 < nRows &&
                    document.getElementById(`${col - 1},${row + 1}`).classList.contains(playerClass) &&
                    document.getElementById(`${col - 2},${row + 2}`).classList.contains(playerClass) &&
                    document.getElementById(`${col - 3},${row + 3}`).classList.contains(playerClass)){
                        document.getElementById(`${col},${row}`).classList.add("winner");
                        document.getElementById(`${col - 1},${row + 1}`).classList.add("winner");
                        document.getElementById(`${col - 2},${row + 2}`).classList.add("winner");
                        document.getElementById(`${col - 3},${row + 3}`).classList.add("winner");
                        return playerClass;
                }
            }
        }
    }
    return null;
}

function checkGameOver (){
    for (let columnDiv of boardDOM.children){
        for (let rowDiv of columnDiv.children){
            if(!rowDiv.classList.contains("player-one") && !rowDiv.classList.contains("player-two")){
                return false;
            }
        }
    }
    return true;
}

function updatePlayersTurn (){
    if (currentPlayer == 1){
        h1DOM.textContent = "Röds tur"
        title.textContent = "Röds tur"
    } else {
        h1DOM.textContent = "Gröns tur"
        title.textContent = "Gröns tur"
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
        
        updatePlayersTurn();

        let winner = checkWinner();

        if (winner == "player-one"){
            h1DOM.textContent = `Röd vann`;
            title.textContent = "Röd vann";
            counterRed++;
            spanRed.textContent = counterRed;
        } else if (winner == "player-two"){
            h1DOM.textContent = `Grön vann`;
            title.textContent = "Grön vann";
            counterGreen++;
            spanGreen.textContent = counterGreen;
        } else if (checkGameOver()){
            h1DOM.textContent = "Game over - ingen vann"
            title.textContent = "Game over"
        }
    })
})

resetButton.addEventListener("click", () => {
    const circles = document.querySelectorAll(".circle");
    for (let circle of circles){
        circle.classList.remove("player-one", "player-two", "winner");
    }
    h1DOM.textContent = "Börja spela!"
})
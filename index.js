const h1DOM = document.querySelector("h1");
const connect4Squre = document.getElementById("connect4");
const nCols = 7;
const nRows  = 6;

function createCircles (){
    for (let i = 0; i < nCols; i++){
        for (let j = 0; j < nRows; j++){
            const circleDiv = document.createElement("div");
            connect4Squre.appendChild(circleDiv);
            circleDiv.classList.add("circle"); 
            circleDiv.setAttribute("id", [i, j])   
        }
    }
}

createCircles()

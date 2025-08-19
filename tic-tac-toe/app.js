let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;// playerO turn else playerX's

//track winning patterns in 2D array
const winPatterns =[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
// add eventlistener for each button click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        //console.log("box was clicked");
        //if turnO is true =>playerO => print O on box
        if(turnO){
            box.innerText="O";
            turnO=false;
        }
        //else it's playerX turn => print X
        else{
            box.innerText="X";
            turnO=true;
        }
        //to ensure the button isn't changed after one press- disable it after 1 use
        box.disabled = true;

        //track if any player won 
        checkWinner();
    }); 
});

const disableBoxes=() => {
    for(let box of boxes) {
        box.disabled = true;
    }
};
const enableBoxes=() => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner=()=>{
    for(let pattern of winPatterns){
    //     console.log(pattern[0], pattern[1], pattern[2]);
    //     console.log(
    //         boxes[pattern[0]].innerText,
    //         boxes[pattern[1]].innerText,
    //         boxes[pattern[2]].innerText); //check value in 0th box by box[pattern[0]]
    // 
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        //box is not empty 
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            //check if it has same value
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
};

const resetGame=() => {
    turnO =  true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

//resetGame func is triggered when new Game/ reset Game btn is clicked
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
// remember to block player input during sequence getting played 

let buttons=document.querySelectorAll(".button")
let score = document.querySelector("#score-count");
let audios={};
    audios["audio0"]= new Audio("../sounds/sound (1).mp3")
    audios["audio1"] = new Audio("../sounds/sound (2).mp3");
    audios["audio2"] = new Audio("../sounds/sound (3).mp3");
    audios["audio3"] = new Audio("../sounds/sound (4).mp3");
    audios["audio4"] = new Audio("../sounds/sound (5).mp3");

// button sequence player should memorize
let baseArray=[];
// player input 
let playerArray=[];
// edit this later
// block pressing buttons during the sequence getting played
let blockBtn= true;
let index=0;

let level = 2;

round();


//////////////////////////////
///////// functions //////////
//////////////////////////////

function round() {
    resetValues();
    //it makes the sequence that player should remember
    fillBaseArray();
    //play the sequence to the play so he can memeorize it
    playSequence();

    setInterval(checkForMatch, 500);
}

function fillBaseArray() {
    buttons.forEach(button =>button.removeEventListener("click", buttonClicked));
    baseArray = [];
    for (let i = 0; i < level; i++) {
        let randomNum = Math.floor(Math.random() * 5);
        baseArray.push(randomNum);
    }
}

// playing the seqence so the player can memorize them
function playSequence(){
    pressing(index);
    index+=1;
    setTimeout(()=>{
        if(index<baseArray.length){
            playSequence(index);
        }

        if(index===baseArray.length){
            buttons.forEach(button =>button.addEventListener("click", buttonClicked));
        }
    },1300);
}

// does the effect of pressing
function pressing(index){
    let btnNum=baseArray[index];
    let button=buttons[btnNum];
    playSound(btnNum);
    button.classList.add("clicking-button");
    changeBodyColor(button);
    setTimeout(()=> {
        button.classList.remove("clicking-button");
    },600);
}

function playSound(num){
    audios["audio"+num].play();
}

function buttonClicked() {
    changeBodyColor(this);
    if(playerArray.length<baseArray.length){
        let btnNum = Number(this.dataset.num);
        playerArray.push(btnNum);
        playSound(btnNum);
    }
}

function changeBodyColor(buttonNumber){
    let button=buttonNumber;
    let cssColor= getComputedStyle(button);
    document.body.style.background = cssColor.background;
}

function checkForMatch() {
    if (checkArrays(playerArray, baseArray)) {
        level++;
        score.innerHTML=level;
        round();
    }    
}

function checkArrays(playerArr, baseArr){
    if (playerArr.length !== baseArr.length) return false;
    for( let i=0;i<baseArr.length;i++){
        if(baseArr[i]!==playerArr[i]){
            let myWindow=window.open("../start&end-pages/game-over.html","_self");
        }    
    }
    return true;
}

function resetValues(){
    index=0;
    blockBtn=true;
    playerArray=[]
    baseArray=[];
}
// remember to block player input during sequence getting played 

let buttons=document.querySelectorAll(".button")
let score = document.querySelector("#score-count");
let audios={};

    for(let i =0; i<4;i++){
        audios[`audio${i}`]= new Audio(`../sounds/sound (${i}).wav`)
    }

// button sequence player should memorize
let baseArray=[];
// player input 
let playerArray=[];
// index of buttons 
let index=0;
// number of buttons clicked on a round
let level = 2;
// block button of getting clicked
let blockBtn=true;
// to loop and run round function again;
let anotherRound=true;

while(anotherRound){
    round();
}



//////////////////////////////
///////// functions //////////
//////////////////////////////

function round(){
    anotherRound=false;
    resetValues();
    //it makes the sequence that player should remember
    fillBaseArray();
    //play the sequence to the play so he can memeorize it
    playSequence();
    // checks if the player's array is equal to 
    let checkMatch=setInterval(checkForMatch(),100);
}

function resetValues() {
    anotherRound=true;
    blockBtn=true;
    index = 0;
    playerArray = [];
    baseArray = [];
}

function fillBaseArray() {
    baseArray = [];
    for (let i = 0; i < level; i++) {
        let randomNum = Math.floor(Math.random() * 4);
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
            clickBtn=false;
        }
        
    },1300);
}

// does the effect of pressing
function pressing(num){
    let btnNum=baseArray[num];
    let button=buttons[btnNum];
    playSound(btnNum);
    button.classList.add("clicking-button");
    setTimeout(()=> {
        button.classList.remove("clicking-button");
    },700);
}

function playSound(num){
    console.log(audios);
    console.log(num);

    audios["audio"+num].play();
}

function clickBtn(num) {
    let button=buttons[num];
    if (!blockBtn) {
        playerArray.push(num);
        button.classList.add("clicking-button");
        setTimeout(() => {
        button.classList.remove("clicking-button");
        }, 100);
        playSound(num);
    }
}

function checkInput(){
    if(playerArray.length!==baseArray.length) return;
    
    if(checkForMatch()){
        clearInterval(checkForMatch);
        resetValues();
        level++;
    }else{
        window.location.href="../start&end-pages/game-over.html"
    }
}


function checkForMatch(){
    for( let i=0;i<baseArray.length;i++){
        if(baseArray[i]!==playerArray[i]){
            return false;    
        }    
    }
    return true;
}

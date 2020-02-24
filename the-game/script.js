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
// blocks the player of pressing buttons
// let blockBtn= true;
// to keep the while loop looping and calling round function
let index=0;
let level = 2;

//////////////////////////////
///////// functions //////////
//////////////////////////////

function round() {
    resetValues();
    //it makes the sequence that player should remember
    fillBaseArray();
    //play the sequence to the play so he can memeorize it
    playSequence();
    // checks if the player's array is equal to 
    checkInput();    
}

function resetValues() {
    index = 0;
    // blockBtn = true;
    playerArray = [];
    baseArray = [];
}

function fillBaseArray() {
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
    },1300);
}

// does the effect of pressing
function pressing(index){
    let btnNum=baseArray[index];
    let button=buttons[btnNum];
    playSound(btnNum);
    button.classList.add("clicking-button");
    setTimeout(()=> {
        button.classList.remove("clicking-button");
    },700);
}

function playSound(num){
    audios["audio"+num].play();
}

function clickBtn(val) {
    baseArray=[1,3,4,5,1,1,1,1,1,1,1,1,1,1,1,1,1]
    let button=buttons[val];
    if (playerArray.length < baseArray.length) {
        playerArray.push(val);
        button.classList.add("clicking-button");
        setTimeout(() => {
        button.classList.remove("clicking-button");
        }, 100);
        playSound(val);
    }
    console.log(playerArray)
}

function checkForMatch(playerArr, baseArr){
    for( let i=0;i<baseArr.length;i++){
        if(baseArr[i]!==playerArr[i]){
            return false;    
        }    
    }
    return true;
}

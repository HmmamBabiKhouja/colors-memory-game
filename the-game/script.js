//////////////////////////////
/////// DOM variables ////////
//////////////////////////////

let buttons=document.querySelectorAll(".button")
let score = document.querySelector("#score-count");

//////////////////////////////
////////// globals ///////////
//////////////////////////////

// objects of sounds will be played when the button is clicked
let audios={};
for (let i = 0; i < buttons.length; i++) {
    audios[`audio${i}`] = new Audio(`../sounds/sound (${i}).wav`);
}

// button sequence player should memorize
let baseArray=[];
// player input 
let playerArray=[];
// number of buttons clicked on a round
let level = 2;
/* block button of getting clicked
let blockBtn=true; */
// to loop and run round function again;
let anotherRound=true;

while(anotherRound){
    round();
}

//////////////////////////////
///////// functions //////////
//////////////////////////////

function round(){
    resetValues();
    anotherRound=false;
    //it makes the sequence that player should remember
    fillBaseArray();
    //little delay between rounds
    setTimeout(()=>{},250);
    //play the sequence to the play so he can memeorize it
    playSequence();
    window.inputInterval = setInterval(checkInput(), 500);
}

function resetValues() {
    buttons.forEach(button => button.removeEventListener("click",clickBtn));
    anotherRound=true;
    baseArray = [];
}

function fillBaseArray() {
    baseArray = [];
    for (let i = 0; i < level; i++) {
        let randomNum = Math.floor(Math.random() * buttons.length);
        baseArray.push(randomNum);
    }
}

// playing the seqence so the player can memorize them
function playSequence(){
    let index=0;
    let keepPressing=setInterval(function(){
        if(index<baseArray.length){
            pressing(index);
            index++;
        }else if(index===baseArray.length){
            clearInterval(keepPressing);
            buttons.forEach((button)=> button.addEventListener("click",clickBtn));
        }
    }, 1200)
}

// does the effect of pressing
function pressing(num){
    let btnNum=baseArray[num];
    let button=buttons[btnNum];
    button.classList.add("clicking-button");
    playSound(btnNum);
    setTimeout(()=> {
        button.classList.remove("clicking-button");
    },1000);
}

function playSound(num){
    audios["audio"+num].play();
}

function clickBtn() {
        let num=this.dataset.num;
        playerArray.push(num);
        button.classList.add("clicking-button");
        setTimeout(() => {  
            button.classList.remove("clicking-button");
        }, 100);
        playSound(num);
        //input length is equal with baseArray
        if(playerArray.length===level) checkInput();
}

function checkInput(){    
    if(checkForMatch()){
        resetValues();
        level++;
        clearInterval(inputInterval);
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

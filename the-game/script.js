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

// sequence players should memorize
let baseArray=[];
// player input should be identical to baseArray
let playerArray=[];
let level = 2;
// or flag;
let anotherRound=true;

//////////////////////////////
///////// the-game //////////
//////////////////////////////

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
    setTimeout(()=>{},400);
    //play the sequence to the play so he can memeorize it
    playSequence();
}

function resetValues(){
    buttons.forEach(button => button.removeEventListener("click",clickBtn));
    anotherRound=true;
    baseArray = [];
    playerArray=[];
}

function fillBaseArray() {
    baseArray = [];
    for (let i = 0; i < level; i++) {
        let randomNum = Math.floor(Math.random() * buttons.length);
        baseArray.push(randomNum);
    }
}

// playing the seqence to user
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
    }, 1050)
}

// does the effect of pressing
function pressing(num){
    let btnNum=baseArray[num];
    let button=buttons[btnNum];
    button.classList.add("clicking-button");
    playSound(btnNum);
    setTimeout(()=> {
        button.classList.remove("clicking-button");
    },850);
}

function playSound(num){
    audios["audio"+num].play();
}

// gets user's input, 
function clickBtn() {
    let num = Number(this.dataset.num);
    playerArray.push(num);
    buttons[num].classList.add("clicking-button");
    setTimeout(() => {
        buttons[num].classList.remove("clicking-button");
    }, 100);
    playSound(num);
    if (playerArray.length === baseArray.length) {
        if (checkForMatch()) {
        resetValues();
        score.innerHTML=level+=1;
        round();
        } else if (!checkForMatch()) {
            let myWindow=window.location.href = "../start&end-pages/game-over.html";
        }
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

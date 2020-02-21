let buttons=document.querySelectorAll(".button")

buttons.forEach(button => button.addEventListener("click", buttonClicked))

// the array we create to make the player try memorize it
let baseArray=[];
// edit this later
let level=3;
// start from 0
let i = 0;

round();


//////////////////////////////
///////// functions //////////
//////////////////////////////

function round(){
    //it makes the sequence that player should remember
    fillBaseArray();
    //play the sequence to the play so he can memeorize it
    
    playSequence(i);
}



function buttonClicked() {
    changeBodyColor(this);

}

function changeBodyColor(buttonNumber){
    let button=buttonNumber;
    let cssColor= getComputedStyle(button);
    document.body.style.background = cssColor.background;
}

function fillBaseArray(){
    baseArray=[];
    for( let i =0;i<level;i++){
        let randomNum=Math.floor(Math.random()*level);
        baseArray.push(randomNum);
    }
}

// playing the seqence so the player can memorize them
function playSequence(index){
    clickButton(index);
    index+=1;
    setTimeout(()=>{
        if(index<baseArray.length){
            playSequence(index);
        }
    },2500);
}

// does the effect of pressing
function clickButton(index){
    let button=buttons[baseArray[index]];
    button.classList.add("clicking-button");
    setTimeout(()=> {
        button.classList.remove("clicking-button");
    },2000);
} 
// function checkArrays(baseArr, playerArr){
//     for( let i=0;i<baseArr.length;i++){
//         if(baseArr[i]!==playerArr[i]) return false;
//     }
//     return true;
// }

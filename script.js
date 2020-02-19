let buttons=document.querySelectorAll(".button")

buttons.forEach(button => button.addEventListener("click", buttonClicked))

// the array we create to make the player try memorize it
let baseArray=[];

// edit this later
let level=3;
round();


/********************
 **** functions ***** 
 ********************/

function round(){
    fillBaseArray();

    buttons.forEach(button => {
        // light buttons up for user so he can memeorize them
    })
}



function buttonClicked() {
    changeBodyColor(this);

}

function changeButtonsColor() {
    
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
        baseArray.push(randomNum+1);
    }
}



// // the array that we get from user input 
// let playerArray=[];


// (function round(){
//     fillBaseArray();
//     console.log(baseArray);
//     playerArray=[];

//     level++;
// })()





// function checkArrays(baseArr, playerArr){
//     for( let i=0;i<baseArr.length;i++){
//         if(baseArr[i]!==playerArr[i]) return false;
//     }
//     return true;
// }


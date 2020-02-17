let buttons=document.querySelectorAll(".button")

buttons.forEach(button => button.addEventListener("click", changeColor))

function changeColor(){
    let button=this;
    let cssColor= getComputedStyle(button);
    document.body.style.background = cssColor.background;
}

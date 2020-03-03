let randomColorPicker=Math.floor(Math.random()*989)+10;
// for colors contrast the 10 added so the background wouldn't get close to my logo color

let color=`hsl(${randomColorPicker},100%, 72%)`

document.body.style.background=color; 

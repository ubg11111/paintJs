const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const resets = document.getElementById("jsReset");
const saveBtn = document.getElementById("jsSave");

const INITIA_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;


ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIA_COLOR;
ctx.fillStyle = INITIA_COLOR;
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;
let resetmod = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
  } else{
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

function onMouseEnter(event){
  x = event.offsetX;
  y = event.offsetY;
  ctx.moveTo(x,y);
}

function handleColorClick(event){ 
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else{
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
  } else{

  }
}
function handleResetStart(){
  if(resetmod === false){
    window.location.reload();
  }
}

function handleCM(event){
  event.preventDefault()
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJs!!";
  link.click();
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseEnter", onMouseEnter);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
  color.addEventListener("click", handleColorClick)
);

if(range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(resets){
  resets.addEventListener("click", handleResetStart);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}
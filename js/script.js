/***
selecting elements
***/

const nameField = document.getElementById('name');
const otherJobRole = document.getElementById('other-title');
const colorOptionsDiv = document.getElementById('colors-js-puns')
const colorOptionsField = document.getElementById('color');
const designField = document.getElementById('design'); 
const designTheme = document.querySelectorAll('#design option');


/***
initial styling
***/

//Name Field Styling
window.addEventListener('load', ()=>{nameField.focus()}); //puts focus on the name field when page is loaded

//Job Role Styling
otherJobRole.style.display = 'none'; //hides the text input field initially

//T-Shirt Info -> Color Option Styling
const chooseColor = document.createElement('option'); //creates a new option for colors
chooseColor.textContent = 'Pick a color'; //sets the text of that option
colorOptionsField.insertBefore(chooseColor, colorOptionsField.firstElementChild); //inserts that option
const allColorOptions = document.querySelectorAll('#color option'); //selects all color options, including the newly created one
allColorOptions[0].selected = true; //selects the newly created option
colorOptionsDiv.style.display = 'none' //hides the color field initially 
designField.addEventListener('change', ()=> {colorOptionsDiv.style.display = 'block'}) //shows color field once a theme gets selected

/*** 
TO DO: limiting color options based on selected theme 
***/



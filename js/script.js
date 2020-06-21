/***
selecting elements
***/

const nameField = document.getElementById('name');
const otherJobRole = document.getElementById('other-title');
const colorOptionsDiv = document.getElementById('colors-js-puns')
const colorOptionsField = document.getElementById('color');
const color = document.querySelectorAll('#color option')
const designField = document.getElementById('design'); 
const designTheme = document.querySelectorAll('#design option');
const jobRoleField = document.getElementById('title');
const jobRole = document.querySelectorAll('#title option');


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
colorOptionsDiv.style.display = 'none'; //hides the color field initially 
designField.addEventListener('change', ()=> {colorOptionsDiv.style.display = 'block'}) //shows color field once a theme gets selected

/*** 
Display Input Field for 'other' Job Role
***/

jobRoleField.addEventListener('change', ()=>{
    if (jobRole[5].selected) {otherJobRole.style.display = 'block';} //displays input field for 'other' job role gets selected
    else {otherJobRole.style.display = 'none'; } //Hides it again if another job role than 'other' gets selected
})

/*** 
limiting color options based on selected theme 
***/
designField.addEventListener('change', ()=> {
    for (let j = 0; j < color.length; j++) {color[j].style.display = 'block'} //resets the list of color options
    for (let i = 0; i < designTheme.length; i++) {
        if (designTheme[0].selected) {colorOptionsDiv.style.display = 'none'} //hides color options if "Select Theme" gets selected
        else if (designTheme[i].selected && designTheme[i].value === 'js puns') {
            color[3].style.display = 'none';
            color[4].style.display = 'none';
            color[5].style.display = 'none';
        }
        else if (designTheme[i].selected && designTheme[i].value === 'heart js') {
            color[0].style.display = 'none';
            color[1].style.display = 'none';
            color[2].style.display = 'none';
        }
    }
    })



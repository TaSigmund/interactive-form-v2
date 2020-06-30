/***
Selecting Elements
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
const activitiesCheckboxes = document.querySelectorAll('.activities input'); 
const activities = document.querySelector('.activities'); //chooses the entire fieldset
let total = 0; //keeps track of the total cost of activities


/***
Initial Styling
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
Display Input Field For 'Other' Job Role
***/

jobRoleField.addEventListener('change', ()=>{
    if (jobRole[5].selected) {otherJobRole.style.display = 'block';} //displays input field for 'other' job role gets selected
    else {otherJobRole.style.display = 'none'; } //Hides it again if another job role than 'other' gets selected
})

/*** 
Limiting Color Options Based On Selected Theme 
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

/*** 
Filtering Activities Based On Checkbox Selection
***/

//listening for events on the entire fieldset
document.querySelector('.activities').addEventListener('change', (e) => {      
    const clicked = e.target;
    //the clicked checkbox gets checked for whether it is already checked or not (condition). The conflicting appointments get greyed out or are made available again (code block)
    if (activitiesCheckboxes[1] === clicked && activitiesCheckboxes[1].checked === true) {activitiesCheckboxes[3].disabled = true}
    else if (activitiesCheckboxes[1] === clicked && activitiesCheckboxes[1].checked === false) {activitiesCheckboxes[3].disabled = false}
    if (activitiesCheckboxes[2] === clicked && activitiesCheckboxes[2].checked === true) {activitiesCheckboxes[4].disabled = true}
    else if (activitiesCheckboxes[2] === clicked && activitiesCheckboxes[2].checked === false) {activitiesCheckboxes[4].disabled = false}
    if (activitiesCheckboxes[3] === clicked && activitiesCheckboxes[3].checked === true) {activitiesCheckboxes[1].disabled = true}
    else if (activitiesCheckboxes[3] === clicked && activitiesCheckboxes[3].checked === false) {activitiesCheckboxes[1].disabled = false}
    if (activitiesCheckboxes[4] === clicked && activitiesCheckboxes[4].checked === true) {activitiesCheckboxes[2].disabled = true}
    else if (activitiesCheckboxes[4] === clicked && activitiesCheckboxes[4].checked === false) {activitiesCheckboxes[2].disabled = false}
    
    if (activities.lastElementChild.textContent.startsWith("Total:")) {activities.removeChild(activities.lastElementChild)}; //removes the total price info once it gets updated
   
    for (let i = 0; i < activitiesCheckboxes.length; i++){
         if (activitiesCheckboxes[i] === clicked && activitiesCheckboxes[i].checked === true) 
                {total += parseInt(activitiesCheckboxes[i].getAttribute('data-cost'))} //adds up the cost of all checked activities
            else if (activitiesCheckboxes[i] === clicked && activitiesCheckboxes[i].checked === false) 
                {total -= parseInt(activitiesCheckboxes[i].getAttribute('data-cost'))} //subtracts the cost of all unchecked activities
    }
    
    if (total > 0) //makes sure the total is only displayed when it is not 0
    {let totalCost = document.createElement('p'); 
    totalCost.textContent = `Total: ${total}`;
    activities.appendChild(totalCost)} //displays the total amount under the checkboxes
})










/***
Selecting Elements
***/

const form = document.querySelector('form');
const nameField = document.getElementById('name');
const email = document.getElementById('mail');
const otherJobRole = document.getElementById('other-title');
const colorOptionsDiv = document.getElementById('colors-js-puns')
const colorOptionsField = document.getElementById('color');
const color = document.querySelectorAll('#color option')
const designField = document.getElementById('design'); 
const designTheme = document.querySelectorAll('#design option');
const jobRoleField = document.getElementById('title');
const jobRole = document.querySelectorAll('#title option');

//activities
const activitiesCheckboxes = document.querySelectorAll('.activities input'); 
const activities = document.querySelector('.activities'); //chooses the entire fieldset
let total = 0; //keeps track of the total cost of activities

//payment
const paymentField = document.getElementById('payment');
const selectPaymentMethod = document.querySelectorAll('#payment option'); //Selects the payment options
const creditCardInfo = document.getElementById('credit-card');
const creditCardNumberField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const paypalInfo = document.getElementById('paypal');
const bitcoinInfo = document.getElementById('bitcoin');


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
    const dayAndTimeClicked = clicked.getAttribute('data-day-and-time'); //checks when the event that has been chosen is scheduled 
  
    for (let i = 0; i < activitiesCheckboxes.length; i++){

        //this part of the loop checks for conflicting events
        let dayAndTime = activitiesCheckboxes[i].getAttribute('data-day-and-time'); //checks when each event has been scheduled
        if (dayAndTime === dayAndTimeClicked && activitiesCheckboxes[i] !== clicked && activitiesCheckboxes[i].disabled === true) { //checks whether the event has been greyed out but should no longer be since the conflicting event is no longer selected
            activitiesCheckboxes[i].disabled = false
        } 
        else if (dayAndTime === dayAndTimeClicked && activitiesCheckboxes[i] !== clicked) { //an event should be greyed out if a conflicting event is selected
            activitiesCheckboxes[i].disabled = true
        } 

        //this part of the loop calculates the price total for all selected events
        if (activitiesCheckboxes[i] === clicked && activitiesCheckboxes[i].checked === true) { //adds up the cost of all checked activities
             total += parseInt(activitiesCheckboxes[i].getAttribute('data-cost'))
            } 
        else if (activitiesCheckboxes[i] === clicked && activitiesCheckboxes[i].checked === false) { //subtracts the cost of all unchecked activities
                total -= parseInt(activitiesCheckboxes[i].getAttribute('data-cost'))
            } 
    }

    if (activities.lastElementChild.textContent.startsWith("Total:")) { //removes the total price info once it gets updated
        activities.removeChild(activities.lastElementChild)
    }; 
    
    if (total > 0) { //makes sure the total is only displayed when it is not 0
        let totalCost = document.createElement('p'); 
        totalCost.textContent = `Total: ${total}`;
        activities.appendChild(totalCost) //attaches a display of the total amount underneath the checkboxes
    } 
}
)


/*** 
Payment options
***/

selectPaymentMethod[0].style.display = 'none'; //'Select Payment Option' does not appear in the drop down menu

//initially only the credit card fields appear
creditCardInfo.style.display = 'block';
paypalInfo.style.display = 'none';
bitcoinInfo.style.display = 'none';

//depending on what payment option the user selects the corresponding field becomes visible and the other fields are hidden
paymentField.addEventListener('change', () => {
for (let i = 0; i < selectPaymentMethod.length; i++) {
  if (selectPaymentMethod[i].selected && selectPaymentMethod[i].value === 'credit card') {
        creditCardInfo.style.display = 'block';
        paypalInfo.style.display = 'none';
        bitcoinInfo.style.display = 'none';
   }
   else if (selectPaymentMethod[i].selected && selectPaymentMethod[i].value === 'paypal') {
    creditCardInfo.style.display = 'none';
    paypalInfo.style.display = 'block';
    bitcoinInfo.style.display = 'none';
    }
    else if (selectPaymentMethod[i].selected && selectPaymentMethod[i].value === 'bitcoin') {
    creditCardInfo.style.display = 'none';
    paypalInfo.style.display = 'none';
    bitcoinInfo.style.display = 'block';
    }
}})

/*** 
Validation
***/

const nameFieldValidator = () => {
    if (nameField.value.length > 0) { //checks whether the user has typed something into the name field
        nameField.style.borderColor = "white"; return true
    } 
    else {
        nameField.style.borderColor = "red"; return false
    }
}

const emailFieldValidator = () => {
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i; //defines how an e-mail should be formatted
    if (emailRegex.test(email.value)){//checks whether the typed in mail address fits that definition
         email.style.borderColor = "white"; return true;
    } 
    else {
        email.style.borderColor = "red"; return false;
    }
}

const activitiesValidator = () => {
   for (let i = 0; i < activitiesCheckboxes.length; i++) {
       if (activitiesCheckboxes[i].checked) {activities.style.borderColor = 'white'; return true}
   }
   activities.firstElementChild.style.color = 'red'; //this line only gets executed if no checkbox has been checked 
   return false; 
}

const creditCardValidator = () => {
    const creditCardNumberRegex = /^\d{13}(\d{3})?$/
    if (creditCardNumberRegex.test(creditCardNumberField.value)){
    creditCardNumberField.style.borderColor = "white"; return true;
    }
    else {
        creditCardNumberField.style.borderColor = "red"; return false;
    }
}

const zipValidator = () => {
    const zipRegex = /^\d{5}$/
    if (zipRegex.test(zipField.value)){
        zipField.style.borderColor = "white"; return true;
    }
    else {
        zipField.style.borderColor = "red"; return false;
    }
    }

const cvvValidator = () => {
    const cvvRegex = /^\d{3}$/
    if (cvvRegex.test(cvvField.value)){
        cvvField.style.borderColor = "white"; return true;
    }
    else {
        cvvField.style.borderColor = "red"; return false;
    }
    }

form.addEventListener('submit', (e)=>{
    //each conditional checks the return value of the function and stops submission if it is false
nameFieldValidator();
if (!nameFieldValidator()) {e.preventDefault(); console.log('A name is missing')} 

emailFieldValidator();
if (!emailFieldValidator()) {e.preventDefault(); console.log('That is not an e-mail address')}

activitiesValidator();
if (!activitiesValidator()) {e.preventDefault(); console.log('No activity has been chosen')}

creditCardValidator();
if (!creditCardValidator()) {e.preventDefault(); console.log('That is not a credit card number')}

zipValidator();
if (!zipValidator()) {e.preventDefault(); console.log('That is not a ZIP code')}

cvvValidator();
if (!cvvValidator()) {e.preventDefault(); console.log('That is not a cvv number')}
})




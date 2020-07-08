/***
GLOBAL VARIABLES
***/

const form = document.querySelector('form');

//text fields
const nameField = document.getElementById('name');
const emailField = document.getElementById('mail');
const otherJobRole = document.getElementById('other-title');

//select menues
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
INITIAL STYLING
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
'OTHER' JOB ROLE
***/

jobRoleField.addEventListener('change', ()=>{
    if (jobRole[5].selected) {otherJobRole.style.display = 'block';} //displays input field for 'other' job role gets selected
    else {otherJobRole.style.display = 'none'; } //Hides it again if another job role than 'other' gets selected
})

/*** 
LIMITING COLOR OPTIONS BASED ON SELECTED THEME
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
FILTERING ACTIVITIES BASED ON CHECKBOX SELECTION
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
FILTERING PAYMENT OPTIONS BASED ON SELECTION
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
VALIDATION
***/

/* 
function to test every field for it's corresponding regex
*/
function regexTest (regex, formField) {
    if (regex.test(formField.value)){   //checks whether the typed information matches the regex
    formField.style.borderColor = "white"; return true;
    } 
    else {
   formField.style.borderColor = "red"; return false;
    }
}

const nameFieldValidator = () => {
    const nameRegex = /^.{1,}$/;
    return regexTest(nameRegex, nameField)
}

const emailFieldValidator = () => {
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i; //defines how an e-mail should be formatted
    return regexTest(emailRegex, emailField)
}

const activitiesValidator = () => {
   for (let i = 0; i < activitiesCheckboxes.length; i++) {
       if (activitiesCheckboxes[i].checked) {activities.style.borderColor = 'white'; return true}
   }
   //because of the return statement above the following two lines only gets executed if no checkbox has been checked 
   activities.firstElementChild.style.color = 'red'; 
   return false; 
}

const creditCardValidator = () => {
    const creditCardNumberRegex = /^\d{13}(\d{3})?$/;
    return regexTest(creditCardNumberRegex, creditCardNumberField);
}

const zipValidator = () => {
    const zipRegex = /^\d{5}$/;
    return regexTest(zipRegex, zipField);
}

const cvvValidator = () => {
    const cvvRegex = /^\d{3}$/;
    return regexTest(cvvRegex, cvvField);
}

/* 
function to create error messages for validation 
*/

function errorMessage(appendTo, message) {
    let errorParagraph = document.createElement('p');
    errorParagraph.textContent = message;
    errorParagraph.className = 'error';
    errorParagraph.style.color = 'red';
    appendTo.appendChild(errorParagraph);
}

/* 
event listener that stops submission if validation fails and prints the error messages
*/

form.addEventListener('submit', (e)=>{

    //the next 3 lines remove any errorMessages from previous form submissions
    let errorList = document.querySelectorAll('.error');
    if (errorList.length > 0) {
        for(let i = 0; i < errorList.length; i++){errorList[i].parentNode.removeChild(errorList[i])}
    }

    //each conditional checks the return value of the function and stops submission if it is false and pints an error message where information is missing

    nameFieldValidator(); 
    if (!nameFieldValidator()) {e.preventDefault(); errorMessage(nameField.previousElementSibling, 'Please type in your name!')}
   
    emailFieldValidator();
    if (!emailFieldValidator()) {e.preventDefault(); errorMessage(emailField.previousElementSibling, 'This is not a valid e-mail adress.')}

    activitiesValidator();
    if (!activitiesValidator()) {e.preventDefault(); errorMessage(activities, 'Choose an activity!')}

    creditCardValidator();
    if (!creditCardValidator()) {e.preventDefault(); errorMessage(paymentField.nextElementSibling, 'This is not a valid credit card number.')}

    zipValidator();
    if (!zipValidator()) {e.preventDefault(); errorMessage(paymentField.nextElementSibling, 'This is not a valid ZIP code.')}
  
    cvvValidator();
    if (!cvvValidator()) {e.preventDefault(); errorMessage(paymentField.nextElementSibling, 'This is not a valid cvv number.')}
})






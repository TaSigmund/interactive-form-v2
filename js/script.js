/***
GLOBAL VARIABLES
***/

const form = document.querySelector('form');

//text fields
const nameField = document.getElementById('name'); //the name text field
const nameFieldLabel = document.getElementById('name').previousElementSibling; //the 'Name:' label 
const emailField = document.getElementById('mail'); //the e-mail text field
const emailFieldLabel = document.getElementById('mail').previousElementSibling;; //the 'E-mail:' label 
const otherJobRole = document.getElementById('other-title'); //the 'Your Job Role' text field

//select menues
const colorOptionsDiv = document.getElementById('colors-js-puns') //the div that holds the select menu
const colorOptionsSelect = document.getElementById('color'); //the colors select menu
const color = document.querySelectorAll('#color option'); //all color options
const designSelect = document.getElementById('design'); //the design select menu
const designTheme = document.querySelectorAll('#design option'); //the two design options
const jobRoleSelect = document.getElementById('title'); //the job role select menu
const jobRole = document.querySelectorAll('#title option'); //the job role options

//activities
const activitiesCheckboxes = document.querySelectorAll('.activities input'); //the activities checkboxes
const activities = document.querySelector('.activities'); //chooses the entire fieldset
let total = 0; //keeps track of the total cost of activities

//payment
const paymentSelect = document.getElementById('payment'); //the payment select menu
const selectPaymentMethod = document.querySelectorAll('#payment option'); //Selects the payment options
const creditCardInfo = document.getElementById('credit-card'); //all the info and text fields for credit card payment
const creditCardNumberField = document.getElementById('cc-num'); //The text field for the credit card number
const creditCardNumberLabel= document.getElementById('cc-num').previousElementSibling; // The 'Credit Card'label
const zipField = document.getElementById('zip'); //the text field for the Zip Code
const zipFieldLabel = document.getElementById('zip').previousElementSibling; // The 'Zip Code:' label
const cvvField = document.getElementById('cvv'); //the text field for the cvv
const cvvFieldLabel = document.getElementById('cvv').previousElementSibling; // The 'CVV:' label
const paypalInfo = document.getElementById('paypal'); //the information about paypal payment
const bitcoinInfo = document.getElementById('bitcoin'); //the information about bitcoin payment


/***
INITIAL FOCUS
***/

window.addEventListener('load', ()=>{nameField.focus()}); //puts focus on the name field when page is loaded


/*** 
HIDE AND SHOW 'OTHER' JOB ROLE FIELD
***/

otherJobRole.style.display = 'none'; //hides the text input field initially

jobRoleSelect.addEventListener('change', ()=>{
    if (jobRole[5].selected) {otherJobRole.style.display = 'block';} //displays input field if 'other' job role gets selected
    else {otherJobRole.style.display = 'none'; } //hides it again if job role other than 'other' gets selected
})

/*** 
LIMITING COLOR OPTIONS BASED ON SELECTED THEME
***/


const chooseColor = document.createElement('option'); //creates a new option for colors
chooseColor.textContent = 'Please select a T-shirt theme'; //sets the text of that option
colorOptionsSelect.insertBefore(chooseColor, colorOptionsSelect.firstElementChild); //inserts that option
const allColorOptions = document.querySelectorAll('#color option'); //selects all color options, including the newly created one
allColorOptions[0].selected = true; //selects the newly created option
colorOptionsDiv.style.display = 'none'; //hides the color field initially 
designSelect.addEventListener('change', ()=> {colorOptionsDiv.style.display = 'block'}) //shows color field once a theme gets selected

//helper function to hide 3 colors in the select menu
function hideColors(first, second, third) { //takes index values as parameters
            color[first].style.display = 'none';
            color[second].style.display = 'none';
            color[third].style.display = 'none';
}

designSelect.addEventListener('change', ()=> {
    for (let j = 0; j < color.length; j++) {color[j].style.display = 'block'} //resets the list of color options
    for (let i = 0; i < designTheme.length; i++) {
        if (designTheme[0].selected) {
            colorOptionsSelect.disabled = true; //greys out the color select menu
            allColorOptions[0].selected= true; //displays 'Please select a T-shirt theme' in the colors select menu
        } 
        else if (designTheme[i].selected && designTheme[i].value === 'js puns') {
            colorOptionsSelect.disabled = false;
            hideColors(3, 4, 5) //hides the heart js color options
        }
        else if (designTheme[i].selected && designTheme[i].value === 'heart js') {
            colorOptionsSelect.disabled = false;
            hideColors(0, 1, 2) //hides the heart js puns color options
        }
    }
    })

/*** 
FILTERING ACTIVITIES BASED ON CHECKBOX SELECTION
***/

//listening for events on the entire fieldset
document.querySelector('.activities').addEventListener('change', (e) => {      
    const clicked = e.target; //checks what checkbox has been clicked
    const dayAndTimeClicked = clicked.getAttribute('data-day-and-time'); //checks when the event that has been chosen is scheduled 
  
    for (let i = 0; i < activitiesCheckboxes.length; i++){

    //this part of the loop checks for conflicting events
        let dayAndTime = activitiesCheckboxes[i].getAttribute('data-day-and-time'); //checks when each event has been scheduled
        if (dayAndTime === dayAndTimeClicked && activitiesCheckboxes[i] !== clicked && activitiesCheckboxes[i].disabled === true) { //checks whether the event has been greyd out but should no longer be since the conflicting event is no longer selected
            activitiesCheckboxes[i].disabled = false
            activitiesCheckboxes[i].parentNode.style.color = 'black'; //changes the font back to black if it has been previously greyd out
        } 
        else if (dayAndTime === dayAndTimeClicked && activitiesCheckboxes[i] !== clicked) { //an event should be greyd out if a conflicting event is selected
            activitiesCheckboxes[i].disabled = true; 
            activitiesCheckboxes[i].parentNode.style.color = 'lightgrey'; //greys out the label when the checkbox is disabled
        } 

    //this part of the loop calculates the price total for all selected events
        if (activitiesCheckboxes[i] === clicked && activitiesCheckboxes[i].checked === true) { //adds up the cost of all checked activities
             total += parseInt(activitiesCheckboxes[i].getAttribute('data-cost'))
            } 
        else if (activitiesCheckboxes[i] === clicked && activitiesCheckboxes[i].checked === false) { //subtracts the cost of all activities that are unchecked after having been clicked
                total -= parseInt(activitiesCheckboxes[i].getAttribute('data-cost'))
            } 
    }

    //remove total
    if (activities.lastElementChild.textContent.startsWith("Total:")) { //removes the total price info once it gets updated
        activities.removeChild(activities.lastElementChild)
    }; 
    
    //display total
    if (total > 0) { //makes sure the total is only displayed when it is not 0
        let totalCost = document.createElement('p'); 
        totalCost.textContent = `Total: $${total}`;
        activities.appendChild(totalCost) //attaches a display of the total amount underneath the checkboxes
    } 
}
)

/*** 
FILTERING PAYMENT OPTIONS BASED ON SELECTION
***/

paymentSelect.removeChild(selectPaymentMethod[0]) //removes the 'Select payment method' option

// helper function to show one payment option and hide the other two
function showAndHide(show, hide1, hide2) {
    show.style.display = 'block';
    hide1.style.display = 'none';
    hide2.style.display = 'none';
}

//initially only the credit card fields appear
showAndHide(creditCardInfo, paypalInfo, bitcoinInfo)

//depending on what payment option the user selects the corresponding field becomes visible and the other fields are hidden
paymentSelect.addEventListener('change', () => {
    for (let i = 0; i < selectPaymentMethod.length; i++) {
        if (selectPaymentMethod[i].selected && selectPaymentMethod[i].value === 'credit card') {
        showAndHide(creditCardInfo, paypalInfo, bitcoinInfo)
        }
        else if (selectPaymentMethod[i].selected && selectPaymentMethod[i].value === 'paypal') {
        showAndHide(paypalInfo, creditCardInfo, bitcoinInfo)
        }
        else if (selectPaymentMethod[i].selected && selectPaymentMethod[i].value === 'bitcoin') {
        showAndHide(bitcoinInfo, creditCardInfo, paypalInfo)
        }
    }
})

/*** 
VALIDATION
***/


// Helper function to test every field for its corresponding regex
function regexTest (regex, formField) {
    if (regex.test(formField.value)){   //checks whether the typed information matches the regex
    formField.style.borderColor = "white"; return true;
    } 
    else {
   formField.style.borderColor = "red"; return false;
    }
}

//each function (but the activitiesValidator) holds a variable that stores a regex to be tested
const nameFieldValidator = () => {
    const nameRegex = /^.{1,}$/; //the name needs to be at least one character long
    return regexTest(nameRegex, nameField)
}

const emailFieldValidator = () => {
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i; //defines how an e-mail should be formatted
    return regexTest(emailRegex, emailField)
}

const activitiesValidator = () => { //this validator is an exception since it doesn't use a regex. It simply checks whether at least one checkbox has been checked.
   for (let i = 0; i < activitiesCheckboxes.length; i++) {
       if (activitiesCheckboxes[i].checked) {activities.style.borderColor = 'white'; return true}
       else {return false;}
   }
  
}

const creditCardValidator = () => {
    const creditCardNumberRegex = /^(\d{13,16})$/; //the credit card number should be between 13 and 16 digits
    return regexTest(creditCardNumberRegex, creditCardNumberField);
}

const zipValidator = () => {
    const zipRegex = /^\d{5}$/; //US Zip codes have 5 digits
    return regexTest(zipRegex, zipField);
}

const cvvValidator = () => {
    const cvvRegex = /^\d{3}$/; //the cvv needs to be 3 digits long.
    return regexTest(cvvRegex, cvvField);
}


/*** 
EVENT LISTENERS FOR VALIDATION
***/

//helper function to provide live feedback for form validation
//the parameters are 1. a function for validation 2. The element where the error message will appear 3. The error message 4. the original text of the element where the error appears 5. the event object of the event listener
function validationError(validatorFunc, labelF,  message, originalLabel, e) {
    validatorFunc();
    if (!validatorFunc()) {
        labelF.textContent = message;
        labelF.style.color = 'red';
        if (e) {e.preventDefault()}; //only if an event object has been passed to the function -> only for the 'submit' listener
    }
    else {labelF.textContent = originalLabel;
        labelF.style.color = 'black';
}}

//event listener for form validation after submission
form.addEventListener('submit', (e)=>{
    //each validation error can prevent submission, print an error message or reestablish the original element text if everything is fine.
    validationError(nameFieldValidator, nameFieldLabel,  'Name: Please provide a name!', 'Name:', e);
    if (emailField.value.length === 0) {
        validationError(emailFieldValidator, emailFieldLabel,  'E-mail: This field cannot be left empty.', 'E-mail:', e); //prints if the e-mail field is empty after submission
        }
    else {
        validationError(emailFieldValidator, emailFieldLabel,  'E-mail: This is not a valid e-mail adress.', 'E-mail', e); //prints if the e-mail field holds an incorrectly formatted e-mail address as its value
    }
    validationError(activitiesValidator, activities.firstElementChild,  'Register for Activities - Come on!', 'Register for Activities', e);
    if (selectPaymentMethod[1].selected === true){ //makes sure the credit card validation only prevents submission if 'Credit Card' is selected.
        validationError(creditCardValidator, creditCardNumberLabel, 'Credit Card: (13-16 digits)', 'Credit Card:', e);
        validationError(cvvValidator, cvvFieldLabel, 'CVV: (3 digits)', 'CVV:', e);
        validationError(zipValidator, zipFieldLabel, 'Zip Code: (5 digits)', 'Zip Code:', e);
    }
})


//5 event listeners for live feedback on form validation -> they do not hold event objects since they do not deal with submission.

//the first two event listeners give feedback on the name and e-mail fields once they lose focus.
nameField.addEventListener('blur', ()=>{
    if (nameField.value.length === 0) {
    validationError(nameFieldValidator, nameFieldLabel,  'Name: This field cannot be left empty.', 'Name:');
    }})

emailField.addEventListener('blur', ()=>{
    if (emailField.value.length === 0) {
    validationError(emailFieldValidator, emailFieldLabel,  'E-mail: This field cannot be left empty.', 'E-mail:');
    }})

//in addition to the blur event handler and the submit event handler there is also a keyup submit handler on the email field that kicks in once the user starts typing.
emailField.addEventListener('keyup', ()=>{
if (emailField.value.length === 0) {
    validationError(emailFieldValidator, emailFieldLabel,  'E-mail: This field cannot be left empty.', 'E-mail:'); //prints if the e-mail field is empty e.g. when a user deletes his text
    }
else {
    validationError(emailFieldValidator, emailFieldLabel,  'E-mail: This is not a valid e-mail adress.', 'E-mail'); //prints if the e-mail field holds an incorrectly formatted e-mail address as its value
}})

//the following 3 give feedback on the credit card information while it is being typed in.
creditCardNumberField.addEventListener('keyup', ()=>{
    validationError(creditCardValidator, creditCardNumberLabel, 'Credit Card: (13-16 digits)', 'Credit Card:');
})

cvvField.addEventListener('keyup', ()=>{
    validationError(cvvValidator, cvvFieldLabel, 'CVV: (3 digits)', 'CVV:');
})

zipField.addEventListener('keyup', ()=>{
    validationError(zipValidator, zipFieldLabel, 'Zip Code: (5 digits)', 'Zip Code:');
})

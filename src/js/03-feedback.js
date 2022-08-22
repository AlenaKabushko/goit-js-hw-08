import throttle from 'lodash.throttle';

const formRef = document.querySelector(".feedback-form")
//console.log(buttonRef)
const buttonRef = formRef.querySelector("button")
// console.log(formRef)
const emailRef = document.querySelector("input[name='email']")
// console.log(emailRef)
const messageRef = document.querySelector("textarea[name='message']")
// console.log(messageRef)

const LOCAL_KEY = "feedback-form-state"

localStorageInformatoin()

const formInput = throttle((function(event) {    
    //console.log(formRef.elements.message.value, formRef.elements.email.value)

    const inputInformation = {
        email: formRef.elements.email.value,
        message: formRef.elements.message.value
    }

    // console.log(inputInformation)

    localStorage.setItem(LOCAL_KEY, JSON.stringify(inputInformation))

}), 500)

function formSubmit (event) {
    event.preventDefault();
    console.log(JSON.parse(localStorage.getItem(LOCAL_KEY)))
    event.target.reset()
    localStorage.removeItem(LOCAL_KEY)
}

function localStorageInformatoin() {

    const savedInfo = JSON.parse(localStorage.getItem(LOCAL_KEY))

    if(savedInfo) {
        emailRef.value = savedInfo.email
        messageRef.value = savedInfo.message
    }
}

formRef.addEventListener("input", formInput)
formRef.addEventListener("submit", formSubmit)
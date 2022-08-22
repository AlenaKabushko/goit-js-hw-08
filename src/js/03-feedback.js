import throttle from 'lodash.throttle';

const formRef = document.querySelector(".feedback-form")
const emailRef = document.querySelector("input[name='email']")
const messageRef = document.querySelector("textarea[name='message']")
const LOCAL_KEY = "feedback-form-state"

localStorageInformatoin()

const formInput = throttle((function(event) {
    const inputInformation = {
        email: formRef.elements.email.value,
        message: formRef.elements.message.value
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(inputInformation))
}), 500)

function formSubmit (event) {
    event.preventDefault()
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
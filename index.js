const form = document.querySelector('form');

const inputGroups = document.querySelectorAll('input');
const textArea = document.querySelector('textarea');
const submitBtn = document.querySelector('button[type="submit"]');

const formInfo = {
    first: '',
    last: '',
    email: '',
    query: false,
    message: "",
    consent: false,
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;

inputGroups.forEach(input => {
    input.addEventListener('input', (e) => {
        if (e.target.type === 'text') {
            formInfo[e.target.name] = e.target.value;
        }
        else if (e.target.name === "query") {
            const queryInput = document.querySelectorAll('input[name="query"]');
            queryInput.forEach(input => { if (input.id !== e.target.id) { input.checked = false } });
            formInfo[e.target.name] = input.checked;
        }
        else {
            formInfo[e.target.name] = e.target.checked;
        }
    })
})

textArea.addEventListener('input', (e) => {
    formInfo[e.target.name] = e.target.value;
})


function checkValue(key) {
    const value = formInfo[key];
    let errorCounter = 0;
    if (key === 'message') {
        const element = document.querySelector(`textarea[name=${key}]`);
        const smallEl = element.parentElement.querySelector('small');
        if (value === "") {
            smallEl.style.display = "block";
            element.classList.add('error');
            errorCounter += 1;
        }
        else {
            smallEl.style.display = "none";
            element.classList.remove('error');
            errorCounter = errorCounter - 1 < 0 ? 0 : errorCounter - 1;
        }

    }
    else if (key === 'query') {
        const smallEl = document.querySelector(`.query--container small`);
        if (value) {
            smallEl.style.display = "none";
            errorCounter = errorCounter - 1 < 0 ? 0 : errorCounter - 1;
        }
        else {
            smallEl.style.display = "block";
            errorCounter += 1;
        }

    }
    else if (key === 'consent') {
        const smallEl = document.querySelector(".consent--checkbox--wrapper small");
        if (value) {
            smallEl.style.display = "none";
            errorCounter = errorCounter - 1 < 0 ? 0 : errorCounter - 1;
        }
        else {
            smallEl.style.display = "block";
            errorCounter += 1;
        }
    }
    else {
        const element = document.querySelector(`input[name=${key}]`);
        const smallEl = element.parentElement.querySelector('small');
        if (key === 'email') {
            if (value === "") {
                smallEl.style.display = "block";
                element.classList.add('error');
                errorCounter += 1;
            }
            else if (!value.match(emailRegex)) {
                smallEl.style.display = "block";
                smallEl.textContent = "This email is not correct format"
                element.classList.add('error');
                errorCounter += 1;
            }
            else {
                smallEl.style.display = "none";
                smallEl.textContent = "This field is required"
                element.classList.remove('error');
                errorCounter = errorCounter - 1 < 0 ? 0 : errorCounter - 1;
            }
        }
        if (value === "") {
            smallEl.style.display = "block";
            element.classList.add('error');
            errorCounter += 1;
        }
        else {
            smallEl.style.display = "none";
            element.classList.remove('error');
            errorCounter = errorCounter - 1 < 0 ? 0 : errorCounter - 1;
        }
    }
    return errorCounter;
}


form.onsubmit = (e) => {
    e.preventDefault();
    let counter = 0;
    for (const keys in formInfo) {
        counter += checkValue(keys);
    }
    if (counter === 0) {
        // alert("form successfully submitted");
        submitBtn.classList.add('success');
        setTimeout(() => {
            submitBtn.textContent = "Form Submitted Succesfully 👍";
        submitBtn.classList.remove('success');
        }, 1200);

    }
}

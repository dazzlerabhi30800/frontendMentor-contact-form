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
    const element = document.getElementsByName(key);
    let parentElement = getParentElement(element[0].parentElement);
    const val = formInfo[key];
    if (key === 'query' || key === 'consent') {
        if (val) {
            parentElement.classList.remove('show--error');
        }
        else {
            parentElement.classList.add('show--error');
        }
    }
    else if (key === 'email') {
        if (!val.match(emailRegex) || val === '') {
            parentElement.classList.add('show--error');
        }
        else {
            parentElement.classList.remove('show--error');
        }
    }
    else {
        if (val === '') {
            parentElement.classList.add('show--error');
        }
        else {
            parentElement.classList.remove('show--error');
        }
    }
}

// get the parent input--group class
function getParentElement(element) {
    if (element.classList.contains('input--group')) return element;
    let parentElement = element.parentElement;
    return getParentElement(parentElement);
}


form.onsubmit = (e) => {
    e.preventDefault();
    for (const key in formInfo) {
        checkValue(key);
    }
    const errorGroup = document.querySelectorAll('.show--error');
    if (errorGroup.length === 0) {
        submitBtn.classList.add('success');
        setTimeout(() => {
            submitBtn.textContent = "Form Submitted Succesfully 👍";
            submitBtn.classList.remove('success');
        }, 1200);
    }
}

// 4. Formos submit tipo input elementas turėtų būti išjungtas (disabled) jeigu checkbox elementas nėra pažymėtas.


const users = [
  {
    userName: 'john',
    userPassword: 'john123'
  }, 
  {
    userName: 'tom',
    userPassword: 'tom123'
  }, 
  {
    userName: 'joe',
    userPassword: 'joe123'
  }, 
  {
    userName: 'hugh',
    userPassword: 'hugh123'
  }, 
  {
    userName: 'ron',
    userPassword: 'ron123'
  }
];

let loginForm = document.querySelector('#login-form');
let loginBtn = document.querySelector('#submit-btn');
let checkTerms = document.getElementById('conditions');
let username = document.getElementById('username');
let password = document.getElementById('password');
let submitButton = document.querySelector('#submit-btn')
let isLoggedIn = false;

function loginBtnDisabled() {
  if (!checkTerms.checked || username.value.length < 3 || password.value.length < 6) {
    loginBtn.setAttribute('disabled', true);
  } else {
    loginBtn.removeAttribute('disabled');
  };
};

function welcomeTextCreate() {
  let formWrap = document.querySelector('#login-form');
  let loggedInText = document.createElement('h1');
  let body = document.body;
  
  let logOutBtn = document.createElement('button');
  logOutBtn.textContent = 'Log out';
  
  logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    location.reload();
  });
  
  formWrap.remove();
  loggedInText.textContent = 'You have successfully logged in!';
  
  body.prepend(loggedInText, logOutBtn);
};

function inputToLocalStorage(element) {
  let localStorageValue = localStorage.getItem(element.id);
  if (element.type === 'checkbox') {
    let isChecked = localStorageValue === 'true';
    element.checked = isChecked;
    
    element.addEventListener('input', () => {
      localStorage.setItem(element.id, element.checked);
    });
  } else {
    element.value = localStorageValue;
    
    element.addEventListener('input', () => {
      localStorage.setItem(element.id, element.value);
    });
  };
};


function init() {
  loginForm.addEventListener('input', () => {
    loginBtnDisabled();
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let elements = event.target.elements;
    
    let name = elements.username.value;
    let pass = elements.password.value;
  
    let userFound = false;
  
    users.map(user => {
      let inputErrorMessages = event.target.querySelectorAll('span');
      inputErrorMessages.forEach(message => message.remove());
      if (name === user.userName && pass === user.userPassword) {
        userFound = true;
      };
    });
    
    
    if (userFound) {
      welcomeTextCreate();
      isLoggedIn = true;
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('conditions');
  
    } else {
      let alertMessage = document.createElement('span')
      alertMessage.textContent = 'Please eneter correct details.'
      let loginForm = document.getElementById('login-form');
      loginForm.prepend(alertMessage);
      document.getElementById('password').value = '';
    };
    
    localStorage.setItem('isLoggedIn', isLoggedIn);
  });

  let loggedIn = localStorage.getItem('isLoggedIn');
  
  if (loggedIn === 'true') {
    welcomeTextCreate();
  };

  inputToLocalStorage(username);
  inputToLocalStorage(password);
  inputToLocalStorage(checkTerms);

  loginBtnDisabled();
};

init();

// let input = document.querySelector('#username');
// input.value = localStorage.getItem('username');

// input.addEventListener('input', () => {
//   localStorage.setItem('username', input.value);
// });

// let termsConditionsCheck = document.querySelector('#conditions');
// termsConditionsCheck.checked = localStorage.getItem('conditions');

// termsConditionsCheck.addEventListener('input', () => {
//   localStorage.setItem('conditions', termsConditionsCheck.checked);
// });

// let passInput = document.querySelector('#password');
// passInput.value = localStorage.getItem('password');

// passInput.addEventListener('input', () => {
//   localStorage.setItem('password', passInput.value);
// });



// ANTRA DALIS:
// 5. Sukurti masyvą, kuriame būtų bent 5 nariai (objektai). Kiekvienas objektas turi:
//     5.1. userName property, kurio reikšmė yra vartotojo prisijungimo vardas (string).
//     5.2. userPassword property, kurio reikšmė yra vartotojo slaptažodis (string).
// 6. Formos submit metu (formą galima priduoti tik tada jeigu yra pažymėtas checkbox input elementas), reikia patikrinti ar įrašytas vartotojo vardas ir slaptažodis atitinka bent vieną iš masyve esančių elementų.
//     6.1. Jeigu atitinka, tai ištrinti form'ą ir sukurti h1 elementą sveikinantį sėkmingai prisijungus.
//     6.2. Jeigu neatitinka, tai:
//         6.2.1. Formoje pridėti elementą, kuriame parašyta jog prisijungimo vardas arba slaptažodis buvo neteisingas.
//         6.2.2. Slaptažodžio laukelis turi išsivalyti.
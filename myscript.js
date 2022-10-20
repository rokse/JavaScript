function studentInfoForm() {
  let studentForm = document.querySelector('#student-form');
  let studentsList = document.getElementById('students-list');

  function changeRangeOutput() {
    let itKnowledgeInput = document.querySelector('#experience');
    let itKnowledgeOutput = document.querySelector('#it-knowledge-output');

    itKnowledgeInput.addEventListener ('input', () => {
      itKnowledgeOutput.textContent = itKnowledgeInput.value;
    });
  };

  changeRangeOutput(); 

  studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // let name = studentForm.querySelector('#student-name').value;
    // let surname = studentForm.getElementById('student-surname').value;
    // let age = studentForm.querySelector('[name="age"]').value;
    // let phone = studentForm.getElementsByName('phone')[0].value;
    // let email = studentForm.querySelector('#student-email').value;
    let elements = event.target.elements;
    
    let name = elements.name.value;
    let surname = elements.surname.value;
    let age = elements.age.value;
    let phone = elements.phone.value;
    let email = elements.email.value;
    let experience = elements.experience.value;
    let groupSelect = elements.feu.value;
    let interests = document.querySelectorAll('[name="interest"]:checked');

    let studentItem = document.createElement('div');
    studentItem.classList.add('student-item');

    let formIsValid = formValidation(event);

    if (!formIsValid) {
      renderAlertMessage('#alert-message', 'Enter everything lol', 'color-red');
      return;
    };
    
    let nameElement = document.createElement('p');
    nameElement.innerHTML = `<strong>Name:</strong> ${name}`;
    
    let surnameElement = document.createElement('p');
    surnameElement.innerHTML = `<strong>Surname:</strong> ${surname}`;
    
    let ageElement = document.createElement('p');
    ageElement.innerHTML = `<strong>Age:</strong> ${age}`;
    
    let emailElement = document.createElement('p');
    emailElement.innerHTML = `<strong>Email:</strong> <span class="hidden-area">*******</span>`;
    
    let phoneElement = document.createElement('p');
    phoneElement.innerHTML = `<strong>Phone:</strong> <span class="hidden-area">*******</span>`;
    
    let itKnowledgeElement = document.createElement('p');
    itKnowledgeElement.innerHTML = `<strong>IT knowledge:</strong> ${experience}`;

    let groupElement = document.createElement('p');
    groupElement.innerHTML = `<strong>Group:</strong> ${groupSelect}`;

    let interestWrapperElement = document.createElement('div');
    interestWrapperElement.classList.add('interest-wrapper');
    
    let interestTitleElement = document.createElement('h3');
    interestTitleElement.textContent = 'Interests:';
    
    let interestListElement = document.createElement('ul');
    
    let deleteStudentBtn = document.createElement('button');
    deleteStudentBtn.textContent = 'Remove student';
    
    deleteStudentBtn.addEventListener('click', () => {
      let studentRemovedText = `Student ${name} ${surname}, was removed`;
      studentItem.remove();
      renderAlertMessage('#alert-message', studentRemovedText);
    });
    
    let hideShowInfoBtn = document.createElement('button');
    hideShowInfoBtn.textContent = 'Show sensitive info';
    hideShowInfoBtn.classList.add('hide-show-info-btn');
    
    let dataHidden = true;
    
    hideShowInfoBtn.addEventListener('click', () => {
      let privateEmail = emailElement.querySelector('.hidden-area');
      let privatePhone = phoneElement.querySelector('.hidden-area');
      
      if (dataHidden) {
        privateEmail.textContent = email;
        privatePhone.textContent = phone;
        hideShowInfoBtn.textContent = 'Hide sensitive info';
      } else {
        privateEmail.textContent = '*******';
        privatePhone.textContent = '*******';
        hideShowInfoBtn.textContent = 'Show sensitive info';
      };
      
      dataHidden = !dataHidden;
    });

    
    interests.forEach(interest => {
      let interestItem = document.createElement('li');
      interestItem.textContent = interest.value;
      interestListElement.append(interestItem);
    });
    
    interestWrapperElement.append(interestTitleElement, interestListElement);
    
    studentItem.append(nameElement, surnameElement, ageElement, emailElement, phoneElement, itKnowledgeElement, groupElement, interestWrapperElement, hideShowInfoBtn, deleteStudentBtn);
    
    studentsList.prepend(studentItem);
    
    let studentCreatedText = `Student ${name} ${surname}, was created`;
    
    renderAlertMessage('#alert-message', studentCreatedText);
    
    event.target.reset();
  });
};

function renderAlertMessage(query, text, elementClass) {
  let createdStudentName = document.querySelector(query);
  createdStudentName.textContent = text;
  
  if (elementClass) {
    createdStudentName.classList.add(elementClass);
  };
  
  setTimeout(() => {
    createdStudentName.textContent = '';
    createdStudentName.classList.remove(elementClass);
  }, 5000);
};

function createErrormessage(errorMessageText, input) {
  let errorMessage = document.createElement('span');
  errorMessage.textContent = errorMessageText;
  errorMessage.classList.add('input-error-message', 'color-red');
  input.classList.add('input-error');
  input.after(errorMessage);
  return false;
};

function formValidation(event) {
  let inputErrorMessages = event.target.querySelectorAll('.input-error-message');
  inputErrorMessages.forEach(message => message.remove());
  
  let requiredInputs = event.target.querySelectorAll('.required');
  
  let formIsValid = true;
  requiredInputs.forEach(input => {
    input.classList.remove('input-error');  
    if (!input.value) {
        formIsValid = createErrormessage('Forgot this mate.', input);
    } else if (input.name === 'name') {
      if (input.value.length < 3) {
        formIsValid = createErrormessage('Too short', input);
      };
    } else if (input.name === 'surname') {
      if (input.value.length < 3) {
        formIsValid = createErrormessage('Too short', input);
      };
    } else if (input.name === 'age') {
      if (input.value <= 0) {
        formIsValid = createErrormessage('Can\'t be that age. Too young.', input)
      } else if (input.value > 120) {
        formIsValid = createErrormessage('Humans do not live that long.', input)
      };
    } else if (input.name === 'phone') {
      let phoneFormat = /(\+|00)(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$/
      if (!input.value.match(phoneFormat)) {
        formIsValid = createErrormessage('The number is not valid');
      };
    } else if (input.name === 'email') {
      let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!input.value.match(mailFormat)) {
        formIsValid = createErrormessage('There is no way you have an email like this')
      };
    };
  });
  return formIsValid;
};

studentInfoForm();

// function checkSimpleInput(id) {
//   let input = document.getElementById(id);
//   input.value = localStorage.getItem(id);
//   input.addEventListener('input', () => {
//     localStorage.setItem(id, input.value);
//   });
// };

// let simpleInputIds = ['student-name', 'student-surname', 'student-age', 'student-phone', 'student-email'];
// simpleInputIds.map(id => checkSimpleInput(id));


// let groupInput = document.querySelector('[name=group]')

// function populateRadioInput(elements) {
//   let oldStorageValue = localStorage.getItem('group');
//   document.getElementById(oldStorageValue).checked = true;

//   elements.forEach((element) => {
//     element.addEventListener('input', () => {
//       localStorage.setItem(element.name, element.id);
//     });
//   });
// };

// let interestsInputs = document.querySelector()

// function populateCheckBoxInputs(elements) {
//   let localStorageInterests = JSON.parse(localStorage.getItem('interests'));
//   localStorageInterests.map(id => {
//     document.getElementById(id).checked = true;
//   });

//   elements.forEach((element) => {
//     element.addEventListener('input', () => {
//       let studentInterests = document.querySelectorAll('[name="interest"]:checked')
//       let studentInterestsArr = [];
//       studentInterests.forEach(interest => {
//         studentInterestsArr.push(interest.id)
//       });
//       localStorage.setItem('interests', JSON.stringify(studentInterestsArr));
//     });
//   });
// };

// populateCheckBoxInputs(interestInputs);

function formDataToLocalStorage(form) {
  form.addEventListener('input', (event) => {
    let activeInput = event.target;
    let inputName = activeInput.name;
    let inputValue = activeInput.value;
    
    localStorage.setItem(inputName, inputValue);
    
    let formInterests = document.querySelectorAll('[name="interest"];checked');
    let interestValues = [];
    formInterests.forEach(interest => {
      interestValues.push(interest.value);
    });
    localStorage.setItem('interest', JSON.stringify(interestValues));
  });
};

formDataToLocalStorage(studentForm);

// let deleteButton = document.createElement("button")
// deleteButton.textContent = "Remove student"
// deleteButton.addEventListener("click", () => {
//     studentItem.remove()
//     renderAlertMessage(name, surname, "deleted")
// })
// studentItem.append(nameElement, surnameElement, ageElement, emailElement, phoneElement, itKnowledgeElement, groupElement, interestWrapperElement, privateInfoButton, deleteButton);
// studentsList.prepend(studentItem);
// renderAlertMessage(name, surname, "created");
// event.target.reset();
// });
// function renderAlertMessage(personName, personSurname, status) {
//     let alertMessage = document.querySelector('#alert-message');
//     alertMessage.textContent = `Student ${status} (${personName} ${personSurname})`;
//     setTimeout(() => {
//         alertMessage.textContent = '';
//     }, 5000);
// }

// ANTRA DALIS:
// 1. Sukurti div elementą, kuris turės id „students-list".
// 2. Kiekvieną kartą pridavus formą (submit), turi būti sukurtas naujas div elementas su klase „student-item" ir pridedamas į „students-list" elemento pradžią.
// 3. Duomenys apie studentą turi būti įdėti į „student-item" elementą.

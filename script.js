let initialData = [
  {
    id: 0,
    name: 'John',
    surname: 'Doe',
    age: 30,
    phone: 8599949022,
    email: 'john@doe.com',
    experience: 7,
    feu: 'feu 5',
    interests: ['JavaScript', 'PHP']
  },
  {
    id: 1,
    name: 'Tomas',
    surname: 'Ron',
    age: 36,
    phone: 859954333022,
    email: 'tom@dose.com',
    experience: 5,
    feu: 'feu 3',
    interests: ['JavaScript', 'PHP', 'Python']
  },
  {
    id: 2,
    name: 'Ron',
    surname: 'Jones',
    age: 21,
    phone: 85992000922,
    email: 'ron@jones.com',
    experience: 9,
    feu: 'feu 1',
    interests: ['C++', 'PHP', 'Node.js']
  },
  {
    id: 3,
    name: 'Pete',
    surname: 'Tong',
    age: 50,
    phone: 859012121022,
    email: 'pete@tong.com',
    experience: 2,
    feu: 'feu 4',
    interests: []
  },
  {
    id: 4,
    name: 'Tony',
    surname: 'Joe',
    age: 27,
    phone: 823223349022,
    email: 'tony@joe.com',
    experience: 5,
    feu: 'feu 5',
    interests: ['JavaScript', 'PHP', 'C++']
  }
];

// localStorage.setItem('students-data', JSON.stringify(initialData));
function createStudentFromLS() {
  let localStorageStudentData = JSON.parse(localStorage.getItem('students-data'));;
  
  localStorageStudentData.map(student => {
    renderStudent(student);
  });
};

function studentInfoFormSubmit(student) {
  let studentForm = document.querySelector('#student-form');

  studentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let elements = event.target.elements;
  
    let name = elements.name.value;
    let surname = elements.surname.value;
    let age = elements.age.value;
    let phone = elements.phone.value;
    let email = elements.email.value;
    let experience = elements.experience.value;
    let groupSelect = elements.feu.value;
    let interests = document.querySelectorAll('[name="interest"]:checked');

    let interestsArr = [];
    
    interests.forEach(interest => {
      interestsArr.push(interest.value);
    });

    let studentObj = {
      name,
      surname,
      age,
      phone,
      email,
      experience,
      feu: groupSelect,
      interests: interestsArr
    };

    let formIsValid = formValidation(event);

    if (!formIsValid) {
      renderAlertMessage('#alert-message', 'Enter everything lol', 'color-red');
      return;
    };
    
    formDataToLocalStorage(studentForm);

    let isNewStudent = true;

    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('age');
    localStorage.removeItem('phone');
    localStorage.removeItem('email');
    localStorage.removeItem('experience');
    localStorage.removeItem('feu');
    localStorage.removeItem('interests');
    
    if (isNewStudent) {
      let currentLocalStorageData = JSON.parse(localStorage.getItem('students-data'));
  
      currentLocalStorageData.push(studentObj);
      
      localStorage.setItem('students-data', JSON.stringify(currentLocalStorageData));
  
      studentForm.reset();
    };


    renderStudent(studentObj);

    event.target.reset();
  });
};

function renderStudent(studentObj) {
  let name = studentObj.name;
  let surname = studentObj.surname;
  let age = studentObj.age;
  let phone = studentObj.phone;
  let email = studentObj.email;
  let experience = studentObj.experience;
  let groupSelect = studentObj.feu;
  let interests = studentObj.interests;

  let studentItem = document.createElement('div');
  studentItem.classList.add('student-item');
  
  let nameElement = document.createElement('p');
  nameElement.classList.add('student-name');
  nameElement.innerHTML = `<strong>Name:</strong> ${name}`;
  
  let surnameElement = document.createElement('p');
  surnameElement.classList.add('student-surname');
  surnameElement.innerHTML = `<strong>Surname:</strong> ${surname}`;
  
  let ageElement = document.createElement('p');
  ageElement.classList.add('student-age');
  ageElement.innerHTML = `<strong>Age:</strong> ${age}`;
  
  let emailElement = document.createElement('p');
  emailElement.classList.add('student-email');
  emailElement.innerHTML = `<strong>Email:</strong> <span class="hidden-area">*******</span>`;
  
  let phoneElement = document.createElement('p');
  phoneElement.classList.add('student-phone');
  phoneElement.innerHTML = `<strong>Phone:</strong> <span class="hidden-area">*******</span>`;
  
  let itKnowledgeElement = document.createElement('p');
  itKnowledgeElement.classList.add('student-experience');
  itKnowledgeElement.innerHTML = `<strong>IT knowledge:</strong> ${experience}`;

  let groupElement = document.createElement('p');
  groupElement.classList.add('student-group');
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
    interestItem.textContent = interest;
    interestListElement.append(interestItem);
  });
  
  interestWrapperElement.append(interestTitleElement, interestListElement);
  
  studentItem.append(nameElement, surnameElement, ageElement, emailElement, phoneElement, itKnowledgeElement, groupElement, interestWrapperElement, hideShowInfoBtn, deleteStudentBtn);
  
  let studentsList = document.getElementById('students-list');
  studentsList.prepend(studentItem);
  
  let studentCreatedText = `Student ${name} ${surname}, was created`;
  
  renderAlertMessage('#alert-message', studentCreatedText);

};

function changeRangeOutput() {
  let itKnowledgeInput = document.querySelector('#student-it-knowledge');
  let itKnowledgeOutput = document.querySelector('#it-knowledge-output');

  itKnowledgeInput.addEventListener ('input', () => {
    itKnowledgeOutput.textContent = itKnowledgeInput.value;
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
        formIsValid = createErrormessage('The number is not valid', input);
      };
    } else if (input.name === 'email') {
      let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!input.value.match(mailFormat)) {
        formIsValid = createErrormessage('There is no way you have an email like this', input)
      };
    };
  });
  return formIsValid;
};

function formDataToLocalStorage(form) {
  let nameInput = document.getElementById('student-name');
  let surnameInput = document.getElementById('student-surname');
  let ageInput = document.getElementById('student-age');
  let phoneInput = document.getElementById('student-phone');
  let emailInput = document.getElementById('student-email');
  let itKnowledgeInput = document.getElementById('student-it-knowledge');
  let groupInput = document.querySelectorAll('[name="feu"]');

  let localName = localStorage.getItem('name');
  let localSurname = localStorage.getItem('surname');
  let localAge = localStorage.getItem('age');
  let localPhone = localStorage.getItem('phone');
  let localEmail = localStorage.getItem('email');
  let localItKnowledge = localStorage.getItem('experience');
  let localGroup = localStorage.getItem('feu');
  let localInterests = JSON.parse(localStorage.getItem('interests'));

  nameInput = form.elements.name;
  surnameInput = form.elements.surname;
  ageInput = form.elements.age;
  phoneInput = form.elements.phone;
  emailInput = form.elements.email;
  itKnowledgeInput = form.elements.experience;
  groupInput = form.elements.feu;

  nameInput.value = localName;
  surnameInput.value = localSurname;
  ageInput.value = localAge;
  phoneInput.value = localPhone;
  emailInput.value = localEmail;
  itKnowledgeInput.value = localItKnowledge;
  groupInput.value = localGroup;

  if (localInterests) {
    localInterests.map(interestValue => {
      let interestElement = document.querySelector(`[value="${interestValue}"]`);
      if (interestElement) {
        interestElement.checked = true;
      }
    });
  };

  form.addEventListener('input', (event) => {
    let activeInput = event.target;
    let inputName = activeInput.name;
    let inputValue = activeInput.value;
    
    localStorage.setItem(inputName, inputValue);
    
    let formInterests = document.querySelectorAll('[name="interest"]:checked');
    let interestValues = [];

    formInterests.forEach(interest => {
      interestValues.push(interest.value);
    });
    localStorage.setItem('interests', JSON.stringify(interestValues));
  });
};

function filterStudents() {
  let searchForm = document.querySelector('#search-form');
  
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchInput = event.target.elements.search.value.toLowerCase();
    let allStudents = document.querySelectorAll('.student-item');
    
    let variationsSelect = document.querySelector('#search-variations').value;
    
    allStudents.forEach(student => {
      console.log(student)
      let studentName = student.querySelector('.student-name').textContent.toLowerCase();
      console.log(studentName)
      let studentSurname = student.querySelector('.student-surname').textContent.toLowerCase();
      let studentAge = student.querySelector('.student-age').textContent;
      let studentGroup = student.querySelector('.student-group').textContent;
      let studentItKnowledge = student.querySelector('.student-experience').textContent;

      let displayStr = ''
     
      if (variationsSelect === 'name' && studentName.includes(searchInput)) {
        displayStr = 'block';
      } else if (variationsSelect === 'surname' && studentSurname.includes(searchInput)) {
        displayStr = 'block';
      } else if (variationsSelect === 'age' && studentAge === searchInput) {
        displayStr = 'block';
      } else if (variationsSelect === 'group' && studentGroup.includes(searchInput)) {
        displayStr = 'block';
      } else if (variationsSelect === 'it-knowledge' && studentItKnowledge === searchInput) {
        displayStr = 'block';
      } else {
        displayStr = 'none';
      };

      student.style.display = displayStr;
    });
  });
};

function init() {
  createStudentFromLS();
  studentInfoFormSubmit();
  changeRangeOutput(); 
  filterStudents();
};

init();
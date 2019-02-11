
document.addEventListener('DOMContentLoaded', ()=>{
  let nav_toggle = document.getElementById('nav-toggle');
  nav_toggle.addEventListener('click', slideToggle);

  let loginLink = document.getElementById('loginLink');
  let loginModal = document.getElementById('loginModal');
  let closeLogin = document.getElementsByClassName("closeLogin")[0];

  let signupLink = document.getElementById('signupLink');
  let signupModal = document.getElementById('signupModal');
  let closeSignup = document.getElementsByClassName('closeSignup')[0];


  loginLink.onclick = ()=>{
    loginModal.style.display = 'block';
  };
  closeLogin.onclick = () =>{
    loginModal.style.display = 'none';
  };

  signupLink.onclick = ()=>{
    signupModal.style.display = 'inline-block';
  };
  closeSignup.onclick = () =>{
    signupModal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    } else if (event.target == signupModal) {
      signupModal.style.display = "none";
    }
  }

  let pageName = location.href.substring(location.href.lastIndexOf('/')+1);
  let userTitle = document.getElementById('userTitle');

  if(pageName === 'index.html'){
    let loginForm = document.getElementById('loginForm');
      loginForm.addEventListener('submit', (event)=>{
      let l = new LoginForm();
      l.processForm(event);
    });

    let signupForm = document.getElementById('signupForm');
      signupForm.addEventListener('submit', (event)=>{
      let s = new SignupForm();
      s.processForm(event);
    });
  } else if(pageName === 'indexCaterer.html'){
    let loginForm = document.getElementById('catererLoginForm');
      loginForm.addEventListener('submit', (event)=>{
      let l = new CatererLoginForm();
      l.processForm(event);
    });

    let signupForm = document.getElementById('catererSignupForm');
      signupForm.addEventListener('submit', (event)=>{
      let s = new CatererSignupForm();
      s.processForm(event);
    });
  } else{
    let logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', ()=>{
    localStorage.setItem('user', undefined);
    location.href = 'index.html';
  });
  }

  if(localStorage.getItem('user') && pageName !== 'index.html' && pageName !== 'indexCaterer.html'){
    userTitle.innerHTML = JSON.parse(localStorage.getItem('user')).name;
  }

});

let navOpen = false;

function slideToggle() {
    let navList = document.getElementById('nav-list');
    if(navOpen) {
        navOpen = false;
        navList.style.display = 'none';
    }
    else {
        navOpen = true;
        navList.style.display = 'block';
    }
}

class Form{
  constructor(){
    this.email = null;
    this.password = null;
  }
  processForm(e){
    e.preventDefault();
    if(e.target.name === 'signupForm'){
      this.email = e.target.signupEmail.value;
      this.password = e.target.signupPassword.value;
    } else if(e.target.name === 'loginForm'){
      this.email = e.target.loginEmail.value;
      this.password = e.target.loginPassword.value;
    }
  }
}

class LoginForm extends Form{
  constructor(){
    super();
  }
  processForm(e){
    super.processForm(e);
    let name = 'First and Last name';
    let user = {
      'account': 'customer',
      'email': this.email,
      'password': this.password,
      'name': name
    }
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'home.html';
  }
}

class CatererLoginForm extends LoginForm{
  constructor(){
    super();
  }
  processForm(e){
    super.processForm(e);
    let name = 'First and Last name';
    let user = {
      'account': 'Caterer',
      'email': this.email,
      'password': this.password,
      'name': name
    }
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'homeCaterer.html';
  }
}

class SignupForm extends Form{
  constructor(){
    super();
    this.fName = null;
    this.lName = null;
  }
  processForm(e){
    super.processForm(e);
    this.fName = e.target.signupFirstName.value;
    this.lName = e.target.signupLastName.value;
    let name = this.fName + ' ' + this.lName;
    let user = {
      'account': 'customer',
      'email': this.email,
      'password': this.password,
      'name': name
    }
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'home.html';
  }
}

class CatererSignupForm extends SignupForm{
  constructor(){
    super();
    this.restaurant = null;
  }
  processForm(e){
    super.processForm(e);
    this.restaurant = e.target.signupRestaurant;
    let name = restaurant;
    let user = {
      'account': 'Caterer',
      'email': this.email,
      'password': this.password,
      'name': name
    }
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'homeCaterer.html';
  }
}

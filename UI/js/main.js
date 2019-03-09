
document.addEventListener('DOMContentLoaded', ()=>{
  let nav_toggle = document.getElementById('nav-toggle');
  nav_toggle.addEventListener('click', slideToggle);

  let pageName = location.href.substring(location.href.lastIndexOf('/')+1);
  let userTitle = document.getElementById('userTitle');

  let loginLink = document.getElementById('loginLink');
  let loginModal = document.getElementById('loginModal');
  let closeLogin = document.getElementsByClassName("closeLogin")[0];

  let signupLink = document.getElementById('signupLink');
  let signupModal = document.getElementById('signupModal');
  let closeSignup = document.getElementsByClassName('closeSignup')[0];

  if(pageName === '' || pageName === 'index.html' || pageName === 'indexCaterer.html'){
    loginLink.onclick = ()=>{
      loginModal.style.display = 'block';
      loginModal.style.fontFamily = 'Amaranth';
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
  }


  if(pageName === '' || pageName === 'index.html'){
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
  } else if(pageName === ''){
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
  } 
  else if(pageName === 'indexCaterer.html'){
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
    if(pageName === 'myCaterers.html' || pageName === 'homeCaterer.html'){
      let views = document.getElementsByClassName('viewMenu');
      let viewModal = document.getElementById('viewModal');
      let closeView = document.getElementsByClassName('closeView')[0];
      closeView.addEventListener('click', ()=>{
        viewModal.style.display = 'none';
      });
      for(let i = 0; i < views.length; i++){
        views[i].addEventListener('click', ()=>{
          viewModal.style.display = 'block';
        });
      }
    }
    if(pageName === 'home.html'){
      initOrderButtons();
    }
  }

  if(localStorage.getItem('user') && pageName !== 'index.html' && pageName !== 'indexCaterer.html' && pageName !== ''){
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

function initOrderButtons(){
  const buttons = document.getElementsByClassName('orderButton');
  for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', (e)=>{
      //alert(e.target.dataset.order);
      showOrders(e.target);
    }); 
  }
}

function showOrders(order){
  document.getElementById('checkoutButton').style.display = 'block';
  let div = document.getElementById('orderBox');
  let namediv = document.createElement('div');
  let pricediv = document.createElement('div');
  let catererdiv = document.createElement('div');
  let num = document.createElement('input');
  num.setAttribute('type', 'number');
  num.setAttribute('value', '1');
  num.setAttribute('min', '1');
  let divHoldOrder = document.createElement('div');
  namediv.innerHTML = order.dataset.orderName;
  pricediv.innerHTML = 'N' + order.dataset.orderPrice;
  catererdiv.innerHTML = order.dataset.caterer;
  
  divHoldOrder.appendChild(catererdiv);
  divHoldOrder.appendChild(namediv);
  divHoldOrder.appendChild(pricediv);
  divHoldOrder.appendChild(num);

  divHoldOrder.className = 'divHoldOrder';

  div.appendChild(divHoldOrder);

  /*if(!localStorage.getItem('orders')){
    alert('uuu');
    let i = 1;
    let orders = {};
    let ord = {
      name: order.dataset.orderName,
      price: order.dataset.orderPrice,
      caterer: order.dataset.orderCaterer
    };
    orders['order'+i] = ord;
    orders.num = i;
    localStorage.setItem('orders', JSON.stringify(orders));
  } else{
    let orders = JSON.parse(localStorage.getItem('orders'));
    let ord = {
      name: order.dataset.orderName,
      price: order.dataset.orderPrice,
      caterer: order.dataset.orderCaterer
    };
    let l = orders.num;
    ++l;
    orders.num = l;
    orders['order'+l] = ord;
    localStorage.setItem('orders', JSON.stringify(orders));
  }*/
}

localStorage.orders = undefined;

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

class CatererSignupForm extends Form{
  constructor(){
    super();
    this.fName = null;
    this.lName = null;
    this.restaurant = null;
  }
  processForm(e){
    super.processForm(e);
    this.fName = e.target.signupFirstName.value;
    this.lName = e.target.signupLastName.value;
    this.restaurant = e.target.signupRestaurant;
    let name = this.restaurant.value;
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

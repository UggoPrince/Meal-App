
document.addEventListener('DOMContentLoaded', ()=>{
  let nav_toggle = document.getElementById('nav-toggle');
  nav_toggle.addEventListener('click', slideToggle);

  let loginLink = document.getElementById('loginLink');
  let loginModal = document.getElementById('loginModal');
  let closeLogin = document.getElementsByClassName("closeLogin")[0];
  loginLink.onclick = ()=>{
    loginModal.style.display = 'block';
  };
  closeLogin.onclick = () =>{
    loginModal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
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

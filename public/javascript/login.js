const showMenu = () => {
    const menu = document.querySelector("#login-menu");
    menu.classList.add("mystyle");
}

$("#options-menu").on("click", function() {
    $("#login-menu").toggleClass("invisible");
    $("#login-menu").toggleClass("visible");
});

async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
}

const pageCheck = function() {
  if (document.location.pathname != "/signup") {
    document.querySelector('.like-btn').addEventListener('click', redirect);
    document.querySelector('.fav-btn').addEventListener('click', redirect);
  }
}
/* if non loggedin user presses post btns redirect them to signup */
const redirect = function() {
  document.location.replace('/signup');
}

pageCheck()

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
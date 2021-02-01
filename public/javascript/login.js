const showMenu = () => {
    const menu = document.querySelector("#login-menu");
    menu.classList.add("mystyle");
}

$("#options-menu").on("click", function() {
    $("#login-menu").toggleClass("invisible");
    $("#login-menu").toggleClass("visible");
});

$('#login-form').on("submit", function() {

})

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

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
//Login and SignUp
  let loginEl = document.getElementById("login");
  let registerEl = document.getElementById("register");
  let buttonEl = document.getElementById("btn");
  let submitEl = document.querySelectorAll(".submit-button");
  let input = document.querySelectorAll(".input");

  function register() {
    loginEl.style.left = "-450px";
    registerEl.style.left = "-15px";
    buttonEl.style.left = "110px";
  }
  function login() {
    loginEl.style.left = "-15px";
    registerEl.style.left = "400px";
    buttonEl.style.left = "0px";
  }

  let formArr = JSON.parse(localStorage.getItem("FormLS")) || [];
  registerEl.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
      name: input[2].value,
      email: input[3].value,
      password: input[4].value,
    };
    // console.log(data);
    formArr.push(data);
    alert("Signup Successful !!!");
    login();

    localStorage.setItem("FormLS", JSON.stringify(formArr));
  });

  loginEl.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
      email1: input[0].value,
      password1: input[1].value,
    };
    // console.log(data);
    let flag = false;
    formArr.forEach((el) => {
      // console.log(el.name);
      if (el.email === input[0].value && el.password === input[1].value) {
        flag = true;
      } 
      // else {
      //   alert("NO");
      // }
    });
    if(flag==true)
    {
      alert("Congratulations Signin Successful !!!");
      window.location.href = "index.html";
    }
    else
    {
      alert("Wrong Credentials Please Try Again !!!");
      
    }
  });

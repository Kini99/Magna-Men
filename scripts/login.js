// Login and SignUp
let loginEl = document.getElementById("login");
let registerEl = document.getElementById("register");
let buttonEl = document.getElementById("btn");
let submitEl = document.querySelectorAll(".submit-button");
let input = document.querySelectorAll(".input");
let sectionPopup = document.querySelector(".login-register-popup-section");

document.getElementById("close-login-form").addEventListener("click", () => {
  sectionPopup.style.visibility = "hidden"
})
document.getElementById("login-form-opener").addEventListener("click", () => {
  sectionPopup.style.visibility = "visible"
})

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

// let formArr = JSON.parse(localStorage.getItem("FormLS")) || [];
registerEl.addEventListener("submit", function (e) {
  e.preventDefault();
  let data = {
    username: input[2].value,
    fullname: input[2].value,
    email: input[3].value,
    password: input[4].value,
    mobile: "",
    location: "",
    orders: [],
    paymentMode:"",
  };
  console.log(data);
  // formArr.push(data);

  fetch("https://63f45eca3f99f5855dae29dc.mockapi.io/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    alert("Signup Successful !!!");
    login();
  });

  // localStorage.setItem("FormLS", JSON.stringify(formArr));
});

loginEl.addEventListener("submit", function (e) {
  e.preventDefault();
  let data = {
    email: input[0].value,
    password: input[1].value,
  };
  // console.log(data);
  fetch("https://63f45eca3f99f5855dae29dc.mockapi.io/users")
    .then((req) => {
      return req.json();
    })
    .then((response) => {
      // console.log(response);
      getLoginDetails(response,data);
  }).catch((err) => console.log(err));

});

function getLoginDetails(res, data) {
  let flag = 0;
  let loginUerName = "";
  res.forEach(el => {
    if (el.email === data.email && el.password === data.password)
    {
      flag = 1;
      loginUerName = el.fullname;
      console.log(el.email);
      alert("Congratulations SignIn Successful !!!");
      return;
    }
  });
  
  if(flag){
    localStorage.setItem("userName", loginUerName);
    location.reload();
  }else{
    alert("Wrong Credentials Please Try Again !!!");
  }
}










let logedUserName = localStorage.getItem("userName");

if(logedUserName){
    document.getElementById("loged-iser-name").textContent = logedUserName;
    document.getElementById("login-form-opener").style.display = "none";
    document.getElementById("logout-user-button").style.display = "block";
    document.getElementById("order-status-opener").style.display = "none";
}
document.getElementById("logout-user-button").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})

document.querySelector(".order-status").addEventListener("click", () => {
    if(!logedUserName){
        sectionPopup.style.visibility = "visible"
    }
})
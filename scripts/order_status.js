const baseServerURL = `https://63f45eca3f99f5855dae29dc.mockapi.io`;

let trackingUsername=localStorage.getItem("userName");
console.log(trackingUsername)

document.getElementById("loged-iser-name").textContent=trackingUsername;

document.getElementById("userName").innerText=trackingUsername;

let bagitemnumber=localStorage.getItem("cartItem")||[];
document.getElementById("cart-item-count").textContent=bagitemnumber.length;

let usersList;
let user;
let userobj;
fetch(`${baseServerURL}/users`)
  .then(res => res.json())
  .then(data => {
    // console.log(data)
     usersList=data;
    // console.log(usersList)
console.log(usersList)
   user=usersList.filter((el)=>el.fullname==trackingUsername)
   userobj=user[0]

  let text = messageDisplay(userobj)
  let displayel=document.getElementById("status");
      displayel.innerHTML=text;
      // displayel.style.fontSize="100px"
  })


function messageDisplay(userobj){
console.log(userobj)
    let ordersString = "";
    let orders=userobj.orders;
    console.log(orders)
    for (let i = 0; i < orders.length -1; i++) { 
        ordersString += orders[i].name + " , "
    }
    ordersString += orders[orders.length - 1].name;
    console.log(userobj.orderStatus)
    let message;
      if(userobj.orderStatus=="Dispatch Pending"){
        message=`<p>We have received your order for ${ordersString}. The Estimated Delivery Date for this order is ${userobj.estimatedDate}.</p>`
      }else if(userobj.orderStatus=="Dispatch Initiated"){
        message=`<p>We have dispatched your order for ${ordersString}. The Estimated Delivery Date for this order is ${userobj.estimatedDate}.</p>`
      }else if(userobj.orderStatus=="Completed"){
        message=`<p>Thankyou for Shopping with us! We have successfully delivered your order for ${ordersString} on ${userobj.estimatedDate}.</p>`
      }else if(userobj.orderStatus=="Return/Exchange Requested"){
        message=`<p>Your request for Return/Exchange of ${ordersString} shall be processed shortly.</p>`
      }
return message;
}

  // ********************************

  function openHiiUser(){
    document.querySelector(".login-signup-popup").style.visibility = "visible";
}
function closeHiiUser(){
    document.querySelector(".login-signup-popup").style.visibility = "hidden";
}


function dropFilters(elemnt){
    let abc = document.querySelector(`#${elemnt.id} .filter-table-container`);
    abc.style.visibility = "visible"
    abc.style.opacity = "1"
}
function closeDrpedFilter(elemnt){
    let abc = document.querySelector(`#${elemnt.id} .filter-table-container`);
    abc.style.visibility = "hidden"
    abc.style.opacity = "0"
}

document.getElementById("logout-user-button").style.display="block";
document.getElementById("logout-user-button").addEventListener("click", () => {
  localStorage.clear();
  location.href = "./index.html"
})
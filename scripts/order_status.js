const baseServerURL = `https://63f45eca3f99f5855dae29dc.mockapi.io`;

let trackingUsername=localStorage.getItem("userName");
console.log(trackingUsername)

document.getElementById("userName").innerText=trackingUsername;

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
        message=`<h3>We have received your order for ${ordersString}. The Estimated Delivery Date for this order is ${userobj.estimatedDate}.</h3>`
      }else if(userobj.orderStatus=="Dispatch Initiated"){
        message=`<h3>We have dispatched your order for ${ordersString}. The Estimated Delivery Date for this order is ${userobj.estimatedDate}.</h3>`
      }else if(userobj.orderStatus=="Completed"){
        message=`<h3>Thankyou for Shopping with us! We have successfully delivered your order for ${ordersString} on ${userobj.estimatedDate}.</h3>`
      }else if(userobj.orderStatus=="Return/Exchange Requested"){
        message=`<h3>Your request for Return/Exchange of ${ordersString} shall be processed shortly.</h3>`
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
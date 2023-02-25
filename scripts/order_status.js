let usersList;
let user;
fetch(`${baseServerURL}/users`)
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    usersList = filterUsers(data)
    // console.log(usersList)

//    user=usersList.filter((el)=>el.id==)

  })

let ordersString = "";
for (let i = 0; i < element.orders.length - 1; i++) { ordersString += element.orders[i].name + " , "
}
ordersString += element.orders[element.orders.length - 1].name;

  let displayel=document.getElementById("status");
  if(orderStatus=="Dispatch Pending"){
    displayel.innerHTML=`<h3>We have received your order for ${ordersString}. The Estimated Delivery Date for this order is ${estimatedDate}.`
  }else if(orderStatus=="Dispatch Initiated"){
    displayel.innerHTML=`<h3>We have dispatched your order for ${ordersString}. The Estimated Delivery Date for this order is ${estimatedDate}.`
  }else if(orderStatus=="Completed"){
    displayel.innerHTML=`<h3>We have delivered your order for ${ordersString} 
    .`
  }
  
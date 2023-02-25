const baseServerURL = `https://63f45eca3f99f5855dae29dc.mockapi.io`;

let usersList;

function fecthrequest(){
  fetch(`${baseServerURL}/users`)
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    usersList = filterUsers(data)
    // console.log(usersList)
    displayOrders(usersList)
    // chartData(usersList)
  })
}
fecthrequest()

function filterUsers(data) {
  let filteredUsers = data.filter((el) => {
    return el.orders != undefined || el.orders.length != 0;
  })
  // console.log(filteredUsers)
  return filteredUsers
}

let orderingUsers = [];

let table = document.querySelector("tbody")
function displayOrders(data) {
  table.innerHTML = null;

  data.forEach((element) => {

    if (element.orders.length > 0) {
      orderingUsers.push(element);

      let tr = document.createElement("tr");
      tr.setAttribute("class", "trClass")

      let td1 = document.createElement("td");
      td1.innerText = element.id;
      let td2 = document.createElement("td");
      td2.innerText = element.fullname;
      let td3 = document.createElement("td");
      let mem = "";

      for (let i = 0; i < element.orders.length - 1; i++) {
        mem += element.orders[i].name + " , "
      }
      mem += element.orders[element.orders.length - 1].name;

      td3.innerText = mem;
      let td4 = document.createElement("td");
      td4.innerText = element.estimatedDate;
      td4.addEventListener("click", () => {
        let user = usersList.filter((el) => el.id == element.id)
        console.log(user)
        document.querySelector(".popupSection").style.display = "flex";
        updatePopup(user)
      })

      let td5 = document.createElement("td");
      let sum = 0;
      for (let i = 0; i < element.orders.length; i++) {
        sum += +element.orders[i].price;
      }
      td5.innerText = "₹" + sum + "/-";
      let td6 = document.createElement("td");
      td6.innerText = element.orderStatus;
      if (element.orderStatus == "Completed") {
        td6.style.color = "green";
      } else if (element.orderStatus == "Dispatch Initiated") {
        td6.style.color = "blue";
      } else if (element.orderStatus == "Dispatch Pending") {
        td6.style.color = "red";
      } else if (element.orderStatus == "Return/Exchange Requested") {
        td6.style.color = "orange";
      }
      td6.addEventListener("click", () => {
        let user = usersList.filter((el) => el.id == element.id)
        console.log(user)
        document.querySelector(".popupSection").style.display = "flex";
        updatePopup(user)
      })

      let td7 = document.createElement("td");
      td7.innerText = element.paymentMode;

      // let td8 = document.createElement("td");
      // td8.innerText = "Update";
      // td8.setAttribute("class", "statusUpdate")
      // td8.className = "statusUpdate";
      // td8.addEventListener("click", () => {
      //   let user = usersList.filter((el) => el.id == element.id)
      //   console.log(user)
      //   document.querySelector(".popupSection").style.display = "flex";
      //   updatePopup(user)
    
      // })

      tr.append(td1, td2, td3, td4, td5, td6, td7);
      table.append(tr);

    }
  })

}

// console.log(trDisplay)

function updatePopup(order) {
  // document.querySelector(".popupSection").style.display = "flex";
  console.log(order[0])
  let obj = {};
  obj.id = order[0].id;
  console.log(obj.id)
  obj.username=order[0].username;
  obj.fullname=order[0].fullname;
  obj.email=order[0].email;
  obj.password=order[0].password;
  obj.mobile=order[0].mobile;
  obj.location=order[0].location;
  obj.orders=order[0].orders;
  obj.paymentMode=order[0].paymentMode

  let formel=document.getElementById("update-order");
  formel.addEventListener("submit",(e)=>{
e.preventDefault();
console.log("working")
let ele = document.getElementsByName("order-status")
console.log(ele)
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      obj.orderStatus = ele[i].value;
    }
  }
  console.log(document.getElementById("date").value)
  if (document.getElementById("date").value != null) {
   let date = document.getElementById("date").value;
   console.log(date)
   let format="";
  //  2023-02-27
 format+=date[8]+date[9]+"/"+date[5]+date[6]+"/"+date[0]+date[1]+date[2]+date[3];
 obj.estimatedDate=format;
  }

  updateAPI(obj);

  })

  console.log(obj)
  // updateAPI(obj)
  return obj
  // document.querySelector(".popupSection").style.display = "none";

}

function updateAPI(obj){
  console.log(obj)
  fetch(`${baseServerURL}/users/${obj.id}`, {
    method: "PUT", 
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(obj)
  })

 alert("Order Status Updated!")
 document.querySelector(".popupSection").style.display = "none";
 fecthrequest()

}

// document.getElementById("tr").addEventListener("click", () => {
//   document.querySelector(".popupSection").style.display = "flex";
// });
document.getElementById("close-popup-updateform").addEventListener("click", () => {
  document.querySelector(".popupSection").style.display = "none";
});


// let targetDate = new Date();
// targetDate.setDate(targetDate.getDate() + 5);

// let dd = targetDate.getDate();
// let mm = targetDate.getMonth() + 1; 
// let yyyy = targetDate.getFullYear();

// let dateString = dd + "/" + mm + "/" + yyyy;

// console.log(dateString);


// Filter and Sort Function

let allOrdersBtn = document.getElementById("all");
let pendingBtn = document.getElementById("pending");
let initiatedBtn = document.getElementById("initiated");
let allCompletedBtn = document.getElementById("allcompleted");
let requestedBtn = document.getElementById("requested");

let sortSelect = document.getElementById("sortByPrice");

let currentStatus;

allOrdersBtn.addEventListener('click', () => {
  allOrdersBtn.style.backgroundColor = "#152d47";
  allOrdersBtn.style.color = "white";
  pendingBtn.style.backgroundColor = "white";
  pendingBtn.style.color = "#152d47";
  initiatedBtn.style.backgroundColor = "white";
  initiatedBtn.style.color = "#152d47";
  allCompletedBtn.style.backgroundColor = "white";
  allCompletedBtn.style.color = "#152d47";
  requestedBtn.style.backgroundColor = "white";
  requestedBtn.style.color = "#152d47";


  filterTable(usersList)
});
pendingBtn.addEventListener('click', () => {
  allOrdersBtn.style.backgroundColor = "white";
  allOrdersBtn.style.color = "#152d47";
  pendingBtn.style.backgroundColor = "#152d47";
  pendingBtn.style.color = "white";
  initiatedBtn.style.backgroundColor = "white";
  initiatedBtn.style.color = "#152d47";
  allCompletedBtn.style.backgroundColor = "white";
  allCompletedBtn.style.color = "#152d47";
  requestedBtn.style.backgroundColor = "white";
  requestedBtn.style.color = "#152d47";

  let filterData = usersList.filter(el => el.orderStatus == "Dispatch Pending");
  currentStatus = filterData
  filterTable(filterData)
});
initiatedBtn.addEventListener("click", () => {
  allOrdersBtn.style.backgroundColor = "white";
  allOrdersBtn.style.color = "#152d47";
  pendingBtn.style.backgroundColor = "white";
  pendingBtn.style.color = "#152d47";
  initiatedBtn.style.backgroundColor = "#152d47";
  initiatedBtn.style.color = "white";
  allCompletedBtn.style.backgroundColor = "white";
  allCompletedBtn.style.color = "#152d47";
  requestedBtn.style.backgroundColor = "white";
  requestedBtn.style.color = "#152d47";

  let filterData = usersList.filter(el => el.orderStatus == "Dispatch Initiated");
  currentStatus = filterData
  filterTable(filterData)
});
allCompletedBtn.addEventListener("click", () => {
  allOrdersBtn.style.backgroundColor = "white";
  allOrdersBtn.style.color = "#152d47";
  pendingBtn.style.backgroundColor = "white";
  pendingBtn.style.color = "#152d47";
  initiatedBtn.style.backgroundColor = "white";
  initiatedBtn.style.color = "#152d47";
  allCompletedBtn.style.backgroundColor = "#152d47";
  allCompletedBtn.style.color = "white";
  requestedBtn.style.backgroundColor = "white";
  requestedBtn.style.color = "#152d47";

  let filterData = usersList.filter(el => el.orderStatus == "Completed");
  currentStatus = filterData
  filterTable(filterData)
});
requestedBtn.addEventListener("click", () => {
  allOrdersBtn.style.backgroundColor = "white";
  allOrdersBtn.style.color = "#152d47";
  pendingBtn.style.backgroundColor = "white";
  pendingBtn.style.color = "#152d47";
  initiatedBtn.style.backgroundColor = "white";
  initiatedBtn.style.color = "#152d47";
  allCompletedBtn.style.backgroundColor = "white";
  allCompletedBtn.style.color = "#152d47";
  requestedBtn.style.backgroundColor = "#152d47";
  requestedBtn.style.color = "white";

  let filterData = usersList.filter(el => el.orderStatus == "Return/Exchange Requested");
  currentStatus = filterData
  filterTable(filterData)
});


// sortSelect.addEventListener("change", (event) => {
//   let sortedData;
//   console.log(currentStatus)
//   console.log(orderingUsers)

//   if (currentStatus !== undefined) {
//     if (event.target.value == "") {
//       sortedData = currentStatus
//     }else if (event.target.value == "High to Low") {
//       sortedData = currentStatus.sort((a, b) => {b.price - a.price});
//     } else if (event.target.value == "Low to High") {
//       sortedData = currentStatus.sort((a, b) => a.price - b.price);
//     }
//     displayOrders(sortedData);
//   } else {
//     if (event.target.value == "") {
//       displayOrders(orderingUsers);
//       return
//     }else if (event.target.value == "High to Low") {

//       orderingUsers = orderingUsers.map(ele => ({name: ele.fullname, id: ele.id, orders:ele.orders, orderStatus:ele.orderStatus, totalPrice:getActivePrice(ele.orders||[]), totalPurchase:getActivePurchase(ele.orders||[])}));

//     } else if (event.target.value == "Low to High") {
//       sortedData = orderingUsers.sort((a, b) => a.price - b.price);
//     }
//     displayOrders(sortedData);
//   }
// });

// function getActivePrice(data){
//   let activeTotalPrice = 0;
//     data.forEach(ele => {
//       activeTotalPrice += ele.price;
//     })
//     return activeTotalPrice;
// }

function filterTable(filterData) {
  displayOrders(filterData);
}


//search function

let searchInp = document.querySelector("#search");
let searchBtn = document.getElementById("search_icon");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("working")
  let search = searchInp.value;
  let searched = usersList.filter((el) => {
    let mem = "";
    for (let i = 0; i < el.orders.length; i++) {
      mem += el.orders[i].name + " ";
    }
    if (el.id.toLowerCase().includes(search.toLowerCase()) == true || el.fullname.toLowerCase().includes(search.toLowerCase()) == true || mem.toLowerCase().includes(search.toLowerCase()) == true) {
      return true;
    } else {
      return false;
    }
  })
  console.log(searched)
  displayOrders(searched)
})


// function chartData(usersList) {

//   document.getElementById("totalUsersCount").innerText = usersList.length;
//   let totalValue = 0;
//   let shirtsValue = 0;
//   let hoodiesValue = 0;
//   let pants_shortsValue = 0;
//   let totalCount = 0;
//   let shirtsCount = 0;
//   let hoodiesCount = 0;
//   let pants_shorts_count = 0;
//   let totalOrders = 0;
//   usersList.forEach((ele) => {
//     if (ele.orders) {
//       totalOrders += ele.orders.length;
//       totalCount += ele.orders.length;
//       ele.orders.forEach((order) => {
//         totalValue += +order.price || 0;
//         if (order.category == "tshirt") {
//           shirtsValue += +order.price || 0;
//           shirtsCount++;
//         } else if (order.category == "hoodie") {
//           hoodiesValue += +order.price || 0; -
//             hoodiesCount++;
//         } else if (order.category == "pants_shorts") {
//           pants_shortsValue += +order.price || 0;
//           pants_shorts_count++;
//         }
//       });
//     }
//   });
//   document.getElementById("totalOrders").innerText = totalOrders;
//   document.getElementById("total_Sale").textContent = `₹ ${totalValue}`;
//   append_Progress(totalValue, shirtsValue, hoodiesValue, pants_shortsValue);

// };


// function append_Progress(totalValue, shirtsValue, hoodiesValue, pants_shortsValue) {
//   let shirt_Percentage = Math.floor((shirtsValue / totalValue) * 100);
//   let hoodie_Percentage = Math.floor((hoodiesValue / totalValue) * 100);
//   let pantShort_Percentage = Math.floor((pants_shortsValue / totalValue) * 100);

//   append_Progress_Bar(
//     shirt_Percentage,
//     hoodie_Percentage,
//     pantShort_Percentage,
//     shirtsValue,
//     hoodiesValue,
//     pants_shortsValue
//   );
// }

// function append_Progress_Bar(
//   shirt_Percentage,
//   hoodie_Percentage,
//   pantShort_Percentage,
//   shirtsValue,
//   hoodiesValue,
//   pants_shortsValue
// ) {
//   document.querySelector(".cardsContainer").innerHTML = `
//         <div class="card-item">
//         <label>SHIRTS</label>
//         <div class="circular-progress" id="shirtSale">
//           <div  class="value-container" id="shirt-Percentge">0%</div>
//         </div>
//         <span class="value-container">₹${shirtsValue}/-</span>
//       </div>
//       <div class="card-item">
//         <label>HOODIE</label>
//         <div class="circular-progress" id="hoodieSale">
//           <div class="value-container" id="hoodie-Percentge">0%</div>
//         </div>
//         <span class="value-container">₹${hoodiesValue}/-</span>
//       </div>
//       <div class="card-item">
//         <label>PANTS & SHORTS</label>
//         <div class="circular-progress" id="pantsSale">
//           <div class="value-container" id="pants-Percentge">0%</div>
//         </div>
//         <span class="value-container">₹${pants_shortsValue}/-</span>
//       </div>`;
//   let shirt_progress_Bar = document.querySelector("#shirtSale");
//   let shirt_value_Container = document.querySelector("#shirt-Percentge");

//   let shirt_progress_Value = 0;
//   let shirt_progress_EndValue = shirt_Percentage;
//   let shirt_speed = 30;

//   let shirt_progress = setInterval(() => {
//     shirt_progress_Value++;
//     shirt_value_Container.textContent = `${shirt_progress_Value}%`;
//     shirt_progress_Bar.style.background = `conic-gradient(
//             red ${shirt_progress_Value * 3.6}deg,
//             #cadcff ${shirt_progress_Value * 3.6}deg
//         )`;
//     if (shirt_progress_Value == shirt_progress_EndValue) {
//       clearInterval(shirt_progress);
//     }
//   }, shirt_speed);

//   let hoodie_progress_Bar = document.querySelector("#hoodieSale");
//   let hoodie_value_Container = document.querySelector("#hoodie-Percentge");

//   let hoodie_progress_Value = 0;
//   let hoodie_progress_EndValue = hoodie_Percentage;
//   let hoodie_speed = 30;

//   let hoodie_progress = setInterval(() => {
//     hoodie_progress_Value++;
//     hoodie_value_Container.textContent = `${hoodie_progress_Value}%`;
//     hoodie_progress_Bar.style.background = `conic-gradient(
//             orange ${hoodie_progress_Value * 3.6}deg,
//             #cadcff ${hoodie_progress_Value * 3.6}deg
//         )`;
//     if (hoodie_progress_Value == hoodie_progress_EndValue) {
//       clearInterval(hoodie_progress);
//     }
//   }, hoodie_speed);

//   let pants_progressBar = document.querySelector("#pantsSale");
//   let pants_value_Container = document.querySelector("#pants-Percentge");

//   let pants_progress_Value = 0;
//   let pants_progress_EndValue = pantShort_Percentage;
//   let pants_speed = 30;

//   let pants_progress = setInterval(() => {
//     pants_progress_Value++;
//     pants_value_Container.textContent = `${pants_progress_Value}%`;
//     pants_progressBar.style.background = `conic-gradient(
//             lime ${pants_progress_Value * 3.6}deg,
//             #cadcff ${pants_progress_Value * 3.6}deg
//         )`;
//     if (pants_progress_Value == pants_progress_EndValue) {
//       clearInterval(pants_progress);
//     }
//   }, pants_speed);
// }
let baesUrl = "https://63f45eca3f99f5855dae29dc.mockapi.io/";

let addNewProductForm = document.getElementById("add-product");
let totalUserCount = document.getElementById("total-users-count");
let totalOrdersCount = document.getElementById("total-orders");
let totalAvailableProductsCoutn = document.getElementById(
  "total-available-products"
  );
  let usersDetailsContainer = document.getElementById("users-details-container");
  let mostActiveUserDetailsContainer = document.getElementById("most-active-users-details-container");
  let avatars = ["https://cdn-icons-png.flaticon.com/512/190/190670.png", "https://static.vecteezy.com/system/resources/previews/002/400/532/original/young-happy-businessman-character-avatar-wearing-business-outfit-isolated-free-vector.jpg", "https://cdn-icons-png.flaticon.com/512/219/219969.png", "https://cdn-icons-png.flaticon.com/512/146/146035.png", "https://cdn-icons-png.flaticon.com/512/236/236832.png"]

getApiData(`${baesUrl}products`);

totalUsers(`${baesUrl}users`);

addNewProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let bodyObj = {
    name: addNewProductForm.name.value,
    special: addNewProductForm.special.value || "",
    category: addNewProductForm.category.value,
    price: +addNewProductForm.price.value,
    "sale-message": addNewProductForm.sale_message.value || "",
    images: [addNewProductForm.image.value],
    color: [addNewProductForm.colorIcon.value],
  };
  fetch(`${baesUrl}products`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  }).then((res) => getApiData(`${baesUrl}products`));
  alert("Product added succesfully");
  addNewProductForm.name.value = "";
  addNewProductForm.image.value = "";
  addNewProductForm.colorIcon.value = "";
  addNewProductForm.price.value = "";
  addNewProductForm.special.value = "";
  addNewProductForm.sale_message.value = "";
  document.querySelector(".form-popup-section").style.display = "none";
});
document.getElementById("closeMenu").addEventListener("click", () => {
  document.querySelector(".left-section").style.transform =
    "translateX(-250px)";
});
document.getElementById("openMenu").addEventListener("click", () => {
  document.querySelector(".left-section").style.transform = "translateX(0)";
});

document.getElementById("open-form").addEventListener("click", () => {
  document.querySelector(".form-popup-section").style.display = "flex";
});
document.getElementById("close-popup-form").addEventListener("click", () => {
  document.querySelector(".form-popup-section").style.display = "none";
});

function getApiData(url) {
  fetch(url)
    .then((req) => req.json())
    .then((res) => {
      totalAvailableProductsCoutn.textContent = res.length;
      let totalAvailableProducts = res.length;
      let shirtsAvailable = 0;
      let hoodieAvailable = 0;
      let pantsAvailable = 0;
      res.forEach(ele => {
        if(ele.category == "tshirt"){
          shirtsAvailable++;
        }else if(ele.category == "hoodie"){
          hoodieAvailable++;
        }else if(ele.category == "pants_shorts"){
          pantsAvailable++;
        }
      })
      // console.log("thisisis" + totalAvailableProducts, shirtsAvailable, hoodieAvailable, pantsAvailable)
      createChart("Available Products", totalAvailableProducts, shirtsAvailable, hoodieAvailable, pantsAvailable, "sales-chart-table")
    });
}

function appendProgress(total, shirts, hoodies, pants_shorts) {
  let shirtPercentage = Math.floor((shirts / total) * 100);
  let hoodiePercentage = Math.floor((hoodies / total) * 100);
  let pantShortPercentage = Math.floor((pants_shorts / total) * 100);
  console.log(shirtPercentage, hoodiePercentage, pantShortPercentage);
  appendProgressBar(
    shirtPercentage,
    hoodiePercentage,
    pantShortPercentage,
    shirts,
    hoodies,
    pants_shorts
  );
}

function appendProgressBar(
  shirtPercentage,
  hoodiePercentage,
  pantShortPercentage,
  shirts,
  hoodies,
  pants_shorts
) {
  document.querySelector(".cards-container").innerHTML = `
  <div class="card-item">
  <label>SHIRTS</label>
  <div class="circular-progress" id="shirtProgress">
    <div  class="value-container" id="shirtPercentge">0%</div>
  </div>
  <span class="value-container">₹ ${shirts}</span>
</div>
<div class="card-item">
  <label>HOODIE</label>
  <div class="circular-progress" id="hoodieProgress">
    <div class="value-container" id="hoodiePercentge">0%</div>
  </div>
  <span class="value-container">₹ ${hoodies}</span>
</div>
<div class="card-item">
  <label>PANTS & SHORTS</label>
  <div class="circular-progress" id="pantsProgress">
    <div class="value-container" id="pantsPercentge">0%</div>
  </div>
  <span class="value-container">₹ ${pants_shorts}</span>
</div>
  `;
  let progressBar = document.querySelector("#shirtProgress");
  let valueContainer = document.querySelector("#shirtPercentge");

  let progressValue = 0;
  let progressEndValue = shirtPercentage;
  let speed = 30;

  let progress = setInterval(() => {
    progressValue++;
    valueContainer.textContent = `${progressValue}%`;
    progressBar.style.background = `conic-gradient(
      red ${progressValue * 3.6}deg,
      #cadcff ${progressValue * 3.6}deg
  )`;
    if (progressValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);

  let hoodieprogressBar = document.querySelector("#hoodieProgress");
  let hoodievalueContainer = document.querySelector("#hoodiePercentge");

  let hoodieprogressValue = 0;
  let hoodieprogressEndValue = hoodiePercentage;
  let hoodiespeed = 30;

  let hoodieprogress = setInterval(() => {
    hoodieprogressValue++;
    hoodievalueContainer.textContent = `${hoodieprogressValue}%`;
    hoodieprogressBar.style.background = `conic-gradient(
      orange ${hoodieprogressValue * 3.6}deg,
      #cadcff ${hoodieprogressValue * 3.6}deg
  )`;
    if (hoodieprogressValue == hoodieprogressEndValue) {
      clearInterval(hoodieprogress);
    }
  }, hoodiespeed);

  let pantsprogressBar = document.querySelector("#pantsProgress");
  let pantsvalueContainer = document.querySelector("#pantsPercentge");

  let pantsprogressValue = 0;
  let pantsprogressEndValue = pantShortPercentage;
  let pantsspeed = 30;

  let pantsprogress = setInterval(() => {
    pantsprogressValue++;
    pantsvalueContainer.textContent = `${pantsprogressValue}%`;
    pantsprogressBar.style.background = `conic-gradient(
      lime ${pantsprogressValue * 3.6}deg,
      #cadcff ${pantsprogressValue * 3.6}deg
  )`;
    if (pantsprogressValue == pantsprogressEndValue) {
      clearInterval(pantsprogress);
    }
  }, hoodiespeed);
}

function totalUsers(url) {
  fetch(url)
    .then((req) => req.json())
    .then((res) => {
      totalUserCount.textContent = res.length;
      let total = 0;
      let shirts = 0;
      let hoodies = 0;
      let pants_shorts = 0;
      let totalCount = 0;
      let shirtsCout = 0;
      let hoodiesCount = 0;
      let pants_shorts_count = 0;
      let totalOrders = 0;
      res.forEach((ele) => {
        if (ele.orders) {
          totalOrders += ele.orders.length;
          totalCount += ele.orders.length;
          ele.orders.forEach((order) => {
            total += +order.price || 0;
            if (order.category == "tshirt") {
              shirts += +order.price || 0;
              shirtsCout++;
            } else if (order.category == "hoodie") {
              hoodies += +order.price || 0;
              hoodiesCount++;
            } else if (order.category == "pants_shorts") {
              pants_shorts += +order.price || 0;
              pants_shorts_count++;
            }
          });
        }
      });
      totalOrdersCount.textContent = totalOrders;
      createChart("Sales Count", totalCount, shirtsCout, hoodiesCount, pants_shorts_count, "price-chart-table");
      document.getElementById("totalPrice").textContent = `₹ ${total}`;
      appendProgress(total, shirts, hoodies, pants_shorts);
      console.log(total, shirts, hoodies, pants_shorts);
      appendUserDetails(res)
    });
}

function createChart(title, totalCount, shirtsCout, hoodiesCount, pants_shorts_count, tableId) {
  let ranges = Math.floor(totalCount / 10);
  // let tableEl = document.createElement("table");
  let tableEl = document.getElementById(`${tableId}`);
  // <table class="tableChart"> 
  tableEl.innerHTML = `
    <caption> Total ${title} :- ${totalCount} </caption>
      <tr>
        <td colspan="3"> 
        <div class="chart">
        <div class="bar" data-percent=${Math.floor(
          (shirtsCout / totalCount) * 100
        )}>${shirtsCout}</div>
        <div class="bar" data-percent=${Math.floor(
          (hoodiesCount / totalCount) * 100
        )}>${hoodiesCount}</div>
        <div class="bar" data-percent=${Math.floor(
          (pants_shorts_count / totalCount) * 100
        )}>${pants_shorts_count}</div>
        </td>
      </tr>
      <tr>
        <td> SHIRTS </td>
        <td> HOODIES </td>
        <td> PANTS </td>
      </tr>
      `;
      // </table>
  // document.querySelector(".chart-container").append(tableEl)
  // document.querySelector(".chart-container").append(tableEl)
  let bars = document.querySelectorAll(".bar");

  bars.forEach((ele) => {
    console.log(ele.dataset.percent);
    let progressValue = 0;
    let progressEndValue = ele.dataset.percent;
    let progress = setInterval(() => {
      progressValue++;
      ele.style.height = `${progressValue}%`;
      if (progressValue == progressEndValue) {
        clearInterval(progress);
      }
    }, 15);
  });
}

function totalAvailableProductsChart(totalAvailableProducts, shirtsAvailable, hoodieAvailable, pantsAvailable){
  
}

function appendUserDetails(data){
  let mostActiveUser = [...data];
  // mostActiveUser.sort((a,b) => a.)
  // console.log(mostActiveUser);
  let allUsersData = data.map((ele) => getUserHtml(ele.fullname, ele.id, ele.email, ele.orders||[])).join("");
  mostActiveUser = mostActiveUser.map(ele => ({name: ele.fullname, id: ele.id, totalPrice:getActivePrice(ele.orders||[]), totalPurchase:getActivePurchase(ele.orders||[])}));
  mostActiveUser = mostActiveUser.sort((a,b) => b.totalPrice-a.totalPrice);
  while(mostActiveUser.length>5){
    mostActiveUser.pop();
  }
  mostActiveUser = mostActiveUser.map((ele) => getActiveUserHtml(ele.name, ele.id, ele.totalPrice, ele.totalPurchase)).join("");
  // console.log(mostActiveUser);

  mostActiveUserDetailsContainer.innerHTML = `
  <div class="cards-title active-user-card-title">
  <p class="most-acive-user-p">User</p>
  <p class="most-acive-user-p">Id</p>
  <p class="most-acive-user-p">Name</p>
  <p class="most-acive-user-p">Total Orders</p>
  <p class="most-acive-user-p">Total Price</p>
</div>
${mostActiveUser}
  `

  usersDetailsContainer.innerHTML = `
  <div class="cards-title">
    <p class="avarata">User</p>
    <p>Id</p>
    <p>Name</p>
    <p>Email</p>
    <p class="orders">Total Orders</p>
    <p>Total Price</p>
  <p class="delete-user"> Delete Account </p>
  </div>
  ${allUsersData}
  `
  let userCards = document.querySelectorAll(".animatedCard")
  for(let i=0;i<userCards.length;i++){
    i%2==0 ? userCards[i].setAttribute("data-aos", "flip-left") : userCards[i].setAttribute("data-aos", "flip-right")
  }
  document.querySelectorAll(".delte-operation-user").forEach(user => {
    user.addEventListener("click", () => {
      let confirmation = confirm("Are you sure you want to delete this user's account ?");
      if(confirmation){
        fetch(`${baesUrl}/users/${user.dataset.deleteUserId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(req => totalUsers(`${baesUrl}users`))
      }
    })
  })
}

function getActivePrice(data){
  let activeTotalPrice = 0;
    data.forEach(ele => {
      activeTotalPrice += ele.price;
    })
    return activeTotalPrice;
}
function getActivePurchase(data){
  return data.length;
}

function getActiveUserHtml(fullname, id, totalPrice, totalPurchase){
  return `
  <div class="card animatedCard active-user-card-title" data-aos-delay="100" data-aos-duration="1000">
  <img src=${avatars[Math.floor(Math.random()*5)]} alt="" class="active-user-avatar">
  <p class="most-acive-user-p">#magna_${id}</p>
  <p class="most-acive-user-p">${fullname}</p>
  <p class="most-acive-user-p">${totalPurchase}</p>
  <p class="most-acive-user-p">₹ ${totalPrice}</p>
</div>
    `
}

function getUserHtml(name, id, email, order){
  let userTotalOrder = order.length;
  let userTotalPrice = 0;
    order.forEach(ele => {
      userTotalPrice += ele.price;
    })

    return `
  <div class="card animatedCard" data-aos-delay="100" data-aos-duration="1000">
    <img src=${avatars[Math.floor(Math.random()*5)]} alt="">
    <p>#magna_${id}</p>
    <p class="name">${name}</p>
    <p class="gmail">${email}</p>
    <p class="orders">${userTotalOrder}</p>
    <p class="price">₹ ${userTotalPrice}</p>
  <p class="delete-user delte-operation-user" data-delete-user-id=${id}> Delete </p>
  </div>
    `
}

function logOutAdmin(){
  location.href = "./index.html"
}

document.getElementById("close-hii-admin").addEventListener("click", () => {
  document.querySelector(".hii-admin-main").style.visibility = "hidden";
  document.querySelector(".hii-admin-main").style.opacity = "0";
})

document.getElementById("add-by-hi").addEventListener("click", () => {
  document.querySelector(".form-popup-section").style.display = "flex";
  document.querySelector(".hii-admin-main").style.visibility = "hidden";
  document.querySelector(".hii-admin-main").style.opacity = "0";
})

setTimeout(() => {
  document.querySelector(".wecome-popup").style.transform = "translateY(120px)";
}, 3000);

setTimeout(() => {
  document.querySelector(".wecome-popup").style.transform = "translateY(0)";
}, 5000);

setTimeout(() => {
  document.querySelector(".hii-admin-main").style.visibility = "visible";
  document.querySelector(".hii-admin-main").style.opacity = "1";
}, 6000)


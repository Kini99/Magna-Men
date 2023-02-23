const baseServerURL = `https://63f45eca3f99f5855dae29dc.mockapi.io`;

// let usersList=[];
fetch(`${baseServerURL}/users`)
.then(res=>res.json())
.then(data=>{
    console.log(data)
   let usersList= filterUsers(data)
   console.log(usersList)
   displayOrders(usersList)
   chartData(usersList)
})

function filterUsers(data){
let filteredUsers=data.filter((el)=>{
   return el.orders!=undefined
})
console.log(filteredUsers)
return filteredUsers
}


let table=document.querySelector("tbody")
function displayOrders(data){
table.innerHTML=null;

data.forEach((element)=>{
    let tr=document.createElement("tr");
    tr.setAttribute("class","tr")

    let td1=document.createElement("td");
    td1.innerText=element.id;
    let td2=document.createElement("td");
    td2.innerText=element.fullname;
    let td3=document.createElement("td");
    let mem="";
    for(let i=0;i<element.orders.length-1;i++){
        mem+=element.orders[i].name+" , "
    }
    mem+=element.orders[element.orders.length-1].name
    td3.innerText=mem;
    let td4=document.createElement("td");
    td4.innerText="28/02/2023";
    let td5=document.createElement("td");
    let sum=0;
    for(let i=0;i<element.orders.length;i++){
        sum+=+element.orders[i].price;
    }
    td5.innerText="₹"+sum+"/-"; 
    let td6=document.createElement("td");
    td6.innerText="Dispatch Initiated";
    
    let td7=document.createElement("td");
    td7.innerText="Credit Card";

    tr.append(td1,td2,td3,td4,td5,td6,td7);
    table.append(tr);

})

}
  
  function chartData(usersList) {
    
        document.getElementById("totalUsersCount").innerText = usersList.length;
        let totalValue = 0;
        let shirtsValue = 0;
        let hoodiesValue = 0;
        let pants_shortsValue = 0;
        let totalCount = 0;
        let shirtsCount = 0;
        let hoodiesCount = 0;
        let pants_shorts_count = 0;
        let totalOrders = 0;
        usersList.forEach((ele) => {
          if (ele.orders) {
            totalOrders += ele.orders.length;
            totalCount += ele.orders.length;
            ele.orders.forEach((order) => {
              totalValue += +order.price || 0;
              if (order.category == "tshirt") {
                shirtsValue += +order.price || 0;
                shirtsCount++;
              } else if (order.category == "hoodie") {
                hoodiesValue += +order.price || 0;
                hoodiesCount++;
              } else if (order.category == "pants_shorts") {
                pants_shortsValue += +order.price || 0;
                pants_shorts_count++;
              }
            });
          }
        });
        document.getElementById("totalOrders").innerText = totalOrders;
        document.getElementById("total_Sale").textContent = `₹ ${totalValue}`;
        append_Progress(totalValue, shirtsValue, hoodiesValue, pants_shortsValue);
        console.log(totalValue, shirtsValue, hoodiesValue, pants_shortsValue);
      };
  

      function append_Progress(totalValue, shirtsValue, hoodiesValue, pants_shortsValue) {
        let shirt_Percentage = Math.floor((shirtsValue / totalValue) * 100);
        let hoodie_Percentage = Math.floor((hoodiesValue / totalValue) * 100);
        let pantShort_Percentage = Math.floor((pants_shortsValue / totalValue) * 100);
        console.log(shirt_Percentage, hoodie_Percentage, pantShort_Percentage);
        append_Progress_Bar(
          shirt_Percentage,
          hoodie_Percentage,
          pantShort_Percentage,
          shirtsValue,
          hoodiesValue,
          pants_shortsValue
        );
      }
  
      function append_Progress_Bar(
        shirt_Percentage,
        hoodie_Percentage,
        pantShort_Percentage,
        shirtsValue,
        hoodiesValue,
        pants_shortsValue
      ) {
        document.querySelector(".cardsContainer").innerHTML = `
        <div class="cardItem">
        <label>SHIRTS</label>
        <div class="circularProgress" id="shirtSale">
          <div  class="valueContainer" id="shirt-Percentge">0%</div>
        </div>
        <span class="valueContainer">₹${shirtsValue}/-</span>
      </div>
      <div class="cardItem">
        <label>HOODIE</label>
        <div class="circularProgress" id="hoodieSale">
          <div class="valueContainer" id="hoodie-Percentge">0%</div>
        </div>
        <span class="valueContainer">₹${hoodiesValue}/-</span>
      </div>
      <div class="cardItem">
        <label>PANTS & SHORTS</label>
        <div class="circularProgress" id="pantsSale">
          <div class="valueContainer" id="pants-Percentge">0%</div>
        </div>
        <span class="valueContainer">₹${pants_shortsValue}/-</span>
      </div>
        `;
        let shirt_progress_Bar = document.querySelector("#shirtSale");
        let shirt_value_Container = document.querySelector("#shirt-Percentge");
      
        let shirt_progress_Value = 0;
        let shirt_progress_EndValue = shirt_Percentage;
        let shirt_speed = 30;
      
        let shirt_progress = setInterval(() => {
          shirt_progress_Value++;
          shirt_value_Container.textContent = `${shirt_progress_Value}%`;
          shirt_progress_Bar.style.background = `conic-gradient(
            red ${shirt_progress_Value * 3.6}deg,
            #cadcff ${shirt_progress_Value * 3.6}deg
        )`;
          if (shirt_progress_Value == shirt_progress_EndValue) {
            clearInterval(shirt_progress);
          }
        }, shirt_speed);
      
        let hoodie_progress_Bar = document.querySelector("#hoodieSale");
        let hoodie_value_Container = document.querySelector("#hoodie-Percentge");
      
        let hoodie_progress_Value = 0;
        let hoodie_progress_EndValue = hoodie_Percentage;
        let hoodie_speed = 30;
      
        let hoodie_progress = setInterval(() => {
          hoodie_progress_Value++;
          hoodie_value_Container.textContent = `${hoodie_progress_Value}%`;
          hoodie_progress_Bar.style.background = `conic-gradient(
            orange ${hoodie_progress_Value * 3.6}deg,
            #cadcff ${hoodie_progress_Value * 3.6}deg
        )`;
          if (hoodie_progress_Value == hoodie_progress_EndValue) {
            clearInterval(hoodie_progress);
          }
        }, hoodie_speed);
      
        let pants_progressBar = document.querySelector("#pantsSale");
        let pants_value_Container = document.querySelector("#pants-Percentge");
      
        let pants_progress_Value = 0;
        let pants_progress_EndValue = pantShort_Percentage;
        let pants_speed = 30;
      
        let pants_progress = setInterval(() => {
          pants_progress_Value++;
          pants_value_Container.textContent = `${pants_progress_Value}%`;
          pants_progressBar.style.background = `conic-gradient(
            lime ${pants_progress_Value * 3.6}deg,
            #cadcff ${pants_progress_Value * 3.6}deg
        )`;
          if (pants_progress_Value == pants_progress_EndValue) {
            clearInterval(pants_progress);
          }
        }, pants_speed);
      }
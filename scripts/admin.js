let baesUrl = "https://63f45eca3f99f5855dae29dc.mockapi.io/products";

let addNewProductForm = document.getElementById("add-product");

getApiData(baesUrl);

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
  fetch(baesUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  }).then((res) => getApiData(baesUrl));
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
      console.log(res);
      let total = 0;
      let shirts = 0;
      let hoodies = 0;
      let pants_shorts = 0;
      let totalCount = 0;
      let shirtsCout = 0;
      let hoodiesCount = 0;
      let pants_shorts_count = 0;
      res.forEach((ele) => {
        total += +ele.price || 0;
        totalCount++;
        if (ele.category == "tshirt") {
          shirts += +ele.price || 0;
          shirtsCout++;
        } else if (ele.category == "hoodie") {
          hoodies += +ele.price || 0;
          hoodiesCount++;
        } else if (ele.category == "pants_shorts") {
          pants_shorts += +ele.price || 0;
          pants_shorts_count++;
        }
      });
      console.log(total, shirts, hoodies, pants_shorts);
      createChart(totalCount, shirtsCout, hoodiesCount, pants_shorts_count);
      document.getElementById("totalPrice").textContent = `₹ ${total}`;
      appendProgress(total, shirts, hoodies, pants_shorts);
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

function createChart(totalCount, shirtsCout, hoodiesCount, pants_shorts_count) {
  let ranges = Math.floor(totalCount / 10);
  // console.log("temp" + temp);
  document.querySelector(".chart-container").innerHTML = `
    <table class="tableChart"> 
    <caption> Total Sales Count :- ${totalCount} </caption>
      <tr>
        <td colspan="3"> 
        <div class="chart">
        <div class="bar" data-percent=${Math.floor(
          (shirtsCout / totalCount) * 100 + 17
        )}>${Math.floor((shirtsCout / totalCount) * 100)}</div>
        <div class="bar" data-percent=${Math.floor(
          (hoodiesCount / totalCount) * 100 
        )}>${Math.floor(
(hoodiesCount / totalCount) * 100
)}</div>
        <div class="bar" data-percent=${Math.floor(
          (pants_shorts_count / totalCount) * 100 + 27
        )}>${Math.floor(
(pants_shorts_count / totalCount) * 100
)}</div>
        </td>
      </tr>
      <tr>
        <td> SHIRTS </td>
        <td> HOODIES </td>
        <td> PANTS </td>
      </tr>
    </table>
  `;
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

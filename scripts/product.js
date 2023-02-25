// department
document.querySelector(".department_legend").addEventListener("click", () => {
  document.querySelector(".dep_select").style.display = "block";
});

document.querySelector(".department").addEventListener("mouseleave", () => {
  document.querySelector(".dep_select").style.display = "none";
});

// brands
document.querySelector(".brands_legend").addEventListener("click", () => {
  document.querySelector(".brands_select").style.display = "block";
});

document.querySelector(".brands").addEventListener("mouseleave", () => {
  document.querySelector(".brands_select").style.display = "none";
});

// graphic
document.querySelector(".graphic_legend").addEventListener("click", () => {
  document.querySelector(".graphic_select").style.display = "block";
});

document.querySelector(".graphic").addEventListener("mouseleave", () => {
  document.querySelector(".graphic_select").style.display = "none";
});

// colors
document.querySelector(".colors_legend").addEventListener("click", () => {
  document.querySelector(".colors_select").style.display = "block";
});

document.querySelector(".colors").addEventListener("mouseleave", () => {
  document.querySelector(".colors_select").style.display = "none";
});

// appending all the product cards
const baseServerURL = `https://63f45eca3f99f5855dae29dc.mockapi.io`;

let allProductsData = [];
let sortArray = [];
let totalProducts;
fetch(`${baseServerURL}/products`)
  .then((res) => res.json())
  .then((data) => {
    totalProducts = data.length;
    sortArray = data;
    // console.log(sortArray)
    for (let i = 0; i < data.length; i++) {
      allProductsData.push(data[i]);
    }
    document.querySelector(".count").innerText = `(${allProductsData.length})`;

    //console.log(allProductsData)
   // console.log(allProductsData.length)
  });

let productsData = [];
fetchProductsData(1);
async function fetchProductsData(pageNumber) {
  try {
    let request = await fetch(
      `${baseServerURL}/products/?limit=15&page=${pageNumber}`
    );
    let products_data = await request.json();
    // let totalProducts =products_data.length;
    // console.log(totalProducts)
    showPagination(totalProducts, 15);

    display(products_data);
    // console.log(products_data);
    productsData = [...products_data];
  } catch (error) {
    console.log(error);
  }
}

// fetch(`${baseServerURL}/products`)
//     .then((req) => {
//       return req.json();
//     })
//     .then((response) => {
//         console.log(response);
//         display(response);
//     })
//     .catch((error) => { console.log(error);})

let hemant=document.querySelector(".product_cards");


function display(data) {
  document.querySelector(".product_cards").innerHTML = "";
  data.forEach((el, i) => {
    const product = data[i];

    let card = document.createElement("div");

    card.setAttribute('data-product-id', product.id);
    
    //console.log(product.id)

    card.className = "product_card_data";
    //const cardElements = document.querySelector('.product_card_data');
    //console.log(cardElements)

    let img = document.createElement("img");

    img.src = el.images[0];
    img.className = "product_card_image";
    img.style.width = "100%";

    // product color seletction

    const colorContainer = document.createElement("div");
    colorContainer.classList.add("color-container");
    product.color.forEach((color) => {
      const colorBtn = document.createElement("button");
      colorBtn.style.backgroundImage = `url(${color})`;
      colorBtn.classList.add("color-btn");
      colorBtn.addEventListener("click", () => {
        img.src = product.images[product.color.indexOf(color)];
      });
      colorContainer.appendChild(colorBtn);
    });

    // for linking cart page
    let contentBox = document.createElement("div");
    contentBox.addEventListener("click", () => { 
      localStorage.setItem("cartId", el.id);
      // location.href = ""
    })




    let offer = document.createElement("p");
    offer.textContent = el.special;
    offer.style.color = "#205493";
    offer.style.fontWeight = "700";

    let title = document.createElement("p");
    title.textContent = el.name;
    title.style.color = "gray"

    let price = document.createElement("p");
    price.textContent = `₹ ${el.price}.00`
    price.style.fontWeight = "700";
    
    let sale = document.createElement("p");
    sale.textContent = el[`sale-message`];
    sale.style.color = "#dc3545";

    // colorContainer.append(colorBtn);
    contentBox.append(offer, title, price, sale)
    card.append(img, colorContainer,contentBox);
    document.querySelector(".product_cards").append(card);
  });
  // console.log(data);
  //console.log(data.length)
}

// pagination

function showPagination(totalProducts, limit) {
  let numOfButtons = Math.ceil(totalProducts / limit);

  let pagination = document.getElementById("pagination");
  pagination.innerHTML = null;

  for (let i = 1; i <= numOfButtons; i++) {
    pagination.append(getButton(i, i));
  }
}

function getButton(text, pageNumber) {
  let btn = document.createElement("button");
  btn.classList.add("pagination-button");
  btn.setAttribute("data-page-number", pageNumber);
  btn.textContent = text;

  btn.addEventListener("click", function (e) {
    let pageNumber = e.target.dataset["pageNumber"];
    fetchProductsData(pageNumber);
    // btn.style.backgroundColor = "black";
  });

  return btn;
}

// sorting
// let sorted = document.getElementById("sort");
// sorted.addEventListener("change", () => {
//   if (sorted.value === "") {
//     display(sortArray);
//     // console.log(sortArray);
//   }
//   else if (sorted.value === "Low To High") {
//     let sortedData = JSON.parse(JSON.stringify(sortArray));
//     sortedData = sortedData.sort((a, b) => {
//       return a.price - b.price;
//     })
//     // console.log(sortedData);
//   }

// })



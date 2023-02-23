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
let totalProducts;
fetch(`${baseServerURL}/products`)
  .then((res) => res.json())
  .then((data) => {
    totalProducts = data.length;
    // console.log(totalProducts)
    for (let i = 0; i < data.length; i++) {
      allProductsData.push(data[i]);
    }
    document.querySelector(".count").innerText = `(${allProductsData.length})`;

    // console.log(allProductsData)
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

document.querySelector(".product_cards");
function display(data) {
  document.querySelector(".product_cards").innerHTML = "";
  data.forEach((el) => {
    let card = document.createElement("div");
    card.className = "product_card_data"

    let img = document.createElement("img");

    img.src = el.images;
    img.className = "product_card_image";
    img.style.width = "100%";
    let offer = document.createElement("p");
    offer.textContent = el.special;

    let title = document.createElement("p");
    title.textContent = el.name;

    let price = document.createElement("p");
    price.textContent = `INR${el.price}.00`;

    let sale = document.createElement("p");
    sale.textContent = el[`sale-message`];

    card.append(img, offer, title, price, sale);
    document.querySelector(".product_cards").append(card);
  });
  // console.log(data);
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

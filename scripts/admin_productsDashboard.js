// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `https://63f45eca3f99f5855dae29dc.mockapi.io`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

//fetching data

let allProductsData = [];
let totalProducts;
fetch(`${baseServerURL}/products`)
  .then(res => res.json())
  .then(data => {
    totalProducts = data.length;
    console.log(totalProducts)
    for (let i = 0; i < data.length; i++) {
      allProductsData.push(data[i]);
    }
    console.log(allProductsData)
  })

let productsData = []
fetchProductsData(1);
async function fetchProductsData(pageNumber) {
  try {
    let request = await fetch(`${baseServerURL}/products/?limit=10&page=${pageNumber}`);
    let products_data = await request.json();
    // let totalProducts =products_data.length;
    // console.log(totalProducts)
    showPagination(totalProducts, 10);

    display_products(products_data);
    console.log(products_data);
    productsData = [...products_data]
  } catch (error) {
    console.log(error);
  }
}


// products data display function 

let displayel = document.querySelector("#displayContainer");

function display_products(data) {
  displayel.innerHTML = null;
  data.forEach((element, index) => {
    let div = 
    // div.setAttribute("class","card")
    // div.innerHTML=

    displayel.appendChild(div);

    let id = document.createElement("td");
    id.innerText = element.id;

    let image = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", `${element.images[0]}`)
    image.append(img);

    let name = document.createElement("td");
    name.innerText = element.name;

    let category = document.createElement("td");
    if (element.category == "tshirt") {
      category.innerText = "T-Shirt"
    } else if (element.category == "hoodie") {
      category.innerText = "Hoodie"
    } else {
      category.innerText = "Pant/Shorts"
    }

    let tag = document.createElement("td");
    if (element.special != undefined) {
      tag.innerText = element.special;
    } else {
      tag.innerText = "NA"
    }


    let price = document.createElement("td");
    price.innerText = "₹ " + element.price + " /-";

    let editBtn = document.createElement("td");
    editBtn.innerText = "Edit Item";
    editBtn.style.cursor = "pointer";
    editBtn.style.color = "green";

    editBtn.addEventListener("click", () => {
      let product = { ...element }
      // console.log(product)
      editPopup(product);
    })

    let removeBtn = document.createElement("td");
    removeBtn.innerText = "Remove Item";
    removeBtn.style.cursor = "pointer";
    removeBtn.style.color = "red";

    removeBtn.addEventListener("click", () => {
      removeProduct(element);
    })


    tr.append(id, image, name, category, tag, price, editBtn, removeBtn);
    displayel.append(tr);
  })
}


//Remove Product

function removeProduct(data) {
  fetch(`${baseServerURL}/products/${element.id}`, {
    method: "DELETE"
  })
}

//Edit Product details

function editPopup(data) {
  let popupDisplay = document.getElementById("editPopup")
  popupDisplay.style.display = "flex";

  let formel = document.querySelector("form");
  let obj = {};
  fetch(`${baseServerURL}/products/${data.id}`)
    .then(res => res.json())
    .then(data1 => {
      document.getElementById("name").value = data1.name;
      document.getElementById("image").value = data1.images[0];
      document.getElementById("category").value = data1.category;
      document.getElementById("tag").value = data1.special;
      document.getElementById("price").value = data1.price;
      obj.id = data1.id

      console.log(document.getElementById("name").value)
    })

  formel.addEventListener("submit", (e) => {
    e.preventDefault();

    obj.name = document.getElementById("name").value;
    obj.images = document.getElementById("image").value;
    obj.category = document.getElementById("category").value;
    obj.special = document.getElementById("tag").value;
    obj.price = document.getElementById("price").value;
    console.log(obj)
    editProduct(obj)
  })

}

function editProduct(obj) {
  fetch(`${baseServerURL}/products/${obj.id}`, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(res => {
      fetchProductsData(1);
    })
}

// Pagination

function showPagination(totalProducts, limit) {
  let numOfButtons = Math.ceil(totalProducts / limit);

  let pagination = document.getElementById("pagination");
  pagination.innerHTML = null;

  for (let i = 1; i <= numOfButtons; i++) {
    pagination.append(getButton(i, i))
  }
}

function getButton(text, pageNumber) {
  let btn = document.createElement('button');
  btn.classList.add('pagination-button');
  btn.setAttribute('data-page-number', pageNumber);
  btn.textContent = text;

  btn.addEventListener('click', function (e) {
    let pageNumber = e.target.dataset['pageNumber'];
    fetchProductsData(pageNumber);
  })

  return btn;
}

//Filter and Sort functions

let tshirtBtn = document.getElementById("tshirts");
let hoodiesBtn = document.getElementById("hoodies");
let pantsBtn = document.getElementById("pants");
let sortSelect = document.getElementById("sortByPrice");

tshirtBtn.addEventListener('click', () => {
  let filterData = allProductsData.filter(el => el.category == "tshirt");
  console.log("filterData")
  filterTable(filterData)
});
hoodiesBtn.addEventListener('click', () => {
  let filterData = allProductsData.filter(el => el.category == "hoodie");
  console.log("filterData")
  filterTable(filterData)
});
pantsBtn.addEventListener("click", () => {
  let filterData = allProductsData.filter(el => el.category == "pants_shorts");
  console.log("filterData")
  filterTable(filterData)
});
sortSelect.addEventListener("change", () => {
  console.log(filterData);
  filterTable(filterData);
});

function filterTable(filterData) {
  // console.log("working")
  // console.log(filterData)
  // console.log(sortSelect.value)
  if (sortSelect.value == "High to Low") {
    filterData = filterData.sort((a, b) => console.log(b.price, a.price));
  } else if (sortSelect.value == "Low to High") {
    filterData = filterData.sort((a, b) => a.price - b.price);
  }
  console.log(filterData)
  display_products(filterData);
}



//search function

let searchInp = document.querySelector("#search");
let searchBtn = document.getElementById("search_icon");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("working")
  // console.log(searchInp.value)
  let search = searchInp.value;
  console.log(search)
  console.log(productsData)
  console.log(allProductsData)
  let searched = allProductsData.filter((el) => {
    // console.log(el)
    if (el.name.toLowerCase().includes(search.toLowerCase()) == true || el.category.toLowerCase().includes(search.toLowerCase()) == true) {
      return true;
    } else {
      return false;
    }
  })
  display_products(searched)
})


// let tr = document.createElement("tr")
//     // div.setAttribute("class","card")
//     // div.innerHTML=

//     let id = document.createElement("td");
//     id.innerText = element.id;

//     let image = document.createElement("td");
//     let img = document.createElement("img");
//     img.setAttribute("src", `${element.images[0]}`)
//     image.append(img);

//     let name = document.createElement("td");
//     name.innerText = element.name;

//     let category = document.createElement("td");
//     if (element.category == "tshirt") {
//       category.innerText = "T-Shirt"
//     } else if (element.category == "hoodie") {
//       category.innerText = "Hoodie"
//     } else {
//       category.innerText = "Pant/Shorts"
//     }

//     let tag = document.createElement("td");
//     if (element.special != undefined) {
//       tag.innerText = element.special;
//     } else {
//       tag.innerText = "NA"
//     }


//     let price = document.createElement("td");
//     price.innerText = "₹ " + element.price + " /-";

//     let editBtn = document.createElement("td");
//     editBtn.innerText = "Edit Item";
//     editBtn.style.cursor = "pointer";
//     editBtn.style.color = "green";

//     editBtn.addEventListener("click", () => {
//       let product = { ...element }
//       // console.log(product)
//       editPopup(product);
//     })

//     let removeBtn = document.createElement("td");
//     removeBtn.innerText = "Remove Item";
//     removeBtn.style.cursor = "pointer";
//     removeBtn.style.color = "red";

//     removeBtn.addEventListener("click", () => {
//       removeProduct(element);
//     })


//     tr.append(id, image, name, category, tag, price, editBtn, removeBtn);
//     displayel.append(tr);
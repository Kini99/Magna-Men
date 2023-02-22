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
    // console.log(totalProducts)
    for (let i = 0; i < data.length; i++) {
      allProductsData.push(data[i]);
    }
    // console.log(allProductsData)
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
    // console.log(products_data);
    productsData = [...products_data]
  } catch (error) {
    console.log(error);
  }
}


// products data display function 

let displayel = document.querySelector("#displayContainer");

function display_products(data) {
  // console.log(data)
  displayel.innerHTML = null;
  // data.forEach((element, index) => {

      let list = `<div class="card-list">${data.map((item)=>{
        if(item.category==undefined){
          item.category = "NA";
        }
        return getCard(item.images[0],item.name,item.id,item.category,item.special,item.price)}).join("")}
        </div>`

    displayel.innerHTML=list

    let editBtn = document.getElementsByClassName("editBtn");
    // console.log(editBtn)
    let editBtnArr=[]
    editBtnArr=[...editBtn]
    // console.log(editBtnArr)
editBtnArr.forEach((e)=>{
  e.addEventListener("click", (event) => {
  //  console.log(event.target.dataset.editId)
  let editID=event.target.dataset.editId
  //   let product = data.editID
    // console.log(editID)

    fetch(`${baseServerURL}/products/${editID}`)
    .then(req=>req.json())
    .then(res=>editPopup(res))

  })
})
    

    let removeBtn = document.getElementsByClassName("removeBtn");
   let removeBtnArr=[];
   removeBtnArr=[...removeBtn]
   removeBtnArr.forEach((e)=>{
    e.addEventListener("click", (event) => {
      let removeID=event.target.dataset.removeId
  //   let product = data.editID
    // console.log(removeID)

    fetch(`${baseServerURL}/products/${removeID}`)
    .then(req=>req.json())
    .then(res=>removeProduct(res))
    })
   })
    
  // })
}

function getCard(images,name,id,category,special,price){
  
if(category==undefined){
  category="NA"
}

  let card=`<div class="card"><img src="${images}" alt="">
  <h4>${name}</h4>
  <h5>ID: ${id}</h5>
  <h5>Category: ${category}</h5>
  <h5>Tag: ${special}</h5>
  <h5>Price: ₹${price}/-</h5>
  <button class="editBtn" data-edit-id="${id}">Edit Item</button>
  <button class="removeBtn" data-remove-id="${id}">Remove Item</button></div>`

  return card
}


//Remove Product

function removeProduct(data) {
  fetch(`${baseServerURL}/products/${element.id}`, {
    method: "DELETE"
  })
}

//Edit Product details

function editPopup(data) {
 document.querySelector(".editProduct-popup-section").style.display = "flex";

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

      // console.log(document.getElementById("name").value)
    })

  formel.addEventListener("submit", (e) => {
    e.preventDefault();

    obj.name = document.getElementById("name").value;
    obj.images = [document.getElementById("image").value];
    obj.category = document.getElementById("category").value;
    obj.special = document.getElementById("tag").value;
    obj.price = document.getElementById("price").value;
    // console.log(obj)
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
    alert("Product Changes Saved!")
    document.querySelector(".editProduct-popup-section").style.display = "none";
}

document.getElementById("editProduct").addEventListener("click", () => {
  document.querySelector(".form-popup-section").style.display = "flex";
});
document.getElementById("close-popup-Editform").addEventListener("click", () => {
  document.querySelector(".editProduct-popup-section").style.display = "none";
});

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

let currentCategory;

tshirtBtn.addEventListener('click', () => {
  let filterData = allProductsData.filter(el => el.category == "tshirt");
  // filteredData=[filterData]
  currentCategory=filterData
  // console.log("filterData")
  filterTable(filterData)
});
hoodiesBtn.addEventListener('click', () => {
  let filterData = allProductsData.filter(el => el.category == "hoodie");
  // filteredData=[...filterData]
  currentCategory=filterData
  filterTable(filterData)
});
pantsBtn.addEventListener("click", () => {
  let filterData = allProductsData.filter(el => el.category == "pants_shorts");
  // filteredData=[filterData]
  currentCategory=filterData
  filterTable(filterData)
});



sortSelect.addEventListener("change", (event) => {
  let sortedData;
  console.log(currentCategory)

  if(currentCategory!==undefined){
  if (event.target.value == "High to Low") {
    sortedData = currentCategory.sort((a, b) => b.price - a.price);
  } else if (event.target.value == "Low to High") {
    sortedData = currentCategory.sort((a, b) => a.price - b.price);
  }else if(event.target.value == ""){
    sortedData = currentCategory
  }
  filterTable(sortedData);
}else{
  if (event.target.value == "High to Low") {
    sortedData = allProductsData.sort((a, b) => b.price - a.price);
  } else if (event.target.value == "Low to High") {
    sortedData = allProductsData.sort((a, b) => a.price - b.price);
  }else if(event.target.value == ""){
    sortedData = allProductsData
    console.log(sortedData)
    // filterTable(sortedData);
    // return
  }
  filterTable(sortedData);
}
});



function filterTable(filterData) {
  // console.log("working")
  // console.log(filterData)
  // console.log(sortSelect.value)

  console.log(filterData)
  display_products(filterData);
}


function sortByPrice(){
 
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


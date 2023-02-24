const baseServerURL = `https://63f45eca3f99f5855dae29dc.mockapi.io`;

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

  // let list = `<div class="card-list">${data.map((item) => {
  //   return getCard(item)
  // }).join("")}
  //       </div>`

  let maindiv = document.createElement("div");
  maindiv.setAttribute("class", "card-list");

  data.forEach((item) => {

    let div = document.createElement("div");
    div.setAttribute("class", "productcard");

    let img = document.createElement("img");
    img.src = item.images[0];
    img.style.width = "100%";
    // console.log(img)

    let colorContainer = document.createElement("div");
    colorContainer.classList.add("color-container");
    item.color.forEach((color) => {
      let colorBtn = document.createElement("button");
      colorBtn.style.backgroundImage = `url(${color})`;
      colorBtn.classList.add("color-btn");
      colorBtn.addEventListener("click", () => {
        img.src = item.images[item.color.indexOf(color)];
      });
      colorContainer.appendChild(colorBtn);
    });

    let h4 = document.createElement("h4");
    h4.innerText = item.name;

    let h5_id = document.createElement("h5");
    h5_id.innerText = "ID: " + item.id;

    let h5_category = document.createElement("h5");
    h5_category.innerText = "Category: " + item.category;

    let h5_tag = document.createElement("h5");
    h5_tag.innerText = "Tag: " + item.special;

    let h5_price = document.createElement("h5");
    h5_price.innerText = "Price: ₹" + item.price + "/-";

    let editBtn = document.createElement("button");
    editBtn.setAttribute("class", "editBtn");
    editBtn.setAttribute("data-edit-id", item.id);
    editBtn.innerText = "Edit Item";

    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "removeBtn");
    removeBtn.setAttribute("data-remove-id", item.id);
    removeBtn.innerText = "Remove Item";

    div.append(img, colorContainer, h4, h5_id, h5_category, h5_tag, h5_price, editBtn, removeBtn)
    maindiv.append(div);

  })

  displayel.append(maindiv);

  let editBtn = document.getElementsByClassName("editBtn");
  // console.log(editBtn)
  let editBtnArr = []
  editBtnArr = [...editBtn]
  // console.log(editBtnArr)
  editBtnArr.forEach((e) => {
    e.addEventListener("click", (event) => {
      //  console.log(event.target.dataset.editId)
      let editID = event.target.dataset.editId

      fetch(`${baseServerURL}/products/${editID}`)
        .then(req => req.json())
        .then(res => editPopup(res))

    })
  })

  let removeBtn = document.getElementsByClassName("removeBtn");
  let removeBtnArr = [];
  removeBtnArr = [...removeBtn]
  removeBtnArr.forEach((e) => {
    e.addEventListener("click", (event) => {

      let removeID = event.target.dataset.removeId
      //   let product = data.editID
      // console.log(removeID)

      fetch(`${baseServerURL}/products/${removeID}`, {
        method: "DELETE"
      })
      fetchProductsData(1)
      alert("Product Deleted Successfully!")
    })
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
      if (data1.special == undefined) {
        data1.special = "NA";
      }
      document.getElementById("tag").value = data1.special;
      document.getElementById("price").value = data1.price;
      obj.id = data1.id
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
  currentCategory = filterData
  filterTable(filterData)
});
hoodiesBtn.addEventListener('click', () => {
  let filterData = allProductsData.filter(el => el.category == "hoodie");
  currentCategory = filterData
  filterTable(filterData)
});
pantsBtn.addEventListener("click", () => {
  let filterData = allProductsData.filter(el => el.category == "pants_shorts");
  currentCategory = filterData
  filterTable(filterData)
});

sortSelect.addEventListener("change", (event) => {
  let sortedData;
  // console.log(currentCategory)
  let sortedAllProductData = allProductsData

  if (currentCategory !== undefined) {
    if (event.target.value == "default") {
      sortedData = currentCategory
      display_products(currentCategory)
      return
      // fetchProductsData(6)
    } else if (event.target.value == "High to Low") {
      sortedData = currentCategory.sort((a, b) => b.price - a.price);
    } else if (event.target.value == "Low to High") {
      sortedData = currentCategory.sort((a, b) => a.price - b.price);
    }
    display_products(sortedData);
  } else {
    // sortedData=null;
    if (event.target.value == "default") {
      fetchProductsData(1)
      return
    } else if (event.target.value == "High to Low") {
      sortedData = allProductsData.sort((a, b) => b.price - a.price);
      console.log(allProductsData)
    } else if (event.target.value == "Low to High") {
      sortedData = allProductsData.sort((a, b) => a.price - b.price);
      console.log(allProductsData)
    }

    display_products(sortedData);
  }
});

function filterTable(filterData) {
  // let n=filterData.length
  // paginate(filterData,10,showPaginationFiltered(n,10))
  console.log(filterData)
  display_products(filterData);
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = null;
}


//Pagination on filtered Data 


// function paginate(array, page_size, page_number) {
//   console.log(array)
//   let displayArr= array.slice((page_number - 1) * page_size, page_number * page_size);
//   console.log(displayArr)
//   display_products(displayArr);

// }

// function showPaginationFiltered(totalProducts, limit) {
//   let numOfButtons = Math.ceil(totalProducts / limit);

//   let pagination1 = document.getElementById("pagination");
//   pagination1.innerHTML = null;

//   for (let i = 1; i <= numOfButtons; i++) {
//     pagination1.append(getButton(i, i))
//   }
//   // return pageNumber
// }

// function getButtonFiltered(text, pageNumber) {
//   let btn = document.createElement('button');
//   btn.classList.add('pagination-button');
//   btn.setAttribute('data-page-number', pageNumber);
//   btn.textContent = text;

//   btn.addEventListener('click', function (e) {
//     let pageNumber = e.target.dataset['pageNumber'];
//     return pageNumber;
//   })
// }


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




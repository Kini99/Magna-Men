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

// types
document.querySelector(".types_legend").addEventListener("click", () => {
  document.querySelector(".types_select").style.display = "block";
});

document.querySelector(".types").addEventListener("mouseleave", () => {
  document.querySelector(".types_select").style.display = "none";
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
    console.log(products_data);
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
    


    // quick view
    let quickView = document.createElement("div");
    quickView.className = "quick_view";
    quickView.textContent = "Quick View";

    card.addEventListener("mouseenter", () => {
      quickView.style.display = "block";
    })
    card.addEventListener("mouseleave", () => {
      quickView.style.display = "none";
    })

    quickView.addEventListener("click", () => {
      localStorage.setItem("cartId", el.id);

      window.location.href = "./description.html"
    })


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
    contentBox.style.cursor = "pointer";
    contentBox.addEventListener("click", () => {
      localStorage.setItem("cartId", el.id);

      window.location.href = "./description.html"
    })




    let offer = document.createElement("p");
    offer.textContent = el.special;
    offer.style.color = "#205493";
    offer.style.fontWeight = "700";

    let title = document.createElement("p");
    title.textContent = el.name;
    title.style.color = "gray";

    let price = document.createElement("p");
    price.textContent = `₹ ${el.price}.00`;
    price.style.fontWeight = "700";

    let sale = document.createElement("p");
    sale.textContent = el[`sale-message`];
    sale.style.color = "#dc3545";

    // colorContainer.append(colorBtn);
    contentBox.append(offer, title, price, sale);
    card.append(img,quickView, colorContainer, contentBox);
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





//search function

let searchInp = document.querySelector("#search_product");
let searchBtn = document.getElementById("search_product_icon");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let search = searchInp.value;
  console.log(allProductsData);
  let searched = allProductsData.filter((el) => {
    // console.log(el)
    if (
      el.name.toLowerCase().includes(search.toLowerCase()) == true ||
      el.category.toLowerCase().includes(search.toLowerCase()) == true
    ) {
      return true;
    } else {
      return false;
    }
  });
  display(searched);
});



// sorting
//Filter and Sort functions

let tshirtBtn = document.querySelectorAll("#tshirts");
let hoodiesBtn = document.querySelectorAll("#hoodies");
let pantsBtn = document.querySelectorAll("#pants");
let poloBtn = document.querySelectorAll("#polo");
let jeansBtn = document.querySelectorAll("#jeans");
let brandSelect = document.querySelectorAll(".brands_select input[name='brand']");
let typesSelect = document.querySelectorAll(".types_select input[name='types']");
let sortSelect = document.getElementById("sort");

let currentCategory;

tshirtBtn.forEach((element) => {
  element.addEventListener('click', () => {
    let filterData = allProductsData.filter(el => el.category == "tshirt");
    currentCategory = filterData
    filterTable(filterData)

  });
  
})
hoodiesBtn.forEach((element) => { 
  element.addEventListener('click', () => {
    let filterData = allProductsData.filter(el => el.category == "hoodie");
    currentCategory = filterData
    filterTable(filterData)
  });

})
pantsBtn.forEach((element) => {
  element.addEventListener("click", () => {
    let filterData = allProductsData.filter(el => el.category == "pants_shorts");
    currentCategory = filterData
    filterTable(filterData)
  });
})
poloBtn.forEach((element) => {
  element.addEventListener("click", () => {
    let filterData = allProductsData.filter(el => el.name.toLowerCase().includes("polo"));
    currentCategory = filterData
    filterTable(filterData)
  });
})
jeansBtn.forEach((element) => {
  element.addEventListener("click", () => {
    let filterData = allProductsData.filter(el => el.name.toLowerCase().includes("jeans"));
    currentCategory = filterData
    filterTable(filterData)
  });
})

// brand select

brandSelect.forEach((element) => { 
  element.addEventListener("change", () => { 
    // console.log(element.value);
    if (element.checked) {
      let lowerCase = element.value.toLowerCase();
      let filterData = allProductsData.filter(el => el.name.toLowerCase().includes(lowerCase));
      currentCategory = filterData;//defining current category for sorting with filter
      filterTable(filterData);
    } else {
      fetchProductsData(1);
  }
   
  })
})

// types select

typesSelect.forEach((element) => { 
  element.addEventListener("change", () => { 
    // console.log(element.value);
    if (element.checked) {
      let lowerCase = element.value.toLowerCase();
      let filterData = allProductsData.filter(el => el.name.toLowerCase().includes(lowerCase));
      currentCategory = filterData;//defining current category for sorting with filter
      filterTable(filterData);
    } else {
      fetchProductsData(1);
  }
   
  })
})


sortSelect.addEventListener("change", (event) => {
  let sortedData;

  if (currentCategory !== undefined) {
    if (event.target.value == "") {
      sortedData = currentCategory
      display(currentCategory)
      return
      // fetchProductsData(6)
    } else if (event.target.value == "High To Low") {
      sortedData = currentCategory.sort((a, b) => b.price - a.price);
    } else if (event.target.value == "Low To High") {
      sortedData = currentCategory.sort((a, b) => a.price - b.price);
    } else if (event.target.value == "A to Z") {
      sortedData = currentCategory.sort((a, b) => a.name.localeCompare(b.name));
    }
    display(sortedData);
  } else {
    if (event.target.value == "") {
      fetchProductsData(1)
      return
    } else if (event.target.value == "High To Low") {
      sortedData = allProductsData.sort((a, b) => b.price - a.price);
    } else if (event.target.value == "Low To High") {
      sortedData = allProductsData.sort((a, b) => a.price - b.price);
    }else if (event.target.value == "A to Z") {
      sortedData = allProductsData.sort((a, b) => a.name.localeCompare(b.name));
      
    }

    display(sortedData);
  }
});

function filterTable(filterData) {
  console.log(filterData)
  display(filterData);
}




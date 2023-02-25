//function getProductIdFromUrl() {
  //const searchParams = new URLSearchParams(window.location.search);
 // return searchParams.get('productId');
//}
let productId=localStorage.getItem("cartId")
//const productId = getProductIdFromUrl();
const productUrl = `https://63f45eca3f99f5855dae29dc.mockapi.io/products/${productId}`;
let description = `<h4>Item # P2736</h4>
<p>A picturesque lighthouse scene with Jake and his dog are depicted here in this Life is Good® graphic T-shirt. Crafted in 100% cotton and designed with proper proportions for Big and Tall guys in mind, it's the perfect choice for casual comfort. Pair it with jeans, shorts or swim trunks for a complete look.
<ol>Details
<li>Exclusively Ours/li>
<li>Los Angeles Lakers team logo text | basketball net graphics </li>
<li>Style: 1067</li>
<li>Imported</li>
<li>Finely Ribbed Crewneck</li>
<li>Reinforced Neck Seam</li>
<li>​100% Cotton</li>
<li>Reinforced Shoulder Seams</li>
<li>Screenprinted Chest Graphic</li>
<li>Short Sleeves</li>
<li>Machine Wash; Imported</li>
</ol>
</p>`
render(0)
function render(src){
  fetch(productUrl)
  .then(response => response.json())
  .then(data => {
    const product = data;
    console.log(data)

    // Generate the HTML for the product page
    const mainImg = document.createElement('img');
    mainImg.src = product.images[src];
    mainImg.alt = product.name;
    const colorContainer = document.createElement('div');
    colorContainer.classList.add('color-container');
    product.color.forEach((color,i) => {
      const colorBtn = document.createElement('button');
      colorBtn.style.backgroundImage = `url(${color})`;
      colorBtn.classList.add('color-btn');
      colorBtn.setAttribute("id",i)
      colorBtn.addEventListener('click', () => {
        mainImg.src = product.images[product.color.indexOf(color)];
        console.log('New image URL:', mainImg.src);
      });

      colorContainer.appendChild(colorBtn);
      //let colorbuton=document.querySelectorAll(".color-btn")
      //console.log(colorbuton)
    });


const quantityContainer = document.createElement('div');
quantityContainer.classList.add('quantity-container');

const quantityLabel = document.createElement('label');
quantityLabel.textContent = 'Quantity:';

const quantityInput = document.createElement('input');
quantityInput.type = 'number';
quantityInput.min = 1;
quantityInput.max = 10;
quantityInput.value = 1;

quantityContainer.appendChild(quantityLabel);
quantityContainer.appendChild(quantityInput);

    const productHTML = `
      <div id="product-image-container">
        ${mainImg.outerHTML}
      </div>
      <div id="product-details-container">
        <h1>${product.name}</h1>
        <p>Price: $${product.price} </p>
        <div id="color-buttons">
        <p>Color: </p>
          ${colorContainer.outerHTML}
        </div>
        <div id="size-options">
        <p>Size </p>
          <div class="size-option" data-size="S">S</div>
          <div class="size-option" data-size="M">M</div>
          <div class="size-option" data-size="L">L</div>
        </div>
        <div id="quantity">
        </div>
        
        
        <button id="add-to-cart">Add to Cart</button>
      </div>
      
      <div id="des">
      <hr>
      <h4>Product & Fit Information</h4>
      <p>${description}</p>
      </div>
    `;
   
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = productHTML;
    quantity.appendChild(quantityContainer)
    let colorbuton=document.querySelectorAll(".color-btn")
   // console.log(colorbuton)
   colorbuton.forEach(btn=>{
    btn.addEventListener("click",()=>{
      //console.log(btn)
      //console.log(mainImg)
      //mainImg.src=data.images[btn.id]
      //console.log(data.images[btn.id])
      render(btn.id)
    })
    
   })
// Get all size options
const sizeOptions = document.querySelectorAll('.size-option');

// Add click event listener to each size option
sizeOptions.forEach(option => {
  option.addEventListener('click', () => {
    // Remove selected class from all size options
    sizeOptions.forEach(option => {
      option.classList.remove('selected');
    });
    // Add selected class to the clicked size option
    option.classList.add('selected');
    
  });
});


    // Add an event listener to the "Add to Cart" button
      // Add an event listener to the "Add to Cart" button
      const addToCartButton = document.getElementById('add-to-cart');
      let cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
      addToCartButton.addEventListener('click', () => {
        // Add the product to the cart
        const selectedSize = document.querySelector('.size-option.selected').textContent;
        const quantity = parseInt(quantityInput.value);
        const cartItem = {
          product: product,
          size: selectedSize,
          quantity: quantity

        };
        addProductToCart(cartItem);
        let cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
        cartItems.push(cartItem);
        localStorage.setItem('cartItem', JSON.stringify(cartItems));
        window.location.href='#';
      });
  })
  .catch(error => {
    console.error('Error fetching product data:', error);
  });

}


  function addProductToCart(cartItem) {
    const cartItemCount = document.getElementById('cart-item-count');
    cartItemCount.innerHTML = getCartItemCount();
    alert("item added");
  }
function getCartItemCount() {
  // Get cart items from local storage
  const cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];

  // Return the number of items in the cart
  console.log(cartItem.length+1);
  return cartItem.length+1;
}


const bag = document.querySelector('.bag');
const cartItemCount = document.querySelector('#cart-item-count');

// Add mouseover and mouseout event listeners to the bag element
bag.addEventListener('mouseover', showBagPopup);
bag.addEventListener('mouseout', hideBagPopup);

function showBagPopup() {
  // Get the cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];

  // Create the popup element
  const bagPopup = document.createElement('div');
  bagPopup.classList.add('bag-popup');

  // Create the list of cart items
  const cartItemList = document.createElement('ul');

  cartItems.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <img src="${item.product.images[0]}" alt="${item.product.name}">
      <div class="name">${item.product.name}</div>
      <div class="price">$${item.product.price.toFixed(2)}</div>
      <button class="remove-item" data-id="${item.product.id}">Remove</button>
      <hr>
    `;
    cartItemList.appendChild(cartItem);
  });

  // Append the list of cart items to the popup element
  bagPopup.appendChild(cartItemList);

  // Append the popup element to the bag element
  bag.appendChild(bagPopup);

  // Show the popup element
  bagPopup.style.display = 'block';
}

function hideBagPopup() {
  // Remove the popup element from the bag element
  const bagPopup = document.querySelector('.bag-popup');
  if (bagPopup) {
    bag.removeChild(bagPopup);
  }
}


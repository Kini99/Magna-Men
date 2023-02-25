let cartContainer = document.getElementById('cart-container');
const cartItemsContainer = document.getElementById("cart-items");
let cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];

console.log(cartItem.price)
if (cartItem.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty</p>';
  } else {
    let cartHTML = `<div id="heading-cart"><h1>Shopping Bag</h1><span>cart item : ${cartItem.length}</span></div>
    <hr>`;
    cartItem.forEach(item => {
      cartHTML += `
                
              <div class="cart-item">
                  <img src="${item.product.images[0]}" alt="${item.name}">
                  
                  
                  <div id="name-div"><h2>${item.product.name}</h2></div>
                  <p>Price: $${item.product.price}</p>
                  <p>Quantity ${item.quantity||1}</p>
                  <p style="padding: 0px 10px;">Size ${item.size}<p>
                  
                  <button class="increase-quantity" data-product-id="${item.product.id}">+</button>
                  <button class="decrease-quantity" data-product-id="${item.product.id}">-</button>

                  <button class="remove-from-cart" data-product-id="${item.product.id}">Remove</button>
              </div>
              
          `;
    });
    cartContainer.innerHTML = cartHTML;
  }


// Add an event listener to the remove button
const removeButtons = document.querySelectorAll('.remove-from-cart');
removeButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productId = event.target.dataset.productId;
        let index = -1;
        cartItem.forEach((item, i) => {
            if(item.product.id === productId) index = i;
        });
        if(index !== -1) {
            cartItem.splice(index, 1); 
            localStorage.setItem('cartItem', JSON.stringify(cartItem));
            location.reload();

        }
        
        cartContainer.innerHTML = cartHTML;
    });
});

function addProductToCart(product) {
    product.quantity = 1;
    cartItem.push(product);
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
    
}

// to increase the quantity 
function increaseQuantity(productId) {
    let productIndex = cartItem.findIndex(item => item.product.id === productId);
    if (productIndex !== -1) {
      cartItem[productIndex].quantity += 1;
      localStorage.setItem('cartItem', JSON.stringify(cartItem));
      location.reload();
 
    cartContainer.innerHTML = cartHTML;
      
    }
  }

  

  const increaseButtons = document.querySelectorAll('.increase-quantity');
increaseButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productId = event.target.dataset.productId;
        increaseQuantity(productId);
    });
});


// decrease quantity
function decreaseQuantity(productId) {
    let productIndex = cartItem.findIndex(item => item.product.id === productId);
    if (productIndex !== -1) {
      cartItem[productIndex].quantity -= 1;
      if (cartItem[productIndex].quantity <= 0) {
        cartItem.splice(productIndex, 1);
      }
      localStorage.setItem('cartItem', JSON.stringify(cartItem));
      location.reload();
 
    cartContainer.innerHTML = cartHTML;
      
    }
  }
  
//add event listener for decrease button like the remove button

  const decreaseButtons = document.querySelectorAll('.decrease-quantity');
decreaseButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productId = event.target.dataset.productId;
        decreaseQuantity(productId);
    });
});



function updateOrderSummary() {
    let summaryHTML = '';
    let totalPrice = 0;
    const itemIds = []; // keep track of item ids that have been added to summary
    cartItem.forEach(item => {
        // check if item has already been added to summary
            const itemTotal = +item.product.price * (+item.quantity);
            totalPrice += itemTotal;
            summaryHTML += `
                <div class="summary-item">
                    <p>Price: INR  ${+item.product.price} x Quantity : ${item.quantity||1}</p>
                    
                    <p>Subtotal :     INR  ${itemTotal||item.product.price}</p>
                    <hr>
                </div>
            `;
            itemIds.push(item.product.id); // add item id to array of added items
      
    });
    document.getElementById("summary-items").innerHTML = summaryHTML;
    document.getElementById("total-price").innerHTML = `SubTotal: INR ${+totalPrice}`;
}


 const quantityInputs = document.querySelectorAll('.quantity-input');
 quantityInputs.forEach(input => {
    input.addEventListener('change', event => {
        const productId = event.target.dataset.productId;
        const newQuantity = event.target.value;
        cartItem.forEach(item => {
            if(item.id === productId) {
                item.quantity = newQuantity;
                localStorage.setItem('cartItem', JSON.stringify(cartItem));
                updateOrderSummary();
            }
        });
    });
 });
 
 updateOrderSummary();
 


 // redirect to a payment page
 const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', event => {
  window.location.href = '../cart/pay.html';
});

const addressForm = document.getElementById('address-form');
const paymentForm = document.getElementById('payment-form');
const addressSubmitButton = document.getElementById('address-form');
const submitPaymentButton = document.getElementById('submit-payment');
const orderSummary = document.getElementById('order-summary');
const userName=localStorage.getItem('userName')
const cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];

let addressSection = document.getElementById("address-section");
let paymentSection = document.getElementById("payment-section");

addressSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();

  //if (addressForm.checkValidity()) {
    paymentForm.style.display = 'block';
    addressForm.querySelectorAll('input, textarea').forEach((element) => {
      element.disabled = true;
    });
    addressSubmitButton.disabled = true;

    // Populate the order summary
    
    console.log(cartItems)

    let orderSummaryHtml = '<h2>Order Summary</h2>';
    orderSummaryHtml += '<table>';
    
let orderSummaryHtml = '<h2>Order Summary</h2>';
    orderSummaryHtml += '<table cellspacing="0">';

    orderSummaryHtml += '<thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th></tr></thead>';
    orderSummaryHtml += '<tbody>';

    let total = 0;
    cartItems.forEach((item) => {
      const subtotal = item.product.price * item.quantity;
      console.log(item.product.price)
      orderSummaryHtml += `<tr><td>${item.product.name}</td><td>₹ ${item.product.price}</td><td class="td-center">${item.quantity}</td><td class="td-center">₹ ${subtotal}</td></tr>`;
      total += subtotal;
    });

    orderSummaryHtml += '</tbody>';
    orderSummaryHtml += `<tfoot><tr class="total-row"><td colspan="3">Total:</td><td class="grand-total">₹ ${total}</td></tr></tfoot>`;
    orderSummaryHtml += '</table>';

    orderSummary.innerHTML = orderSummaryHtml;

  //}







document.getElementById("back-address").addEventListener("click", () => {
  addressSection.style.display = "block";
  paymentSection.style.display = "none";
})

addressSubmitButton.addEventListener('submit', (event) => {
  event.preventDefault();
    addressSection.style.display = "none";
    paymentSection.style.display = "block";

});

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();

    alert("Payment successful")
   fetch('https://63f45eca3f99f5855dae29dc.mockapi.io/users')
   .then(res=>{
    return res.json()
   })
   .then(data=>{
    let user=data.filter((el)=>el.fullname==userName)
    userobj=user[0]
    let newObj=[]
    cartItems.forEach(element=>newObj.push(element.product))

    let obj = {};
  obj.id = userobj.id;
  console.log(obj.id)

  
 
  obj.email=userobj.email;
  obj.password=userobj.password;
  obj.mobile=userobj.mobile;
  obj.location=userobj.location;
  obj.orders=newObj;
  obj.paymentMode="Credit Card";
  obj.orderStatus="Dispatch Pending";
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);
 
  let dd = targetDate.getDate();
  let mm = targetDate.getMonth() + 1; 
 let yyyy = targetDate.getFullYear();
 
  let dateString = dd + "/" + mm + "/" + yyyy;
 
  console.log(dateString);

   obj.estimatedDate=dateString;
console.log(obj)
  fetch(`https://63f45eca3f99f5855dae29dc.mockapi.io/users/${obj.id}`, {
    method: "PUT", 
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(obj)
  })

  
   })
});

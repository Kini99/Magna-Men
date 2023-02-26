const addressForm = document.getElementById('address-form');
const paymentForm = document.getElementById('payment-form');
const addressSubmitButton = document.getElementById('address-submit');
const submitPaymentButton = document.getElementById('submit-payment');
const orderSummary = document.getElementById('order-summary');
const userName=localStorage.getItem('userName')
const cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];

paymentForm.style.display = 'none';

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
    orderSummaryHtml += '<thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th></tr></thead>';
    orderSummaryHtml += '<tbody>';

    let total = 0;
    cartItems.forEach((item) => {
      const subtotal = item.product.price * item.quantity;
      console.log(item.product.price)
      orderSummaryHtml += `<tr><td>${item.product.name}</td><td>${item.product.price}</td><td>${item.quantity}</td><td>${subtotal}</td></tr>`;
      total += subtotal;
    });

    orderSummaryHtml += '</tbody>';
    orderSummaryHtml += `<tfoot><tr><td colspan="3">Total:</td><td>${total}</td></tr></tfoot>`;
    orderSummaryHtml += '</table>';

    orderSummary.innerHTML = orderSummaryHtml;
  //}
});

submitPaymentButton.addEventListener('click', (event) => {
  event.preventDefault();

  if (paymentForm.checkValidity()) {
    alert("Payment successful")
   fetch('https://63f45eca3f99f5855dae29dc.mockapi.io/users')
   .then(res=>{
    return res.json()
   })
   .then(data=>{
    //console.log(data)
    let user=data.filter((el)=>el.fullname==userName)
    userobj=user[0]
    //console.log(user)
    let newObj=[]
    cartItems.forEach(element=>newObj.push(element.product))
   // console.log(newObj)

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
  }
});

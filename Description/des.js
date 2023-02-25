function getProductIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('productId');
}
const productId = getProductIdFromUrl();
const productUrl = `https://63f45eca3f99f5855dae29dc.mockapi.io/products/${productId}`;
fetch('productUrl')
.then(response => response.json())
.then(data => {
  const product = data;
  const productDetails = document.getElementById('product-details');
  const mainImg = document.createElement('img');
  mainImg.src = product.images[0];
  mainImg.alt = product.name;



  const colorContainer = document.createElement('div');
  colorContainer.classList.add('color-container');
  product.color.forEach(color => {
    const colorBtn = document.createElement('button');
    colorBtn.style.backgroundImage = `url(${color})`;
    colorBtn.classList.add('color-btn');
    colorBtn.addEventListener('click', () => {
      mainImg.src = product.images[product.color.indexOf(color)];
    });
    colorContainer.appendChild(colorBtn);
  });
  productDetails.innerHTML = `
    <h2>${product.name}</h2>
    <p>Price: $${product.price}</p>
  `;
  productDetails.appendChild(mainImg);
  productDetails.appendChild(colorContainer);
})
.catch(error => console.error(error));
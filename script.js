let cart = [];
let total = 0;

function addToCart(itemName, price) {
  cart.push({ name: itemName, price: price });
  total += price;
  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.innerHTML = '<li class="empty-cart">Cart is empty</li>';
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name} - ₹${item.price}</span>
        <span style="color:red; cursor:pointer; margin-left:10px;" onclick="removeFromCart(${index})">❌</span>
      `;
      cartList.appendChild(li);
    });
  }

  totalPriceElement.innerText = total;
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCartUI();
}

function sendToWhatsApp() {
  if (cart.length === 0) {
    alert('Please add some items to your cart first!');
    return;
  }

  const name = document.getElementById('cust-name').value.trim();
  const address = document.getElementById('cust-address').value.trim();
  const paymentMode = document.getElementById('payment-mode').value;

  if (!name || !address) {
    alert('Please enter your Name and Address!');
    return;
  }

  const phoneNumber = '919045970231';
  let message = `🛒 *NEW ORDER - URBAN SIP*\n\n`;
  message += `👤 *Customer Name:* ${name}\n`;
  message += `📍 *Address:* ${address}\n`;
  message += `💳 *Payment Method:* ${paymentMode}\n\n`;
  message += `📋 *Order Items:*\n`;

  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.name} - ₹${item.price}\n`;
  });

  message += `\n*Total Amount: ₹${total}*`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}
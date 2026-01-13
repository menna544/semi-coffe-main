let openshop = document.querySelector('.shopping');
let closeshop = document.querySelector('.closeshopping');
let list = document.querySelector('.list');
let listcard = document.querySelector('.listcard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openshop.addEventListener('click', () => {
  body.classList.add('active');
});

closeshop.addEventListener('click', () => {
  body.classList.remove('active');
});

let products = [
  { id:1, name:'Chocolate Cheesecake', description: 'Rich and creamy chocolate flavor', image:'c8140f7a52a1dbba12384748d853a235-removebg-preview.png', price:35 },
  { id:2, name:'Caramel Ice Coffee', description: 'Sweet iced coffee with caramel', image:'bg-preview.png', price:10 },
  { id:3, name:'Strawberry Cheesecake', description: 'Fresh strawberries with creamy cheesecake', image:'6998fdb913eea7bf8e5d092aabadd2f5-removebg-preview.png', price:15 },
  { id:4, name:'Redvelvet CupCake', description: 'Soft red velvet cupcake with cream cheese frosting', image:'44ae45d2268579d23a791d3b9b06b031-removebg-preview.png', price:10 },
  { id:5, name:'Green Coffee', description: 'Healthy green coffee for energy', image:'pro4-removebg-preview.png', price:30 },
  { id:6, name:'Hot Chocolate', description: 'Warm and sweet chocolate drink', image:'1bac80234178f665a666b6d771745d53-removebg-preview.png', price:15 },
  { id:7, name:'Oleato™ Caffé Latte with Oatmilk', description: 'Smooth latte made with oatmilk', image:'pro3-removebg-preview.png', price:10 },
  { id:8, name:'Blueberry Cheesecake', description: 'Cheesecake topped with fresh blueberries', image:'642517be65141ddc1e1a9c3f2012280f-removebg-preview.png', price:30 },
  { id:9, name:'Flat White', description: 'Classic flat white espresso drink', image:'67728-removebg-preview.png', price:30 }
];


let listcards = {};

function initapp() {
  products.forEach((value) => {
    let newdiv = document.createElement('div');
    newdiv.classList.add('item');
    newdiv.innerHTML = `
      <img src="../images/${value.image}"/>
      <div class="name">${value.name}</div>
      <div class="description">${value.description}</div>
      <div class="price">${value.price.toLocaleString()} $</div>
      <button onclick="addtocart(${value.id})">Add to cart</button>
    `;
    list.appendChild(newdiv);
  });
}

initapp();

function addtocart(productId) {
  Swal.fire({title:"Added!", text:"Added successfully!", icon:"success"});
  if (!listcards[productId]) {
    listcards[productId] = {...products.find(p=>p.id===productId), quantity:1};
  } else {
    listcards[productId].quantity++;
  }
  reloadcard();
}

function reloadcard() {
  listcard.innerHTML = '';
  let count = 0;
  let totalprice = 0;
  for (const productId in listcards) {
    const value = listcards[productId];
    totalprice += value.price * value.quantity;
    count += value.quantity;

    let newdiv = document.createElement('li');
    newdiv.innerHTML = `
      <div><img src="../images/${value.image}"/></div>
      <div>${value.name}</div>
      <div>${(value.price * value.quantity).toLocaleString()} $</div>
      <div>
        <button onclick="changequantity(${productId}, ${value.quantity-1})">-</button>
        <div class="count">${value.quantity}</div>
        <button onclick="changequantity(${productId}, ${value.quantity+1})">+</button>
      </div>
    `;
    listcard.appendChild(newdiv);
  }
  total.innerText = totalprice.toLocaleString();
  quantity.innerText = count;
}

function changequantity(productId, qty) {
  if (listcards[productId]) {
    if (qty===0) delete listcards[productId];
    else listcards[productId].quantity=qty;
    reloadcard();
  }
}

function sendProductsToWhatsApp() {
  if (Object.keys(listcards).length===0) {
    Swal.fire({icon:"error", title:"Oops...", text:"Your cart is empty!"});
    return;
  }
  const userEmail = localStorage.getItem("userEmail") || "Guest";
  let whatsappMessage = `My Shopping Cart for ${userEmail}:\n`;
  for(const productId in listcards){
    const p=listcards[productId];
    whatsappMessage += `${p.name}\nPrice: $${p.price}\nQuantity: ${p.quantity}\n\n`;
  }
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappLink = `https://wa.me/+201097315496?text=${encodedMessage}`;
  window.open(whatsappLink);
}

function goback() { location.replace("index.html"); }

// Search filter
document.getElementById('searchInput').addEventListener('input', function() {
  const val = this.value.toLowerCase();
  document.querySelectorAll('.list .item').forEach(item=>{
    const name = item.querySelector('.name').innerText.toLowerCase();
    item.style.display = name.includes(val) ? 'block':'none';
  });
});

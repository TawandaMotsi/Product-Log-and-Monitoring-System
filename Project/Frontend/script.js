const API_URL = 'http://localhost:8081/api/products';

const DUMMY_PRODUCTS = [
  { id: "1", name: "Wireless Mouse", description: "Compact wireless mouse", price: 19.99, stock: 50 },
  { id: "2", name: "Mechanical Keyboard", description: "Durable mechanical keyboard", price: 59.99, stock: 30 },
  { id: "3", name: "USB-C Hub", description: "6-in-1 usb-c hub", price: 29.95, stock: 75 },
  { id: "4", name: "Webcam", description: "High quality webcam", price: 49.99, stock: 40 },
  { id: "5", name: "Bluetooth Speaker", description: "Portable bluetooth speaker", price: 34.50, stock: 80 },
  { id: "6", name: "Laptop Stand", description: "Adjustable laptop stand", price: 27.99, stock: 60 },
  { id: "7", name: "HDMI Cable", description: "High speed hdmi cable", price: 9.99, stock: 100 },
  { id: "8", name: "External SSD", description: "Fast external ssd", price: 99.95, stock: 25 },
  { id: "9", name: "Gaming Chair", description: "Ergonomic gaming chair", price: 149.99, stock: 10 },
  { id: "10", name: "LED Monitor", description: "24-inch led monitor", price: 129.00, stock: 15 },
  { id: "11", name: "Noise-Canceling Headphones", description: "Premium noise-canceling headphones", price: 89.99, stock: 35 },
  { id: "12", name: "Smartwatch", description: "Feature-rich smartwatch", price: 74.49, stock: 45 },
  { id: "13", name: "Phone Holder", description: "Flexible phone holder", price: 12.99, stock: 65 },
  { id: "14", name: "Ergonomic Desk", description: "Height adjustable desk", price: 199.99, stock: 5 },
  { id: "15", name: "Laptop Sleeve", description: "Water-resistant laptop sleeve", price: 22.49, stock: 55 },
  { id: "16", name: "Power Bank", description: "Fast charging power bank", price: 39.90, stock: 70 },
  { id: "17", name: "Wireless Charger", description: "Qi wireless charger", price: 18.75, stock: 90 },
  { id: "18", name: "Smart Light", description: "App-controlled smart light", price: 15.60, stock: 120 },
  { id: "19", name: "Bluetooth Headset", description: "Long battery bluetooth headset", price: 45.00, stock: 33 },
  { id: "20", name: "Keyboard Cover", description: "Silicone keyboard cover", price: 7.99, stock: 110 }
];


async function fetchProducts() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const products = data.length ? data : DUMMY_PRODUCTS;

    products.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.description}</td>
        <td>€${p.price.toFixed(2)}</td>
        <td>${p.stock}</td>
        <td class="actions">
          <button class="delete-btn" data-id="${p.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", async (e) => {
        const id = e.target.getAttribute("data-id");
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchProducts();
      });
    });

  } catch (err) {
    console.warn("Could not fetch from API. Showing dummy data.");
    DUMMY_PRODUCTS.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.description}</td>
        <td>€${p.price.toFixed(2)}</td>
        <td>${p.stock}</td>
        <td class="actions"><button class="disabled-btn" disabled>Delete</button></td>
      `;
      tbody.appendChild(row);
    });
  }
}

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    stock: parseInt(document.getElementById("stock").value)
  };
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    e.target.reset();
    fetchProducts();
  } catch (err) {
    alert("Backend not available. Could not add product.");
  }
});

fetchProducts();

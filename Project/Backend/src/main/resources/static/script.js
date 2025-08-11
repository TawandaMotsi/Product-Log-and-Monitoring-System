const API_URL = '/api/products';

async function fetchProducts() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const products = await res.json();

    products.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.description}</td>
        <td>€${p.price.toFixed(2)}</td>
        <td>${p.stock}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
}

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value.trim(),
    description: document.getElementById("description").value.trim(),
    price: parseFloat(document.getElementById("price").value),
    stock: parseInt(document.getElementById("stock").value)
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error(`Add failed with status ${res.status}`);
    e.target.reset();
    fetchProducts();
  } catch (err) {
    alert("Failed to add product: " + err.message);
  }
});

// Load products on page load
fetchProducts();

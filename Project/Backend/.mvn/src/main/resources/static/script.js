const API_URL = 'http://localhost:8080/api/products';

const DUMMY_PRODUCTS = [
  { id: "1", name: "Wireless Mouse", description: "Compact wireless mouse", price: 19.99, stock: 50 },
  { id: "2", name: "Mechanical Keyboard", description: "Durable mechanical keyboard", price: 59.99, stock: 30 },
  { id: "3", name: "USB-C Hub", description: "6-in-1 usb-c hub", price: 29.95, stock: 75 },
];

let editProductId = null;

async function fetchProducts() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const products = await res.json();

    (products.length ? products : DUMMY_PRODUCTS).forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.description}</td>
        <td>€${p.price.toFixed(2)}</td>
        <td>${p.stock}</td>
        <td class="actions">
          <button class="edit-btn" data-id="${p.id}">Edit</button>
          <button class="delete-btn" data-id="${p.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Attach event listeners for delete buttons
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", async (e) => {
        const id = e.target.getAttribute("data-id");
        console.log(`Deleting product with id: ${id}`);
        try {
          const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
          fetchProducts();
        } catch (error) {
          alert("Failed to delete product: " + error.message);
        }
      });
    });

    // Attach event listeners for edit buttons
    document.querySelectorAll(".edit-btn").forEach(button => {
      button.addEventListener("click", async (e) => {
        const id = e.target.getAttribute("data-id");
        console.log(`Editing product with id: ${id}`);
        const product = (products.length ? products : DUMMY_PRODUCTS).find(p => p.id === id);
        if (!product) {
          alert("Product not found for editing.");
          return;
        }
        editProductId = id;
        fillFormForEdit(product);
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

function fillFormForEdit(product) {
  document.getElementById("name").value = product.name;
  document.getElementById("description").value = product.description;
  document.getElementById("price").value = product.price;
  document.getElementById("stock").value = product.stock;

  const form = document.getElementById("productForm");
  form.querySelector("button[type='submit']").textContent = "💾 Save Changes";
  document.getElementById("cancelEdit").style.display = "inline-block";
}

function resetForm() {
  const form = document.getElementById("productForm");
  form.reset();
  editProductId = null;
  form.querySelector("button[type='submit']").textContent = "➕ Add Product";
  document.getElementById("cancelEdit").style.display = "none";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  resetForm();
});

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value.trim(),
    description: document.getElementById("description").value.trim(),
    price: parseFloat(document.getElementById("price").value),
    stock: parseInt(document.getElementById("stock").value)
  };

  console.log(editProductId ? `Updating product ID ${editProductId}` : "Adding new product", product);

  try {
    if (editProductId) {
      // Update product
      const res = await fetch(`${API_URL}/${editProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!res.ok) throw new Error(`Update failed with status ${res.status}`);
      resetForm();
    } else {
      // Add new product
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!res.ok) throw new Error(`Add failed with status ${res.status}`);
      e.target.reset();
    }
    fetchProducts();
  } catch (err) {
    console.error('Error in submit:', err);
    alert("Backend not available or operation failed: " + err.message);
  }
});

// Initial fetch to populate the table
fetchProducts();

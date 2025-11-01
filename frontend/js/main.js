const apiUrl = "../api/routes/index.php";

let products = [];

async function loadProducts(){
    const res = await fetch(apiUrl);
    products = await res.json();
    renderProducts(products);
    renderStats(products);
}

function renderProducts(list){
    const container = document.getElementById("productContainer");
    container.innerHTML = '';
    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h4>${p.name}</h4>
            <p>Fiyat: $${p.price}</p>
            <p>Kategori: ${p.category}</p>
            <button onclick="deleteProduct(${p.id})">Sil</button>
        `;
        container.appendChild(card);
    });
}

function renderStats(list){
    const total = list.length;
    const totalPrice = list.reduce((a,b)=>a+parseFloat(b.price),0);
    const avgPrice = total ? (totalPrice/total).toFixed(2) : 0;
    document.getElementById("totalProducts").innerText = total;
    document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
    document.getElementById("avgPrice").innerText = avgPrice;
}

async function deleteProduct(id){
    await fetch(`${apiUrl}?id=${id}`, { method: 'DELETE' });
    loadProducts();
}

document.getElementById("productForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const category = document.getElementById("category").value;

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, price, category})
    });

    e.target.reset();
    loadProducts();
});

document.getElementById("searchBar").addEventListener("input", (e)=>{
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p=>p.name.toLowerCase().includes(query));
    renderProducts(filtered);
});

document.getElementById("categoryFilter").addEventListener("change", (e)=>{
    const cat = e.target.value;
    const filtered = cat ? products.filter(p=>p.category === cat) : products;
    renderProducts(filtered);
});

loadProducts();

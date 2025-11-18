// Simple client-side logic for prototype. Uses localStorage for persistence.


function addToCart(id){ cart[id] = (cart[id]||0)+1; sessionStorage.setItem('sm_cart', JSON.stringify(cart)); updateCartUI(); }
function updateCartUI(){
const count = Object.values(cart).reduce((s,n)=>s+n,0);
const el = document.getElementById('cartCount'); if (el) el.textContent = count;
const items = document.getElementById('cartItems'); if (!items) return;
items.innerHTML=''; let total=0;
for (const id in cart){ const p = products.find(x=>x.id==id); const qty = cart[id];
const row = document.createElement('div'); row.className='d-flex justify-content-between align-items-center py-2 border-bottom';
row.innerHTML = `<div><div class="fw-semibold">${p.name}</div><div class="small text-muted">RM${p.price.toFixed(2)} x ${qty}</div></div>
<div><button class="btn btn-sm btn-outline-secondary me-1" onclick="decrease(${id})">-</button><button class="btn btn-sm btn-outline-secondary" onclick="increase(${id})">+</button></div>`;
items.appendChild(row); total += p.price*qty;
}
document.getElementById('cartTotal').textContent = `RM${total.toFixed(2)}`;
}
function increase(id){ cart[id] = (cart[id]||0)+1; sessionStorage.setItem('sm_cart', JSON.stringify(cart)); updateCartUI(); }
function decrease(id){ cart[id] = Math.max(0,(cart[id]||0)-1); if (cart[id]===0) delete cart[id]; sessionStorage.setItem('sm_cart', JSON.stringify(cart)); updateCartUI(); }


function checkout(){ if (Object.keys(cart).length===0){ alert('Cart is empty'); return; }
const orders = loadOrders(); const now = new Date(); const order = { id:(orders.length+1), customer: sessionStorage.getItem('sm_logged_in')||'Guest', items: JSON.parse(JSON.stringify(cart)), total: Object.keys(cart).reduce((s,k)=>s+products.find(p=>p.id==k).price*cart[k],0), date: now.toISOString(), status:'Processing' };
orders.push(order); saveOrders(orders); sessionStorage.removeItem('sm_cart'); cart={}; updateCartUI(); alert('Order placed — check Orders page.'); window.location.href='orders.html'; }


// ORDERS UI
function renderOrders(){ const tbody = document.getElementById('ordersTable'); if (!tbody) return; const orders = loadOrders(); tbody.innerHTML=''; orders.slice().reverse().forEach(o=>{
const tr = document.createElement('tr'); tr.innerHTML = `<td>#${o.id}</td><td>${o.customer}</td><td>${Object.keys(o.items).length}</td><td>RM${o.total.toFixed(2)}</td><td>${new Date(o.date).toLocaleString()}</td><td>${o.status}</td>`; tbody.appendChild(tr);
});
}


// DASHBOARD UI & CHART
function renderDashboard(){
const orders = loadOrders();
const sales = orders.map(o=>o.total).slice(-7);
const labels = orders.slice(-7).map(o=>new Date(o.date).toLocaleDateString());
const ctx = document.getElementById('salesChart'); if (!ctx) return;
const chart = new Chart(ctx, { type:'line', data:{ labels: labels.length?labels:['No data'], datasets:[{ label:'Sales (RM)', data: labels.length?sales:[0], tension:0.3 }] }, options:{ responsive:true } });
document.getElementById('summarySales').textContent = `RM${orders.reduce((s,o)=>s+o.total,0).toFixed(2)}`;
document.getElementById('summaryOrders').textContent = orders.length;
const top = Object.values(products).sort((a,b)=> (orders.reduce((s,o)=>s+(o.items[a.id]||0),0)) - (orders.reduce((s,o)=>s+(o.items[b.id]||0),0)) ).reverse()[0];
document.getElementById('summaryTop').textContent = top?top.name:'—';
}


// SEARCH
function findProducts(){ const q = document.getElementById('searchInput').value.trim().toLowerCase(); const filtered = products.filter(p=>p.name.toLowerCase().includes(q)); renderProducts(filtered); }


// Common init
document.addEventListener('DOMContentLoaded', ()=>{ document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear()); checkAuthUI(); updateCartUI(); renderProducts(products); renderOrders(); renderDashboard(); });
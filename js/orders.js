document.addEventListener('DOMContentLoaded', () => {
    
    // ===========================
    // 1. DARK MODE TOGGLE LOGIC
    // ===========================
    const body = document.body;
    const darkModeBtn = document.getElementById('toggleDarkModeBtn');
    const darkModeIcon = document.getElementById('darkModeIcon');

    // Check localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }

    if(darkModeBtn){
        darkModeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            } else {
                localStorage.setItem('theme', 'light');
                darkModeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            }
        });
    }

    // ===========================
    // 2. DATA
    // ===========================
    const orders = [
        { id: '#ORD-001', name: 'Ali Bin Abu', date: '2023-11-01', items: 2, price: 150.00, status: 'Pending' },
        { id: '#ORD-002', name: 'Siti Sarah',  date: '2023-11-02', items: 1, price: 45.50,  status: 'Shipped' },
        { id: '#ORD-003', name: 'John Doe',    date: '2023-11-03', items: 5, price: 520.00, status: 'Delivered' },
        { id: '#ORD-004', name: 'Mei Ling',    date: '2023-11-04', items: 3, price: 210.00, status: 'Cancelled' },
        { id: '#ORD-005', name: 'Raju A/L',    date: '2023-11-05', items: 2, price: 89.90,  status: 'Delivered' }
    ];

    const tableBody = document.getElementById('ordersTableBody');
    const searchInput = document.getElementById('orderSearch');

    // ===========================
    // 3. RENDER TABLE
    // ===========================
    function renderTable(data) {
        tableBody.innerHTML = ''; // Clear table

        if(data.length === 0){
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center py-3">No orders found.</td></tr>';
            return;
        }

        data.forEach(order => {
            // Determine Badge Color
            let badgeClass = '';
            if (order.status === 'Pending') badgeClass = 'badge-pending';
            else if (order.status === 'Shipped') badgeClass = 'badge-shipped';
            else if (order.status === 'Delivered') badgeClass = 'badge-delivered';
            else badgeClass = 'badge-cancelled';

            // Create Row HTML
            const row = `
                <tr>
                    <td class="ps-3 fw-bold text-primary">${order.id}</td>
                    <td>
                        <div class="fw-bold">${order.name}</div>
                    </td>
                    <td>${order.date}</td>
                    <td>${order.items} items</td>
                    <td class="fw-bold">RM ${order.price.toFixed(2)}</td>
                    <td><span class="${badgeClass}">${order.status}</span></td>
                    <td class="text-end pe-3">
                        <button class="btn btn-sm btn-outline-secondary me-1"><i class="bi bi-eye"></i></button>
                        <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // ===========================
    // 4. SEARCH LISTENER
    // ===========================
    if(searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const value = e.target.value.toLowerCase();
            const filteredData = orders.filter(order => 
                order.name.toLowerCase().includes(value) || 
                order.id.toLowerCase().includes(value)
            );
            renderTable(filteredData);
        });
    }

    // Load initial data
    renderTable(orders);
});
// dashboard.js

// ฟังก์ชันในการดึงข้อมูลการสั่งซื้อ
async function fetchOrders() {
    try {
        const response = await fetch('http://localhost:3000/api/orders'); // URL ของ API ที่ใช้ดึงข้อมูลการสั่งซื้อ
        if (!response.ok) {
            throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลการสั่งซื้อ');
        }

        const orders = await response.json();
        displayOrders(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

// ฟังก์ชันในการแสดงข้อมูลการสั่งซื้อในตาราง
function displayOrders(orders) {
    const tableBody = document.getElementById('orders-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // ล้างข้อมูลเก่า

    orders.forEach(order => {
        const row = document.createElement('tr');

        // รหัสคำสั่งซื้อ
        const orderIdCell = document.createElement('td');
        orderIdCell.textContent = order._id;
        row.appendChild(orderIdCell);

        // ข้อมูลลูกค้า
        const customerInfoCell = document.createElement('td');
        customerInfoCell.textContent = `${order.customerName} (${order.customerEmail})`;
        row.appendChild(customerInfoCell);

        // รายการสินค้า
        const itemsCell = document.createElement('td');
        itemsCell.innerHTML = order.items.map(item => `${item.name} x${item.quantity}`).join('<br>');
        row.appendChild(itemsCell);

        // ยอดรวม
        const totalAmountCell = document.createElement('td');
        totalAmountCell.textContent = `${order.totalAmount} บาท`;
        row.appendChild(totalAmountCell);

        // สถานะ
        const statusCell = document.createElement('td');
        statusCell.textContent = order.status;
        row.appendChild(statusCell);

        // ปุ่มอัพเดตสถานะ
        const updateStatusCell = document.createElement('td');
        const updateButton = document.createElement('button');
        updateButton.textContent = 'อัพเดต';
        updateButton.onclick = () => updateOrderStatus(order._id);
        updateStatusCell.appendChild(updateButton);
        row.appendChild(updateStatusCell);

        tableBody.appendChild(row);
    });
}

// ฟังก์ชันในการอัพเดตสถานะการสั่งซื้อ
async function updateOrderStatus(orderId) {
    try {
        const response = await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'Completed' }) // ตัวอย่างการอัพเดตสถานะเป็น 'Completed'
        });

        if (response.ok) {
            alert('อัพเดตสถานะสำเร็จ');
            fetchOrders(); // ดึงข้อมูลใหม่เพื่ออัพเดตหน้าจอ
        } else {
            alert('เกิดข้อผิดพลาดในการอัพเดตสถานะ');
        }
    } catch (error) {
        console.error('Error updating order status:', error);
    }
}

// เรียกฟังก์ชันดึงข้อมูลเมื่อโหลดหน้าเสร็จ
document.addEventListener('DOMContentLoaded', fetchOrders);
document.getElementById("logout-button").addEventListener("click", function() {
    // ลบข้อมูลการเข้าสู่ระบบหากเก็บไว้ใน localStorage หรือ sessionStorage
    localStorage.removeItem("employeeToken"); // ตัวอย่างการลบ token
    sessionStorage.removeItem("employeeToken"); // หากใช้ sessionStorage

    // เปลี่ยนเส้นทางไปยังหน้า index.html
    window.location.href = "index.html";
});
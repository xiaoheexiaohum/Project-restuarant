// Language data
const translations = {
    en: {
        title: "Siam Delight Restaurant",
        "menu-link": "Menu",
        "recommend-link": "recommend",
        "contact-link": "Contact Us",
        "login-link": "Login",
        "recommend-title": "Recommend",
        "recommend-item-1-title": "Fried Soft Shell Crab with Garlic",
        "recommend-item-2-title": "Tom Yum Kung",
        "recommend-item-3-title": "Mango Sticky Rice",
        "menu-title": "Menu",
        "ต้ม - 1 - title": "Tom Yum River Prawn",
        "ต้ม-2-title": "Tom Yum Grouper Fish",
        "ต้ม-3-title": "Tom Yum Sea Bass",
        "ต้ม-4-title": "Soup Curry with River Prawn",
        "ต้ม-5-title": "",
        "ต้ม-6-title": "Seafood Tom Kha",
        "ทอด-1-title": "Stir-fried sweet and sour seafood",
        "ทอด-2-title": "Fried Sea bass with fish sauce",
        "ทอด-3-title": "Fried Soft Shell Crab with Garlic",
        "ยำ-1-title": "River Prawn Salad",
        "ยำ-2-title": "Glass noodle Salad",
        "ของหวาน-1-title": "Mango Sticky Rice",
        "ของหวาน-2-title": "Lod Chong",
        "ของหวาน-3-title": "Sticky Rice with Custard",
        "ของหวาน-4-title": "Fresh Milk Cake",
        "เครื่องดื่ม-1-title": "Coconut Milk Smoothie",
        "เครื่องดื่ม-2-title": "Mango Smoothie",
        "เครื่องดื่ม-3-title": "Strawberry Smoothie",
        "เครื่องดื่ม-4-title": "Cola",
        "เครื่องดื่ม-5-title": "Cola Zero",
        "footer-contact": "Contact Us: SiamDelightsRestaurant.com"
    },
    th: {
        title: "สำรับสยาม",
        "menu-link": "เมนู",
        "recommend-link": "เมนูแนะนำ",
        "contact-link": "ติดต่อเรา",
        "login-link": "เข้าสู่ระบบ",
        "recommend-title": "เมนูแนะนำ",
        "recommend-item-1-title": "ปูนิ่มทอดกระเทียม",
        "recommend-item-2-title": "ต้มยำกุ้งแม้น้ำ",
        "recommend-item-3-title": "ข้าวเหนียวมะม่วง",
        "menu-title": "เมนู",
        "ต้ม-1-title": "ต้มยำกุ้งน้ำข้น",
        "ต้ม-2-title": "ต้มยำปลาเก๋า",
        "ต้ม-3-title": "ต้มยำปลากะพง",
        "ต้ม-4-title": "แกงส้มกุ้งแม่น้ำ",
        "ต้ม-5-title": "แกงเรียงกุ้งสด",
        "ต้ม-6-title": "ต้มข่าทะเล",
        "ทอด-1-title": "ผัดเปรี้ยวหวานทะเล",
        "ทอด-2-title": "ปลากะพงทอดน้ำปลา",
        "ทอด-3-title": "ปูนิ่มทอดกระเทียม",
        "ยำ-1-title": "พล่ากุ้งแม่น้ำ",
        "ยำ-2-title": "ยำวุ้นเส้น",
        "ของหวาน-1-title": "ข้าวเหนียวมะม่วง",
        "ของหวาน-2-title": "ลอดช่องวัดเจษ",
        "ของหวาน-3-title": "ข้าวเหนียวสังขยา",
        "ของหวาน - 4 - title": "เค้กนมสด",
        "เครื่องดื่ม-1-title": "มะพร้าวนมสดปั่น",
        "เครื่องดื่ม-2-title": "สมูทตี้มะม่วง",
        "เครื่องดื่ม-3-title": "สมูทตี้สตรอเบอร์รี่",
        "เครื่องดื่ม-4-title": "โคล่า",
        "เครื่องดื่ม-5-title": "โคล่าซีโร่",
        "footer-contact": "ติดต่อเรา: SiamDelightsRestaurant.com"
    }
};

// Language switcher
const languageSelector = document.getElementById("language-selector");

languageSelector.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    switchLanguage(selectedLanguage);
});

function switchLanguage(language) {
    const elementsToTranslate = document.querySelectorAll("[id]");
    elementsToTranslate.forEach((element) => {
        const translationKey = element.id;
        if (translations[language][translationKey]) {
            element.textContent = translations[language][translationKey];
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const username = localStorage.getItem('username');

    if (username) {
        // เปลี่ยนข้อความเป็นชื่อผู้ใช้ที่เก็บไว้
        loginLink.textContent = username;
    }
});

// สมมุติว่ามีตัวแปร isLoggedIn เป็นสถานะการล็อกอิน
const isLoggedIn = localStorage.getItem('loggedInUser') ? true : false;

// แสดงลิงก์สำหรับดูรายการสั่งซื้อย้อนหลังถ้าล็อกอินแล้ว
document.getElementById('order-history-link').style.display = isLoggedIn ? 'inline' : 'none';

const buttons = document.querySelectorAll('.menu-btn');
const categories = document.querySelectorAll('.menu-category');

// ฟังก์ชันสำหรับซ่อนทุกหมวดหมู่เมนู
function hideAllCategories() {
    categories.forEach(category => category.classList.remove('active'));
}

// เพิ่ม event listener ให้แต่ละปุ่ม
buttons.forEach(button => {
    button.addEventListener('click', () => {
        hideAllCategories(); // ซ่อนทุกหมวดหมู่ก่อน
        const category = document.querySelector(`.${button.dataset.category}`);
        category.classList.add('active'); // แสดงเฉพาะหมวดหมู่ที่ถูกเลือก
    });
});

function showCategory(category) {
    // ซ่อนหมวดหมู่ทั้งหมดก่อน
    const categories = document.querySelectorAll('.menu-category');
    categories.forEach(cat => {
        cat.classList.remove('active');
    });

    // แสดงหมวดหมู่ที่ถูกเลือก
    const selectedCategory = document.querySelector(`.menu-category.${category}`);
    if (selectedCategory) {
        selectedCategory.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.order-btn');

    orderButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const pizzaItem = event.target.closest('.pizza-item');
            const title = pizzaItem.querySelector('h3').innerText;
            const price = pizzaItem.querySelector('.price').innerText;
            const quantity = pizzaItem.querySelector('.quantity-input').value;

            alert(`คุณได้สั่งซื้อ ${quantity} ชิ้นของ ${title} (${price})`);
        });
    });
});

function checkLoginStatus() {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
        fetchUserData(userToken);
    }
}

// ดึงข้อมูลชื่อผู้ใช้จาก Token แล้วแสดงในเมนู
async function fetchUserData(token) {
    try {
        const response = await fetch('/user-info', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();
            document.getElementById("login-link").textContent = userData.firstName; // แสดงชื่อผู้ใช้
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", checkLoginStatus);

document.addEventListener('DOMContentLoaded', function () {
    const loginContainer = document.getElementById('login-container');
    const username = localStorage.getItem('username');
    const orderHistoryLink = document.createElement('a');

    // ตรวจสอบสถานะการล็อกอิน
    if (username) {
        loginContainer.innerHTML = `
            <span id="username">${username}</span>
            <button id="logout-btn">ออกจากระบบ</button>
        `;

        // สร้างลิงก์สำหรับดูประวัติการสั่งซื้อ
        orderHistoryLink.id = "order-history-link";
        orderHistoryLink.href = "order-history.html"; // ใส่ URL หน้าประวัติการสั่งซื้อ
        orderHistoryLink.textContent = "ดูประวัติการสั่งซื้อ";
        orderHistoryLink.style.marginLeft = "10px";

        // เพิ่มลิงก์เข้าไปใน loginContainer
        loginContainer.appendChild(orderHistoryLink);

        // เพิ่ม event listener ให้ปุ่ม logout
        document.getElementById('logout-btn').addEventListener('click', function () {
            localStorage.removeItem('username');
            window.location.reload();
        });
    }
});
function saveOrderToHistory(items, total) {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    const order = {
        date: new Date().toLocaleDateString(),
        items: items,
        total: total
    };

    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

// ตัวอย่างการใช้งาน
// สมมติว่ามีรายการสั่งซื้อเป็นอาร์เรย์ของไอเท็ม
const items = [
    { name: 'ต้มยำกุ้งแม่น้ำ', quantity: 1, price: 1000 },
    { name: 'Cola', quantity: 2, price: 40 }
];
const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
saveOrderToHistory(items, total);

document.addEventListener('DOMContentLoaded', function () {
    const orderHistoryContainer = document.getElementById('order-history-container');

    // ดึงข้อมูลการสั่งซื้อจาก localStorage
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    if (orderHistory.length === 0) {
        orderHistoryContainer.innerHTML = "<p>ยังไม่มีรายการสั่งซื้อ</p>";
    } else {
        orderHistory.forEach((order, index) => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');

            orderItem.innerHTML = `
                <h3>การสั่งซื้อ #${index + 1}</h3>
                <p><strong>วันที่:</strong> ${order.date}</p>
                <ul>
                    ${order.items.map(item => `
                        <li>
                            ${item.name} - จำนวน: ${item.quantity} - ราคา: ${item.price} บาท
                        </li>
                    `).join('')}
                </ul>
                <p><strong>รวมทั้งหมด:</strong> ${order.total} บาท</p>
            `;
            orderHistoryContainer.appendChild(orderItem);
        });
    }
});

document.addEventListener('DOMContentLoaded', async function () {
    const orderHistoryContainer = document.getElementById('order-history-container');
    const userId = localStorage.getItem('loggedInUserId'); // ใช้ userId ที่บันทึกไว้หลังจากล็อกอิน

    try {
        const response = await fetch(`/api/order-history?userId=${userId}`);
        const orderHistory = await response.json();

        if (orderHistory.length === 0) {
            orderHistoryContainer.innerHTML = "<p>ยังไม่มีรายการสั่งซื้อ</p>";
        } else {
            orderHistory.forEach((order, index) => {
                const orderItem = document.createElement('div');
                orderItem.classList.add('order-item');

                orderItem.innerHTML = `
                    <h3>การสั่งซื้อ #${index + 1}</h3>
                    <p><strong>วันที่:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
                    <ul>
                        ${order.items.map(item => `
                            <li>
                                ${item.name} - จำนวน: ${item.quantity} - ราคา: ${item.price} บาท
                            </li>
                        `).join('')}
                    </ul>
                    <p><strong>รวมทั้งหมด:</strong> ${order.totalAmount} บาท</p>
                `;
                orderHistoryContainer.appendChild(orderItem);
            });
        }
    } catch (error) {
        console.error('Error retrieving order history:', error);
        orderHistoryContainer.innerHTML = "<p>ไม่สามารถดึงข้อมูลประวัติการสั่งซื้อได้</p>";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.getElementById("login-container");
    const orderHistoryLink = document.getElementById("order-history-link");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (username && userId) {
        orderHistoryLink.style.display = "inline"; // แสดงลิงก์ถ้าผู้ใช้ล็อกอิน
        loginContainer.innerHTML = `<span>${username}</span> <button id="logout-btn">ออกจากระบบ</button>`;

        document.getElementById("logout-btn").addEventListener("click", function () {
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            window.location.href = "login.html";
        });
    } else {
        orderHistoryLink.style.display = "none"; // ซ่อนลิงก์ถ้าผู้ใช้ไม่ได้ล็อกอิน
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const orderHistoryTableBody = document.querySelector('#order-history-table tbody');

    try {
        // ดึงข้อมูลคำสั่งซื้อจาก API
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');

        const orders = await response.json();

        // ตรวจสอบว่ามีคำสั่งซื้อหรือไม่
        if (orders.length === 0) {
            orderHistoryTableBody.innerHTML = "<tr><td colspan='7'>ยังไม่มีรายการสั่งซื้อ</td></tr>";
            return;
        }

        // วนลูปแสดงรายการสั่งซื้อแต่ละรายการในตาราง
        orders.forEach((order, index) => {
            const orderRow = document.createElement('tr');
            orderRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${new Date(order.orderDate).toLocaleDateString()}</td>
                <td>${order.customerName}</td>
                <td>${order.customerContact}</td>
                <td>
                    <ul>
                        ${order.items.map(item => `<li>${item.name} - จำนวน: ${item.quantity}</li>`).join('')}
                    </ul>
                </td>
                <td>${order.totalAmount} บาท</td>
                <td>${order.status}</td>
            `;
            orderHistoryTableBody.appendChild(orderRow);
        });
    } catch (error) {
        console.error('Error fetching order history:', error);
        orderHistoryTableBody.innerHTML = "<tr><td colspan='7'>เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ</td></tr>";
    }
});

const orderHistoryContainer = document.getElementById("order-history");
const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

if (orderHistory.length > 0) {
    orderHistory.forEach((order, index) => {
        const orderElement = document.createElement("div");
        orderElement.innerHTML = `
            <h3>คำสั่งซื้อที่ ${index + 1} - ${order.date}</h3>
            <ul>
                ${order.items.map(item => `<li>${item.name} - ${item.quantity} x ${item.price} บาท</li>`).join("")}
            </ul>
            <hr>
        `;
        orderHistoryContainer.appendChild(orderElement);
    });
} else {
    orderHistoryContainer.innerHTML = "<p>ยังไม่มีประวัติการสั่งซื้อ</p>";
}

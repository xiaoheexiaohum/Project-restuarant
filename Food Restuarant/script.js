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
        "ต้ม-1-title": "Tom Yum River Prawn",
        "ต้ม-2-title": "Tom Yum Grouper Fish",
        "ต้ม-3-title": "Tom Yum Sea Bass",
        "ต้ม-4-title": "Soup Curry with River Prawn",
        "ต้ม-5-title": "Thai spicy mixed vegetable Soup with Prawn",
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
        "footer-contact": "Contact Us: SiamDelightsRestaurant@.com"
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
        "footer-contact": "ติดต่อเรา: SiamDelightsRestaurant@.com"
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
    { name: 'Cheese Pizza', quantity: 1, price: 250 },
    { name: 'Cola', quantity: 2, price: 40 }
];
const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
saveOrderToHistory(items, total);

// ฟังก์ชันสำหรับคำนวณยอดรวมของคำสั่งซื้อ
function calculateTotal(items) {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
}

// ฟังก์ชันสำหรับส่งข้อมูลคำสั่งซื้อไปยัง API
async function placeOrder(customerName, customerContact, items) {
    const totalAmount = calculateTotal(items);

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerName, customerContact, items, totalAmount })
        });

        if (response.ok) {
            alert('บันทึกคำสั่งซื้อสำเร็จ');
        } else {
            alert('เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('ไม่สามารถส่งคำสั่งซื้อได้');
    }
}

// เพิ่ม event listener ให้กับปุ่ม "สั่งซื้อ"
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const pizzaItem = event.target.closest('.pizza-item');
        const title = pizzaItem.querySelector('h3').innerText;
        const price = parseInt(pizzaItem.querySelector('.price').innerText.replace('Price: ', '').replace(' บาท', ''));
        const quantity = parseInt(pizzaItem.querySelector('.quantity-input').value);

        const items = [{
            name: title,
            quantity: quantity,
            price: price
        }];

        // ข้อมูลลูกค้า (สามารถดึงจาก session หรือล็อกอิน)
        const customerName = localStorage.getItem('username') || 'Guest';
        const customerContact = 'เบอร์โทรศัพท์'; // ใส่ข้อมูลเบอร์โทรลูกค้า

        // เรียกใช้ฟังก์ชันส่งคำสั่งซื้อไปยัง API
        placeOrder(customerName, customerContact, items);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");
    const loginLink = document.getElementById("login-link");

    if (isLoggedIn) {
        // ตั้งชื่อผู้ใช้แทนลิงก์เข้าสู่ระบบ
        loginLink.textContent = username;
        loginLink.href = "settings.html"; // เปลี่ยนให้ลิงก์ไปยังหน้าการตั้งค่าการส่ง
        loginLink.addEventListener("click", showUserInfo); // แสดงข้อมูลผู้ใช้เมื่อคลิกที่ชื่อ
    }
});

function showUserInfo(event) {
    event.preventDefault(); // ป้องกันไม่ให้ไปที่หน้าอื่น
    const userInfo = document.getElementById("user-info");
    userInfo.style.display = userInfo.style.display === "none" ? "block" : "none";

    // แสดงข้อมูลจาก LocalStorage หรือดึงจากเซิร์ฟเวอร์ถ้าต้องการ
    document.getElementById("user-name").textContent = `ชื่อผู้ใช้: ${localStorage.getItem("username")}`;
    document.getElementById("user-email").textContent = "อีเมล: example@pizzashop.com"; // ตัวอย่างข้อมูล
}

document.getElementById("search-input").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const menuItems = document.querySelectorAll(".pizza-item");

    menuItems.forEach(item => {
        const itemName = item.querySelector("h3").textContent.toLowerCase();
        if (itemName.includes(searchText)) {
            item.style.display = "block"; // แสดงรายการที่ตรงกับคำค้นหา
        } else {
            item.style.display = "none"; // ซ่อนรายการที่ไม่ตรงกับคำค้นหา
        }
    });
});
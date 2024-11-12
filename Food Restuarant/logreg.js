const translations = {
    en: {
        title: "Siam Delights Restaurant",
        "menu-link": "Menu",
        "recommend-link": "Recommend",
        "contact-link": "Contact Us",
        "login-link": "Login",
        "Welcome": "Login / Register",
        "phone": "Phone",
        "pass": "Password",
        "forget": "Forgot password?",
        "submit": "Login",
        "or": "or",
        "google": "Log in with Google",
        "regis": "To make your food ordering faster, sign up now.",
        "regis1": "Apply for Pizza Shop membership",
        "text": "Personal information will be saved. We can easily order and view your orders at any time.",
        "name": "Name",
        "surname": "Surname",
        "mail": "Email",
        "confirm": "Confirm password",
        "accept-terms": "I have read and agree to the Terms of Use and am over 13 years of age.",
        "accept-promotions": "I would like to receive an offer from Pizza Shop.",
        "footer-contact": "Contact Us: SiamDelightsRestaurant@.com",
        "logout": "Logout", // Key สำหรับ Logout
        "order-history": "Order History" // Key สำหรับ Order History
    },
    th: {
        title: "สำรับสยาม",
        "menu-link": "เมนู",
        "recommend-link": "เมนูแนะนำ",
        "contact-link": "ติดต่อเรา",
        "login-link": "เข้าสู่ระบบ",
        "Welcome": "เข้าสู่ระบบ/สมัครสมาชิก",
        "phone": "เบอร์โทรศัพท์",
        "pass": "รหัสผ่าน",
        "forget": "ลืมรหัสผ่าน?",
        "submit": "เข้าสู่ระบบ",
        "or": "หรือ",
        "google": "เข้าสู่ระบบด้วย Google",
        "regis": "เพื่อให้คุณสั่งอาหารได้รวดเร็วขึ้น สมัครสมาชิกเลย",
        "regis1": "สมัครสมาชิก Pizza Shop",
        "text": "ข้อมูลส่วนตัวจะถูกบันทึกไว้ เราสามารถสั่งซื้อได้ง่ายๆ และดูรายการสั่งซื้อของคุณได้ตลอดเวลา",
        "name": "ชื่อ",
        "surname": "นามสกุล",
        "mail": "อีเมล",
        "confirm": "ยืนยันรหัสผ่าน",
        "accept-terms": "ฉันได้อ่านและยอมรับ เงื่อนไขการใช้งาน และอายุเกิน 13 ปีขึ้นไป",
        "accept-promotions": "ฉันต้องการรับข้อเสนอจาก Pizza Shop",
        "footer-contact": "ติดต่อเรา: SiamDelightsRestaurant@.com",
        "logout": "ออกจากระบบ", // Key สำหรับ Logout
        "order-history": "ประวัติการสั่งซื้อ" // Key สำหรับ Order History
    }
};


// Language switcher
const languageSelector = document.getElementById("language-selector");

languageSelector.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    switchLanguage(selectedLanguage);
});

// ฟังก์ชันการแปลภาษา
function switchLanguage(language) {
    const elementsToTranslate = document.querySelectorAll("[id]");
    elementsToTranslate.forEach((element) => {
        const translationKey = element.id;
        if (translations[language][translationKey]) {
            element.textContent = translations[language][translationKey];
        }
    });
    // อัปเดตข้อความ Logout ตามภาษา
    const loginLink = document.getElementById('login-link');
    if (localStorage.getItem('username')) {
        loginLink.textContent = localStorage.getItem('username'); // ใช้ชื่อผู้ใช้แทนเข้าสู่ระบบ
    }
}

// Login form submission and redirect
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const phoneNumber = document.getElementById('phone-number').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber, password })
        });

        if (response.ok) {
            const result = await response.json();
            const loginContainer = document.getElementById('login-container'); // กำหนดให้ครอบ login-link

            // เก็บชื่อผู้ใช้ใน localStorage
            localStorage.setItem('username', result.firstName);

            // เปลี่ยนลิงก์ login เป็นชื่อผู้ใช้และปุ่ม logout
            loginContainer.innerHTML = `
                <span id="username">${result.firstName || 'ผู้ใช้'}</span>
                <button id="logout-btn">Logout</button>
            `;

            // เพิ่ม event listener ให้ปุ่ม logout
            document.getElementById('logout-btn').addEventListener('click', function () {
                // ลบข้อมูลผู้ใช้จาก localStorage
                localStorage.removeItem('username');

                // โหลดหน้าใหม่เพื่อรีเซ็ตการเข้าสู่ระบบ
                window.location.reload();
            });

            // Redirect ไปที่หน้า index.html
            window.location.href = 'index.html';
        } else {
            alert('เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const loggedInUser = localStorage.getItem('username');

    if (loggedInUser) {
        loginLink.textContent = loggedInUser; // แสดงชื่อผู้ใช้แทนเข้าสู่ระบบ
        loginLink.href = '#'; // ป้องกันการนำไปที่หน้าเข้าสู่ระบบ
        loginLink.addEventListener('click', logout); // เพิ่ม Event สำหรับ Logout
    }
});

function logout() {
    if (confirm(translations[languageSelector.value]['logout'] || "Are you sure you want to log out?")) {
        localStorage.removeItem('username'); // ลบข้อมูลผู้ใช้ที่เก็บไว้
        location.reload(); // โหลดหน้าใหม่เพื่อให้แสดงเข้าสู่ระบบ
    }
}
document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, phoneNumber, password })
        });

        if (response.ok) {
            alert('สมัครสมาชิกสำเร็จ');
            window.location.href = 'index.html'; // เปลี่ยนเส้นทางไปที่หน้า index.html
        } else {
            alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
});

// ตั้งค่าหลังจากล็อกอินสำเร็จ
function setUserName(username) {
    const loginLink = document.getElementById("login-link");
    loginLink.textContent = username;
    loginLink.href = "#"; // เปลี่ยนให้คลิกไม่ได้ไปยังหน้าล็อกอินอีก
    loginLink.addEventListener("click", toggleUserInfo); // แสดงข้อมูลผู้ใช้เมื่อกดที่ชื่อ
}

// ฟังก์ชันเพื่อแสดงข้อมูลผู้ใช้เมื่อกดที่ชื่อ
function toggleUserInfo() {
    const userInfo = document.getElementById("user-info");
    userInfo.style.display = userInfo.style.display === "none" ? "block" : "none";
}

// ตัวอย่างโค้ดเพื่อดึงข้อมูลผู้ใช้หลังจากล็อกอิน
async function getUserData() {
    try {
        const response = await fetch('/api/user-info', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
        });
        if (response.ok) {
            const userData = await response.json();
            document.getElementById("user-name").textContent = `ชื่อ: ${userData.name}`;
            document.getElementById("user-email").textContent = `อีเมล: ${userData.email}`;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function onLoginSuccess(username) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    // เปลี่ยนลิงก์เข้าสู่ระบบเป็นชื่อผู้ใช้และลิงก์ไปยังการตั้งค่าการส่ง
    setUserInterface(username);
}

// เรียกฟังก์ชันนี้เมื่อผู้ใช้เข้าสู่ระบบสำเร็จ
onLoginSuccess("ชื่อผู้ใช้ตัวอย่าง");
// เรียกใช้ฟังก์ชันนี้หลังจากล็อกอินสำเร็จ
setUserName("ชื่อผู้ใช้"); // เปลี่ยนเป็นชื่อผู้ใช้จริงจากเซิร์ฟเวอร์
getUserData();



document.getElementById("employee-login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const employeeId = document.getElementById("employee-id").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/api/employee-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ employeeId, password })
        });

        if (response.ok) {
            const result = await response.json();
            alert("เข้าสู่ระบบสำเร็จ");
            window.location.href = "employee_dashboard.html"; // เปลี่ยนไปยังหน้าแดชบอร์ดพนักงาน
        } else {
            const errorMessage = await response.text();
            alert(`รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง: ${errorMessage}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
});

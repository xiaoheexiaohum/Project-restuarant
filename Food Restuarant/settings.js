document.getElementById('delivery-settings-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const deliveryOption = document.getElementById('delivery-option').value;
    const deliveryFee = document.getElementById('delivery-fee').value;

    // ตรวจสอบค่าที่กรอก
    if (deliveryFee === '') {
        alert('กรุณากรอกค่าจัดส่ง');
        return;
    }

    // สมมติว่าเราจะทำการบันทึกข้อมูลการตั้งค่าไปยังเซิร์ฟเวอร์
    // คุณสามารถใช้ fetch() หรือ Ajax ในการบันทึกข้อมูล

    alert(`บันทึกการตั้งค่าสำเร็จ: วิธีการส่ง = ${deliveryOption}, ค่าจัดส่ง = ${deliveryFee} บาท`);
});
document.getElementById("save-settings-btn").addEventListener("click", function(event) {
    event.preventDefault(); // หยุดการรีเฟรชหน้า

    // คุณสามารถเพิ่มโค้ดสำหรับการบันทึกการตั้งค่าที่นี่
    alert("บันทึกการตั้งค่าเสร็จสิ้น!");

    // นำทางกลับไปที่หน้า index.html
    window.location.href = "index.html";
});
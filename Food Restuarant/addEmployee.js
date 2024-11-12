const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/pizza_shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// สร้าง Schema และ Model สำหรับพนักงาน โดยเพิ่มฟิลด์ employeeId
const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, unique: true },
    username: String,
    password: String
});

const Employee = mongoose.model('Employee', employeeSchema);

// เพิ่มข้อมูล Employee ใหม่
async function addEmployee(employeeId, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10); // เข้ารหัสรหัสผ่าน

    const newEmployee = new Employee({
        employeeId,
        username,
        password: hashedPassword
    });

    try {
        await newEmployee.save();
        console.log(`เพิ่มพนักงาน ${username} สำเร็จแล้ว`);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเพิ่มพนักงาน:', error);
    } finally {
        mongoose.connection.close();
    }
}

// เพิ่มพนักงาน "Manager" รหัสผ่าน "98765" พร้อม employeeId
addEmployee('EMP001', 'Manager', '98765');

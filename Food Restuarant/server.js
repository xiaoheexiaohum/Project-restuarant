const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ชี้ไปที่โฟลเดอร์ 'food' บน Desktop
app.use(express.static(path.join('C:/food')));

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/pizza_shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// สร้าง Schema และ Model สำหรับผู้ใช้
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

// สร้าง Schema และ Model สำหรับคำสั่งซื้อ
const orderSchema = new mongoose.Schema({
    customerName: String,
    customerContact: String,
    items: [{ name: String, quantity: Number, price: Number }],
    totalAmount: Number,
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: 'in progress' }
});
const Order = mongoose.model('Order', orderSchema);

// Route สำหรับบันทึกคำสั่งซื้อ
app.post('/api/orders', async (req, res) => {
    const { customerName, customerContact, items, totalAmount } = req.body;

    const newOrder = new Order({
        customerName,
        customerContact,
        items,
        totalAmount,
        status: 'in progress'
    });

    try {
        await newOrder.save();
        res.status(201).send('บันทึกคำสั่งซื้อสำเร็จ');
    } catch (error) {
        res.status(500).send('เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ');
    }
});

// Route สำหรับการสมัครสมาชิก
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).redirect('/index.html'); // เปลี่ยนเส้นทางไปยังหน้า index.html หลังจากสมัครสมาชิกสำเร็จ
    } catch (error) {
        res.status(400).send('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
});

// Route สำหรับการเข้าสู่ระบบ
app.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(401).send('เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง');
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง');
        }

        // สร้าง JSON Web Token และส่งชื่อผู้ใช้กลับไป
        const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ token, firstName: user.firstName, userId: user._id });
    } catch (error) {
        res.status(500).send('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
});

// Route สำหรับการดึงข้อมูลออเดอร์ทั้งหมด
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ' });
    }
});

app.get('/employee-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'employee-dashboard.html'));
});

// Route สำหรับการอัพเดตสถานะคำสั่งซื้อ
app.put('/api/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).send('ไม่พบคำสั่งซื้อ');
        }
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).send('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
    }
});

// สร้าง schema และ model สำหรับพนักงาน
const employeeSchema = new mongoose.Schema({
    employeeId: String,
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
});
const Employee = mongoose.model("Employee", employeeSchema);


// สร้าง route POST /api/employees
app.post("/api/employees", async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json({ message: "Employee registered successfully" });
    } catch (error) {
        console.error("Error registering employee:", error);
        res.status(500).json({ message: "Error registering employee" });
    }
});


// ฟังก์ชันเพื่อสร้างบัญชีพนักงานเริ่มต้น
const initializeEmployee = async () => {
    const existingEmployee = await Employee.findOne({ employeeId: '001' }); // ใช้ employeeId ที่ระบุ
    if (!existingEmployee) {
        const hashedPassword = await bcrypt.hash('98765', 10);
        const manager = new Employee({
            employeeId: '001', // กำหนด employeeId
            firstName: 'Manager', // กำหนด firstName
            lastName: 'User', // กำหนด lastName
            password: hashedPassword
        });
        await manager.save();
        console.log('Employee account "001" created successfully');
    } else {
        console.log('Employee account "001" already exists');
    }
};


app.post("/api/employees/login", async (req, res) => {
    const { employeeId, password } = req.body;

    try {
        // ค้นหาพนักงานด้วย employeeId
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(401).json({ message: "รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง" });
        }

        // ตรวจสอบรหัสผ่าน
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง" });
        }

        // เข้าสู่ระบบสำเร็จy
        res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ", employeeId: employee.employeeId });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "มีข้อผิดพลาดในการเข้าสู่ระบบ" });
    }
});
// เรียกฟังก์ชันเพื่อเพิ่มพนักงานเริ่มต้น
initializeEmployee();

app.post('/api/employee-login', async (req, res) => {
    const { employeeId, password } = req.body;

    try {
        // ตรวจสอบว่า employeeId ตรงกับในฐานข้อมูลหรือไม่
        const employee = await Employee.findOne({ employeeId: employeeId });

        if (!employee) {
            // หากไม่พบ employeeId ในฐานข้อมูล ให้ส่งสถานะ 401 กลับไป
            return res.status(401).send("รหัสพนักงานไม่ถูกต้อง");
        }

        // ตรวจสอบรหัสผ่าน
        const isPasswordValid = await bcrypt.compare(password, employee.password);

        if (!isPasswordValid) {
            // หากรหัสผ่านไม่ถูกต้อง ให้ส่งสถานะ 401 กลับไป
            return res.status(401).send("รหัสผ่านไม่ถูกต้อง");
        }

        // ส่งสถานะ 200 กลับไป หากเข้าสู่ระบบสำเร็จ
        res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ" });
    } catch (error) {
        console.error(error);
        res.status(500).send("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
});

// เรียกใช้ฟังก์ชันเพื่อเพิ่มพนักงานเริ่มต้น
initializeEmployee().catch(err => console.error('Error initializing employee:', err));

// เสิร์ฟไฟล์ HTML
app.get('/', function (req, res) {
    res.sendFile(path.join('C:/food/index.html'));
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, function () {
    console.log(`Server listening on http://localhost:${PORT}`);
});





// สร้าง Schema และ Model สำหรับพนักงาน
const employeeSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});
const Employee = mongoose.model('Employee', employeeSchema);
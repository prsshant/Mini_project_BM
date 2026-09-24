const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Employee = require('./models/Employee');

const app = express();
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/employeeDB')
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.post('/register', async (req, res) => {
  try {
    const { employeeName, name, designation, email, password } = req.body;
    const finalName = employeeName || name;

    // Validate input fields
    if (!finalName || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Check if the employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee
    const newEmployee = new Employee({
      employeeName: finalName,
      designation: designation || 'Employee',
      email,
      password: hashedPassword,
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering employee', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
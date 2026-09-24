const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      alias: 'name',
      required: [true, 'Employee name is required'],
      trim: true
    },
    designation: {
      type: String,
      trim: true,
      default: 'Employee'
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('Employee', employeeSchema);

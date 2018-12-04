const Campus = require('./campus')
const Student = require('./student')
const db = require('../database')

Campus.hasMany(Student)
Student.belongsTo(Campus)

module.exports = {
  Campus,
  Student,
  db
}

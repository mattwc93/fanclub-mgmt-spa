const Campus = require('./campus')
const Student = require('./student')
const db = require('../database')

Campus.hasMany(Student)
Campus.belongsTo(Student, { as: 'Founder', constraints: false})
Student.belongsTo(Campus)

module.exports = {
  Campus,
  Student,
  db
}

const router = require('express').Router()
const { Campus, Student } = require('../db/Models')

// '.../api/students/'

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll({ include: [Campus] })
    res.json(students)
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json(newStudent)
  } catch (err) {
    next(err);
  }
})

module.exports = router

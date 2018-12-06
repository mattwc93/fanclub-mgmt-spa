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

router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.studentId
      },
      include: [Campus]
    })
    res.json(student)
  } catch (err) {
    next(err);
  }
})

router.delete('/:studentId', async (req, res, next) => {
  try {
    Student.destroy({ where: { id: req.params.studentId } })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router

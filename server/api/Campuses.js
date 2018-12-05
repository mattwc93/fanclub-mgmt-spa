const router = require('express').Router()
const { Campus, Student } = require('../db/Models')

// '.../api/campuses/'

router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll({
      include: [{
        model: Student,
        as: 'students'
      }]
    })
    res.json(campuses)
  } catch (err) {
    next(err)
  }
})

router.get('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findOne({
      include: [{
        model: Student
      }]
    })
    res.json(campus)
  } catch (err) {
    next(err)
  }
})


module.exports = router

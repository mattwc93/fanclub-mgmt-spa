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
    next(err);
  }
})


module.exports = router

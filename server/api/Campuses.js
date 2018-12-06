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

router.post('/', async (req, res, next) => {
  try {
    const newCampus = await Campus.create(req.body)
    res.json(newCampus)
  } catch (err) {
    next(err);
  }
})

router.delete('/:campusId', async (req, res, next) => {
  try {
    Campus.destroy({where: {id: req.params.campusId}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})


module.exports = router

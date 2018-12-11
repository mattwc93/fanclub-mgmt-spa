const router = require('express').Router()
const { Campus, Student } = require('../db/Models')

// '.../api/campuses/'

router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll({
      include: [
        { model: Student, as: 'students' },
        { model: Student, as: 'Founder' }
      ]
    })
    res.json(campuses)
  } catch (err) {
    next(err)
  }
})

router.get('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findOne({
      where: {
        id: req.params.campusId
      },
      include: [
        { model: Student },
        { model: Student, as: 'Founder' },
      ]
    })
    res.json(campus)
  } catch (err) {
    next(err);
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
    Campus.destroy({ where: { id: req.params.campusId } })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/:campusId', async (req, res, next) => {
  try {
    const campusToUpdate = await Campus.findById(req.params.campusId)
    const updatedCampus = await campusToUpdate.update(req.body)
    res.json(updatedCampus)
  } catch (error) {
    next(error)
  }
})


module.exports = router

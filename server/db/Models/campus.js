const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/defaultSchoolIcon.jpg'
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'No Description Provided.'
  }
})

const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://imageog.flaticon.com/icons/png/512/43/43067.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF'
  },
  gpa: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      validGpa() {
        if ((this.gpa < 0) || (this.gpa > 4)) {
          throw new Error('GPA must be between 0 and 4.0');
        }
      }
    }
  }
})


const {db, Student, Campus} = require('./server/db/models')
const {green, red} = require('chalk')

const students = [{
    firstName: 'Matt',
    lastName: 'Clark',
    email: 'mc@email.com',
    gpa: 3.0,
    campusId: 1
  }, {
    firstName: 'John',
    lastName: 'Snow',
    email: 'wildlingMan@email.com',
    gpa: 1.2,
    campusId: 2
  }, {
    firstName: 'Mister',
    lastName: 'Bean',
    email: 'beanosaur@email.com',
    gpa: 4.0,
    campusId: 2
  }, {
    firstName: 'Jim',
    lastName: 'McJimJimson',
    email: 'MJJJJJ@email.com',
    gpa: 3.2,
    campusId: 1
  }]

const campuses = [{
  name: 'Hogwarts',
  address: '123 super secret street, London',
  description: 'The castle houses Hogwarts School of Witchcraft and Wizardry, regarded as the finest wizarding school in the world. Hogwarts is built in a valley area — surrounding mountains are part of the landscape — with the fairly large Great Lake to the south of the main building.'
  }, {
    name: 'UCSC',
    address: '1 high stree, Santa Cruz',
    description: 'Basically a drug fueled summer camp for kids who somehow convinced their parents they can live on their own at the age of 18.'
  }]

const seed = () =>
  Promise.all(campuses.map(campus =>
    Campus.create(campus))
  )
  .then(() =>
  Promise.all(students.map(student =>
    Student.create(student))
  )
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
const { db, Student, Campus } = require('./server/db/models')
const { green, red } = require('chalk')

const NUMSTUDENTS = 100

const emailPostfix = [
  'gmail.com',
  'Unis.edu',
  'hotmail.com',
  'billmurrayfanclub.net',
  'theNicCage.com',
  'puppyBook.org',
  'myspace.czz',
  'forTheMotherLand.rus',
  'fullstack.com',
  'thotaudit.com'
]

const firstNames = [
  'Nic',
  'Jojo',
  'Matt',
  'Bill',
  'Case',
  'Molly',
  'Finn',
  'Gentry',
  'Bobby',
  'Angie',
  'Kimiko',
  'Motoko',
  'Josef',
  'Frederick',
  'Peter',
  'Dua',
  'Odeen',
  'Kredik',
  'Elend',
  'Vin',
  'Kelsier',
  'Selene',
  'Misty',
  'Molly',
  'Sally',
  'Clarissa',
  'Togusa',
  'Bato',
  'Ashley',
  'Sue',
  'Melinda',
  'Leia',
  'Hanz',
  'Mona',
  'Willis',
  'Armitage',
  'Henry',
  '3Jane',
  'Dixie',
  'Marley',
  'Maelcum',
  'Marie-France',
  'Jaylene',
  'Tally',
  'John-Harness',
  'Hari'
]

const lastNames = [
  'Clark',
  'Venture',
  'Shaw',
  'Kusanagi',
  'Johnson',
  'Shears',
  'Mitchell',
  'Lisa',
  'Newmark',
  'Quine',
  'Riviera',
  'Corto',
  'Ashpool',
  'Tessier',
  'Tessier-Ashpool',
  'Becker',
  'Dorsett',
  'Millions',
  'Virek',
  'Flatline',
  'Lee',
  'Mao',
  'Yanaka',
  'McCoy',
  'Krushkhova',
  'Slide',
  'Isham',
  'Seldon',
  'Hardin',
  'Pritcher',
  'Seldon',
  'Starr',
  'Stark',
  'Lannister',
  'Targaryen',
  'Newell',
  'Trump',
  'Bush',
  'Obama',
  'Exodia',
  'Jones',
  'Brindley',
  'Smith'
]

const fanClubNames = [
  'Asimov Fanclub',
  'Cyberpunk Lovers',
  'Breakfast Club',
  '1337 |-| 4 ( |< 3 |2 $',
  'NIC CAGE CLUB',
  'Flying Seagalls',
  'I Love Fanclubs Fanclub',
  'Bill Murray is our real dad',
  'Seagall Academy of Akido',
  'I LOVE CHEESE CLUB',
  'Never gonna give you up',
  'Never gonna let you down',
  'I\'m not a Gnelf',
  'I\'m not a Gnoblin',
  'I\'m a GuhNOME',
  'Silly Sweater Sellers',
  'Anime Fanclub',
  '#1 Nic Cage Fans Only Club',
  'NO GIRLS ALLOWED IN THIS CLUB',
]

const cities = [
  'London',
  'Paris',
  'New York',
  'Chicago',
  'Los Angeles',
  'Seattle',
  'Denver',
  'Portland',
  'Toronto',
  'Moscow',
  'Seoul',
  'Tokyo',
  'The Sprawl',
  'The Moon',
  'Barcelona',
  'Incheon',
  'Atlanta',
  'Austin',
  'Mexico City'
]

const streetNames = [
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '22nd',
  '36th',
  '99th',
  'High',
  'Low',
  'Mountain',
  'Hillcrest',
  'Main',
  'Grand',
  'Commercial',
  'Industrial',
  'Margate',
  'Education',
  'Central',
  'Mercedes',
  'Farrol',
  'Wall',
  'Garden',
  'Johnson',
  'Monterey',
  'Palm',
  'Higuera',
  'Valley',
  'River',
  'Random',
  'Why Am I wasting so much time on this silly seeding',
  'Silly',
  'Sound',
  'Airplane',
  'Ono Sendai',
  'Maas',
  'Neotek',
  'Hosaka',
  'Beppu',
  'Hit Parade Club'
]

const streetTypes = [
  'Avenue',
  'Street',
  'Blvd',
  'Way',
  'Hwy',
  'Fwy',
  'Pkwy',
  'Road',
  'Alley',
  'Bluff',
  'Court',
  'Drive',
  'Grove',
  'Lane',
  'Loop',
  'Pass',
  'Ridge'
]

const descriptions = [
  `Ut efficitur efficitur facilisis. Nunc mi massa, semper ut suscipit non, euismod ac mi. Fusce feugiat feugiat libero, ut volutpat mi pulvinar nec. Curabitur convallis ultrices tellus, ut fringilla mi fringilla eget. Donec viverra rhoncus massa ut dictum. Donec tristique purus ac leo dictum venenatis. Curabitur tincidunt erat eget erat posuere feugiat vitae id est. Donec in pulvinar eros.`,

`Mauris convallis sed tortor nec dapibus. Maecenas enim mi, convallis non efficitur ut, sagittis in purus. Morbi purus enim, placerat non mi quis, sodales suscipit turpis. Curabitur nulla justo, mattis in leo vitae, pellentesque efficitur velit. Nunc eu augue ac ex vehicula maximus. Fusce facilisis euismod nibh, malesuada laoreet est accumsan molestie. Proin iaculis hendrerit orci, vel finibus elit aliquam semper. Ut molestie diam et iaculis suscipit. Pellentesque sed nunc tortor. Etiam scelerisque vel velit imperdiet tempus. Fusce et suscipit purus, quis vehicula orci. Quisque vel elit eu risus tristique porttitor. Integer nec augue tincidunt, fringilla dui id, pulvinar ante. Sed scelerisque porttitor ante in condimentum.`,

`Suspendisse pharetra augue nulla, in porttitor ipsum condimentum vitae. Maecenas dictum felis nec dui hendrerit, vel malesuada velit eleifend. Maecenas ac neque sed velit scelerisque maximus. Etiam justo arcu, lacinia ut tortor vel, vestibulum mattis mauris. Quisque neque sem, convallis vitae enim id, efficitur laoreet sem. Sed cursus quam in mi sodales lobortis. Nunc faucibus diam justo, non rhoncus metus pharetra a. Proin nunc quam, mollis eget ante rutrum, blandit dignissim enim. Curabitur aliquet et nisl vel suscipit. Aenean commodo ligula at velit cursus, id iaculis quam aliquet. Cras lorem est, faucibus ut lacus tincidunt, interdum semper nisl. Fusce non porta arcu, imperdiet venenatis erat. Maecenas accumsan fermentum magna, cursus varius nisi sodales et.`,

`Duis id nulla nibh. Nam aliquam pharetra elit quis dictum. Mauris sit amet turpis sollicitudin, interdum neque eu, mattis lorem. Cras eu ultrices erat. Nunc eu lobortis urna, sed volutpat felis. Vivamus at posuere est, at posuere justo. Aliquam erat volutpat. Duis luctus erat ut mauris viverra, auctor gravida ante malesuada. Sed eu neque auctor ligula hendrerit ultricies vitae vitae erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.`,

`Integer non mollis quam. Nam posuere interdum tellus non molestie. Sed convallis, leo ac ornare aliquam, ipsum ligula lacinia lacus, vel varius ipsum nibh in nisi. Suspendisse in tincidunt leo, et pulvinar dolor. Quisque aliquet tortor at eros blandit iaculis. In sollicitudin, diam in maximus sodales, est sem elementum enim, sed suscipit augue odio sit amet eros. Sed mollis risus sit amet metus tincidunt, id ullamcorper elit lobortis. Maecenas a massa ut tellus tincidunt blandit malesuada ut nisi.`,

`Ut nec ultrices magna. Maecenas id elementum mi, sed dapibus arcu. Maecenas tincidunt vehicula metus, id tempor ipsum viverra vel. Maecenas tincidunt interdum gravida. Nullam fringilla ipsum tellus, id mollis tortor consectetur quis. Praesent condimentum mi ligula, ut semper sem feugiat nec. Quisque vestibulum erat magna, eget ullamcorper est tristique sit amet. Mauris quis mollis ex, non euismod tortor. Proin ligula nibh, dignissim eget mattis eget, aliquam ac dui. Cras sed interdum nisl, consectetur consequat arcu. Vestibulum fermentum hendrerit nulla eu semper. Vivamus vitae bibendum elit. Donec vitae dictum augue. In pretium, sapien in laoreet fermentum, eros enim vehicula eros, a gravida dui est vel risus. Aliquam elementum porta libero vitae ullamcorper.`,

`Aenean id mattis erat. Fusce porttitor gravida tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra, ex et rhoncus ullamcorper, odio dui cursus massa, vitae elementum enim diam non felis. Donec blandit tellus ut magna auctor, vitae porttitor massa imperdiet. Praesent dictum elit in pulvinar malesuada. Quisque a tellus massa. Curabitur id risus gravida turpis vulputate consectetur. Etiam vestibulum a purus non tincidunt. Sed porta odio at dolor porttitor bibendum. Aenean sit amet vestibulum orci. Fusce nec nisl neque.`,

`Proin fringilla volutpat quam et commodo. Donec eleifend lorem at fringilla mollis. Nunc eu augue laoreet, accumsan arcu nec, interdum massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam consectetur diam tellus, ac vestibulum erat porttitor eget. Quisque posuere maximus lectus at vulputate. Donec ac ipsum sed ex eleifend accumsan. Nulla consequat ante placerat libero posuere fermentum. Praesent cursus nibh justo, nec tristique arcu finibus et. Nunc gravida nibh et quam lobortis sagittis. Quisque interdum consequat neque, eget dignissim lectus auctor in. Duis sollicitudin viverra lacus dictum feugiat. Ut vehicula lorem turpis, ut posuere dui ultricies sit amet.`,

`Duis eu feugiat sapien. Sed ipsum mi, pretium vitae sollicitudin ut, venenatis et nulla. Nam egestas laoreet nibh ac fermentum. Nam massa magna, commodo laoreet nisi ac, vestibulum facilisis orci. Donec lacus mi, tincidunt sit amet lacinia et, consequat vel quam. Ut molestie faucibus mi in gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque nec nunc pellentesque massa laoreet tempor id tincidunt dui. Pellentesque malesuada nunc eu nunc malesuada, at tincidunt dolor fermentum. Quisque quis ante nisl. Nulla facilisi. Ut consequat vehicula tellus vel varius. Maecenas tellus lectus, sodales nec venenatis sit amet, semper id sapien. In porttitor turpis mi, a dignissim urna molestie maximus. Quisque rutrum vulputate vulputate.`,

`Suspendisse ullamcorper dui vel felis iaculis efficitur. Sed molestie libero est, quis faucibus risus faucibus sit amet. Proin pulvinar justo id risus elementum, ac convallis ex iaculis. Vestibulum fringilla laoreet erat nec tincidunt. In gravida vel nunc ac pharetra. Proin aliquam velit non viverra ultrices. Praesent a ligula quis ex viverra tristique nec non sem. Nullam quis mauris nec nulla tristique rutrum. Nunc sapien eros, scelerisque eu pharetra quis, accumsan id justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed tempus faucibus est, sed molestie velit ultricies vitae. Maecenas elementum tempor ligula, vel dignissim diam. Proin lobortis luctus tempor. Nam sed finibus augue. Curabitur aliquet sapien quis magna rutrum, vel lacinia justo iaculis.`
]

const placeHolderImageUrls = [
  'https://www.placecage.com/',
  'https://www.stevensegallery.com/',
  'https://www.fillmurray.com/'
]

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const makeEmail = (name) => {
  let emailNum = randomNum(0, 99)
  let emailEnd = emailPostfix[randomNum(0, emailPostfix.length - 1)]
  const email = `${name}${emailNum}@${emailEnd}`
  return email
}

const makeFirstName = () => {
  return firstNames[randomNum(0, firstNames.length - 1)]
}

const makeLastName = () => {
  return lastNames[randomNum(0, lastNames.length - 1)]
}

const makeAddress = () => {
  const street = streetNames[randomNum(0, streetNames.length - 1)]
  const type = streetTypes[randomNum(0, streetTypes.length - 1)]
  const city = cities[randomNum(0, cities.length - 1)]
  const num = randomNum(10, 9999)
  return `${num} ${street} ${type}, ${city}`
}

const makeDescription = () => {
  return descriptions[randomNum(0, descriptions.length - 1)]
}

const randomGpa = () => {
  return (Math.random() * 10).toFixed(2);
}

const getCampusId = () => {
  let campusId = randomNum(0, fanClubNames.length - 1)
  if(!campusId) campusId = null
  return campusId
}

const makeImgUrl = () => {
  const num = randomNum(5, 40) * 20
  const siteIdx = randomNum(0, 2);
  const url =  `${placeHolderImageUrls[siteIdx]}${num}/${num}`
  return url
}

const students = []

for(let i = 1; i <= NUMSTUDENTS; i++) {
  const firstName = makeFirstName()
  const lastName = makeLastName()
  const email = makeEmail(firstName)
  const gpa = randomGpa()
  const imgUrl = makeImgUrl()
  const campusId = getCampusId()
  const newStudent = {
    firstName,
    lastName,
    email,
    gpa,
    imgUrl,
    campusId
  }
  students.push(newStudent)
}

const campuses = fanClubNames.map(name => {
  const address = makeAddress()
  const description = makeDescription()
  const imgUrl = makeImgUrl()
  const newCampus = {
    name,
    address,
    description,
    imgUrl,
  }
  return newCampus
})

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
      console.log(`Database seeded with ${NUMSTUDENTS} students and ${campuses.length} campuses. May Nic Cage look favorably upon thee.`)
      return null;
    });
};

main();
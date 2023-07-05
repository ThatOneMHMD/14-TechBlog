// import data
const { User } = require('../models');

// Define the data for seeding
const userData = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password1',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password2',
  },
  // Add more user data HERE if need be
];

// Define the seeding function
const seedUsers = () => User.bulkCreate(userData);

// export data
module.exports = seedUsers;
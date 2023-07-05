// import seeding data
const seedBlog = require('./blog-seeds');
const seedComment = require('./comment-seeds');
const seedUsers = require('./user-seeds');
const sequelize = require('../config/connection');

// seeding function
const seedAll = async () => {
  await sequelize.sync({ force: false, logging: false });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedBlog();
  console.log('\n----- BLOGS SEEDED -----\n');

  await seedComment();
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

// Call function to seed data
seedAll();

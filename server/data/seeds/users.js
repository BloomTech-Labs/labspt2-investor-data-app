const faker = require('faker');

// Faker function to create a fake user based on schema in migration file

const createFakeUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

// For loop that runs createFakeUser function to seed database with 500 dummy users

exports.seed = async function(knex) {
  const fakeUsers = [];
  const desiredFakeUsers = 100;
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
  };
  await knex('users').insert(fakeUsers);
};

import { defineConfig } from 'cypress';
import { faker } from '@faker-js/faker';
import { clear } from './dataBase';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random(1000) * 1000);
          let userName = faker.name.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: 'test'+`${randomNumber}`+'@mail.com',
            password: '12345Qwert!',
          };
        },
        generateArticle() {
          const title = faker.lorem.sentence();
          const description = faker.lorem.paragraph();
          const body = faker.lorem.paragraphs();

          return {
            title: title,
            description: description,
            body: body,
          };
        },
        'db:clear'() {
          clear();
          return null;
        },
      });
    },
  },
});

'use strict';

/* Seed data for initial library state */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books', [
      {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Southern Gothic',
      year: 1960,
      updatedAt: new Date(),
      createdAt: new Date()
      },
      {
        title: 'Dune',
        author: 'Frank Herbert',
        genre: 'Science Fiction',
        year: 1965,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J. D. Salinger',
        genre: 'Realistic Fiction',
        year: 1951,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'The Hitchhiker\'s Guide to the Galaxy',
        author: 'Douglas Adams',
        genre: 'Comedy Science Fiction',
        year: 1979,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        genre: 'Fantasy',
        year: 2008,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Catching Fire',
        author: 'Suzanne Collins',
        genre: 'Fantasy',
        year: 2009,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Mockingjay',
        author: 'Suzanne Collins',
        genre: 'Fantasy',
        year: 2010,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'The Memory Police',
        author: 'Yoko Ogawa',
        genre: 'Science Fiction',
        year: 1994,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Frankenstein',
        author: 'Mary Shelley',
        genre: 'Horror',
        year: 1818,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'The Book of Unknown Americans',
        author: 'Cristina Henriquez',
        genre: 'Fiction',
        year: 2014,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Armada',
        author: 'Ernest Cline',
        genre: 'Science Fiction',
        year: 2015,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Emma',
        author: 'Jane Austen',
        genre: 'Classic',
        year: 1815,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Classic',
        year: 1813,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Ready Player One',
        author: 'Ernest Cline',
        genre: 'Science Fiction',
        year: 2011,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'The Martian',
        author: 'Andy Weir',
        genre: 'Science Fiction',
        year: 2001,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'The Universe in a Nutshell',
        author: 'Stephen Hawking',
        genre: 'Non Fiction',
        year: 2001,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        genre: 'Non Fiction',
        year: 1988,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Nickel Boys',
        author: 'Colson Whitehead',
        genre: 'Historical Fiction',
        year: 2019,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'The Ballad of Songbirds and Snakes',
        author: 'Suzanne Collins',
        genre: 'Fantasy',
        year: 2020,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Foundation',
        author: 'Isaac Asimov',
        genre: 'Science Fiction',
        year: 1951,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Foundation and Empire',
        author: 'Isaac Asimov',
        genre: 'Science Fiction',
        year: 1952,
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        title: 'Second Foundation',
        author: 'Isaac Asimov',
        genre: 'Science Fiction',
        year: 1953,
        updatedAt: new Date(),
        createdAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};

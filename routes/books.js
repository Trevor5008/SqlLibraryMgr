const express = require("express");
const router = express.Router();
const createError = require('http-errors');
const Book = require("../models").Book;
const sequelize = require('sequelize');
const { Op } = sequelize;

/* Handler function to wrap each route. */
const asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
};

/* GET all books listing */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { count, rows } = await Book.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    const pages = Math.ceil(count/10);
    res.render("index", { 
      books: rows, 
      title: "Books",
      pages,
      activePage: 1 
    });
  })
);

/* Get route for individual pages */
router.get(
  "/page_:num",
  asyncHandler(async (req, res) => {
    const limit = 10;
    const offset = req.params.num > 1 
      ? (req.params.num - 1) * limit : 0;
    const activePage = req.params.num;
    const { count, rows } = await Book.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });
    const pages = Math.ceil(count/10);
    console.log(activePage)
    res.render("index", { 
      books: rows, 
      title: "Books",
      pages,
      activePage
    });
  })
);

/* Create a new book form */
router.get("/new", (req, res) => {
  res.render("new-book", {
    book: {},
    title: 'New Book'
  });
});

/* POST new book to db */
router.post(
  "/new",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/books");
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render("new-book", {
          book,
          errors: err.errors,
          title: "New Book",
        });
      } else {
        throw err;
      }
    }
  })
);

/* GET generated error route - mock 500 error */
router.get("/error", (req, res, next) => {
  console.log('Custom 500 error route called');
  next(createError(500, 'Mock server error thrown'));
}); 

router.get('/search', async (req, res, next) => {
  let { term } = req.query
  term = term.toLowerCase();
  if (term) {
  const { count, rows } = await Book.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.or]: [
        { title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 
        'LIKE', `%${term}%`)
        },
        { author: sequelize.where(sequelize.fn('LOWER', sequelize.col('author')), 
        'LIKE', `%${term}%`)
        },
        { genre: sequelize.where(sequelize.fn('LOWER', sequelize.col('genre')), 
        'LIKE', `%${term}%`)
        },
        { year: {
            [Op.like]: '%'+ term + '%'
          },
        }
      ]
    },
    limit: 10
  });
  const pages = Math.ceil(count/10);
  res.render("index", { 
    books: rows, 
    title: "Books",
    pages,
    activePage: 1
   });
  } else {
    res.redirect('/books');
  }
})

/* Edit book info */
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("update-book", { book, title: "Update Book" });
    } else {
      next(createError(404, 'That book does not exist.'));
    }
  })
);


/* Update book */
router.post(
  "/:id",
  asyncHandler(async (req, res, next) => {
    let book = await Book.findByPk(req.params.id);
    if (book) {
      try {
        book = await book.update(req.body);
        res.redirect('/books');
      } catch (err) {
        if (err.name === "SequelizeValidationError") {
          book = await Book.build(req.body);
          book.id = req.params.id;
          res.render("update-book", {
            book,
            errors: err.errors,
            title: "Update Book",
          });
        } else {
          throw err;
        }
      }
    } else {
      next(createError(404, 'That book does not exist.'));
    }
  })
);

/* Delete individual book */
router.post('/:id/delete', asyncHandler( async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect('/books');
  } else {
    next(createError(404, 'That book does not exist.'));
  }
}));

module.exports = router;

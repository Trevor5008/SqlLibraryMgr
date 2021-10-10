const express = require("express");
const router = express.Router();
const Book = require("../models").Book;

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

/* GET books listing */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.render("index", { books, title: "Books" });
  })
);

/* Create a new book form */
router.get(
  "/new",
  asyncHandler(async (req, res) => {
    res.render("new-book");
  })
);

/* POST new book to db */
router.post(
  "/new",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = Book.create(req.body);
      res.redirect("/books");
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render("/new", {
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

/* Edit book info */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("update-book", { book, title: book.title });
    } else {
      res.sendStatus(404);
    }
  })
);

/* Update book */
router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    let book = await Book.findByPk(req.params.id);
    if (book) {
      try {
        book = await book.update(req.body);
        res.redirect('/books');
      } catch (err) {
        if (err.name === "SequelizeValidationError") {
          book = await book.build(req.body);
          res.render("update-book", {
            book,
            errors: err.errors,
            title: "Edit Book",
          });
        } else {
          throw err;
        }
      }
    } else {
      res.sendStatus(404);
    }
  })
);

/* Delete individual book */
router.post('/:id/delete', asyncHandler( async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect('/books');
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;

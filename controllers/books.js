import Books from '../schemas/books.schema.js';
import mongoose from 'mongoose';


export const books_gets_all = (req, res, next) => {
  Books.find().select('_id name books').exec().then(doc => {
    var response = {
      count: doc.length,
     books: doc.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
          books: doc.books,
     
        }
      })
    };
    console.log("reponse : ", response);
    res.status(200).json(response);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
}


export const books_create_books= (req, res, next) => {

  var books = Books({
      name: req.body.name,
      books: req.body.file,
  });
    books.save().then(result => {
        res.status(200).json({
          message: 'book saved successfully',
          createdbooks: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          Error: err
        });
      });
  
  }


  export const books_get_one = (req, res, next) => {
  var id = req.params.booksId;
  Books.findById(id).select('books').exec().then(doc => {
    // console.log(doc);
    if (doc) {
      res.status(200).json({
        books: doc
      });
    } else {
      res.status(404).json({
        error: 'No Records found for that ID'
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
}
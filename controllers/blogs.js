import Blogs from '../schemas/blog.schema.js';
import mongoose from 'mongoose';

export const blogs_gets_all = (req, res, next) => {
  Blogs.find().select('_id title description ').exec().then(doc => {
    var response = {
      count: doc.length,
      blogs: doc.map(doc => {
        return {
          _id: doc._id,
          title: doc.title,
          description: doc.description,
         
        }
      })
    };
    res.status(200).json(response);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
}


export const blogs_create_blogs = (req, res, next) => {
  var blogs = new Blogs({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description
  });
  blogs.save().then(result => {
      res.status(200).json({
        message: 'blogs saved successfully',
        createdblogs: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        Error: err
      });
    });

}


export const blogs_get_one = (req, res, next) => {
  var id = req.params.blogsId;
  Blogs.findById(id).select('_id title description ').exec().then(doc => {
    if (doc) {
      res.status(200).json({
        blogs: doc
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



export const blogs_update_one = (req, res, next) => {
 var id = req.params.blogsId;
 let blogs = {
    title: req.body.title,
    description: req.body.description  
 }
 Blogs.updateOne({
     _id: id
   }, {
     $set: blogs
   })
   .exec()
   .then(doc => {
     res.status(200).json({
       message: 'blogs successfully Updated',

     });
   }).catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });
}
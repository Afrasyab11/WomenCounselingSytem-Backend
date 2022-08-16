import Jobs from '../schemas/jobs.schema.js';
import mongoose from 'mongoose';


export const create_jobs = (req, res, next) => {

  var jobs = new Jobs({
    title: req.body.title,
    description: req.body.description
  });
  jobs.save().then(result => {
      res.status(200).json({
        message: 'jobs saved successfully',
        createdjobs: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        Error: err
      });
    });
}

export const jobs_get_one = (req, res, next) => {
  var usercnic = req.params.cnic;
  Jobs.find({cnic: usercnic}).select('_id title description').exec().then(doc => {
    if (doc) {
      res.status(200).json({
        jobs: doc
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

export const jobs_get_one_jobsId = (req, res, next) => {
  var jobsId = req.params.pId;
  Jobs.find({_id: jobsId}).select('_id title description ').exec().then(doc => {
    if (doc) {
      res.status(200).json({
        count: doc.length
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

export const jobs_update_one = (req, res, next) => {
  var id = req.params.jobsId;
  let jobs = {
     title: req.body.title,
     description: req.body.description  
  }
  Jobs.updateOne({
      _id: id
    }, {
      $set: jobs
    })
    .exec()
    .then(doc => {
      res.status(200).json({
        message: 'jobs successfully Updated',
 
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
 }
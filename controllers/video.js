import Video from '../schemas/video.schema.js';
import mongoose from 'mongoose';

export const video_gets_all = (req, res, next) => {
 Video.find().select('_id name video ').exec().then(doc => {
    var response = {
      count: doc.length,
     video: doc.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
          video: doc.video,
     
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


export const video_create_video = async (req, res, next) => {
  const { name } = req.body;
  let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push("/" + video.path);
    }
  }

  try {
    const createdMedia = await Video.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Video created successfully", createdMedia });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

  export const video_get_one = (req, res, next) => {
  var id = req.params.videoId;
 Video.findById(id).select('video').exec().then(doc => {
    
    if (doc) {
      res.status(200).json({
        Bids: doc
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
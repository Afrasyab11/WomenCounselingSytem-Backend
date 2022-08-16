import Router from 'express';
const router = Router();
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }

    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
  },
}); 

import { video_create_video, video_gets_all, video_get_one } from '../controllers/video.js';

router.post('/', upload.fields([
    {
      name: "videos",
      maxCount: 5,
    },
  ]),video_create_video );

router.get('/:video', video_get_one );

router.get('/', video_gets_all );


export default router;
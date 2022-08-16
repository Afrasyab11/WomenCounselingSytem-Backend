import Router from 'express';
import multer from 'multer';
const router = Router();
 

let path = "public/uploads";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    console.log('FILLEE::',file)
    let type = file.mimetype.split('/');
    console.log("type::",type)
    let path=file.originalname;
   if (file.fieldname == "books") req.body.file = path;
console.log(file);
    cb(null, path);
  },
});

var upload = multer({ storage: storage })

var fileUpload = upload.fields([{ name: 'books', maxCount: 1 }])

// books controller
import { books_gets_all, books_create_books, books_get_one} from '../controllers/books.js';

router.get('/', books_gets_all );

router.post('/', fileUpload, books_create_books);

router.get('/:bookId', books_get_one );

export default router;
import * as Cloudinary from 'cloudinary'
import process from 'process';
import multer from 'multer';
import express from 'express'

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

Cloudinary.v2.config({
  cloud_name: "darkybkfp",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



app.post("/resume", upload.single("file"), async () => {
    // console.log(req);
    console.log(req.file);
    try {
        var result = await cloudinary.v2.uploader.upload(
            `${req.file?.destination}/${req.file?.filename}`
        );
    }
    catch (err) {
        console.log(err);
    }
});



app.get('/', (req,res) => {
    res.send("hello world");
})

app.listen(3000, () => {
  console.log("listing to port 3000");
});

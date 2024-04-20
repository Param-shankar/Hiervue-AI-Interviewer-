import * as cloudinary from 'cloudinary'
import process from 'process';
import multer from 'multer';
import express from 'express';
import 'dotenv/config';

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

console.log(process.env.CLOUD_API_KEY)

cloudinary.v2.config({
  cloud_name: "darkybkfp",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  //   api_key: process.env.CLOUD_API_KEY,
  //   api_secret: process.env.CLOUD_API_SECRET,
});



app.post("/api/resume", upload.single("resume"), async (req, res) => {
  console.log(req.file);
//   console.log(req.file);
  try {
    var result = await cloudinary.v2.uploader.upload(
      `${req.file?.destination}/${req.file?.filename}`
    );
    console.log(result);
  } catch (err) {
    res.send("error");
    console.log(err);
  }
  res.send("done")
  console.log("req aa gai ha");
});



app.get('/', (req,res) => {
    res.send("hello world");
})

app.listen(3000, () => {
  console.log("listing to port 3000");
});

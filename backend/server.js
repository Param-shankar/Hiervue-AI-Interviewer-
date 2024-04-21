import * as cloudinary from "cloudinary";
import process from "process";
import multer from "multer";
import express from "express";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import OpenaAI from "openai";
import path from "path";
import * as PlayHT from "playht";
import cors from 'cors';

const corsOptions = {
  origin: "http://localhost:5173",
};

//adding the cors headers using the middleware

PlayHT.init({
  apiKey: "e392415bcae44664bfc258cbe96b6ee4",
  userId: "9u00tFWNtWav5m6p7rdEC3xDxfh2",
  defaultVoiceId:
    "s3://peregrine-voices/oliver_narrative2_parrot_saad/manifest.json",
  defaultVoiceEngine: "PlayHT2.0",
});

const app = express();
app.use(cors(corsOptions));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const model = genAI.getGenerativeModel({
  model: "gemini-pro-vision",
});

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

const generateai = async () => {
  try {
    const imagepart = [
      fileToGenerativePart(
        "/Users/paramshankar/Desktop/hacknuthon/uploads/resumedumm.png",
        "image/png"
      ),
    ];
    const prompt =
      "give me top 7 Question that I should ask this guy whose reusme is provide to u";
    const result = await model.generateContent([prompt, ...imagepart]);
    const response = result.response;
    const question = response.text();
    return question;
  } catch (error) {
    console.log("response error", error);
  }
};

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

console.log(process.env.CLOUD_API_KEY);

cloudinary.v2.config({
  cloud_name: "darkybkfp",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  //   api_key: process.env.CLOUD_API_KEY,
  //   api_secret: process.env.CLOUD_API_SECRET,
});

app.get("/api/google", async (req, res) => {
  const value = await generateai();
  console.log(value);

  res.send(value);
});

app.post("/api/getmp", async (req, res) => {
  const { val } = req.body;
    console.log(val);
    try {
        const generated = await PlayHT.generate(val);
        console.log(generated);
        res.send(generated);
    } catch (error) {
        res.send("there was an error in the ")
    }
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
  res.send("done");
  console.log("req aa gai ha");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("listing to port 3000");
});

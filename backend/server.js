import express from 'express';

const app = express()
app.listen(3000, () => {
    console.log("listing to port 3000");
})

app.get('/', (req,res) => {
    res.send("hello world");
})

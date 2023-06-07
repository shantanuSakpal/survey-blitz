const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  


mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2";

const adminRouter = require('./routes/adminRouter');

const app = express();
const port = 5000;

app.use(express.json());
app.use('/admin', adminRouter);


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB)
}
  

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});




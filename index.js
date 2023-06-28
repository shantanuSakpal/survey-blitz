const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2";

const adminRouter = require('./routes/adminRouter');
const formRouter = require('./routes/formRouter');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/admin', adminRouter);
app.use('/', formRouter);


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB)
    console.log("Connected to MongoDB");
}
app.get('/', (req, res) => {
    res.send("Hello World");
}
);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});




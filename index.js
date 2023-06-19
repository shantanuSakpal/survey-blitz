const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



mongoose.set("strictQuery", false);
const mongoDB = "mongodb://localhost:27017";

const adminRouter = require('./routes/adminRouter');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/admin', adminRouter);


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




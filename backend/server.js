const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const corsOptions = require("./config/corsOptions");

mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE_URI;

const adminRouter = require("./routes/adminRouter");
const formRouter = require("./routes/formRouter");

const app = express();
const port = 3001;

app.use(cors(corsOptions));
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/", formRouter);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB");
}
app.get("/", (req, res) => {
  const html = `
    <html>
      <head>
        <style>
          body {
            background-color: black;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          p{
            font-size: 20px;
            font-family: sans-serif;
            
          }
         
          p span{
            color: #18bed4;
            
          }  
          p a{
            color: #18bed4;
            
          }
        </style>
      </head>
      <body>
        <div>
          <h1>Welcome to SurveyBlitz</h1> <br/> 
          <p> To get your <span>Surveys Simplified</span> and  <span>Results Amplified</span>, visit <a href="https://surveyblitz.vercel.app/">our website !</a></p>
        </div>
      </body>
    </html>
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

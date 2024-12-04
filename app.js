const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const users = require("./routes/users");
const tasks = require("./routes/tasks");
dotenv.config();

const PORT = process.env.PORT || 7000;

//use middlewares
app.use(bodyParser.json());

//connect with DB
connectDB();

//user specified route
app.use("/api/v1/user",users);

//task specified route
app.use("/api/v1/tasks",tasks);

app.get("/",(req,res)=> {
    res.json(
        {
            message:"Welcome to Task Manager."
        }
    )
})

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

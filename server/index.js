const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8082;
const db_url = process.env.DB_URL;
const CORS = process.env.CORS;


app.use(express.json());
app.use(
  cors({
    origin: [CORS],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);





mongoose.connect(db_url).then(()=>{
    console.log("db is connected")
}).catch((err)=>{
    console.log(err)
})




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

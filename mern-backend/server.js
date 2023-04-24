require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongose = require("mongoose");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

mongose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

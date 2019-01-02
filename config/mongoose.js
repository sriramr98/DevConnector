const mongoose = require("mongoose");
const { MONGODB_URI } = require("./keys");

mongoose
  .connect(
    MONGODB_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log("Mongodb Started"))
  .catch(e => console.log(`Error connecting to mongodb ${e}`));

const mongodb = require("mongodb");
const { MONGODB_URI } = require("./keys");

mongodb
  .connect(
    MONGODB_URI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("Mongodb Started"))
  .catch(e => console.log(`Error connecting to mongodb ${e}`));

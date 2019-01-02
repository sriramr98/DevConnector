module.exports = {
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/devconnector",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "somesecretkeyyoucantdecrypt"
};

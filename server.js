"use strict";

const express = require("express");
// connect to mongodb
require("./config/mongoose");

// api routes
const userRoutes = require("./routes/api/user");
const profileRoutes = require("./routes/api/profile");
const postsRoutes = require("./routes/api/post");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => res.send("<h1> Welcome to Dev Connector </h1>"));

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

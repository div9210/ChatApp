// Imports and Configurations
require('dotenv').config();
const express = require("express");

const auth = require("./middlewares/Auth.js");

require("./db/connection.js");

const app = express();
app.use(express.json());

// Routers
const groupRoutes = require("./routes/Group.js");
const memberRoutes = require("./routes/Member.js");
const messageRoutes = require("./routes/Message.js");

// Routes
app.post('/login', auth.login);
app.use("/group", groupRoutes);
app.use("/member", memberRoutes);
app.use("/messages", messageRoutes);

// Error Handling
app.use((err, req, res, next) => {
    res.status(400).json({
        status: 500,
        message: err.message
    });
});

// Server Side
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on PORT", process.env.PORT || 3000);
});

module.exports = app;




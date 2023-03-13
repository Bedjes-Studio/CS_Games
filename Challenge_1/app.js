const express = require("express");
const cookieParser = require("cookie-parser");

const cookie = require("./middleware/cookie");
const pictureExtractor = require("./middleware/pictureExtractor");
const frontRoutes = require("./routes/front");
const apiRoutes = require("./routes/api");

/*
 * Setup Express
 */

const app = express();
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

/*
 * Setup routes
 */

app.get("/online", (req, res, next) => {
    res.status(200).json({
        message: "server is online",
    });
});

app.use("/public", express.static("./public"));
app.use("/static", express.static("./static"));
app.use("/api", cookie, apiRoutes);
app.use("/", cookie, pictureExtractor, frontRoutes);

module.exports = app;

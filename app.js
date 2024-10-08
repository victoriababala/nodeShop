const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const flash = require("connect-flash");
const multer = require("multer");

// const helmet = require("helmet");
// const compression = require("compression");
// const morgan = require("morgan");
const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  file.mimetype === "image/png" ||
  file.mimetype === "image/jpg" ||
  file.mimetype == "image/jpeg"
    ? cb(null, true)
    : cb(null, false);
};

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const accessLogSteam = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
// app.use(helmet());
// app.use(compression());
// app.use(morgan("combined", {stream: accessLogSteam}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);

app.use("/500", errorController.get500Page);
app.use(errorController.get404Page);

app.use((error, req, res, next) => {
  // res.redirect('/500');
  res.status(500).render("500", {
    pageTitle: "Error",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 2000);
  })
  .catch((err) => {
    console.log(err);
  });

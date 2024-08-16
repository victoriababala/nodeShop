exports.get404Page = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page not found",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  });
  //.sendFile(path.join(rootDir, "views", "404.html"));
  //   res.status(404).send("<h1> Page not found</h1>");
};

exports.get500Page = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });

};

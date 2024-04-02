const questionsRoutes = require("./questions");

const appRouter = (app, fs) => {
  app.get("/", (req, res) => {
    res.send("Welcome to your first api with nodemon");
  });

  questionsRoutes(app, fs);
};

module.exports = appRouter;

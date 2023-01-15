const app = require("./server");

app.use("/", require("./src/routes/jewelsRoutes"));

module.exports = app;

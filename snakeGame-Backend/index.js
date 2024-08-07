const database = require("./db");
const app = require("./app");
require("dotenv").config();

database()
  .then(() => {
    app.on("error", (err) => {
      console.log("Express error", err);
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
    process.exit(1);
  });

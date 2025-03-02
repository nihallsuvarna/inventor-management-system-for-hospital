const dotenv = require("dotenv");
const app = require("./app.js");

const PORT = process.env.PORT || 3000;
dotenv.config();

app.listen(PORT, () => {
  console.log("App listening to PORT", PORT);
});

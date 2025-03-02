import dotenv from "dotenv";
import app from "./app"


const PORT = process.env.PORT || 3000;
dotenv.config();


app.listen(PORT, () => {
  console.log("App listening to PORT", PORT);
});

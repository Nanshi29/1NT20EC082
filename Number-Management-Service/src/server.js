const express = require("express");
const numbersRouter = require("./routes/numbers");

const app = express();
const PORT = process.env.PORT || 8008;

app.use("/numbers", numbersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

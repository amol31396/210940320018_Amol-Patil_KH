const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const { showMsg, addMsg } = require("./user");

app.get("/showMsg", async (request, response) => {
  const list = await showMsg();
  response.json(list);
});

app.post("/addMsg", async (request, response) => {
  const msg = request.body;
  await addMsg(msg);
  response.json({ message: "Message added...!!!" });
});

app.listen(4000, () => console.log("Server Started"));
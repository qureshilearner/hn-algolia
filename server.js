const express = require("express");
const body = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const { MongoClient, ObjectId } = require("mongodb");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// import crypto from "crypto";

let newsRouter = require("./src/routes/newsRoute");
let profile_router = require("./src/routes/userProfile");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 5000;

let db = null;
(async function mongo() {
  const url = "mongodb://localhost:27017";
  let client;
  try {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db("newsApi");
    console.log("Connected....");
    server.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (err) {
    console.log("Server Not Responding ...");
  }
})();

app.use(body.json());
app.use(body.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "_Hn", resave: false, saveUninitialized: false }));
require("./src/config/passport.js")(app);

//Sanitize The Data
app.use(mongoSanitize());

//Set Security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

app.use((req, _, next) => {
  req.db = db; // req.db is avilable in both routes
  next();
});
app.use("/author", profile_router);
app.use("/news", newsRouter);

let socClient;
io.on("connection", (client) => {
  socClient = client;
  client.on("subscribeTimer", (interval) => {
    let i = 0;
    console.log(`Client Is Subscribe To Timer With Interval ${interval}`);
    setInterval(() => {
      client.broadcast.emit("timer", new Date() + " " + i++ + " " + client.id);
      client.emit("timer", new Date() + " " + client.id);
    }, interval);
  });

  client.on("newMsg", (message) => {
    console.log(`Recieved Message from Client ${message}`);
    client.broadcast.emit("recieved", message);
    client.emit("recieved", message);
  });

  client.on("user-name", (name, msg) => {
    //console.log(`Typing Message from Client ${msg}`);
    client.broadcast.emit("user-is-typing", { name, msg });
  });
});

let data = [
  { id: 1, express: "786 From Express" },
  { id: 2, express: "777 From express" },
];
app.get("/a", async (req, res) => {
  // let response = await db.insertMany(data);
  res.json(data);
});

app.get("/u", async (req, res) => {
  let data1 = await db.collection("news").find().toArray();
  res.json(data1);
});

app.get("/home", (req, res) => {
  res.send(["This ", "Is ", "From ", "Server"]);
});

app.get("/api/world/:d", (req, res) => {
  let { d } = req.params;
  res.send([`I received your POST request. This is what you sent me: ${d}`]);
});

app.post("/user", (req, res) => {
  let { name, password } = req.body;
  res.send(`786 Recieved ${name} ${password}`);
});

app.delete("/delete/:id", async (req, res) => {
  let resp = await db
    .collection("news")
    .deleteOne({ _id: new ObjectID(req.params.id) });
  res.sendStatus(204);
});

app.post("/data", async (req, res) => {
  let { id, express } = req.body;
  let resp = await db
    .collection("news")
    .insertOne({ id: new ObjectID(), express });
  console.log(id, express);
  res.json(resp);
});

// server.listen(port, () => console.log(`Listening on port ${port}`));

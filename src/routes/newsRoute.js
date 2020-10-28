const express = require("express");
let { ObjectId } = require("mongodb");

const news_Route = express.Router();
let col = "news"; //Database collection

// news_Route.route("/:d").get(async (req, res) => {
//   try {
//     const col = db.collection("foo");
//     const reslt = await col.find({}).toArray();
//     console.log(reslt);
//     res.json(reslt);
//     res.send("Connected........" + req.params.d);
//   } catch (err) {
//     res.send(err);
//   }
//   client.close();
// });

news_Route.post("/newsPost", ensureUser, async (req, res) => {
  try {
    let { title, url, text } = req.body;
    let { _id, userName } = req.user;
    console.log(title, req.ip, new Date(), url);
    let insertNews = await req.db.collection(col).insertOne({
      author_id: _id,
      author: userName,
      title,
      url: url.trim() === "" ? null : url,
      text: text.trim() === "" ? null : text,
      points: 0,
      post_at: new Date(),
    });
    let data = insertNews.ops[0];
    insertNews.insertedId
      ? res.json({ success: true, data })
      : res.json({ success: false });
  } catch (e) {
    res.json({ success: false });
  }
});

news_Route.get("/newsPost", async (req, res) => {
  try {
    let news = await req.db.collection(col).find({}).toArray();
    let { user } = req;
    if (typeof user !== "undefined" && user.hasOwnProperty("hide")) {
      let hide_ids = user.hide;
      for (let k = 0; k < news.length; k++) {
        let { _id } = news[k];
        if (hide_ids.includes(`${_id}`)) {
          news.splice(k, 1);
          --k;
        }
      }
    }
    res.json({ success: true, news });
  } catch (e) {
    console.log(e);
    res.json({ success: false });
  }
});

news_Route.get("/hide/:id", ensureUser, async (req, res) => {
  let { id } = req.params;
  try {
    let { _id, hide } = req.user;
    console.log("User Id : ", id);
    let r = await req.db
      .collection("profiles")
      .updateOne({ _id: new ObjectId(_id) }, { $addToSet: { hide: id } });
    console.log(r.result.nModified);
    if (r.result.nModified > 0) {
      hide.push(id);
      res.json({ success: true });
    } else {
      res.json({ success: false, errMsg: "Already Hide..." });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, errMsg: "Error: Something went wrong..." });
  }
  console.log("hide", id);
});

async function ensureUser(req, res, next) {
  console.log(typeof req.user === "undefined");
  typeof req.user !== "undefined"
    ? next()
    : res.json({ success: false, errMsg: "You are not logged in!" });
}

module.exports = news_Route;

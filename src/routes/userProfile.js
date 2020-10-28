var express = require("express");
let { ObjectId } = require("mongodb");
// const passport = require("passport");
let message = require("../email/mail");

const profile_router = express.Router();
let col = "profiles"; //Database collection

profile_router.param("id", async (req, _, next, id) => {
  try {
    req.data = await req.db
      .collection(col)
      .findOne({ _id: new ObjectId(id) }, { role: 0, _id: 0 });
  } catch (e) {
    req.data = false;
  }
  next();
});

profile_router.get("/renue-password", async (req, res) => {
  console.log("call", req.query);
  try {
    let { _id } = req.query;
    let resetReq = await req.db
      .collection(col)
      .find({ _id: new ObjectId(_id) })
      .toArray();
    resetReq.length > 0
      ? res.json({ success: true })
      : res.json({ success: false });
  } catch (e) {
    res.json({ success: false });
  }
});

profile_router.post("/create-account", checkUnique, async (req, res) => {
  let { userName, password, email } = req.body;
  console.log(userName, password, email);
  try {
    let create = await req.db.collection(col).insertOne({
      userName,
      password,
      email,
      created: new Date(),
      karma: 0,
    });
    console.log(create.insertedId, create.insertedCount);
    create.insertedId
      ? res.json({ success: true })
      : res.json({ success: false });
  } catch (e) {
    res.json({ success: false });
  }
});

profile_router.post("/signIn", async (req, res) => {
  let { name, password } = req.body;
  console.log(name, password);
  try {
    let checkUser = await req.db
      .collection(col)
      .find({ userName: name, password })
      .project({ password: 0 })
      .toArray();
    checkUser.length > 0
      ? req.logIn(checkUser[0], (err) => {
          err
            ? res.json({ success: false })
            : res.status(200).json({ success: true, user: req.user });
        })
      : res.json({ success: false });
  } catch (e) {
    console.log(e);
    res.json({ success: false });
  }
});

profile_router.post("/renue-password", async (req, res) => {
  try {
    let { _id, newPassword } = req.body;
    console.log(_id, newPassword);
    let resetReq = await req.db
      .collection(col)
      .updateOne(
        { _id: new ObjectId(_id) },
        { $set: { password: newPassword }, $unset: { activeResetPassword: "" } }
      )
      .toArray();
    resetReq.length > 0
      ? res.json({ success: true })
      : res.json({ success: false });
  } catch (e) {
    res.json({ success: false });
  }
});

profile_router.post("/forgot-password", ensureMail, async (req, res) => {
  let { email } = req.body;
  try {
    let r = await req.db
      .collection(col)
      .updateOne({ email }, { $set: { activeResetPassword: true } });
    console.log(r.result.nModified);
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }
});

profile_router.get("/profile", async (req, res) => {
  const { user } = req;
  typeof user !== "undefined"
    ? res.json({ success: true, user })
    : res.json({ success: false });
});

profile_router.get("/logout", (req, res) => {
  console.log("Call");
  if (typeof req.user !== "undefined") {
    req.logout();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

profile_router
  .route("/:id")
  .all((req, res, next) => {
    console.log("ok");
    typeof req.user !== "undefined" ? next() : res.json({ success: false });
  })
  .get((req, res) => {
    req.data ? res.json(req.data) : res.json(false);
    console.log(req.data);
  })
  .put(async (req, res) => {
    let { userName, email, about } = req.body;
    if (req.data) {
      try {
        let update_result = await req.db
          .collection(col)
          .updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { userName, email, about } }
          );
        res.json(update_result);
      } catch (e) {
        res.sendStatus(404);
      }
    } else res.json(false);
  })
  .delete(async (req, res) => {
    if (req.data) {
      try {
        let delete_user = await req.db.collection(col).deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(delete_user);
      } catch (e) {
        res.sendStatus(404);
      }
    } else res.json(false);
  });

async function ensureMail(req, res, next) {
  let { email } = req.body;
  console.log(email);
  try {
    let checkUser = await req.db
      .collection(col)
      .find({ email, activeResetPassword: { $exists: false } })
      .toArray();
    if (checkUser.length > 0) {
      let { userName, _id } = checkUser[0];
      message.sendMail(email, userName, _id);
      // res.locals.email = email;
      next();
    } else {
      res.json({
        success: false,
        errMsg: "You already requested please check your email",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false });
  }
}

async function checkUnique(req, res, next) {
  let { userName, email } = req.body;
  try {
    let mail = await req.db.collection(col).find({ email }).toArray();
    let user;
    mail.length > 0
      ? res.json({ success: false, errMsg: "E-Mail Is Already Exist." })
      : (user = await req.db.collection(col).find({ userName }).toArray()),
      user.length > 0
        ? res.json({ success: false, errMsg: "User Name Is Already Exist." })
        : next();
    // console.log(user);
  } catch (e) {
    res.json({ success: false });
  }
}

module.exports = profile_router;

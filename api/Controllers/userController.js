const express = require("express");
const router = express.Router();
const connection = require("../../database");
var { User } = require("../Models/User");
const multer = require("multer");
const path = require("path");

const { Storage } = require("@google-cloud/storage");

const gc = new Storage({
  keyFilename: path.join(__dirname, "../../My First Project-fef46b4a0f29.json"),
  projectId: "plated-campaign-247606"
});

const myUploadedfilesBucket = gc.bucket(process.env.MY_STOREAGE_BUCKETNAME);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "." + process.env.UploadedFile);
    //cb(null, "./public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fieldSize: 1024 * 1024 * 5
  }
});

router.post("/checkuser", (req, res) => {
  var query = `select * from UsersDetail where mailid ='${
    req.body.mailid
  }'  and Password ='${req.body.password}'`;

  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.length <= 0) {
        res.json([{ error: "Invalid User" }]);
      } else {
        var query = `select * from UsersDetail where id = ${result[0].Id}`;
        connection.query(query, (err, resultdata) => {
          if (err) {
            throw err;
          } else {
            if (resultdata.length <= 0) {
              res.json([
                {
                  message: "Please Update your other details",
                  data: result[0]
                }
              ]);
            } else {
              res.json(resultdata);
            }
          }
        });
      }
    }
  });
});

//Get All User
router.get("/users", (req, res) => {
  connection.query("select * from UsersDetail", (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

//Get User Data by Id
router.get("/user/:userid", (req, res, next) => {
  connection.query(
    "select * from `Users` where id = ? LIMIT 3",
    req.params.userid,
    (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results);
    }
  );
});

//Inserting User Detail
router.post("/user", (req, res, next) => {
  var sqlquery =
    "insert into Users (Username,EmailId,Password) values ('" +
    req.body.username +
    "' ,'" +
    req.body.emailId +
    "','" +
    req.body.password +
    "') ";

  console.log(sqlquery);
  connection.query(sqlquery, (err, results) => {
    if (err) {
      throw err;
    }
    res.send({
      title: "Data Inserted",
      message: "Data Save Successfully"
    });
  });
});

router.get("/userDetail/:userid", (req, res) => {
  connection.query(
    "select * from `UsersDetail` where UserId = ? LIMIT 3",
    req.params.userid,
    (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    }
  );
});
//Inserting User Detail
router.post("/userDetail", uploads.single("userImage"), (req, res, next) => {
  console.log(req.file);

  myUploadedfilesBucket.file(req.file.originalname).createWriteStream({
    resumable: false,
    gzip: true
  });

  const UsersDetail = {
    fullname:
      req.body.firstname + " " + req.body.middlename + " " + req.body.lastname,
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    gender: req.body.gender,
    motherTongue: req.body.motherTongue,
    Clause: req.body.Clause,
    dob: req.body.dob,
    birthTime: req.body.birthTime,
    age: req.body.age,
    height: req.body.height,
    color: req.body.color,
    qualificaton: req.body.qualificaton,
    occupation: req.body.occupation,
    work: req.body.work,
    earnings: req.body.earnings,
    physicalFitness: req.body.physicalFitness,
    maritalStatus: req.body.maritalStatus,
    religion: req.body.religion,
    familyGod: req.body.familyGod,
    fathername: req.body.fathername,
    mothername: req.body.mothername,
    fatherOccupation: req.body.fatherOccupation,
    motherOccupation: req.body.motherOccupation,
    sibblingsMale: req.body.sibblingsMale,
    sibblingsFemale: req.body.sibblingsFemale,
    marriedSibblingsMale: req.body.marriedSibblingsMale,
    marriedSibblingsFemale: req.body.marriedSibblingsFemale,
    origin: req.body.origin,
    native: req.body.native,
    assets: req.body.assets,
    dowry: req.body.dowry,
    star: req.body.star,
    rasi: req.body.rasi,
    lagnam: req.body.lagnam,
    directionBias: req.body.directionBias,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    ra1: req.body.ra1,
    ra2: req.body.ra2,
    ra3: req.body.ra3,
    ra4: req.body.ra4,
    ra5: req.body.ra5,
    ra6: req.body.ra6,
    ra7: req.body.ra7,
    ra8: req.body.ra8,
    ra9: req.body.ra9,
    ra10: req.body.ra10,
    ra11: req.body.ra11,
    ra12: req.body.ra12,
    f1: req.body.f1,
    f2: req.body.f2,
    f3: req.body.f3,
    f4: req.body.f4,
    f5: req.body.f5,
    f6: req.body.f6,
    f7: req.body.f7,
    f8: req.body.f8,
    f9: req.body.f9,
    f10: req.body.f10,
    f11: req.body.f11,
    f12: req.body.f12,
    address: req.body.address,
    district: req.body.district,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    mailid: req.body.mailid,
    password: req.body.password,
    expectations: req.body.expectations,
    otherMessage: req.body.otherMessage,
    userImage: req.file.path
  };

  connection.query(
    "insert into UsersDetail SET  ? ",
    UsersDetail,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.json({
          title: "Data Inserted",
          message: "Data Save Successfully"
        });
        console.log("Last insert ID:", result.insertId);
      }
    }
  );
});

module.exports = router;

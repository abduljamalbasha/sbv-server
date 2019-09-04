const multer = require("multer");
const { memoryStorage } = require("multer");
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const googleCloudStorage = new Storage({
  keyFilename: path.join(__dirname, "../../My First Project-fef46b4a0f29.json"),
  projectId: "plated-campaign-247606"
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploads = multer({
  storage: memoryStorage({
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  }),
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

// A bucket is a container for objects (files).
const bucket = googleCloudStorage.bucket("myimagefiles");

var UploadMethods = {
  UploadYouFiles: function(req, customizefilename) {
    //const gcsFileName = `${Date.now()}-${req.file.originalname}`;

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(customizefilename);

    // Make sure to set the contentType metadata for the browser to be able
    // to render the image instead of downloading the file (default behavior)
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });

    blobStream.on("error", err => {
      next(err);
      return;
    });

    blobStream.end(req.file.buffer);
  }
};

module.exports = UploadMethods;

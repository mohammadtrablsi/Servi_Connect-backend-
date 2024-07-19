// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: function (req,file,cb){
//         cb(null,path.join(__dirname,"../images"));
//     },
//     filename: function (req,file,cb){
//         cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
//     }
// });

// const upload = multer({ storage });


// // /api/upload
// router.post("/", upload.single("image"), (req,res) => {
//     res.status(200).json({message: "image uploaded"});
// })


// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../images"));
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
});

const upload = multer({ storage });

// /api/upload
router.post("/", upload.single("image"), (req, res) => {
    const filePath = `/images/${req.file.filename}`;
    res.status(200).json({
        message: "Image uploaded successfully",
        path: filePath
    });
});

module.exports = router;

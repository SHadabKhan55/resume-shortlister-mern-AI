const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname, "../candidate_resumes");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
 const allowed = [".pdf",".docx",".doc"]
    const ext = path.extname(file.originalname).toLowerCase()
    if(!allowed.includes(ext)){

      return cb(new Error("Only PDF, DOC and DOCX files are allowed"),false);
    }
    cb(null,true)
}

const upload = multer({storage,fileFilter});

module.exports = upload;
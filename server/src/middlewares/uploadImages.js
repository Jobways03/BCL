const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
//Creating a storage object to store the images in destination folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (locaFilePath) => {
  // console.log(locaFilePath);

  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder
  try {
    const result = await cloudinary.uploader.upload(locaFilePath);
    return result;
  } catch (error) {
    console.log(error);
  }
};

async function resizeImage(file) {
  try {
    let result = await uploadToCloudinary(`${file}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { upload, uploadToCloudinary, resizeImage };

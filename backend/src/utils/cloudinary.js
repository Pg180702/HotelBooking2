const cloudinary = require("cloudinary").v2;

const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null; //could also return error message
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file uploaded now
    //console.log("file upload success",response.url);
    fs.unlinkSync(localFilePath);
    return response; //sirf url hi h main but fir bhi bhej diya poora
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove locally saved file as upload failed
    return null;
  }
};

module.exports = uploadOnCloudinary;

import authMiddleWare from "../../../middleware/auth";
import cloudinary from "cloudinary";
import Qr from "../../../models/Qr";

const fs = require("fs");
const formidable = require("formidable-serverless");

const ShortUniqueId = require("short-unique-id");

const urlId = new ShortUniqueId({
  dictionary: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  shuffle: false,
  debug: false,
  length: 6,
});

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

async function uploadToCloudinary(locaFilePath) {
  var today = new Date();
  let mmy = new Date(
    new Date(today).setHours(today.getHours() + 1)
  ).toUTCString();
  let nn = new Date(mmy).getTime() / 1000;
  console.log(nn);
  try {
    const response = await cloudinary.v2.uploader.upload(
      locaFilePath,
      {
        resource_type: "auto",
        timestamp: nn,
      },
      function (error, result) {
        console.log(result, error);
      }
    );
    console.log("response", response);

    try {
      fs.unlinkSync(locaFilePath);
      //file removed
    } catch (err) {
      console.error(err);
    }
    return {
      message: "Success",
      url: response.url,
    };
  } catch (error) {
    console.log("Error", error);
    return { message: "failed" };
  }
}

export default async function (req, res) {
  if (req.method === "POST") {
    let mmy = await authMiddleWare(req, res);

    let allImages = [];
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = false;

    form.parse(req, async function (err, fields, files) {
      console.log("fields", fields, "files", files);
      try {
        if (files.files) {
          if (Array.isArray(files.files)) {
            console.log("files", files);
            console.log("has files");
            for (const image of files.files) {
              const { path } = image;
              var result = await uploadToCloudinary(path);
              allImages.push(result.url);
            }
          } else {
            let result = await uploadToCloudinary(files.files.path);
            //imageData = JSON.stringify(result);
            allImages.push(result.url);
          }

          console.log("allImages", allImages);
          const qr = new Qr({
            name: fields.menu_name,
            cover_image: fields.hasCoverImage === "true" ? allImages[0] : "",
            images: allImages,
            url_id: urlId(),
            records: JSON.parse(fields.items),
          });

          qr.save((err, rows) => {
            if (err) throw err;
          });
        } else {
          console.log("no files");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  if (req.method === "GET") {
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

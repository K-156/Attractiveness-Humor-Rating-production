import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

const uploadImageLocal = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const image = req.files.img;
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${image.name}`
  );
  await image.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ img: { src: `/uploads/${image.name}` } });
};

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.files.img.tempFilePath, {
    use_filename: true,
    folder: "file-upload",
  });
  fs.unlinkSync(req.files.img.tempFilePath)
  return res.status(StatusCodes.OK).json({ img: { src: result.secure_url } });
};

export { uploadImage };

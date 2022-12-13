import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

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

const uploads = async (req, res) => {
  const { id: uploadId } = req.params;

  const result = await cloudinary.uploader.upload(req.files.resource.tempFilePath, {
    public_id: uploadId,
    folder: "file-upload",
    resource_type:'auto',
  });
  fs.unlinkSync(req.files.resource.tempFilePath);
  return res.status(StatusCodes.OK).json({ resource: { src: result.secure_url } });
};

export { uploads };

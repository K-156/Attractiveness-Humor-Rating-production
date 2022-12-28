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

const createFolder = async (req,res) => {
  const { id: folderId } = req.params;

  const result = await cloudinary.api.create_folder(folderId);

  return res.status(StatusCodes.OK).json(result)
}

const deleteFolder = async (req,res) => {
  const { id: folderId } = req.params;

  const result = await cloudinary.api.delete_folder(folderId);

  return res.status(StatusCodes.OK).json(result)
}

const uploads = async (req, res) => {
  const { id: uploadId } = req.params;

  const result = await cloudinary.uploader.upload(req.files.resource.tempFilePath, {
    public_id: uploadId,
    folder: "file-upload",
    resource_type:'auto',
  });
  console.log(result)
  fs.unlinkSync(req.files.resource.tempFilePath);
  return res.status(StatusCodes.OK).json({ resource: { src: result.secure_url } });
};

const deleteUploads = async (req,res) => {
  let result = null;
  const { id: uploadId } = req.params;
  if (uploadId.includes('csv')) {
    result = await cloudinary.uploader.destroy(`file-upload/${uploadId}`,{
      resource_type:'raw',
    })
  } else if (uploadId.includes('audio')) {
    result = await cloudinary.uploader.destroy(`file-upload/${uploadId}`,{
      resource_type:'video',
    })
  } else {
    result = await cloudinary.uploader.destroy(`file-upload/${uploadId}`)
  }
  return res.status(StatusCodes.OK).json(result)
}

export { uploads, deleteUploads, createFolder, deleteFolder };

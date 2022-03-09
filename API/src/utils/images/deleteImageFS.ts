import path from "path";
import fs from "fs";

const deleteImageFS = async (imageUrl: string) => {
  const dirname = path.resolve();
  const filePath = path.join(dirname, imageUrl);
  fs.unlink(filePath, err => {});
}

export default deleteImageFS;
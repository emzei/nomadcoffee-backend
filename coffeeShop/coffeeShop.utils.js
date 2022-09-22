import { createWriteStream } from "fs";
export const processCategory = (category) => {
  const slug = category
    .match(/[^\s]+/g)
    ?.join("-")
    .toLowerCase();

  return {
    where: {
      name: category,
    },
    create: {
      name: category,
      slug,
    },
  };
};

export const handlePhoto = async (photo, id) => {
  const { filename, createReadStream } = await photo;
  const newFilename = `${id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = createWriteStream(
    process.cwd() + "/uploads/" + newFilename
  );
  readStream.pipe(writeStream);
  return `http://localhost:${process.env.PORT}/static/${newFilename}`;
};
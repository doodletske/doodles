import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1.5,
  maxWidthOrHeight: 3000,
  useWebWorker: true,
  initialQuality: 0.9,
};

const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5 MB

export async function compressImages(
  files: File[]
): Promise<File[]> {
  return Promise.all(
    files.map(async (file) => {
      // Skip compression if the file is already small enough
      if (file.size <= MAX_FILE_SIZE) {
        return file;
      }

      return imageCompression(file, options);
    })
  );
}
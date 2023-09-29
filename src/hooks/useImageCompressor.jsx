// useImageCompressor.js
import { useState } from 'react';
import pica from 'pica';

const useImageCompressor = () => {
  const [compressedImage, setCompressedImage] = useState(null);

  const compressImage = async (originalImage, percentage) => {
    const originalWidth = originalImage.width;
    const originalHeight = originalImage.height;

    const newWidth = Math.floor(originalWidth * (percentage / 100));
    const newHeight = Math.floor(originalHeight * (percentage / 100));

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = newWidth;
    offscreenCanvas.height = newHeight;

    return new Promise((resolve, reject) => {
      pica().resize(originalImage, offscreenCanvas)
        .then(result => pica().toBlob(result, 'image/jpeg', 0.9))
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            setCompressedImage(reader.result);
            resolve(reader.result);
          };
        })
        .catch(err => reject(err));
    });
  };

  return [compressedImage, compressImage];
};

export default useImageCompressor;

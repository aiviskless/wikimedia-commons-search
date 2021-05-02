import getFullsizeImage from './getFullsizeImage';

const getFilenameFromWDCFilePath = (url) => {
  const splitUrl = url.split('/');

  return getFullsizeImage(splitUrl[splitUrl.length - 1]);
};

export default getFilenameFromWDCFilePath;

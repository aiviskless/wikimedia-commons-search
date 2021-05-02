const getFilenameExtension = (filename) => {
  const splitUrl = filename.split('.');

  return splitUrl[splitUrl.length - 1];
};

export default getFilenameExtension;

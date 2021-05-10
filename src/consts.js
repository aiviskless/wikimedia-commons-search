export const TIMEOUT_FOR_SEARCH = 500;
export const DEFAULT_MEDIA_LIMIT = 1000;
export const MAX_MEDIA_LIMIT = 1500;
export const WCQS_ENDPOINT = 'https://wcqs-beta.wmflabs.org/sparql';
export const WDQS_ENDPOINT = 'https://query.wikidata.org/sparql';
export const WIKIDATA_URL = 'https://www.wikidata.org';
export const COMMONS_URL = 'https://commons.wikimedia.org/';

export const ALL_TAB = 0;
export const IMAGES_TAB = 1;
export const VIDEO_TAB = 2;
export const AUDIO_TAB = 3;

export const NOT_IMAGE_ENCODINGS = [
  'video/webm',
  'video/mpeg',
  'audio/wav',
  'audio/x-flac',
  'audio/mpeg',
  'audio/midi',
  'audio/webm',
  'application/ogg',
];

export const IMAGE_FILE_EXTS = [
  'jpg',
  'jpeg',
  'jpe',
  'jif',
  'jfif',
  'png',
  'gif',
  'webp',
  'tiff',
  'psd',
  'raw',
  'svg',
  'pdf',
];

export const VIDEO_FILE_EXTS = [
  'webm',
  'mpg',
  'mpeg',
  'mpe',
  'mpv',
  'ogv',
  'mp4',
  'm4p',
  'm4v',
  'avi',
  'wmv',
  'mov',
  'qt',
  'flv',
];

export const AUDIO_FILE_EXTS = [
  'm4a',
  'flac',
  'mp3',
  'wav',
  'wma',
  'aac',
  'ogg',
  'midi',
];

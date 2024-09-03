const fs = require('fs');

const RESOURCES_PATH = './resources';
const DIST_WELL_KNOWN_PATH = './dist/.well-known';


const DIST_APPLE_ASSOCIATION_FILE = 'apple-app-site-association';
const RESOURCE_APPLE_ASSOCIATION_FILE = 'apple-app-site-association.json';

const DIST_APPLE_ASSOCIATION_PATH =  [DIST_WELL_KNOWN_PATH , DIST_APPLE_ASSOCIATION_FILE].join('/')
const RESOURCE_APPLE_ASSOCIATION_PATH =  [RESOURCES_PATH , RESOURCE_APPLE_ASSOCIATION_FILE].join('/')

if (!fs.existsSync(DIST_WELL_KNOWN_PATH)){
  fs.mkdirSync(DIST_WELL_KNOWN_PATH);
}

const data = fs.readFileSync(RESOURCE_APPLE_ASSOCIATION_PATH);
fs.writeFileSync(DIST_APPLE_ASSOCIATION_PATH, data);

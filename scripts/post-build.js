const fs = require('fs');

const RESOURCES_PATH = './resources';
const DIST_PATH = './dist';
const DIST_WELL_KNOWN_PATH = './dist/_well-known';


// Apple App Site Association
const DIST_APPLE_ASSOCIATION_FILE = 'apple-app-site-association';
const RESOURCE_APPLE_ASSOCIATION_FILE = 'apple-app-site-association.json';
const DIST_APPLE_ASSOCIATION_PATH =  [DIST_WELL_KNOWN_PATH , DIST_APPLE_ASSOCIATION_FILE].join('/')
const RESOURCE_APPLE_ASSOCIATION_PATH =  [RESOURCES_PATH , RESOURCE_APPLE_ASSOCIATION_FILE].join('/')


// Humans.txt
const HUMANS_TXT_FILE = 'humans.txt';
const DIST_HUMANS =  [DIST_PATH , HUMANS_TXT_FILE].join('/')
const RESOURCE_HUMANS =  [RESOURCES_PATH , HUMANS_TXT_FILE].join('/')

// Robots.txt
const ROBOTS_TXT_FILE = 'robots.txt';
const DIST_ROBOTS =  [DIST_PATH , ROBOTS_TXT_FILE].join('/')
const RESOURCE_ROBOTS =  [RESOURCES_PATH , ROBOTS_TXT_FILE].join('/')


if (!fs.existsSync(DIST_WELL_KNOWN_PATH)){
  fs.mkdirSync(DIST_WELL_KNOWN_PATH);
}

[
  {source: RESOURCE_APPLE_ASSOCIATION_PATH, destination: DIST_APPLE_ASSOCIATION_PATH},
  {source: RESOURCE_HUMANS, destination: DIST_HUMANS},
  {source: RESOURCE_ROBOTS, destination: DIST_ROBOTS},
].forEach(entry => {
  const data = fs.readFileSync(entry.source);
  fs.writeFileSync(entry.destination, data);
})

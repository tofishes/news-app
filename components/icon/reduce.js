const fs = require('fs');

const sourceJson = require('./source.json');

const targetJson = {};

sourceJson.icons.map(icon => {
  targetJson[icon.name] = icon.data;
  return icon;
});

fs.writeFile('icon-map.json', JSON.stringify(targetJson, null, 2));

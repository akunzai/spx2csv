if (process.argv.length < 3) {
  console.log('USAGE: node index.js InstalledApps.spx');
  return;
}
const fs = require('fs');
const plist = require('plist');
const appsData = plist.parse(fs.readFileSync(process.argv[2], 'utf8'))[0];
let fields = undefined;
appsData['_items'].forEach((item) => {
  if (typeof fields === 'undefined') {
    fields = Object.keys(item).sort();
    console.log(fields.join(','));
  }
  let values = [];
  fields.forEach((field) => {
    let value = item[field] || '';
    values.push(Array.isArray(value) ? `"${value.join('\n')}"` : `"${value}"`);
  });
  console.log(values.join(','));
});

const fs = require('fs');
const plist = require('plist');

if (process.argv.length < 3) {
    console.log('USAGE: node index.js InstalledApps.spx');
    return;
}
var SPAppsData = plist.parse(fs.readFileSync(process.argv[2], 'utf8'))[0];
console.log('name,lastModified,obtained_from,path,version');
SPAppsData['_items'].forEach(item =>{
    console.log(`"${item['_name']}","${item['lastModified']}","${item['obtained_from']}","${item['path']}","${item['version']}"`);
});

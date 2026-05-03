#!/usr/bin/env node

import fs from 'node:fs';
import * as plist from 'plist';

if (process.argv.length < 3) {
  console.log('USAGE: node index.js InstalledApps.spx');
  process.exit(0);
}

const data = plist.parse(fs.readFileSync(process.argv[2], 'utf8'));
let fields = undefined;
let items = data[0]['_items'];
if (typeof items === 'undefined' || !Array.isArray(items)) {
  throw new Error('Invalid input data format');
}
items.forEach((item) => {
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

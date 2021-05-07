const { readFileSync } = require('fs');

const readFile = (file) => 
  readFileSync(file, { encoding: 'utf8' })
    .split('\n')
    .map(row => row.replace('\r', ''));

module.exports = {
  readFile
}
const fs = require('fs')

const index = fs.readFileSync('./docs/index.html', 'utf-8')
const reg = new RegExp('(src|href)="\/', 'gi')
const update = index.replace(reg, `$1="`)
fs.writeFileSync('./docs/index.html', update)
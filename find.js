const find = require('find')
const [,,date] = process.argv
const searchFor = (name, arr) => arr => {
        const checkMatchFor = search => str => str.includes(search) && str
        const find = checkMatchFor(name)
        const output = arr.map(find).filter(exist => exist) 
        console.log(output)
}
const searchFunc = searchFor(date)
// Looks for files in directory that contain a string input. Ouputing an array with their paths
find.file(/\.zip$/,__dirname, searchFunc)
// unzip the results
// run a search on the content within the unziped files
// delete unziped folders
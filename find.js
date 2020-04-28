#!/usr/bin/env node
console.log('Zip finder start...')
const matchSorter = require('match-sorter').default
const unzipper = require('unzipper')
const find = require('find')
const findInFiles = require('find-in-files')
const fs = require('fs')
const path = require('path')
// compose pipe function
const execute = (...fn) => input => fn.reduce((fn, nextFn) => nextFn(fn), input)
const print = value => console.log(value)
// find all zip files in current directory
const zipFilesInDirectory = (fn) => fn(find.fileSync(/\.zip$/,__dirname))
// match a pattern passed by the cli
const searchFor = pattern => list => matchSorter(list, pattern)
const unzip = value => fs.createReadStream(value).pipe(unzipper.Extract({ path: path.join(__dirname, 'output') }))
const unzipResults = results => results.forEach(unzip)
const findInContent = () => findInFiles.find(process.argv[3], '.', '.txt$').then(print)

execute(searchFor, zipFilesInDirectory, unzipResults, findInContent)(process.argv[2])
// TODO ADD A DELETE METHOD TO RUN BEFORE EACH EXECUTION
// delete output directory if exists

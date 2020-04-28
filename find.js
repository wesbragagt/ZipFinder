#!/usr/bin/env node
console.log('Zip finder start...')
const matchSorter = require('match-sorter').default
const unzipper = require('unzipper')
const find = require('find')
const fs = require('fs')
const path = require('path')
const execute = (...fn) => input => fn.reduce((fn, nextFn) => nextFn(fn), input)
const print = value => console.log(value)
// find all zip files in current directory
const zipFilesInDirectory = (fn) => fn(find.fileSync(/\.zip$/,__dirname))
// match a pattern passed by the cli
const searchFor = pattern => list => matchSorter(list, pattern)

const [,,searchTerm] = process.argv
execute(searchFor, zipFilesInDirectory, print)(searchTerm)

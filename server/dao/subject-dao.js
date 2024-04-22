"use strict";
const fs = require("fs");
const path = require("path");

// load promise api for reading and writing file
const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// specify the default location of json file where the data should be stored
const STORAGE_PATH = path.join(__dirname, "storage", "subjects.json");

class SubjectDao {


}

module.exports = SubjectDao;
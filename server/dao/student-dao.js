"use strict";
const fs = require("fs");
const path = require("path");

// load promise api for reading and writing file
const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// specify the default location of json file where the data should be stored
const STORAGE_PATH = path.join(__dirname, "storage", "students.json");

class StudentDao {
    constructor(storagePath) {
        this.studentStoragePath = storagePath ? storagePath : STORAGE_PATH;
    }
    
    async getStudent(id) {
        let studentList = await this._loadAllStudents();
        const result = studentList.find((b) => b.id === id);
        return result;
    }

    async listStudents() {
        let studentList = await this._loadAllStudents();
        return studentList;
    }

    async _loadAllStudents() {
        let studentList;
        try {
            studentList = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
            console.info("No storage found, initializing new one...");
            studentList = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                        this._getStorageLocation()
                );
            }
        }
        return studentList;
    }
        
    _getStorageLocation() {
        return this.studentStoragePath;
    }
}

module.exports = StudentDao;
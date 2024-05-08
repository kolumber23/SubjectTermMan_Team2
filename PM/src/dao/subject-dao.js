"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// load promise api for reading and writing file
const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// specify the default location of json file where the data should be stored
const STORAGE_PATH = path.join(__dirname, "storage", "subjects.json");

class SubjectDao {
    constructor(storagePath) {
        this.subjectStoragePath = storagePath ? storagePath : STORAGE_PATH;
    }

    async createSubject(subject) {
        let subjectList = await this._loadAllSubjects();
        subject.id = crypto.randomBytes(8).toString("hex");
        subjectList.push(subject);
        await wf(
            this._getStorageLocation(),
            JSON.stringify(subjectList, null, 2)
        );
        return subject;
    }

    async getSubject(id) {
        let subjectList = await this._loadAllSubjects();
        const result = subjectList.find((b) => b.id === id);
        return result;
    }

    async listSubject() {
        let subjectList = await this._loadAllSubjects();
        return subjectList;
    }

    async _loadAllSubjects() {
        let subjectList;
        try {
            subjectList = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
            console.info("No storage found, initializing new one...");
            subjectList = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                        this._getStorageLocation()
                );
            }
        }
        return subjectList;
    }
        
    _getStorageLocation() {
        return this.subjectStoragePath;
    }
}
    
module.exports = SubjectDao;
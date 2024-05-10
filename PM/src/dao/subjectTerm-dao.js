"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// load promise api for reading and writing file
const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// specify the default location of json file where the data should be stored
const STORAGE_PATH = path.join(__dirname, "storage", "subjectTerms.json");

class SubjectTermDao {
    constructor(storagePath) {
        this.subjectTermStoragePath = storagePath ? storagePath : STORAGE_PATH;
    }

    async createSubjectTerm(subjectTerm) {
        let subjectTermList = await this._loadAllSubjectTerms();
        subjectTerm.id = crypto.randomBytes(8).toString("hex");
        subjectTermList.push(subjectTerm);
        await wf(
            this._getStorageLocation(),
            JSON.stringify(subjectTermList, null, 2)
        );
        return subjectTerm;
    }

    async getSubjectTerm(id) {
        let subjectTermList = await this._loadAllSubjectTerms();
        const result = subjectTermList.find((b) => b.id === id);
        return result;
    }

    async listSubjectTerm() {
        let subjectTermList = await this._loadAllSubjectTerms();
        return subjectTermList;
    }
    async updateSubjectTerm(subjectTerm) {
        let subjectTermList = await this._loadAllSubjectTerms();
        const subjectTermIndex = subjectTermList.findIndex((b) => b.id === subjectTerm.id);
        if (subjectTermIndex < 0) {
          throw new Error(`Subject term with given id ${subjectTerm.id} does not exists.`);
        } else {
          subjectTermList[subjectTermIndex] = {
            ...subjectTermList[subjectTermIndex],
            ...subjectTerm,
          };
        }
        await wf(this._getStorageLocation(), JSON.stringify(subjectTermList, null, 2));
        return subjectTermList[subjectTermIndex];
    }
    
        async enrollStudent(subjTermId, studentId) {
    }
    
    async removeStudent(subjTermId, studentId) {
    }

    async listStudents(subjTermId) {
    }
    
    async _loadAllSubjectTerms() {
        let subjectTermList;
        try {
            subjectTermList = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
            console.info("No storage found, initializing new one...");
            subjectTermList = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                        this._getStorageLocation()
                );
            }
        }
        return subjectTermList;
    }

    _getStorageLocation() {
        return this.subjectTermStoragePath;
    }
}

module.exports = SubjectTermDao;
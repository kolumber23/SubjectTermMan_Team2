"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// load promise api for reading and writing file
const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// specify the default location of json file where the data should be stored
const STORAGE_PATH = path.join(__dirname, "storage", "activities.json");

class ActivityDao {
    constructor(storagePath) {
        this.activityStoragePath = storagePath ? storagePath : STORAGE_PATH;
    }

    async createActivity(activity) {
        let activityList = await this._loadAllActivities();
        activity.id = crypto.randomBytes(8).toString("hex");
        activityList.push(activity);
        await wf(
            this._getStorageLocation(),
            JSON.stringify(activityList, null, 2)
        );
        return activity;
    }

    async getActivity(id) {
        let activityList = await this._loadAllActivities();
        const result = activityList.find((b) => b.id === id);
        return result;
    }

    async listActivity() {
        let activityList = await this._loadAllActivities();
        return activityList;
    }

    async deleteActivity(id) {
        let activityList = await this._loadAllActivities();
        const activityIndex = activityList.findIndex((b) => b.id === id);
        if (activityIndex >= 0) {
          activityList.splice(activityIndex, 1);
        }
        await wf(
          this._getStorageLocation(),
          JSON.stringify(activityList, null, 2)
        );
        return {};
    }
    
        async _loadAllActivities() {
        let activityList;
        try {
            activityList = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
            console.info("No storage found, initializing new one...");
            activityList = [];
            } else {
                throw new Error(
                    "Unable to read from storage. Wrong data format. " +
                        this._getStorageLocation()
                );
            }
        }
        return activityList;
    }

    _getStorageLocation() {
        return this.activityStoragePath;
    }
}

module.exports = ActivityDao;
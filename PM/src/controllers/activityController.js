const ActivityDao = require('../dao/activity-dao.js');

exports.getActivity = (req, res) => {
    const { activityId } = req.body;

    // Find the student in the static array
    const activity = ActivityDao.getActivity(activityId);

    if (!activity) {
        // Activity not found
        return res.status(404).json({ message: "Activity not found" });
    }

    // Return the found activity
    res.status(200).json({ message: "Activity retrieved successfully", data: activity });
  };
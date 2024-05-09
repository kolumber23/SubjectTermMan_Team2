const ActivityDao = require('../dao/activity-dao.js');
const ActivityDaoInstance = new ActivityDao();

exports.getActivity = async (req, res) => {
    const { activityID } = req.body;

    // Find the student in the static array
    const activity = await ActivityDaoInstance.getActivity(activityID);

    if (!activity) {
        // Activity not found
        return res.status(404).json({ message: "Activity not found" });
    }

    // Return the found activity
    res.status(200).json({ message: "Activity retrieved successfully", data: activity });
  };

exports.createActivity = async (req, res) => {
  const { name, subjectTermId, description, maxScore, minScore, deadline } = req.body;

  const newActivity = {
    name,
    subjectTermId,
    description,
    maxScore,
    minScore,
    deadline
  };
  const createdActivity = await ActivityDaoInstance.createActivity(newActivity);

  res.status(201).json({ message: "Activity created", data: createdActivity });
};

exports.listActivity = async (req, res) => {
  // Check if there are any activities in the array
  const activityList = await ActivityDaoInstance.listActivity();
  if (activityList.length === 0) {
    // No activity found
    return res.status(404).json({ message: "No activity found" });
  }

  // Return all activities in the staticActivity array
  res.status(200).json({ message: "Activities retrieved successfully", data: activityList });
};

exports.deleteActivity = async (req, res) => {
  const { activityID } = req.body; // Assuming the ID is passed as a URL parameter

  // Find the activity in the static array
  const activity = await ActivityDaoInstance.getActivity(activityID);

  if (!activity) {
    // Activity not found
    return res.status(404).json({ message: "Activity not found" });
  }

  await ActivityDaoInstance.deleteActivity(activityID)
  // Return the found activity
  res.status(200).json({ message: "Activity deleted successfully" });
};






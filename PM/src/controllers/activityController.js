const ActivityDao = require('../dao/activity-dao.js');
const ActivityDaoInstance = new ActivityDao();
const { authenticateToken } = require('../middleware/authMiddleware.js');

exports.getActivity = async (req, res) => {
  const { activityId } = req.body;

  // Find the student in the static array
  const activity = await ActivityDaoInstance.getActivity(activityId);

  if (!activity) {
    // Activity not found
    return res.status(404).json({ message: "Activity not found" });
  }

  // Return the found activity
  res.status(200).json({ message: "Activity retrieved successfully", data: activity });
};

exports.createActivity = async (req, res) => {
  const { name, subjTermId, description, maxScore, minScore, deadline } = req.body;
  const executeCreate = async () => {
    const newActivity = {
      name,
      subjTermId,
      description,
      maxScore,
      minScore,
      deadline
    };
    const createdActivity = await ActivityDaoInstance.createActivity(newActivity);

    res.status(201).json({ message: "Activity created", data: createdActivity });
  }
  authenticateToken(req, res, executeCreate)
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
  const { activityId } = req.body; // Assuming the Id is passed as a URL parameter
  const executeDelete = async () => {
    // Find the activity in the static array
    const activity = await ActivityDaoInstance.getActivity(activityId);

    if (!activity) {
      // Activity not found
      return res.status(404).json({ message: "Activity not found" });
    }

    await ActivityDaoInstance.deleteActivity(activityId)
    // Return the found activity
    res.status(200).json({ message: "Activity deleted successfully" });
  }
  authenticateToken(req, res, executeDelete)
};






const SubjectDao = require('../dao/subject-dao.js');
const SubjectDaoInstance = new SubjectDao();
const { authenticateToken } = require('../middleware/authMiddleware.js');

const createSubject = async (req, res) => {
  const { name, credits, supervisor, goal, degree, language, description, school } = req.body;
  const executeCreate = async () => {
    const newSubject = {
      name,
      school,
      credits,
      supervisor,
      goal,
      degree,
      language,
      description,
    };
    const createdSubject = await SubjectDaoInstance.createSubject(newSubject);

    res.status(201).json({ message: "Subject created", data: createdSubject });
  }
  authenticateToken(req, res, executeCreate)
};

const listSubjects = async (req, res) => {
  // Check if there are any subjects in the array

  const listedSubjects = await SubjectDaoInstance.listSubject()
  if (listedSubjects.length === 0) {
    // No subjects found
    return res.status(404).json({ message: "No subjects found" });
  }

  // Return all subjects in the staticSubjects array
  res.status(200).json({ message: "Subjects retrieved successfully", data: listedSubjects });
};

const getSubject = async (req, res) => {
  const { subjectId } = req.body; // Assuming the Id is passed as a URL parameter

  // Find the subject in the static array
  const subject = await SubjectDaoInstance.getSubject(subjectId);

  if (!subject) {
    // Subject not found
    return res.status(404).json({ message: "Subject not found" });
  }

  // Return the found subject
  res.status(200).json({ message: "Subject retrieved successfully", data: subject });
};

module.exports = { createSubject, listSubjects, getSubject }





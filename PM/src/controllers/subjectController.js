const SubjectDao = require('../dao/subject-dao.js');

const createSubject = (req, res) => {
    const { name, credits, supervisor, goal, degree, language, description, school } = req.body;
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
    SubjectDao.createSubject(newSubject);
    
    res.status(201).json({ message: "Subject created", data: newSubject });
  };

const listSubjects = (req, res) => {
    // Check if there are any subjects in the array
    if (staticSubjects.length === 0) {
        // No subjects found
        return res.status(404).json({ message: "No subjects found" });
    }

    // Return all subjects in the staticSubjects array
    res.status(200).json({ message: "Subjects retrieved successfully", data: SubjectDao.listSubject() });
  };

const getSubject = (req, res) => {
    const { subjectId } = req.body; // Assuming the ID is passed as a URL parameter

    // Find the subject in the static array
    const subject = SubjectDao.getSubject(subjectId);

    if (!subject) {
        // Subject not found
        return res.status(404).json({ message: "Subject not found" });
    }

    // Return the found subject
    res.status(200).json({ message: "Subject retrieved successfully", data: subject });
  };

  module.exports = { createSubject, listSubjects, getSubject}





const SubjectTermDao = require('../dao/subjectTerm-dao.js');
const SubjectDao = require('../dao/subject-dao.js');

const SubjectDaoInstance = new SubjectDao();
const SubjectTermDaoInstance = new SubjectTermDao();

exports.createSubjectTerm = async (req, res) => {
  const { subjectId, semester, studentList } = req.body;

  const subject = await SubjectDaoInstance.getSubject(subjectId)

  if (!subject) {
    // Subject term not found
    return res.status(400).json({ message: `Subject with id '${subjectId}' not found` });
}

  const newSubjectTerm = {
    semester,
    subjectId,
    studentList: studentList || [],
  };
  const createdSubjectTerm = await SubjectTermDaoInstance.createSubjectTerm(newSubjectTerm)
  
  res.status(201).json({ message: "Subject term created", data: createdSubjectTerm });
};

exports.updateSubjectTerm = async (req, res) => {
  const { subjectTermId, semester, studentList } = req.body;

  // Find the index of the subject term in the array
  const subjectTerm = await SubjectTermDaoInstance.getSubjectTerm(subjectTermId);

  if (!subjectTerm) {
      // Subject term not found
      return res.status(404).json({ message: "Subject term not found" });
  }

  // Update properties if they exist in the request
  if (semester) {
    subjectTerm.semester = semester;
  }
  if (studentList) {
    subjectTerm.studentList = studentList;
  }

  SubjectTermDaoInstance.updateSubjectTerm(subjectTerm);
  

  // Return the updated subject term
  res.status(200).json({ message: "Subject term updated", data: subjectTerm });
};

exports.getSubjectTerm = async (req, res) => {
  const { subjectTermId } = req.body;  // Assuming the Id is passed as a URL parameter

  // Find the subject term in the array
  const subjectTerm = await SubjectTermDaoInstance.getSubjectTerm(subjectTermId)

  if (!subjectTerm) {
      // Subject term not found
      return res.status(404).json({ message: "Subject term not found" });
  }

  // Return the found subject term
  res.status(200).json({ message: "Subject term retrieved successfully", data: subjectTerm });
};
  
exports.listSubjectTerms = async (req, res) => {
  const {  } = req.query;  // Access the semester query parameter

  // Filter the subject terms by semester
  const filteredTerms = await SubjectTermDaoInstance.listSubjectTerm();

  if (filteredTerms.length === 0) {
      // No subject terms found for the semester
      return res.status(404).json({ message: "No subject terms found for the provided semester" });
  }

  // Return the filtered subject terms
  res.status(200).json({ message: "Subject terms retrieved successfully", data: filteredTerms });
};

// exports.listSubjectTermsBySemester = (req, res) => {
//   const { semester } = req.query;  // Access the semester query parameter

//   // Filter the subject terms by semester
//   const filteredTerms = staticSubjectTerms.filter(term => term.semester === semester);

//   if (filteredTerms.length === 0) {
//       // No subject terms found for the semester
//       return res.status(404).json({ message: "No subject terms found for the provided semester" });
//   }

//   // Return the filtered subject terms
//   res.status(200).json({ message: "Subject terms retrieved successfully", data: filteredTerms });
// };

// exports.listSubjectTermsBySubjectId = (req, res) => {
//   const { subjectId } = req.query;  // Access the subjectId query parameter

//   // Convert subjectId to an integer for comparison
//   const subjectIdInt = parseInt(subjectId);

//   // Filter the subject terms by subjectId
//   const filteredTerms = staticSubjectTerms.filter(term => term.subjectId === subjectIdInt);

//   if (filteredTerms.length === 0) {
//       // No subject terms found for the subject Id
//       return res.status(404).json({ message: "No subject terms found for the provided subject Id" });
//   }

//   // Return the filtered subject terms
//   res.status(200).json({ message: "Subject terms retrieved successfully", data: filteredTerms });
// };

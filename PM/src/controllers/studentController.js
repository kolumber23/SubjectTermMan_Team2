const StudentDao = require('../dao/student-dao.js');
const StudentDaoInstance = new StudentDao();
  exports.getStudent = async (req, res) => {
    const { studentId } = req.body;

    // Find the student in the static array
    const student = await StudentDaoInstance.getStudent(studentId);
    if (!student) {
        // Student not found
        return res.status(404).json({ message: "Student not found" });
    }

    // Return the found student
    res.status(200).json({ message: "Student retrieved successfully", data: student });
  };

  exports.listStudent = async (req, res) => {
    const {  } = req.body;

    // Find the student in the static array
    const listedStudents = await StudentDaoInstance.listStudents();
    if (listedStudents.length === 0) {
      // No subjects found
      return res.status(404).json({ message: "No students found" });
  }

    // Return the found student
    res.status(200).json({ message: "Students retrieved successfully", data: listedStudents });
  };

  
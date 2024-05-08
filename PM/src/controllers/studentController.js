const StudentDao = require('../dao/student-dao.js');

  exports.getStudent = (req, res) => {
    const { studentId } = req.body;

    // Find the student in the static array
    const student = StudentDao.getStudent(studentId);

    if (!student) {
        // Student not found
        return res.status(404).json({ message: "Student not found" });
    }

    // Return the found student
    res.status(200).json({ message: "Student retrieved successfully", data: student });
  };
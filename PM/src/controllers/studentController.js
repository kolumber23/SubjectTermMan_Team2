const staticStudents = [{
    studentId: 1,
    name: "Jan",
    surname: "Dvořák",
    degree: "undergraduate",
    language: "czech",
    subjectTermList: [
      1
    ]
  }];

  exports.getStudent = (req, res) => {
    const { studentId } = req.body;

    // Find the student in the static array
    const student = staticStudents.find(sub => sub.studentId === parseInt(studentId));

    if (!student) {
        // Student not found
        return res.status(404).json({ message: "Student not found" });
    }

    // Return the found student
    res.status(200).json({ message: "Student retrieved successfully", data: student });
  };
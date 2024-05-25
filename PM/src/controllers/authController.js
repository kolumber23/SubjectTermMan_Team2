const StudentDao = require('../dao/student-dao.js');
const StudentDaoInstance = new StudentDao();
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  var userID = 0;

  if (email) {
    const listedStudents = await StudentDaoInstance.listStudents();
    const currentUser = listedStudents.find(student => student.email == email)
    if (currentUser && currentUser.password == password) {
      userID = currentUser.id;
    }
  }
  if (userID) {
    // Generate a token only after successful authentication
    const token = jwt.sign(
      { userId: userID },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: "Authentication successful",
      token: token,
      userId: userID
    });
  } else {
    res.status(400).json({ error: "Authentication failed. Please check the request" });
  }
}

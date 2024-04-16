const staticSubjectTerms = [{
  subjectTermId: 1,
  subjectId: 1,
  semester: "summer 23/24",
  subjectTermStudentList: [
      "userID1",
      "userID2"
  ],
  activityList: [
    {
        activityId: 1,
        name: "homework",
        subjectTermId: 1,
        description: "just do it",
        maxScore: 100,
        minScore: 60,
        deadline: "1.6.2024",
        activityStudentList: [
          "userID1",
          "userID2"
      ]
    }
]
}];

exports.createSubjectTerm = (req, res) => {
  const { subjectId, semester, subjectTermStudentList, activityList } = req.body;
  let newSubjectTermId;
    if (staticSubjectTerms.length > 0) {
        // Retrieve the last term's Id and add 1 to it
        const lastSubjectTermId = staticSubjectTerms[staticSubjectTerms.length - 1].subjectTermId;
        newSubjectTermId = lastSubjectTermId + 1;
    } else {
        // If the array is empty, start numbering from 1
        newSubjectTermId = 1;
    }

  const newSubjectTerm = {
    subjectTermId: newSubjectTermId,
    subjectId,
    semester,
    subjectTermStudentList: subjectTermStudentList || [],
    activityList: activityList || [],
  };
  staticSubjectTerms.push(newSubjectTerm);
  
  res.status(201).json({ message: "Subject term created", data: newSubjectTerm });
};

exports.updateSubjectTerm = (req, res) => {
  const { subjectTermId, semester, subjectTermStudentList, activityList } = req.body;

  // Find the index of the subject term in the array
  const index = staticSubjectTerms.findIndex(term => term.subjectTermId === parseInt(subjectTermId));

  if (index === -1) {
      // Subject term not found
      return res.status(404).json({ message: "Subject term not found" });
  }

  // Update properties if they exist in the request
  if (semester) {
      staticSubjectTerms[index].semester = semester;
  }
  if (subjectTermStudentList) {
      staticSubjectTerms[index].subjectTermStudentList = subjectTermStudentList;
  }
  if (activityList) {
      staticSubjectTerms[index].activityList = activityList;
  }

  // Return the updated subject term
  res.status(200).json({ message: "Subject term updated", data: staticSubjectTerms[index] });
};

exports.getSubjectTerm = (req, res) => {
  const { subjectTermId } = req.params;  // Assuming the ID is passed as a URL parameter

  // Find the subject term in the array
  const subjectTerm = staticSubjectTerms.find(term => term.subjectTermId === parseInt(subjectTermId));

  if (!subjectTerm) {
      // Subject term not found
      return res.status(404).json({ message: "Subject term not found" });
  }

  // Return the found subject term
  res.status(200).json({ message: "Subject term retrieved successfully", data: subjectTerm });
};
  
exports.listSubjectTermsBySemester = (req, res) => {
  const { semester } = req.query;  // Access the semester query parameter

  // Filter the subject terms by semester
  const filteredTerms = staticSubjectTerms.filter(term => term.semester === semester);

  if (filteredTerms.length === 0) {
      // No subject terms found for the semester
      return res.status(404).json({ message: "No subject terms found for the provided semester" });
  }

  // Return the filtered subject terms
  res.status(200).json({ message: "Subject terms retrieved successfully", data: filteredTerms });
};

exports.listSubjectTermsBySubjectId = (req, res) => {
  const { subjectId } = req.query;  // Access the subjectId query parameter

  // Convert subjectId to an integer for comparison
  const subjectIdInt = parseInt(subjectId);

  // Filter the subject terms by subjectId
  const filteredTerms = staticSubjectTerms.filter(term => term.subjectId === subjectIdInt);

  if (filteredTerms.length === 0) {
      // No subject terms found for the subject ID
      return res.status(404).json({ message: "No subject terms found for the provided subject ID" });
  }

  // Return the filtered subject terms
  res.status(200).json({ message: "Subject terms retrieved successfully", data: filteredTerms });
};

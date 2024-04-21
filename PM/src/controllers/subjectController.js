const staticSubjects = [{
    subjectId: 1,
    name: "Project management",
    credits: 6,
    supervisor: "Jan Dvořák",
    goal: "learn how to manage IT projects",
    degree: "undergraduate",
    language: "czech",
    description: "basic project management principles",
    subjectTermList: [
      1
    ],
    school: "Unicorn University"
  }];
  
  exports.createSubject = (req, res) => {
    const { name, credits, supervisor, goal, degree, language, description, subjectTermList, school } = req.body;
    let newSubjectId;
      if (staticSubjects.length > 0) {
          // Retrieve the last subject's Id and add 1 to it
          const lastSubjectId = staticSubjects[staticSubjects.length - 1].subjectId;
          newSubjectId = lastSubjectId + 1;
      } else {
          // If the array is empty, start numbering from 1
          newSubjectId = 1;
      }
  
    const newSubject = {
      subjectId: newSubjectId,
      name,
      credits,
      supervisor,
      goal,
      degree,
      language,
      description,
      subjectTermList: subjectTermList || [],
      school
    };
    staticSubjects.push(newSubject);
    
    res.status(201).json({ message: "Subject created", data: newSubject });
  };

  exports.listSubjects = (req, res) => {
    // Check if there are any subjects in the array
    if (staticSubjects.length === 0) {
        // No subjects found
        return res.status(404).json({ message: "No subjects found" });
    }

    // Return all subjects in the staticSubjects array
    res.status(200).json({ message: "Subjects retrieved successfully", data: staticSubjects });
  };

  exports.getSubject = (req, res) => {
    const { subjectId } = req.query; // Assuming the ID is passed as a URL parameter
    // Find the subject in the static array
    const subject = staticSubjects.find(sub => sub.subjectId === parseInt(subjectId));

    if (!subject) {
        // Subject not found
        return res.status(404).json({ message: "Subject not found" });
    }

    // Return the found subject
    res.status(200).json({ message: "Subject retrieved successfully", data: subject });
  };






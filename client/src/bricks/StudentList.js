import React, { useState, useMemo } from "react";
import { Table, Navbar, Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import StudentDetailsModal from "./StudentDetailsModal"; // Import StudentDetailsModal component
import AddAssignmentModal from "../components/AddAssignmentModal"; // Import AddAssignmentModal component
import AddGradeModal from "../components/AddGradeModal"; // Import AddGradeModal component
import AddScoreModal from "../components/AddScoreModal"; // Import AddScoreModal component

export default function StudentList({ studentL }) {
  const [searchBy, setSearchBy] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const filteredStudentL = useMemo(() => {
    if (!studentL) return [];
    return studentL.filter((item) => {
      return (
        item.surname.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.degree.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
  }, [searchBy, studentL]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
          <Navbar.Brand style={{ fontSize: "100%" }}>
            Overview of students
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <div className="overview">
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Surname</th>
              <th>Name</th>
              <th>Degree</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudentL.map((student, index) => {
              return (
                <tr key={index}>
                  <td> {index + 1} </td>
                  <td> {student.surname} </td>
                  <td> {student.name} </td>
                  <td> {student.degree} </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleStudentClick(student)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* Render StudentDetailsModal if a student is selected */}
      {selectedStudent && (
        <StudentDetailsModal
          show={!!selectedStudent}
          onHide={() => setSelectedStudent(null)}
          studentDetails={selectedStudent}
          onAddAssignment={() => setShowAssignmentModal(true)}
          onAddGrade={() => setShowGradeModal(true)}
          onAddScore={() => setShowScoreModal(true)}
        />
      )}

      {/* Render AddAssignmentModal */}
      <AddAssignmentModal
        show={showAssignmentModal}
        onHide={() => setShowAssignmentModal(false)}
      />

      {/* Render AddGradeModal */}
      <AddGradeModal
        show={showGradeModal}
        onHide={() => setShowGradeModal(false)}
      />

      {/* Render AddScoreModal */}
      <AddScoreModal
        show={showScoreModal}
        onHide={() => setShowScoreModal(false)}
      />
    </div>
  );
}

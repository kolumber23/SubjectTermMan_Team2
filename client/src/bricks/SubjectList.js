// SubjectList.js
import React, { useState, useMemo } from "react";
import { Table, Navbar, Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify, mdiChevronRight } from "@mdi/js";
// Remove unused import statement for Link
// import { Link, useNavigate } from "react-router-dom";

import "../styles/styles.css"; // Corrected import statement

export default function SubjectList({ subjectL }) {
  const [searchBy, setSearchBy] = useState("");
  // Remove unused hook
  // const navigate = useNavigate(); 

  const filteredSubjectL = useMemo(() => {
    const filteredList = subjectL.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.supervisor.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.goal.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
    return filteredList;
  }, [searchBy, subjectL]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  // Function to open subject details
  const openSubjectDetails = (subjectId) => {
    // Remove navigate function as it's not used
    // navigate(`/subject-details/${subjectId}`);
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
          <Navbar.Brand style={{ fontSize: "100%" }}>
            Overview of subjects
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
              <th>ID</th>
              <th>Subject</th>
              <th>Credits</th>
              <th>Supervisor</th>
              <th>Goal</th>
              <th>Details</th> {/* New column for details */}
            </tr>
          </thead>
          <tbody>
            {filteredSubjectL.map((subject, index) => {
              return (
                <tr key={index}>
                  <td> {subject.subjectId} </td>
                  <td> {subject.name} </td>
                  <td> {subject.credits} </td>
                  <td> {subject.supervisor} </td>
                  <td> {subject.goal} </td>
                  <td>
                    {/* Button to open subject details */}
                    <button
                      onClick={() => openSubjectDetails(subject.subjectId)}
                      className="details-button"
                    >
                      <Icon size={1} path={mdiChevronRight} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

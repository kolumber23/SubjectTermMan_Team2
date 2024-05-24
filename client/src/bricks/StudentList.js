import React, { useState, useMemo, useContext } from "react";
import { Table, Navbar, Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import UserContext from "../AuthProvider";

import styles from "../styles/styles.css";
import StudentDetail from "./StudentDetail";

export default function StudentList ({ studentL }) {
  const { user, isEnrolled } = useContext(UserContext);
  const [searchBy, setSearchBy] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const filteredStudentL = useMemo(() => {
    let filteredList = studentL.filter((item) => {
      return (
        item.surname.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.degree.toLowerCase().includes(searchBy.toLowerCase())
      );
    });

    if (sortBy) {
      filteredList.sort((a, b) => {
        const x = a[sortBy].toLowerCase();
        const y = b[sortBy].toLowerCase();

        if (x < y) return sortDirection === "asc" ? -1 : 1;
        if (x > y) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredList;
  }, [searchBy, sortBy, sortDirection, studentL]);

  function handleSearch(event) { 
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  };

  function handleSearchDelete(event) {   
    if (!event.target.value) setSearchBy(""); 
  };

  function handleSort(sortKey) {
    if (sortKey === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortKey);
      setSortDirection("asc");
    }
  };

return (

<div>
  <Navbar collapseOnSelect expand="sm" bg="light">
    <div className="container-fluid">
      <Navbar.Brand style={{fontSize: "100%"}}>Overview of students</Navbar.Brand>
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
            variant="outline-primary"
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
      <th onClick={() => handleSort("surname")}>Surname</th>
      <th onClick={() => handleSort("name")}>Name</th>
      <th onClick={() => handleSort("degree")}>Degree</th>
    {user && user.id && !((user.id.startsWith("st")) && (!isEnrolled)) && (
      <th> Detail </th>
    )}
    </tr>
  </thead>
  <tbody>
    {filteredStudentL.map((student, index) => (
      <tr key={index}>
        <td> {index + 1} </td>
        <td> {student.surname} </td>
        <td> {student.name} </td>
        <td> {student.degree} </td>
      {user && user.id && !((user.id.startsWith("st")) && (!isEnrolled)) && (
        <td>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setSelectedStudent(student)}
          >
            {"<"} 
          </Button>
        </td>
      )}
      </tr>
    ))}
  </tbody>
</Table>

{selectedStudent && (
  <StudentDetail
    selectedStudent={selectedStudent}
    onClose={() => setSelectedStudent(null)}
  />
)}
</div>
</div>
);
};
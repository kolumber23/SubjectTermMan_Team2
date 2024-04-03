import React, { useState, useMemo } from "react";
import { Table, Navbar, Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import styles from "../styles/styles.css";

export default function StudentList ({ studentL }) {
  const [searchBy, setSearchBy] = useState("");

  const filteredStudentL = useMemo(() => {
    const filteredList = studentL.filter((item) => {
      return (
        item.surname.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.degree.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
    return filteredList;
  }, [searchBy, studentL]);

  function handleSearch(event) { 
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  };

  function handleSearchDelete(event) {   
    if (!event.target.value) setSearchBy(""); 
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
        </tr>  
      );
    })}
  </tbody>
</Table>
  </div>
</div>
);
};
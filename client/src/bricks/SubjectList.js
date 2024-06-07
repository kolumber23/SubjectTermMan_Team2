import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Navbar, Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify, mdiPlus } from "@mdi/js";
import AddSubject from "./AddSubject";
import UserContext from "../AuthProvider";


import styles from "../styles/styles.css";

export default function SubjectList ({ subjectL, subjectTermL, activityL, createSubject }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [searchBy, setSearchBy] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddSubject = (newSubject) => {
    createSubject(newSubject)
    setShow(false);
  };

  const handleSubjectClick = (selectedSubject) => {
    navigate(`/subjDetail/${selectedSubject.id}`, {state: {selectedSubject, subjectTermL, activityL}});
  };

  const filteredSubjectL = useMemo(() => {
    const filteredList = subjectL.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.supervisor.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.goal.toLowerCase().includes(searchBy.toLowerCase())
      );
    });

    if (sortBy) {
      filteredList.sort((a, b) => {
        const x = sortBy === 'credits' ? a[sortBy] : a[sortBy].toLowerCase();
        const y = sortBy === 'credits' ? b[sortBy] : b[sortBy].toLowerCase();
    
        if (sortBy === 'credits') {
          return sortDirection === 'asc' ? x - y : y - x;
        } else {
          if (x < y) return sortDirection === 'asc' ? -1 : 1;
          if (x > y) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        }
      });
    };

    return filteredList;
  }, [searchBy, sortBy, sortDirection, subjectL]);

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
console.log(user);
return (

<div>
    <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
            <Navbar.Brand style={{fontSize: "100%"}}>Overview of subjects</Navbar.Brand>
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
                {user?.id?.startsWith("ad") && (
                <Button
                  style={{ marginRight: "8px" }}
                  variant="success"
                  onClick={handleOpen}
                >
                <Icon size={1} path={mdiPlus} />
                </Button>
                 )}
              </Form>         
            </Navbar.Collapse> 
        </div>
    </Navbar>
    
<div className="overview">
<Table striped bordered>
  <thead>
    <tr>
      <th onClick={() => handleSort("name")}>Subject</th>
      <th onClick={() => handleSort("credits")}>Credits</th>
      <th onClick={() => handleSort("degree")}>Degree</th>
      <th onClick={() => handleSort("supervisor")}>Supervisor</th>
      <th onClick={() => handleSort("goal")}>Goal</th>
      <th>Detail</th>
    </tr>
  </thead>
  <tbody>
    {filteredSubjectL.map((subject, index) => {
      return (
        <tr key={index}>
          <td style={{ textAlign: "left" }}> {subject.name} </td>
          <td> {subject.credits} </td>
          <td> {subject.degree} </td>
          <td> {subject.supervisor} </td>
          <td style={{ textAlign: "left" }}> {subject.goal} </td>
          <td> 
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => handleSubjectClick(subject)}
            >
              {"<"} 
            </Button>         
          </td>
        </tr>  
      );
    })}
  </tbody>
</Table>
<AddSubject
  show={show}
  handleClose={handleClose}
  addSubject={handleAddSubject}
/>
  </div>
</div>
);
};
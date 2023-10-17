import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";

const DefHeader = () => {
  return (
    <header>
      <Nav >
        <Navbar />
      </Nav>
    </header>
  );
};

export default DefHeader;

const Nav = styled.nav`
  background-color: #4B525C;
  padding: 70px 0;

  @media screen and (max-width: 767px) {
    padding: 40px 0;
  }
`;

// 412*883 1500-1600
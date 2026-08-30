import React from "react";
import {  Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const BoxComponent = ({ name, imageUrl }) => (
  <Col lg={4} md={6} sm={12} className="align-items-center p-4">
    <div className="box" style={{ backgroundColor: 'white' }}>
      <div>
        <Image
          src={imageUrl}
          alt={`Logo for ${name}`}
          height="70px"
          
        />
      </div>
      <h3 className="profile-name">{name}</h3>
    </div>
  </Col>
);
export default BoxComponent
import React, { Fragment, useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const ServicesList = () => {
  const [services, setServices] = useState([]);

  const loadServices = async () => {
    await fetch("http://localhost:5000/api/services")
      .then((response) => response.json())
      .then((data) => {
        setServices(data.services);
      });
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <Fragment>
      <Container>
        <h2>Our Services</h2>
        <Row>
          {services.map((service) => {
            return (
              <Col sm key={service._id}>
                <Card className="text-center mb-3 shadow-sm p-3 bg-body rounded" border="primary">
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    <Card.Text>{service.price}</Card.Text>
                    <Button href={`/reservations?serviceId=${service._id}`}>Reserve now</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
};

export default ServicesList;

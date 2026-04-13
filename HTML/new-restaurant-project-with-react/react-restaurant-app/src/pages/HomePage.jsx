import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero-section text-center text-white d-flex align-items-center"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/hero-bg.jpg') center/cover no-repeat",
          minHeight: '80vh'
        }}
      >
        <Container>
          <Row>
            <Col>
              <h1 className="display-2 mb-3" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Coffee Haven
              </h1>
              <p className="lead mb-4 fs-3">
                Experience the perfect blend of warmth, aroma, and tradition.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button
                  tag={Link}
                  to="/menu"
                  color="warning"
                  size="lg"
                  className="px-4 text-dark font-weight-bold"
                >
                  View Menu
                </Button>
                <Button
                  tag={Link}
                  to="/reservations"
                  color="outline-light"
                  size="lg"
                  className="px-4"
                >
                  Book a Table
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Section / About */}
      <Container className="py-5 text-center">
        <Row className="py-5 justify-content-center">
          <Col md={8}>
            <h2 className="mb-4">Crafted with Passion</h2>
            <p className="text-muted fs-5">
              From our signature Cloud Macchiato to our hand-flaked Spain Croissants,
              every item at Coffee Haven is prepared with the finest ingredients and
              a touch of morning dew inspiration.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <div className="p-4 border rounded shadow-sm bg-light">
              <i className="fas fa-coffee fa-3x mb-3 text-warning"></i>
              <h3>Fresh Brew</h3>
              <p>Premium beans roasted daily to perfection.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 border rounded shadow-sm bg-light">
              <i className="fas fa-utensils fa-3x mb-3 text-warning"></i>
              <h3>Artisan Pastry</h3>
              <p>Sweet and savory treats baked fresh every morning.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 border rounded shadow-sm bg-light">
              <i className="fas fa-users fa-3x mb-3 text-warning"></i>
              <h3>Cozy Space</h3>
              <p>The perfect atmosphere for work or relaxation.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;

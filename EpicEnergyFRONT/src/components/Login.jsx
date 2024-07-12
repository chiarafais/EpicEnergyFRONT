import { useState } from "react";
import { Button, Col, Form, Container, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [roken, setToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError("");
        throw new Error(errorData.message || "Errore durante il login");
      }

      const data = await response.json();
      localStorage.setItem("token", data.tokenId);
      console.log("Login effetuato: " + data.tokenId);
      setError("");
      navigate("/main");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex align-items-center vh-100 backgroundYellow">
      <Container className="mb-5 pb-5">
        <Row className="justify-content-md-center">
          <Col md="4">
            <h2 className="text-center">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="lablelRegistrati">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Inserisci email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="lablelRegistrati">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-2">
                Accedi
              </Button>
            </Form>
            <div className="text-center">
              <small className="d-block text-white">oppure</small>
              <Link to={"/register"} className="registrati">
                Registrati
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

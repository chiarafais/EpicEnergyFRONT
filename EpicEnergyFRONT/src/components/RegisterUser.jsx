import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/auth/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore durante la registrazione");
      }

      console.log("Registrazione effettuata");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex align-items-center vh-100 backgroundYellow2">
      <Container className="mb-5 pb-5">
        <Row className="justify-content-md-center">
          <Col md="4">
            <h2 className="text-center">Registrazione</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className="lablelRegistrati">Nome:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Inserisci il tuo nome"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="lablelRegistrati">Cognome:</Form.Label>
                <Form.Control
                  type="text"
                  value={surname}
                  placeholder="Inserisci il cognome"
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="lablelRegistrati">Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  placeholder="Scegli un username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="lablelRegistrati">Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Inserisci email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="lablelRegistrati">Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Scegli una password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2 registratiButton">
                Registrati
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterUser;

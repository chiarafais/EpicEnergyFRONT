import { useEffect, useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";

const Mainpage = () => {
  const [show, setShow] = useState(false);

  const [token, setToken] = useState(null);
  const [customer, setCustomer] = useState([]);
  const [filter, setFilter] = useState("name");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const localeToken = localStorage.getItem("token");
    setToken(localeToken);
  }, []);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        let url = `http://localhost:3001/api/customers/${filter}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "");
        }

        const data = await response.json();
        setCustomer(data.content);
        console.log("Customers: ", data);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      getCustomer();
    }
  }, [token, filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCustomers = async () => {
    try {
      let url = `http://localhost:3001/api/customers`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "");
      }

      const data = await response.json();
      setCustomer(data.content);
      console.log("Customers: ", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form>
        <Form.Group controlId="filterSelect">
          <Form.Label>Filter for</Form.Label>
          <Form.Control
            as="select"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="name">Name</option>
            <option value="turnover">Annual Turnover</option>
            <option value="date">Insertion Date</option>
            <option value="lastcontact">Last Contact Date</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Table striped bordered hover className="tableFont">
        <thead>
          <tr>
            <th>#</th>
            <th>businessName</th>
            <th>vatNumber</th>
            <th>email</th>
            <th>insertionDate</th>
            <th>dateLastContact</th>
            <th>annualTurnover</th>
            <th>pecCustomer</th>
            <th>telCustomer</th>
            <th>emailContact</th>
            <th>nameContact</th>
            <th>surnameContact</th>
            <th>telContact</th>
            <th>logoAgency</th>
            <th>clientType</th>
          </tr>
        </thead>
        <tbody>
          {customer.map((allCustomer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{allCustomer.businessName}</td>
              <td>{allCustomer.vatNumber}</td>
              <td>{allCustomer.email}</td>
              <td>{allCustomer.insertionDate}</td>
              <td>{allCustomer.dateLastContact}</td>
              <td>{allCustomer.annualTurnover}</td>
              <td>{allCustomer.pecCustomer}</td>
              <td>{allCustomer.telCustomer}</td>
              <td>{allCustomer.emailContact}</td>
              <td>{allCustomer.nameContact}</td>
              <td>{allCustomer.surnameContact}</td>
              <td>{allCustomer.telContact}</td>
              <td>{allCustomer.logoAgency}</td>
              <td>{allCustomer.clientType}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleShow}>
        New customer
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cognome:</Form.Label>
              <Form.Control
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Registrati
            </Button>
          </Form>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(handleClose, handleCustomers)}>
            Save Customers
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Mainpage;

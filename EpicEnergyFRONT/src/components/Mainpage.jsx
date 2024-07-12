import { useEffect, useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Mainpage = () => {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(null);
  const [customer, setCustomer] = useState([]);
  const [filter, setFilter] = useState("name");

  const [businessName, setBusinessName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateLastContact, setDateLastContact] = useState("");
  const [annualTurnover, setAnnualTurnover] = useState("");
  const [customerPec, setCustomerPec] = useState("");
  const [telCustomer, setTelCustomer] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [nameContact, setNameContact] = useState("");
  const [surnameContact, setSurnameContact] = useState("");
  const [telContact, setTelContact] = useState("");
  const [logoAgency, setLogoAgency] = useState("");
  const [clientType, setClientType] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const localeToken = localStorage.getItem("token");
    setToken(localeToken);
  }, []);

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
  useEffect(() => {
    if (token) {
      getCustomer();
    }
  }, [token, filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCustomers = async (e) => {
    e.preventDefault();
    try {
      let url = `http://localhost:3001/api/customers`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          businessName,
          vatNumber,
          email,
          dateLastContact,
          annualTurnover,
          customerPec,
          telCustomer,
          emailContact,
          nameContact,
          surnameContact,
          telContact,
          logoAgency,
          clientType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "");
      }

      const data = await response.json();
      setCustomer(data.content);
      console.log("Customers: ", data);
      getCustomer();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="backgroundYellow3">
        <Container>
          <Form className="pt-3 mb-3">
            <Form.Group controlId="filterSelect">
              <Container fluid>
                <Row className="align-items-center">
                  <Col xs={4} className="d-flex align-items-center p-0">
                    <Form.Label className="w-100 text-center m-0">
                      Filtra per{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-arrow-right-square-fill mx-3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                      </svg>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={filter}
                      onChange={handleFilterChange}
                      className="filterByButton"
                    >
                      <option value="name">Business Name</option>
                      <option value="turnover">Annual Turnover</option>
                      <option value="date">Insertion Date</option>
                      <option value="lastcontact">Last Contact Date</option>
                    </Form.Control>
                  </Col>
                  <Col xs={8} className="text-end p-0">
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      className="newCustomerButton"
                    >
                      Nuovo Cliente
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form.Group>
          </Form>
          <div className="divContainerTable text-center">
            <Table striped bordered hover className="tableFont">
              <thead>
                <tr>
                  <th>#</th>
                  <th>BusinessName</th>
                  <th>VatNumber</th>
                  <th>Email</th>
                  <th>InsertionDate</th>
                  <th>DateLastContact</th>
                  <th>AnnualTurnover</th>
                  <th>PecCustomer</th>
                  <th>TelCustomer</th>
                  <th>EmailContact</th>
                  <th>NameContact</th>
                  <th>SurnameContact</th>
                  <th>TelContact</th>
                  <th>LogoAgency</th>
                  <th>ClientType</th>
                </tr>
              </thead>
              <tbody>
                {customer &&
                  customer.map((allCustomer, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{allCustomer.businessName}</td>
                      <td>{allCustomer.vatNumber}</td>
                      <td>{allCustomer.email}</td>
                      <td>{allCustomer.insertionDate}</td>
                      <td>{allCustomer.dateLastContact}</td>
                      <td>{allCustomer.annualTurnover}</td>
                      <td>{allCustomer.customerPec}</td>
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

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Inserisci i dati di un nuovo cliente</Modal.Title>
              </Modal.Header>
              <Modal.Footer className="d-block pt-0">
                <Form onSubmit={handleCustomers}>
                  <Form.Group>
                    <Form.Label>Business Name:</Form.Label>
                    <Form.Control
                      type="text"
                      value={businessName}
                      placeholder="Inserisci il nome dell'azienda"
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Vat Number:</Form.Label>
                    <Form.Control
                      type="text"
                      value={vatNumber}
                      placeholder="Inserisci la p.IVA"
                      onChange={(e) => setVatNumber(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      placeholder="Inserisci l'email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Date Last Contact:</Form.Label>
                    <Form.Control
                      type="date"
                      value={dateLastContact}
                      onChange={(e) => setDateLastContact(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Annual Turnover:</Form.Label>
                    <Form.Control
                      type="number"
                      value={annualTurnover}
                      placeholder="Inserisci fatturato annuale"
                      onChange={(e) => setAnnualTurnover(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Pec Customer:</Form.Label>
                    <Form.Control
                      type="email"
                      value={customerPec}
                      placeholder="Inserisci la pec"
                      onChange={(e) => setCustomerPec(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tel Customer:</Form.Label>
                    <Form.Control
                      type="number"
                      value={telCustomer}
                      placeholder="Inserisci il numero di telefono"
                      onChange={(e) => setTelCustomer(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email Contact:</Form.Label>
                    <Form.Control
                      type="email"
                      value={emailContact}
                      onChange={(e) => setEmailContact(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Name Contact:</Form.Label>
                    <Form.Control
                      type="text"
                      value={nameContact}
                      onChange={(e) => setNameContact(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Surname Contact:</Form.Label>
                    <Form.Control
                      type="text"
                      value={surnameContact}
                      onChange={(e) => setSurnameContact(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tel Contact:</Form.Label>
                    <Form.Control
                      type="number"
                      value={telContact}
                      onChange={(e) => setTelContact(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Logo Agency:</Form.Label>
                    <Form.Control
                      type="text"
                      value={logoAgency}
                      placeholder="Inserisci logo dell'azienda"
                      onChange={(e) => setLogoAgency(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Client Type:</Form.Label>
                    <Form.Control
                      type="text"
                      value={clientType}
                      placeholder="Inserisci il tipo PA/SAS/SRL/SPA"
                      onChange={(e) => setClientType(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className="divButtonModal">
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      className="closeCustomerButtonModal"
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleClose}
                      className="saveCustomerButtonModal"
                    >
                      Save Customers
                    </Button>
                  </div>
                </Form>
              </Modal.Footer>
            </Modal>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Mainpage;

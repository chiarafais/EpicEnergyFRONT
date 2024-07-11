import { useEffect, useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";

const Mainpage = () => {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(null);
  const [customer, setCustomer] = useState([]);
  const [filter, setFilter] = useState("name");

  const [businessName, setBusinessName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [email, setEmail] = useState("");
  const [insertionDate, setInsertionDate] = useState("");
  const [dateLastContact, setDateLastContact] = useState("");
  const [annualTurnover, setAnnualTurnover] = useState("");
  const [pecCustomer, setPecCustomer] = useState("");
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
        body: JSON.stringify({
          businessName,
          vatNumber,
          email,
          insertionDate,
          dateLastContact,
          annualTurnover,
          pecCustomer,
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="d-flex">
        <Form>
          <Form.Group controlId="filterSelect">
            <Form.Label className="m-3">Filter for</Form.Label>
            <Form.Control as="select" value={filter} onChange={handleFilterChange}>
              <option value="name">Name</option>
              <option value="turnover">Annual Turnover</option>
              <option value="date">Insertion Date</option>
              <option value="lastcontact">Last Contact Date</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="divContainerTable">
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
            <Form onSubmit={handleCustomers}>
              <Form.Group>
                <Form.Label>Business Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Vat Number:</Form.Label>
                <Form.Control type="number" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Insertion Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={insertionDate}
                  onChange={(e) => setInsertionDate(e.target.value)}
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
                  onChange={(e) => setAnnualTurnover(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Pec Customer:</Form.Label>
                <Form.Control
                  type="email"
                  value={pecCustomer}
                  onChange={(e) => setPecCustomer(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tel Customer:</Form.Label>
                <Form.Control
                  type="number"
                  value={telCustomer}
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
                <Form.Control type="text" value={logoAgency} onChange={(e) => setLogoAgency(e.target.value)} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Client Type:</Form.Label>
                <Form.Control type="text" value={clientType} onChange={(e) => setClientType(e.target.value)} required />
              </Form.Group>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleCustomers}>
                Save Customers
              </Button>
            </Form>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Mainpage;

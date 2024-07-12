import { useEffect, useState } from "react";
import { Button, Container, Modal, Spinner, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Customer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(customer);

  useEffect(() => {
    const localeToken = localStorage.getItem("token");
    setToken(localeToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchCustomer();
    }
  }, [token]);

  const fetchCustomer = async () => {
    try {
      let url = `http://localhost:3001/api/customers/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "");
      }

      const data = await response.json();
      setCustomer(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCustomer = async () => {
    try {
      let url = `http://localhost:3001/api/customers/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete customer.");
      }

      navigate("/main");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-5">
      {customer ? (
        <>
          <Table striped bordered hover>
            <div className="d-flex space-between">
              <h1 className="text-white">DETTAGLI CLIENTE</h1>
              <Button
                variant="primary"
                onClick={() => navigate("/main")}
                className="ms-3"
              >
                Torna indietro
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate(`/invoice/${customer.id}`)}
                className="ms-3"
              >
                Vedi Fatture
              </Button>
            </div>
            <tbody>
              <tr>
                <td>
                  <strong>Business Name</strong>
                </td>
                <td>{customer.businessName}</td>
              </tr>
              <tr>
                <td>
                  <strong>Client Type</strong>
                </td>
                <td>{customer.clientType}</td>
              </tr>
              <tr>
                <td>
                  <strong>Date Last Contact</strong>
                </td>
                <td>{customer.dateLastContact}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email</strong>
                </td>
                <td>{customer.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email Contact</strong>
                </td>
                <td>{customer.emailContact}</td>
              </tr>
              <tr>
                <td>
                  <strong>Name Contact</strong>
                </td>
                <td>{customer.nameContact}</td>
              </tr>
              <tr>
                <td>
                  <strong>PEC Customer</strong>
                </td>
                <td>{customer.pecCustomer}</td>
              </tr>
              <tr>
                <td>
                  <strong>Surname Contact</strong>
                </td>
                <td>{customer.surnameContact}</td>
              </tr>
              <tr>
                <td>
                  <strong>Telephone Contact</strong>
                </td>
                <td>{customer.telContact}</td>
              </tr>
              <tr>
                <td>
                  <strong>Telephone Customer</strong>
                </td>
                <td>{customer.telCustomer}</td>
              </tr>
              <tr>
                <td>
                  <strong>Annual Turnover</strong>
                </td>
                <td>{customer.annualTurnover}</td>
              </tr>
              <tr>
                <td>
                  <strong>Insertion Date</strong>
                </td>
                <td>{customer.insertionDate}</td>
              </tr>
              <tr>
                <td>
                  <strong>Logo Agency</strong>
                </td>
                <td>{customer.logoAgency}</td>
              </tr>
              <tr>
                <td>
                  <strong>Logo Agency</strong>
                </td>
                <td>{customer.logoAgency}</td>
              </tr>
              <tr>
                <td>
                  <div className="">
                    <Button variant="danger" onClick={handleShow} className="">
                      DeleteClient
                    </Button>
                  </div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>
                Sicuro di voler eliminare questo cliente?
              </Modal.Title>
            </Modal.Header>
            <div className="p-2">
              <Button
                variant="danger"
                onClick={deleteCustomer}
                className="me-2"
              >
                Delete
              </Button>
              <Button
                variant="primary"
                onClick={handleClose}
                className="saveCustomerButtonModal"
              >
                Close
              </Button>
            </div>
          </Modal>
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
};

export default Customer;

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
              <h1 className="text-white">Dettagli cliente</h1>
              <Button variant="primary" onClick={() => navigate("/main")} className="ms-3 buttonTornaIndietro">
                Torna indietro
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
                  <strong className="textColorGray">Client Type</strong>
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
                  <strong className="textColorGray">Email</strong>
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
                  <strong className="textColorGray">Name Contact</strong>
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
                  <strong className="textColorGray">Surname Contact</strong>
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
                  <strong className="textColorGray">Telephone Customer</strong>
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
                  <strong className="textColorGray">Insertion Date</strong>
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
                  <strong className="textColorGray">Client Type</strong>
                </td>
                <td>{customer.clientType}</td>
              </tr>
              <tr>
                <td>
                  <div className=""></div>
                </td>
                <td className="changePositionButton">
                  <Button variant="danger" onClick={handleShow} className="deleteClientButton">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      className="bi bi-trash3 mx-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    Elimina cliente
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Sicuro di voler eliminare questo cliente?</Modal.Title>
            </Modal.Header>
            <div className="p-2">
              <Button variant="danger" onClick={deleteCustomer} className="me-2">
                Delete
              </Button>
              <Button variant="primary" onClick={handleClose} className="saveCustomerButtonModal">
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

import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [token, setToken] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [invoice_date, setInvoice_date] = useState("");
  const [import_invoice, setImport_invoice] = useState("");
  const [number_invoice, setNumber_invoice] = useState("");
  const [customer_id, setCustomer_id] = useState(id);
  const [name_status, setName_status] = useState("");

  console.log(invoice);

  useEffect(() => {
    const localeToken = localStorage.getItem("token");
    setToken(localeToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchInvoice();
    }
  }, [token]);

  const fetchInvoice = async () => {
    try {
      let url = `http://localhost:3001/api/invoices/customer/${id}`;
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
      setInvoice(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInvoices = async (e) => {
    e.preventDefault();
    try {
      let url = `http://localhost:3001/api/invoices`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          invoice_date,
          import_invoice,
          number_invoice,
          customer_id,
          name_status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "");
      }

      const data = await response.json();
      setInvoice(data.content);
      console.log("Customers: ", data);
      fetchInvoice();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Invoice
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInvoices}>
            <Form.Group>
              <Form.Label>Invoice Date:</Form.Label>
              <Form.Control
                type="date"
                value={invoice_date}
                onChange={(e) => setInvoice_date(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Import Invoice:</Form.Label>
              <Form.Control
                type="number"
                value={import_invoice}
                onChange={(e) => setImport_invoice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Number Invoice:</Form.Label>
              <Form.Control
                type="number"
                value={number_invoice}
                onChange={(e) => setNumber_invoice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Name Status:</Form.Label>
              <Form.Control
                type="text"
                value={name_status}
                onChange={(e) => setName_status(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Invoice;

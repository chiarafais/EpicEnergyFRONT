import { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Table } from "react-bootstrap"
import { useParams } from "react-router-dom"

const Invoice = () => {
  const { id } = useParams()
  const [invoice, setInvoice] = useState(null)
  const [token, setToken] = useState(null)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [invoice_date, setInvoice_date] = useState("")
  const [import_invoice, setImport_invoice] = useState("")
  const [number_invoice, setNumber_invoice] = useState("")
  const [customer_id, setCustomer_id] = useState(id)
  const [name_status, setName_status] = useState("")

  console.log(invoice)

  useEffect(() => {
    const localeToken = localStorage.getItem("token")
    setToken(localeToken)
  }, [])

  useEffect(() => {
    if (token) {
      fetchInvoice()
    }
  }, [token])

  const fetchInvoice = async () => {
    try {
      let url = `http://localhost:3001/api/invoices/customer/${id}`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "")
      }

      const data = await response.json()
      setInvoice(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleInvoices = async (e) => {
    e.preventDefault()
    try {
      let url = `http://localhost:3001/api/invoices`
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
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "")
      }

      const data = await response.json()
      setInvoice(data.content)
      console.log("Customers: ", data)
      fetchInvoice()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Container>
        <Button variant='primary' onClick={handleShow} className='nuovaFatturaButton'>
          Nuova fattura
        </Button>
        {invoice && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Importo fattura</th>
                <th>Data fattura</th>
                <th>Numero fattura</th>
                <th>Stato fattura</th>
              </tr>
            </thead>
            <tbody>
              {invoice.map((inv, index) => (
                <tr key={index}>
                  <td>{inv.importInvoice}</td>
                  <td>{inv.invoiceDate}</td>
                  <td>{inv.numberInvoice}</td>
                  <td>{inv.invoiceState.statusName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleInvoices}>
              <Form.Group>
                <Form.Label>Invoice Date:</Form.Label>
                <Form.Control
                  type='date'
                  value={invoice_date}
                  placeholder='Inserisci data fattura'
                  onChange={(e) => setInvoice_date(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Import Invoice:</Form.Label>
                <Form.Control
                  type='number'
                  value={import_invoice}
                  placeholder='Inserisci importo fattura'
                  onChange={(e) => setImport_invoice(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number Invoice:</Form.Label>
                <Form.Control
                  type='number'
                  value={number_invoice}
                  placeholder='Inserisci numero fattura'
                  onChange={(e) => setNumber_invoice(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name Status:</Form.Label>
                <Form.Control
                  type='text'
                  value={name_status}
                  placeholder='Inserisci stato fattura'
                  onChange={(e) => setName_status(e.target.value)}
                  required
                />
              </Form.Group>
              <div className='my-3'>
                <Button variant='dark' className='mx-3' onClick={handleClose}>
                  Chiudi
                </Button>
                <Button variant='primary' type='submit' className='buttonSalvaFattura'>
                  Salva Fattura
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  )
}

export default Invoice

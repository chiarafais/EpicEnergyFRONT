import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [token, setToken] = useState(null);
  //   const [invoice_date, setInvoice_date] = useState("");
  //   const [import_invoice, setInvoice_date] = useState("");
  //   const [number_invoice, setInvoice_date] = useState("");
  //   const [customer_id, setInvoice_date] = useState("");
  //   const [name_status, setInvoice_date] = useState("");

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
  return <div>Invoice</div>;
};

export default Invoice;

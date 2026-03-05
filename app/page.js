"use client";

import { useState, useEffect, useRef } from "react";


export default function Home() {

  const [couriers, setCouriers] = useState([]);
  const [partySuggestions, setPartySuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [data, setData] = useState({
    date: "",
    challanNo: "",
    senderName: "",
    receiverName: "",
    address: "",
    weight: "0.100 GM",
    amount: "",
    status: "Cash",
    transportMode: "Surface"
  });

  const challanRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const destinationRef = useRef();
  const weightRef = useRef();
  const amountRef = useRef();
  const statusRef = useRef();
  const modeRef = useRef();

  const inputStyle = {
    height: 40,
    padding: "8px",
    border: "1px solid #374151",
    borderRadius: "6px",
    fontSize: "14px",
    background: "#0f172a",
    color: "#e5e7eb"
  };

  async function submit(e) {
    e.preventDefault();

    await fetch("/api/add-courier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    await loadCouriers();

    setData({
      date: "",
      challanNo: "",
      senderName: "",
      receiverName: "",
      address: "",
      weight: "0.100 GM",
      amount: "",
      status: "Cash",
      transportMode: "Surface"
    });

    fromRef.current.focus();
  }

  async function deleteCourier(id) {
    await fetch(`/api/delete-courier/${id}`, {
      method: "DELETE"
    });

    loadCouriers();
  }

  async function loadCouriers() {
    const res = await fetch("/api/couriers");
    const data = await res.json();
    setCouriers(data);
  }

  async function loadSuggestions() {
    const res = await fetch("/api/suggestions");
    const data = await res.json();

    setPartySuggestions(data.parties);
    setDestinationSuggestions(data.destinations);
  }

  useEffect(() => {
    loadCouriers();
    loadSuggestions();
  }, []);

  return (

    <div className="container">

      <div className="formCard">

        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Courier Entry
        </h2>

        <form
          onSubmit={submit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12
          }}
        >

          <input
            style={inputStyle}
            type="date"
            value={data.date}
            onChange={e => setData({ ...data, date: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && challanRef.current.focus()}
          />

          <input
            ref={challanRef}
            style={inputStyle}
            placeholder="Challan No (optional)"
            value={data.challanNo}
            onChange={e => setData({ ...data, challanNo: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && fromRef.current.focus()}
          />

          <input
            ref={fromRef}
            style={inputStyle}
            list="partyList"
            placeholder="From Party"
            value={data.senderName}
            onChange={e => setData({ ...data, senderName: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && toRef.current.focus()}
          />

          <datalist id="partyList">
            {partySuggestions.map((p, i) => (
              <option key={i} value={p} />
            ))}
          </datalist>

          <input
            ref={toRef}
            style={inputStyle}
            placeholder="To Party"
            value={data.receiverName}
            onChange={e => setData({ ...data, receiverName: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && destinationRef.current.focus()}
          />

          <input
            ref={destinationRef}
            style={inputStyle}
            list="destinationList"
            placeholder="Destination"
            value={data.address}
            onChange={e => setData({ ...data, address: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && weightRef.current.focus()}
          />

          <datalist id="destinationList">
            {destinationSuggestions.map((d, i) => (
              <option key={i} value={d} />
            ))}
          </datalist>

          <input
            ref={weightRef}
            style={inputStyle}
            placeholder="Weight"
            value={data.weight}
            onChange={e => setData({ ...data, weight: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && amountRef.current.focus()}
          />

          <input
            ref={amountRef}
            style={inputStyle}
            placeholder="Amount"
            value={data.amount}
            onChange={e => setData({ ...data, amount: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && statusRef.current.focus()}
          />

          <select
            ref={statusRef}
            style={inputStyle}
            value={data.status}
            onChange={e => setData({ ...data, status: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && modeRef.current.focus()}
          >
            <option>Cash</option>
            <option>Account</option>
          </select>

          <select
            ref={modeRef}
            style={inputStyle}
            value={data.transportMode}
            onChange={e => setData({ ...data, transportMode: e.target.value })}
          >
            <option>Surface</option>
            <option>Air</option>
            <option>Cargo</option>
            <option>V Fast</option>
          </select>

          <button className="addBtn" type="submit">
            Add Courier
          </button>

        </form>

        <br />

        <a href="/api/export-excel">
          <button className="excelBtn">
            Download Excel
          </button>
        </a>

      </div>

      <h2 style={{ marginTop: 40 }}>Courier List</h2>

      <table border="1" cellPadding="8">

        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Date</th>
            <th>Challan No.</th>
            <th>From Party</th>
            <th>To Party</th>
            <th>Weight</th>
            <th>Destination</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Mode</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {couriers.map((c, index) => (

            <tr key={c._id}>

              <td>{index + 1}</td>

              <td>
                {c.date ? new Date(c.date).toLocaleDateString() : ""}
              </td>

              <td>{c.challanNo}</td>

              <td>{c.senderName}</td>

              <td>{c.receiverName}</td>

              <td>{c.weight}</td>

              <td>{c.address}</td>

              <td>{c.amount}</td>

              <td>{c.status}</td>

              <td>{c.transportMode}</td>

              <td>
                <button className="deleteBtn" onClick={() => deleteCourier(c._id)}>
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}
import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function TradingDashboard() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ date: "", profit: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("data");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(entries));
  }, [entries]);

  const add = () => {
    const newEntry = { ...form };
    setEntries([...entries, newEntry]);
  };

  const profitData = {
    labels: entries.map(e => e.date),
    datasets: [{ label: "Profit", data: entries.map(e => Number(e.profit)) }]
  };

  const scoreData = {
    labels: entries.map(e => e.date),
    datasets: [{ label: "Entries", data: entries.map((_, i) => i + 1) }]
  };

  const winLose = {
    labels: ["Wins", "Losses"],
    datasets: [{
      data: [
        entries.filter(e => e.profit > 0).length,
        entries.filter(e => e.profit <= 0).length
      ]
    }]
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Trading Dashboard</h1>

      <input type="date" onChange={e => setForm({ ...form, date: e.target.value })} />
      <input type="number" placeholder="Profit" onChange={e => setForm({ ...form, profit: e.target.value })} />
      <button onClick={add}>Add</button>

      <div style={{ marginTop: 30 }}>
        <Line data={profitData} />
      </div>

      <div style={{ marginTop: 30 }}>
        <Bar data={scoreData} />
      </div>

      <div style={{ marginTop: 30 }}>
        <Pie data={winLose} />
      </div>
    </div>
  );
}

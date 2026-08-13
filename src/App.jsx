import { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import "./App.css";
import weddingLogo from "./assets/wedding-rings.svg";

const App = () => {
  const [startNumber, setStartNumber] = useState(1);
  const [quantity, setQuantity] = useState(44);
  const [labels, setLabels] = useState([]);
  const componentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLabels = Array.from({ length: quantity }, (_, i) => {
      const num = parseInt(startNumber) + i;
      // Format number to at least 3 digits if it's small, or just string if larger?
      // User agreed to "001, 002, 003".
      return {
        number: String(num).padStart(3, '0'),
      };
    });
    setLabels(newLabels);
    alert('Success, siap print.');
  };

  return (
    <div>
      <div className="form-product">
        <h1>Generator Nomor Undangan</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              <label>Nomor Awal: </label>
              <input
                type="number"
                name="startNumber"
                value={startNumber}
                onChange={(e) => setStartNumber(e.target.value)}
                required
                min="0"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Jumlah Label: </label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min="1"
              />
            </div>
          </div>
          <button type="submit">Generate</button>
          <hr />
        </form>
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => componentRef.current}
          pageStyle="@page { size: auto; margin: 10mm; }"
        />
      </div>
      <div ref={componentRef} className="label-container">
        {labels.map((label, index) => (
          <div key={index} className={`label ${(index % 44 === 0 && index !== 0) ? 'page-break' : ''}`}>
            <div className="wedding-footer">
              <img src={weddingLogo} alt="Wedding Rings" className="logo-wedding" />
              <p className="wedding-text">Wedding</p>
              <p className="wedding-text">Riska & Pazrin</p>
            </div>
            <p className="label-number">{label.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

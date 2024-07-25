import { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import "./App.css";
import unileverLogo from "./assets/unilever.png";

const App = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [labels, setLabels] = useState([]);
  const componentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLabels = Array.from({ length: quantity }, () => ({
      name: productName,
      price: price,
    }));
    setLabels(newLabels);
  };

  return (
    <div>
      <h1>Label Printer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Produk: </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Harga: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Jumlah Kotak: </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef} className="label-container">
        {labels.map((label, index) => (
          <div key={index} className="label">
            <p className="product-name">{label.name}</p>
            <div className="price-container">
              <p className="price">Rp.{label.price},-</p>
              <img src={unileverLogo} alt="Logo" className="logo" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

import { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import "./App.css";
import unileverLogo from "./assets/unilever.png";

const App = () => {
  const [products, setProducts] = useState([
    { name: "", price: "", quantity: "" },
  ]);
  const [labels, setLabels] = useState([]);
  const componentRef = useRef();

  const handleProductChange = (index, event) => {
    const newProducts = products.map((product, i) => {
      if (i === index) {
        return { ...product, [event.target.name]: event.target.value };
      }
      return product;
    });
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: "", price: "", quantity: "" }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLabels = products.flatMap((product) =>
      Array.from({ length: product.quantity }, () => ({
        name: product.name,
        price: product.price,
      }))
    );
    setLabels(newLabels);
    alert('Success, siap print.');
  };

  const currencyFormat = (price) => 
    new Intl.NumberFormat().format(price);

  return (
    <div>
      <div className="form-product">
        <h1>Gasan Riska</h1>
        <form onSubmit={handleSubmit}>
          {products.map((product, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <div>
                <label>Nama Produk: </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(event) => handleProductChange(index, event)}
                  required
                />
              </div>
              <div>
                <label>Harga: </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={(event) => handleProductChange(index, event)}
                  required
                />
              </div>
              <div>
                <label>Jumlah Kotak: </label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={(event) => handleProductChange(index, event)}
                  required
                />
              </div>
              <button type="button" onClick={() => handleRemoveProduct(index)}>
                Hapus
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddProduct}>
            Tambah Produk
          </button>
          <br /><br />
          <button type="submit">Simpan</button>
          <hr />
        </form>
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => componentRef.current}
          pageStyle="@page { size: auto; margin: 10mm; }" // Styling for printing
        />
      </div>
      <div ref={componentRef} className="label-container">
        {labels.map((label, index) => (
          <div key={index} className={`label ${(index % 44 === 0 && index !== 0) ? 'page-break' : ''}`}>
            <p className="product-name">{label.name}</p>
            <div className="price-container">
              <p className="price">Rp.{currencyFormat(label.price)},-</p>
              <img src={unileverLogo} alt="Logo" className="logo" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

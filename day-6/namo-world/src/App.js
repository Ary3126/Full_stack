import './App.css';
import Navbar from './compontets/navbar';
import Productlist from './compontets/productlist';
import Footer from './compontets/footer';
function App() {
  const products = [{
    price: 100,
    name: "Product 1",
    description: "This is a sample product."
  },
  {
    price: 200,
    name: "Product 2",
    description: "This is another sample product."
  } 
  ,{
    price: 300,
    name: "Product 3",
    description: "This is yet another sample product."
  }
];
  return (
    <>
     <Navbar />
      <section className="hero-section py-5 text-white">
        <div className="container text-center">
          <p className="text-uppercase text-secondary mb-2">Welcome to Namo World</p>
          <h1 className="display-5 fw-bold mb-3">Shop smart with Ary Cart</h1>
          <p className="lead mx-auto hero-copy">
            Discover elegant product cards, clean UI, and a responsive shopping experience built with React and Bootstrap.
          </p>
        </div>
      </section>
     <Productlist  products={products}/>
     <Footer />
    </>
  );
}

export default App;

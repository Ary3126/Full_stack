import React from 'react';

export default function Productlist({ products }) {
  return (
    <section id="products" className="product-list py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="section-title mb-1">Featured Products</h2>
            <p className="text-secondary mb-0">Handpicked items for a modern collection.</p>
          </div>
          <button type="button" className="btn btn-outline-primary">View All</button>
        </div>

        <div className="row g-4">
          {products.map((product, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div className="card product-card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <span className="badge rounded-pill bg-primary mb-3">Best Seller</span>
                  <h3 className="h5 card-title">{product.name}</h3>
                  <p className="card-text text-secondary flex-grow-1">{product.description}</p>
                  <div className="d-flex align-items-center justify-content-between mt-4">
                    <span className="fw-bold fs-5 text-dark">${product.price}</span>
                    <button className="btn btn-sm btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

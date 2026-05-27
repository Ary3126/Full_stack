import React, { Component } from 'react';

class Navbar extends Component {
    state = { }
    render() {
        return(<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand d-flex align-items-center" href="#">
      <span className="fs-5 fw-bold">Ary Cart</span>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navMenu">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#products">Products</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#footer">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
);
    }
}
 
export default Navbar;
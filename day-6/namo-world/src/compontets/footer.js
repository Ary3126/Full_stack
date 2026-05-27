import React from 'react';

export default function Footer() {
  return (
    <footer id="footer" className='footer-section text-center py-5'>
      <div className='container'>
        <h3 className='h5 text-white mb-3'>Stay updated with Ary Cart</h3>
        <p className='text-secondary mb-4'>Get the latest products, deals, and design updates directly in your inbox.</p>
        <form className='row justify-content-center g-2'>
          <div className='col-sm-6'>
            <input type='email' className='form-control form-control-lg' placeholder='Enter your email' />
          </div>
          <div className='col-sm-auto'>
            <button type='submit' className='btn btn-primary btn-lg'>Subscribe</button>
          </div>
        </form>
        <p className='text-secondary small mt-4 mb-0'>© 2026 Ary Cart. All rights reserved.</p>
      </div>
    </footer>
  );
}

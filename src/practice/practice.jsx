import React from 'react';

export function Practice() {
  return (
    <main className="container-fluid flex-grow-1 d-flex py-3">

      <div className="row w-100">

        <div className="col-md-3">

          <h1 className="fw-light">Practice</h1>

          <p>These are your saved words:</p>

          <ul className="list-unstyled d-flex gap-2">

            <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

              <span className="me-2">cavolo</span>
              <button type="button" className="btn-close" style={{fontSize: '12px'}}></button>

            </li>

            <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

              <span className="me-2">giorno</span>
              <button type="button" className="btn-close" style={{fontSize: '12px'}}></button>

            </li>

            <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

              <span className="me-2">conoscere</span>
              <button type="button" className="btn-close" style={{fontSize: '12px'}}></button>

            </li>

            <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

              <span className="me-2">ghiaccio</span>
              <button type="button" className="btn-close" style={{fontSize: '12px'}}></button>

            </li>

            <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

              <span className="me-2">slancio</span>
              <button type="button" className="btn-close" style={{fontSize: '12px'}}></button>

            </li>

          </ul>

        </div>

      </div>

    </main>
  );
}
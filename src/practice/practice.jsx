import React from 'react';

export function Practice(props) {
  return (
    <main className="container-fluid flex-grow-1 d-flex py-3">

      <div className="row w-100">

        <div className="col-md-3">

          <h1 className="fw-light">Practice</h1>

          <p>These are your saved words:</p>

          <ul className="list-unstyled d-flex gap-2">

            {
              props.savedWords.map(
                (word, index) => (

                  <li key={index} className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

                    <span className="me-2">{word}</span>
                    <button type="button" className="btn-close" style={{ fontSize: '12px' }}></button>

                  </li>
                )
              )
            }

          </ul>

        </div>

      </div>

    </main>
  );
}
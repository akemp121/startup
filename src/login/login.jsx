import React from 'react';

export function Login() {
  return (
    <main className="container-fluid flex-grow-1 d-flex py-3 align-items-center">

      <div className="w-100">

        <div className="row">

          <div className="col-md-6 offset-md-1">

            <h1 className="fw-light mb-4">Refine your langauge abilities.</h1>

            <p className="mb-3">Create an account today:</p>

            <form method="get" action="read.html">

              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="text" placeholder="youremail@gmail.com" className="form-control rounded-pill" />
              </div>

              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" placeholder="password" className="form-control rounded-pill" />
              </div>

              <div className="mt-4 d-flex gap-2">

                <button type="submit" className="btn btn-primary rounded-pill">Login</button>
                <button type="submit" className="btn btn-primary rounded-pill">Sign Up</button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </main>
  );
}
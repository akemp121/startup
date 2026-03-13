import React from 'react';

export function Login(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(path) {
    const response = await fetch(
      endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    );

    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      // probably put in better error handling in here
      console.log('Error logging in!')
    }
  }

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
                <input value={userName} type="text" placeholder="youremail@gmail.com" className="form-control rounded-pill"
                  onChange={(e) => { setUserName(e.target.value); console.log(userName) }} />
              </div>

              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input value={password} type="password" placeholder="password" className="form-control rounded-pill"
                  onChange={(e) => { setPassword(e.target.value); console.log(password) }} />
              </div>

              <div className="mt-4 d-flex gap-2">

                <button type="submit" className="btn btn-primary rounded-pill" onClick={loginUser}>Login</button>
                <button type="submit" className="btn btn-primary rounded-pill" onClick={createUser}>Sign Up</button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </main>
  );
}
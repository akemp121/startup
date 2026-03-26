import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Read } from './read/read';
import { Practice } from './practice/practice';
import { About } from './about/about';
import { AuthState } from './login/authState';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const navigate = useNavigate();



    async function logout() {
        try {
            await fetch('/api/auth/logout', {
                method: 'delete'
            })
        } catch (error) {
            console.log('Logout failed!');
        } finally {
            localStorage.removeItem('userName');
            setAuthState(AuthState.Unauthenticated);
            navigate('/');
        }
    }

    return (

        <div className="body d-flex flex-column min-vh-100">

            <header className="container-fluid py-3 border-bottom">

                <div className="row align-items-center">

                    <div className="col-md-2">

                        <h1 className="m-0">ReadForeign</h1>

                    </div>

                    <div className="col-md-6">

                        <nav>
                            <menu>
                                <ul className="d-flex gap-3 list-unstyled m-0 p-0">

                                    {
                                        (authState === AuthState.Unauthenticated) && (
                                            <li>
                                                <NavLink className='btn btn-primary rounded-pill header-button' to=''>Home</NavLink>
                                            </li>
                                        )
                                    }
                                    {
                                        (authState === AuthState.Authenticated) && (
                                            <li>
                                                <NavLink className='btn btn-primary rounded-pill header-button' to='read'>Read</NavLink>
                                            </li>
                                        )
                                    }
                                    {
                                        (authState === AuthState.Authenticated) && (
                                            <li>
                                                <NavLink className='btn btn-primary rounded-pill header-button' to='practice'>Practice</NavLink>
                                            </li>
                                        )
                                    }
                                    <li>
                                        <NavLink className='btn btn-primary rounded-pill header-button' to='about'>About</NavLink>
                                    </li>

                                </ul>
                            </menu>
                        </nav>

                    </div>

                    <div className="col-md-4">

                        <div className="d-flex flex-row gap-3 justify-content-end align-items-center">

                            {
                                (authState === AuthState.Authenticated) && (
                                    <p className="mb-0">Welcome, <span className="fw-light">{userName}</span></p>
                                )
                            }

                            {
                                (authState === AuthState.Authenticated) && (
                                    <button type="button" className="btn btn-primary rounded-pill" onClick={logout}>Logout</button>
                                )
                            }

                        </div>

                    </div>

                </div>

            </header>

            <Routes>
                <Route
                    path='/' element={
                        authState === AuthState.Authenticated ?
                            <Navigate to='/read' replace /> :
                            <Login
                                userName={userName}
                                onLogin={(userLoginName) => { setAuthState(AuthState.Authenticated); setUserName(userLoginName); }}
                            />
                    }
                />
                <Route path='/read' element={<Read />} />
                <Route path='/practice' element={<Practice />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="container-fluid py-3 border-top">

                <span>ReadForeign by Alex Kemp. <a href="https://github.com/akemp121/startup">GitHub</a></span>

            </footer>

        </div>

    )
}

function NotFound() {
    return <main className="container-fluid text-center">404: Return to sender. Address unknown.</main>;
}
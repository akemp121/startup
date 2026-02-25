import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Read } from './read/read';
import { Practice } from './practice/practice';
import { About } from './about/about';

export default function App() {
    const [savedWords, setSavedWords] = React.useState([]);

    return <BrowserRouter>

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

                                    <li>
                                        <NavLink className='btn btn-primary rounded-pill header-button' to=''>Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='btn btn-primary rounded-pill header-button' to='read'>Read</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='btn btn-primary rounded-pill header-button' to='practice'>Practice</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='btn btn-primary rounded-pill header-button' to='about'>About</NavLink>
                                    </li>

                                </ul>
                            </menu>
                        </nav>

                    </div>

                    <div className="col-md-3 text-end">

                        <p className="m-0">Welcome, <span className="fw-light">axle121</span></p>

                    </div>

                </div>

            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/read' element={<Read savedWords={savedWords} setSavedWords={setSavedWords} />} />
                <Route path='/practice' element={<Practice savedWords={savedWords}/>} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="container-fluid py-3 border-top">

                <span>ReadForeign by Alex Kemp. <a href="https://github.com/akemp121/startup">GitHub</a></span>

            </footer>

        </div>

    </BrowserRouter>
}

function NotFound() {
    return <main className="container-fluid text-center">404: Return to sender. Address unknown.</main>;
}
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return <div class="body d-flex flex-column min-vh-100">

        <header class="container-fluid py-3 border-bottom">

            <div class="row align-items-center">

                <div class="col-md-2">

                    <h1 class="m-0">ReadForeign</h1>

                </div>

                <div class="col-md-6">

                    <nav>
                        <menu>
                            <ul class="d-flex gap-3 list-unstyled m-0 p-0">

                                <li><a href="index.html" class="btn btn-primary rounded-pill header-button active">Home</a>
                                </li>
                                <li><a href="read.html" class="btn btn-primary rounded-pill header-button">Read</a></li>
                                <li><a href="practice.html" class="btn btn-primary rounded-pill header-button">Practice</a>
                                </li>
                                <li><a href="about.html" class="btn btn-primary rounded-pill header-button">About</a></li>

                            </ul>
                        </menu>
                    </nav>

                </div>

                <div class="col-md-3 text-end">

                    <p class="m-0">Welcome, <span class="fw-light">axle121</span></p>

                </div>

            </div>

        </header>

        <main>App components go here</main>

        <footer class="container-fluid py-3 border-top">

            <span>ReadForeign by Alex Kemp. <a href="https://github.com/akemp121/startup">GitHub</a></span>

        </footer>

    </div>
}
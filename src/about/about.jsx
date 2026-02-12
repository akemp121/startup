import React from 'react';

export function About() {
  return (
    <main className="container-fluid flex-grow-1 d-flex py-3">

        <div className="row w-100">

            <div className="col-md-6">

                <div className="container-fluid py-3">

                    <h1 className="fw-light">About</h1>

                    <h4>Keep your foreign language proficiency afloat.</h4>

                    <p>

                        Many people who have learned foreign languages (RMs) struggle
                        to find opportunities to practice. While the overall best way
                        to practice is speaking, other methods such as reading can provide
                        a solid practice, especially with strengthening vocabulary.

                    </p>

                    <p>

                        This app will allow users to read about topics they find
                        interesting at a difficulty that pushes them to learn new words.
                        Once they've accumulated enough unknown words, they'll be able to
                        memorize them and quiz themselves on what they've learned.

                    </p>

                    <p>

                        The process of reading, translating, and memorizing helped me
                        immensely when learning Spanish and Q'eqchi'. My goal is to streamline
                        the process into a single, specialized app.

                    </p>

                    <img src="bliss.jpg" width="800" height="500" className="rounded-5"></img>

                </div>
                
            </div>

        </div>

    </main>
  );
}
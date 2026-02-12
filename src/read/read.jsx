import React from 'react';

export function Read() {
  return (
    <main className="container-fluid flex-grow-1 d-flex py-3">

        <div className="row w-100">

            <aside className="col-md-3">

                <div className="container-fluid border-bottom py-3">

                    <div className="mb-3">

                        <h2 className="fw-light">Difficulty</h2>

                    </div>

                    <div className="mb-3">

                        <form>

                            <fieldset>


                                <input type="radio" id="beginner" value="Beginner" name="difficulty" defaultChecked></input>
                                <label htmlFor="beginner">Beginner</label>

                                <br></br>

                                <input type="radio" id="intermediate" value="Intermediate" name="difficulty"></input>
                                <label htmlFor="intermediate">Intermediate</label>

                                <br></br>

                                <input type="radio" id="advanced" value="Advanced" name="difficulty"></input>
                                <label htmlFor="advanced">Advanced</label>


                            </fieldset>

                        </form>

                    </div>

                </div>

                <div className="container-fluid border-bottom py-3">

                    <div className="mb-3">

                        <h2 className="fw-light">Interests</h2>

                    </div>

                    <ul className="list-unstyled d-flex flex-wrap gap-2">

                        <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

                            <span className="me-2">Food</span>
                            <button type="button" className="btn-close" style={{fontSize: '12px'}}></button>

                        </li>

                        <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

                            <span className="me-2">History</span>
                            <button type="button" className="btn-close" style={{fontSize: '12px'}}></button>

                        </li>

                        <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">
                            
                            <span className="me-2">Cars</span>
                            <button type="button" className="btn-close" style={{fontSize: '12px'}}></button>
                        
                        </li>

                    </ul>

                    <form>

                        <div className="container-fluid">

                            <div className="row">

                                <div className="col-md-8">

                                    <input type="text" placeholder="Add new interest..."
                                        className="form-control rounded-pill"></input>

                                </div>

                                <div className="col-md-3">

                                    <button type="button" className="btn btn-primary rounded-pill">Add</button>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>

                <div className="container-fluid py-3">

                    <form>

                        <button type="button" className="btn btn-primary rounded-pill">Get New Article</button>

                    </form>

                </div>

            </aside>

            <article className="col-md-6">

                <div className="my-3">

                    <h1>La Pasta: Un Simbolo Italiano</h1>

                </div>

                <div className="mb-3">

                    <h3 className="fw-light">By Il Cuore d'Italia</h3>

                </div>

                <p>

                    Molte persone pensano che Marco Polo abbia portato la pasta
                    in Italia dalla Cina nel 1295. In realtà, questa è solo una leggenda.
                    La storia della pasta è molto più antica e complessa. Già ai tempi
                    dell'Antica Roma esistevano piatti simili, come le "lagane",
                    che erano strisce di pasta cotte al forno, antenate delle moderne lasagne.

                </p>

                <p>

                    Tuttavia, la pasta secca come la conosciamo oggi ha origini arabe.
                    Durante il Medioevo, gli arabi introdussero in Sicilia l'arte di essiccare
                    la pasta al sole. Questa tecnica era fondamentale perché permetteva di
                    conservare il cibo per lunghi periodi, rendendolo perfetto per i viaggi
                    in mare e per evitare le carestie.

                </p>

                <p>

                    Per secoli, la pasta è stata mangiata "in bianco", condita solo con
                    formaggio e spezie. La vera rivoluzione è arrivata nel XIX secolo a Napoli,
                    quando gli italiani hanno iniziato ad aggiungere il pomodoro, un frutto
                    importato dalle Americhe. Oggi esistono più di 300 formati di pasta e,
                    per gli italiani, un piatto di spaghetti non è solo cibo: è un simbolo di cultura,
                    famiglia e unità nazionale.

                </p>

            </article>

        </div>

    </main>
  );
}
import React from 'react';

export function Read(props) {

    const [targetLanguage, setTargetLanguage] = React.useState("Italian");
    const [difficulty, setDifficulty] = React.useState("Beginner");
    const [interests, setInterests] = React.useState([]);

    const mockArticleData = {
        id: "article-001",
        title: "La Pasta: Un Simbolo Italiano",
        author: "Il Cuore d'Italia",
        difficulty: "Intermediate",
        body: [
            // Sentence 1: "Molte persone pensano che Marco Polo..."
            { id: 1, text: "Molte", translation: "Many" },
            { id: 2, text: " ", translation: null },
            { id: 3, text: "persone", translation: "people" },
            { id: 4, text: " ", translation: null },
            { id: 5, text: "pensano", translation: "think" },
            { id: 6, text: " ", translation: null },
            { id: 7, text: "che", translation: "that" },
            { id: 8, text: " ", translation: null },
            { id: 9, text: "Marco", translation: "Marco" },
            { id: 10, text: " ", translation: null },
            { id: 11, text: "Polo", translation: "Polo" },
            { id: 12, text: " ", translation: null },
            { id: 13, text: "abbia", translation: "had" },
            { id: 14, text: " ", translation: null },
            { id: 15, text: "portato", translation: "brought" },
            { id: 16, text: " ", translation: null },
            { id: 17, text: "la", translation: "the" },
            { id: 18, text: " ", translation: null },
            { id: 19, text: "pasta", translation: "pasta" },
            { id: 20, text: " ", translation: null },
            { id: 21, text: "in", translation: "in" },
            { id: 22, text: " ", translation: null },
            { id: 23, text: "Italia", translation: "Italy" },
            { id: 24, text: " ", translation: null },
            { id: 25, text: "dalla", translation: "from the" },
            { id: 26, text: " ", translation: null },
            { id: 27, text: "Cina", translation: "China" },
            { id: 28, text: " ", translation: null },
            { id: 29, text: "nel", translation: "in" },
            { id: 30, text: " ", translation: null },
            { id: 31, text: "1295.", translation: null },
            { id: 32, text: " ", translation: null },

            // Sentence 2: "In realtà, questa è solo una leggenda."
            { id: 33, text: "In", translation: "In" },
            { id: 34, text: " ", translation: null },
            { id: 35, text: "realtà,", translation: "reality," },
            { id: 36, text: " ", translation: null },
            { id: 37, text: "questa", translation: "this" },
            { id: 38, text: " ", translation: null },
            { id: 39, text: "è", translation: "is" },
            { id: 40, text: " ", translation: null },
            { id: 41, text: "solo", translation: "only" },
            { id: 42, text: " ", translation: null },
            { id: 43, text: "una", translation: "a" },
            { id: 44, text: " ", translation: null },
            { id: 45, text: "leggenda.", translation: "legend." },
            { id: 46, text: " ", translation: null },

        ]
    };

    const supportedLanguages = [
        { id: 'it', name: 'Italian' },
        { id: 'es', name: 'Spanish' },
        { id: 'zh', name: 'Mandarin' },
        { id: 'fr', name: 'French' },
        { id: 'de', name: 'German' }
    ];

    return (
        <main className="container-fluid flex-grow-1 d-flex py-3">

            <div className="row w-100">

                <aside className="col-md-3">

                    <div className="container-fluid border-bottom py-3">

                        <div className="mb-3">

                            <h2 className="fw-light">Target Language</h2>

                        </div>

                        <div className="dropdown">

                            <button className="btn btn-primary dropdown-toggle rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {targetLanguage}
                            </button>

                            <ul className="dropdown-menu">
                                {
                                    supportedLanguages.map(
                                        (lang) => (
                                            <li key={lang.id}>
                                                <a className="dropdown-item" href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    setTargetLanguage(lang.name);
                                                }}>{lang.name}</a>
                                            </li>
                                        )
                                    )
                                }
                            </ul>

                        </div>

                    </div>

                    <div className="container-fluid border-bottom py-3">

                        <div className="mb-3">

                            <h2 className="fw-light">Difficulty</h2>

                        </div>

                        <div className="mb-3">

                            <form>

                                <fieldset>


                                    <input type="radio" id="beginner" value="Beginner" name="difficulty" onClick={() => setDifficulty("Beginner")} defaultChecked></input>
                                    <label htmlFor="beginner">Beginner</label>

                                    <br></br>

                                    <input type="radio" id="intermediate" value="Intermediate" name="difficulty" onClick={() => setDifficulty("Intermediate")}></input>
                                    <label htmlFor="intermediate">Intermediate</label>

                                    <br></br>

                                    <input type="radio" id="advanced" value="Advanced" name="difficulty" onClick={() => setDifficulty("Hard")}></input>
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
                                <button type="button" className="btn-close" style={{ fontSize: '12px' }}></button>

                            </li>

                            <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

                                <span className="me-2">History</span>
                                <button type="button" className="btn-close" style={{ fontSize: '12px' }}></button>

                            </li>

                            <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

                                <span className="me-2">Cars</span>
                                <button type="button" className="btn-close" style={{ fontSize: '12px' }}></button>

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
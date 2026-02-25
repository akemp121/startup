import React from 'react';

export function Read(props) {

    const [targetLanguage, setTargetLanguage] = React.useState("Italian");
    const [difficulty, setDifficulty] = React.useState("Beginner");
    const [interests, setInterests] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [selectedWord, setSelectedWord] = React.useState("");

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

    const handleAdd = () => {
        if (inputValue.trim() !== "" && !interests.includes(inputValue)) {
            setInterests([...interests, inputValue]);
            setInputValue("");
        }
    };

    const handleRemove = (interestToDelete) => {
        setInterests(interests.filter(interest => interest !== interestToDelete));
    };

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

                                    <div className="btn-group-vertical" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" className="btn-check" name="difficulty" id="beginner" autoComplete="off" onChange={() => setDifficulty("Beginner")} checked={difficulty === "Beginner"}></input>
                                        <label className="btn btn-outline-primary" htmlFor="beginner">Beginner</label>

                                        <input type="radio" className="btn-check" name="difficulty" id="intermediate" autoComplete="off" onChange={() => setDifficulty("Intermediate")}></input>
                                        <label className="btn btn-outline-primary" htmlFor="intermediate">Intermediate</label>

                                        <input type="radio" className="btn-check" name="difficulty" id="advanced" autoComplete="off" onChange={() => setDifficulty("Advanced")}></input>
                                        <label className="btn btn-outline-primary" htmlFor="advanced">Advanced</label>
                                    </div>


                                </fieldset>

                            </form>

                        </div>

                    </div>

                    <div className="container-fluid border-bottom py-3">

                        <div className="mb-3">

                            <h2 className="fw-light">Interests</h2>

                        </div>

                        <ul className="list-unstyled d-flex flex-wrap gap-2">

                            {interests.length === 0 &&
                                <li className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

                                    <span className="me-2 fst-italic fw-light">Add some interests!</span>

                                </li>
                            }



                            {
                                interests.map(
                                    (interest, index) => (
                                        <li key={index} className="border bg-light rounded-pill px-3 py-1 d-flex align-items-center">

                                            <span className="me-2">{interest}</span>
                                            <button type="button" className="btn-close" style={{ fontSize: '12px' }} onClick={() => handleRemove(interest)}></button>

                                        </li>
                                    )
                                )
                            }

                        </ul>

                        <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>

                            <div className="container-fluid">

                                <div className="row">

                                    <div className="col-md-8">

                                        <input type="text" placeholder="Add new interest..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                                            className="form-control rounded-pill"></input>

                                    </div>

                                    <div className="col-md-3">

                                        <button type="button" className="btn btn-primary rounded-pill" onClick={handleAdd}>Add</button>

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

                        <h1>{mockArticleData.title}</h1>

                    </div>

                    <div className="mb-3">

                        <h3 className="fw-light">{mockArticleData.author}</h3>

                    </div>

                    <p className="article-text">

                        {
                            mockArticleData.body.map(
                                (token) => {
                                    const isSelected = selectedWord && selectedWord.id === token.id;
                                    const isSelectable = token.translation !== null;
                                    return (
                                        <span key={token.id}
                                            className={`${isSelected ? 'word-selected' : ''} ${isSelectable ? 'word-selectable' : ''}`}

                                            onClick={() => { if (isSelectable) { 
                                                if (selectedWord.text !== token.text) {
                                                    setSelectedWord(token)
                                                } else {
                                                    setSelectedWord("")
                                                }}}}>
                                            {token.text}
                                        </span>
                                    );
                                }
                            )
                        }

                    </p>



                </article>

            </div>

        </main>
    );
}
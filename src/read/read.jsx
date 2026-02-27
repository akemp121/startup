import React from 'react';
import { Popup } from '/src/components/popup.jsx';
import mockArticleData from './mockArticleData.json'

export function Read(props) {

    const [targetLanguage, setTargetLanguage] = React.useState("Italian");
    const [difficulty, setDifficulty] = React.useState("Beginner");
    const [interests, setInterests] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [selectedWord, setSelectedWord] = React.useState("");
    const [langArticle, setLangArticle] = React.useState(null);

    React.useEffect(
        () => {
            const delay = setTimeout(
                () => {
                    setLangArticle(mockArticleData);
                }, 2000
            )
            return () => clearTimeout(delay);
        }, []
    );


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

    const handleSave = () => {
        if (selectedWord.text.trim() !== "" && !props.savedWords.includes(selectedWord.text)) {
            props.setSavedWords([...props.savedWords, selectedWord]);
        }
        setSelectedWord("");
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
                                <li className="border word-pill bg-light rounded-pill px-3 py-1 d-flex align-items-center">

                                    <span className="me-2 fst-italic fw-light">Add some interests!</span>

                                </li>
                            }



                            {
                                interests.map(
                                    (interest, index) => (
                                        <li key={index} className="border word-pill bg-light rounded-pill px-3 py-1 d-flex align-items-center">

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

                {
                    langArticle === null ? <p>Loading article...</p> :

                    <article className="col-md-6">

                    <div className="my-3">

                        <h1>{langArticle.title}</h1>

                    </div>

                    <div className="mb-3">

                        <h3 className="fw-light">{langArticle.author}</h3>

                    </div>

                    <p className="article-text">

                        {
                            langArticle.body.map(
                                (token) => {
                                    const isSelected = selectedWord && selectedWord.id === token.id;
                                    const isSelectable = token.translation !== null;
                                    return (
                                        <span key={token.id}
                                            className={`${isSelected ? 'word-selected' : ''} ${isSelectable ? 'word-selectable' : ''}`}

                                            onClick={() => {
                                                if (isSelectable) {
                                                    if (selectedWord === null) {
                                                        setSelectedWord(token)
                                                    } else if (selectedWord.text !== token.text) {
                                                        setSelectedWord(token)
                                                    } else {
                                                        setSelectedWord("")
                                                    }
                                                }
                                            }}>
                                            {token.text}
                                        </span>
                                    );
                                }
                            )
                        }

                    </p>

                    <Popup selectedWord={selectedWord} onSave={handleSave} onClose={() => setSelectedWord("")}/>

                </article>

                }

                

            </div>

        </main>
    );
}
import React from 'react';
import { Popup } from '/src/components/popup.jsx';

export function Read(props) {

    const [targetLanguage, setTargetLanguage] = React.useState(null);
    const [difficulty, setDifficulty] = React.useState(null);
    const [interests, setInterests] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [selectedWord, setSelectedWord] = React.useState("");
    const [savedWords, setSavedWords] = React.useState([]);
    const [langArticle, setLangArticle] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(
        () => {
            const savedArticle = localStorage.getItem('currentArticle');
            if (savedArticle) {
                setLangArticle(JSON.parse(savedArticle));
            }

            const getUserInterests = async () => {
                const response = await fetch(
                    '/api/user/interests', {
                    method: 'get'
                }
                );
                if (response.ok) {
                    const interestData = await response.json();
                    setInterests(interestData.interests);
                }
            }

            const getUserDifficulty = async () => {
                const response = await fetch(
                    '/api/user/difficulty', {
                    method: 'get'
                }
                );
                if (response.ok) {
                    const difficultyData = await response.json();
                    setDifficulty(difficultyData.difficulty);
                }
            }

            const getUserTargetLanguage = async () => {
                const response = await fetch(
                    '/api/user/targetLanguage', {
                    method: 'get'
                }
                );
                if (response.ok) {
                    const targetLanguageData = await response.json();
                    setTargetLanguage(targetLanguageData.targetLanguage);
                }
            }

            getUserInterests();
            getUserDifficulty();
            getUserTargetLanguage();

        }, []
    );

    async function fetchArticle() {
        setIsLoading(true);
        const interestsString = interests.join(", ");
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        model: "openrouter/free",
                        messages: [
                            {
                                role: "system",
                                content: `You are a language learning API.
        
        You must return the response STRICTLY as a valid JSON object matching the exact schema below. 
        Do not include markdown formatting (like \`\`\`json). Just output raw JSON.

        Rules:
        1. "full_text" must be a coherent, multi-paragraph reading passage.
        2. "vocabulary" must be a dictionary (key-value pairs) where 
        the key is the exact word from the text (stripped of punctuation) and the value is its direct English translation.
        3. Include every distinct word from the text in the vocabulary dictionary.

        Schema:
        {
            "id": "generate-a-unique-string",
            "title": "Passage Title",
            "author": "Fictional Author",
            "difficulty": "Requested Difficulty",
            "full_text": "Molte persone pensano che...",
            "vocabulary": {
                "Molte": "Many",
                "persone": "people",
                "pensano": "think",
                "che": "that"
            }
        }`
                            },
                            {
                                role: "user",
                                content: `Generate a reading article in ${targetLanguage} 
                                at a ${difficulty} difficulty level. The topic should incorporate 
                                these elements: ${interestsString}. Ensure the passage is at least 100 words.`
                            }
                        ]
                    }
                )
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error ${response.status}: ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();

            const aiTextOutput = data.choices[0].message.content;

            const finalArticleObject = JSON.parse(aiTextOutput);
            setLangArticle(finalArticleObject);
            localStorage.setItem('currentArticle', aiTextOutput);

        } catch (error) {
            console.error("Fetch failed:", error);
            setLangArticle(
                {
                    "id": "article-error",
                    "title": "Sorry!",
                    "author": "Error retreiving article",
                    "difficulty": "Intermediate",
                    "full_text": "Please try again.",
                    "vocabulary": {
                        "Please": "Please",
                        "try": "try",
                        "again": "again"
                    }
                }
            )
        }
        setIsLoading(false);
    }

    const supportedLanguages = [
        { id: '##', name: 'Select' },
        { id: 'it', name: 'Italian' },
        { id: 'es', name: 'Spanish' },
        { id: 'zh', name: 'Mandarin' },
        { id: 'fr', name: 'French' },
        { id: 'de', name: 'German' },
        { id: 'ko', name: 'Korean' },
        { id: 'ru', name: 'Russian' },
        { id: 'pt', name: 'Portuguese' },
        { id: 'no', name: 'Norwegian' }
    ];

    async function addInterest() {
        if (inputValue.trim() !== "" && !interests.includes(inputValue)) {
            setInterests([...interests, inputValue]);
            const tempInterest = inputValue;
            setInputValue("");
            // setInputValue(""); put this once it is successful

            const response = await fetch(
                '/api/user/interests', {
                method: 'post',
                body: JSON.stringify({ interest: tempInterest }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            );

            if (!response.ok) {
                setInterests(interests.filter(interest => interest !== tempInterest));
                setInputValue(tempInterest);
            }

        }
    }

    async function removeInterest(interestToDelete) {
        setInterests(interests.filter(interest => interest !== interestToDelete));

        const response = await fetch(
            '/api/user/interests', {
            method: 'delete',
            body: JSON.stringify({ interest: interestToDelete }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        );

        if (!response.ok) {
            setInterests([...interests, interestToDelete]);
        }
    }

    async function setUserDifficulty(difficulty) {
        setDifficulty(difficulty);

        await fetch(
            '/api/user/difficulty', {
            method: 'post',
            body: JSON.stringify({ difficulty: difficulty }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        );

        // should we handle any errors here?
    }

    async function setUserTargetLanguage(language) {
        setTargetLanguage(language);

        await fetch(
            '/api/user/targetLanguage', {
            method: 'post',
            body: JSON.stringify({ targetLanguage: language }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        );

        // again, should we do any error handling?
    }

    async function saveWord(selectedWord) {
        if (selectedWord.text.trim() !== "" && !savedWords.includes(selectedWord.text)) {
            await fetch(
                '/api/word', {
                method: 'post',
                body: JSON.stringify({ wordRecord: selectedWord }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            );
        }
        // we're saving it locally just so that we prevent saving duplicates
        setSavedWords([...savedWords, selectedWord]);
        setSelectedWord("");
    }

    return (
        <main className="container-fluid flex-grow-1 d-flex py-3">

            <div className="row w-100">

                <aside className="col-md-3">

                    <div className="container-fluid border-bottom py-3">

                        <div className="mb-3">

                            <h2 className="fw-light">Target Language</h2>

                        </div>

                        <div className="dropdown">

                            <button className="btn btn-primary dropdown-toggle rounded-pill"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {targetLanguage ? targetLanguage : "Select"}
                            </button>

                            <ul className="dropdown-menu">
                                {
                                    supportedLanguages.map(
                                        (lang) => (
                                            <li key={lang.id}>
                                                <a className={`dropdown-item ${targetLanguage === lang.name ? 'active' : ''}`} href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    setUserTargetLanguage(lang.name);
                                                }} selected>{lang.name}</a>
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
                                        <input type="radio" className="btn-check" name="difficulty" id="beginner" autoComplete="off" onChange={() => setUserDifficulty("Beginner")} checked={difficulty === "Beginner"}></input>
                                        <label className="btn btn-outline-primary" htmlFor="beginner">Beginner</label>

                                        <input type="radio" className="btn-check" name="difficulty" id="intermediate" autoComplete="off" onChange={() => setUserDifficulty("Intermediate")} checked={difficulty === "Intermediate"}></input>
                                        <label className="btn btn-outline-primary" htmlFor="intermediate">Intermediate</label>

                                        <input type="radio" className="btn-check" name="difficulty" id="advanced" autoComplete="off" onChange={() => setUserDifficulty("Advanced")} checked={difficulty === "Advanced"}></input>
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
                                            <button type="button" className="btn-close" style={{ fontSize: '12px' }} onClick={() => removeInterest(interest)}></button>

                                        </li>
                                    )
                                )
                            }

                        </ul>

                        <form onSubmit={(e) => { e.preventDefault(); addInterest(); }}>

                            <div className="container-fluid">

                                <div className="row">

                                    <div className="col-md-8">

                                        <input type="text" placeholder="Add new interest..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                                            className="form-control rounded-pill"></input>

                                    </div>

                                    <div className="col-md-3">

                                        <button type="button" className="btn btn-primary rounded-pill" onClick={addInterest}>Add</button>

                                    </div>

                                </div>

                            </div>

                        </form>

                    </div>

                    <div className="container-fluid py-3">

                        <form>

                            <button type="button" className="btn btn-primary rounded-pill" onClick={fetchArticle}>Get New Article</button>

                        </form>

                    </div>

                </aside>

                {
                    isLoading ? (
                        <article className="col-md-6">
                            <div className="skeleton-box skeleton-title"></div>
                            <div className="skeleton-box skeleton-author"></div>
                            <br />
                            <div className="skeleton-box skeleton-text"></div>
                            <div className="skeleton-box skeleton-text"></div>
                            <div className="skeleton-box skeleton-text-short"></div>
                        </article>
                    ) : !(langArticle === null) ? (

                        <article className="col-md-6">

                            <div className="my-3">

                                <h1>{langArticle.title}</h1>

                            </div>

                            <div className="mb-3">

                                <h3 className="fw-light">{langArticle.author}</h3>

                            </div>

                            <p className="article-text">

                                {
                                    langArticle.full_text.split(' ').map(
                                        (word, index) => {
                                            const cleanWord = word.replace(/[.,!?()]/g, '');
                                            const translation = langArticle.vocabulary[cleanWord];
                                            const isSelected = selectedWord && selectedWord.id === index;
                                            const isSelectable = translation !== null;
                                            return (
                                                <span key={index}>
                                                    <span
                                                        className={`${isSelected ? 'word-selected' : ''} ${isSelectable ? 'word-selectable' : ''}`}

                                                        onClick={() => {
                                                            if (isSelectable) {
                                                                if (isSelected) {
                                                                    setSelectedWord("")
                                                                } else {
                                                                    setSelectedWord({
                                                                        id: index,
                                                                        text: cleanWord,
                                                                        translation: translation
                                                                    });
                                                                }
                                                            }
                                                        }}>
                                                        {word}
                                                    </span>
                                                    {' '}
                                                </span>
                                            );
                                        }
                                    )
                                }

                            </p>

                            <Popup selectedWord={selectedWord} onSave={saveWord} onClose={() => setSelectedWord("")} />

                        </article>

                    ) : null

                }

            </div>

        </main>
    );
}
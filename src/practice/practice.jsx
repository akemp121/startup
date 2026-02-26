import React from 'react';

export function Practice(props) {

  const [inputValue, setInputValue] = React.useState("");

  const handleAdd = () => {
    if (inputValue.trim() !== "" && !props.savedWords.includes(inputValue)) {
      props.setSavedWords([...props.savedWords, inputValue]);
      setInputValue("");
    }
  };

  const handleRemove = (wordToDelete) => {
    props.setSavedWords(props.savedWords.filter(word => word !== wordToDelete));
  };

  return (
    <main className="container-fluid flex-grow-1 d-flex py-3">

      <div className="row w-100">

        <div className="col-md-3">

          <h1 className="fw-light">Practice</h1>

          <p className="fw-light">Add new words:</p>

          <div className="container-fluid d-flex py-3 border-bottom">

            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>

              <div className="row">

                <div className="col-md-8">

                  <input type="text" placeholder="Add new word..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                    className="form-control rounded-pill"></input>

                </div>

                <div className="col-md-3">

                  <button type="button" className="btn btn-primary rounded-pill" onClick={handleAdd}>Add</button>

                </div>

              </div>

            </form>



          </div>

          <p className="py-3">These are your saved words:</p>

          <ul className="list-unstyled d-flex flex-wrap gap-2">

            {
              props.savedWords.map(
                (word, index) => (

                  <li key={index} className="border word-pill bg-light rounded-pill px-3 py-1 d-flex align-items-center">

                    <span className="me-2">{word}</span>
                    <button type="button" className="btn-close" style={{ fontSize: '12px' }} onClick={() => handleRemove(word)}></button>

                  </li>
                )
              )
            }

          </ul>

        </div>

      </div>

    </main>
  );
}
import React from 'react';

export function Practice(props) {

  const [nativeInputValue, setNativeInputValue] = React.useState("");
  const [targetInputValue, setTargetInputValue] = React.useState("");

  const handleAdd = () => {
    if (nativeInputValue === "" || targetInputValue === "") return;
    
    if (props.savedWords.some((word) => word.text.toLowerCase() === targetInputValue.trim().toLowerCase())) {
      return;
    }

    const newWord = { id: Date.now(), text: targetInputValue, translation: nativeInputValue };

    props.setSavedWords([...props.savedWords, newWord]);
  
    setNativeInputValue("");
    setTargetInputValue("");
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

                  <input type="text" placeholder="Native text" value={nativeInputValue} onChange={(e) => setNativeInputValue(e.target.value)}
                    className="form-control rounded-pill"></input>

                  <input type="text" placeholder="Target text" value={targetInputValue} onChange={(e) => setTargetInputValue(e.target.value)}
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
                (token) => (

                  <li key={token.id} className="border word-pill bg-light rounded-pill px-3 py-1 d-flex align-items-center">

                    <span className="me-2">{token.text} = <span className="fw-light">{token.translation}</span></span>
                    <button type="button" className="btn-close" style={{ fontSize: '12px' }} onClick={() => handleRemove(token)}></button>

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
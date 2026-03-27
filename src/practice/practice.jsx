import React from 'react';

export function Practice(props) {

	const [nativeInputValue, setNativeInputValue] = React.useState("");
	const [targetInputValue, setTargetInputValue] = React.useState("");
	const [savedWords, setSavedWords] = React.useState([]);

	React.useEffect(() => {
		const getSavedWords = async () => {
			const response = await fetch(
				'/api/word', {
				method: 'get'
			}
			);
			if (response.ok) {
				const savedWordData = await response.json();
				setSavedWords(savedWordData.userWords);
			}
		}

		getSavedWords();
	}, []);

	async function handleAdd() {
		if (nativeInputValue === "" || targetInputValue === "") return;

		const newWord = { _id: Date.now(), text: targetInputValue, translation: nativeInputValue };
		await saveWord(newWord);
	};

	const handleRemove = (wordToDelete) => {
		setSavedWords(savedWords.filter(word => word !== wordToDelete));
	};

	async function saveWord(newWord) {
		const isDuplicate = savedWords.some((word) => word.text === newWord.text);
		if (newWord.text.trim() !== "" && !isDuplicate) {
			// we're saving it locally just so that we prevent saving duplicates
			setSavedWords([...savedWords, newWord]);
			setNativeInputValue("");
			setTargetInputValue("");
			const response = await fetch(
				'/api/word', {
				method: 'post',
				body: JSON.stringify({ wordRecord: newWord }),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				}
			}
			);
			if (response.ok) {
				const newIdData = await response.json();
				setSavedWords((prevWords) => prevWords.map((word) => word._id === newWord._id ? { ...word, _id: newIdData.id } : word));
			}
		}
		setNativeInputValue("");
		setTargetInputValue("");
	}

	async function deleteWord(_id) {
		setSavedWords(savedWords.filter((word) => word._id !== _id));
		await fetch(
			'/api/word', {
			method: 'delete',
			body: JSON.stringify({ wordID: _id }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			}
		}
		);
	}

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
							savedWords.map(
								(token) => (

									<li key={token._id} className="border word-pill bg-light rounded-pill px-3 py-1 d-flex align-items-center">

										<span className="me-2">{token.text} = <span className="fw-light">{token.translation}</span></span>
										<button type="button" className="btn-close" style={{ fontSize: '12px' }} onClick={() => deleteWord(token._id)}></button>

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
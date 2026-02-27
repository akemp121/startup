import React from 'react';

export function Popup({ selectedWord, onSave, onClose }) {
    if (selectedWord === "") return null;

    return (
        <div className="popup-card d-flex flex-column p-3 gap-3">

            <div className="d-flex ms-auto">

                <button type="button" className="btn-close" style={{ fontSize: '12px' }} onClick={onClose}></button>

            </div>

            <div className="d-flex justify-content-center">

                <h5 className="card-title">{selectedWord === null ? "" : selectedWord.translation}</h5>

            </div>

            <div className="d-flex justify-content-center">

                <button type="button" className="btn btn-primary rounded-pill" onClick={onSave}>Save word</button>

            </div>

        </div>
    );
}
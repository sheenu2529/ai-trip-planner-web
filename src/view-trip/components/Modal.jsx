import React from 'react';

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-2 rounded-lg w-full max-w-md mx-auto">
                {children}
                <button 
                    className="mt-5 text-red-500 border-none focus:outline-none bg-white sm:hover:text-red-700 sm:transition-colors sm:duration-300"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
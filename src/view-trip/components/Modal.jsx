import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 md:bg-opacity-50">
      <div className="bg-white p-2 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
        {children}
        <button 
          className="mt-5 text-red-500 border-none focus:outline-none bg-white w-full md:w-auto"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
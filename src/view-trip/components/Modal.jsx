const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg">
                {children}
                <button className="mt-5 text-red-500 border-none focus:outline-none bg-white" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;

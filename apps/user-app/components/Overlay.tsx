export const Overlay = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Overlay Content</h2>
        <p>This is the content of the overlay.</p>
        <button onClick={onClose} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
);



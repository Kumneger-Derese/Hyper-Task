import { MdClose } from 'react-icons/md';
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className='fixed bottom-0  top-0 right-0 left-0 flex items-center justify-center w-full bg-black/20'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col gap-y-2 z-50 relative p-12 rounded-lg bg-slate-700 min-w-4/6'
      >
        <button
          onClick={onClose}
          className='text-red-300 absolute top-4 right-4 cursor-pointer'
        >
          <MdClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};
export default Modal;

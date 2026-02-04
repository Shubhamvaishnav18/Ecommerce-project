export default function Toast({ message, onClose }) {
  return (
    <div className="bg-[#DCDFE3] fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#DCDFE3] shadow-lg px-4 py-2 rounded-md flex items-center gap-2">
      <span className="text-green-600">✅</span>
      <span className="text-sm text-[#344054]">{message}</span>
      <button className="text-[#344054]" onClick={onClose}>✕</button>
    </div>
  );
}

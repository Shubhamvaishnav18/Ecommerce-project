import { X } from "lucide-react";

export default function DeleteProductModal({
    productName,
    onClose,
    onConfirm,
}) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[420px] rounded-lg p-6 relative shadow-xl">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4"
                >
                    <X size={18} className="text-[#667085] cursor-pointer" />
                </button>

                {/* Title */}
                <h3 className="text-sm font-semibold text-[#101828] mb-2">
                    Delete Product
                </h3>

                {/* Description */}
                <p className="text-sm text-[#475467]">
                    Are you sure you really want to delete this Product{" "}
                    <span className="font-medium text-[#101828]">
                        “{productName}”
                    </span>{" "}
                    ?
                </p>

                {/* Action */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onConfirm}
                        className="bg-[#000FB4] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#000da0] cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

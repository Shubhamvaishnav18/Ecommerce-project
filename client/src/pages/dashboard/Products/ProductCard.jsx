import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteProductModal from "./DeleteProductModal";
import EditProductModal from "./EditProductModal";

export default function ProductCard({ product, refresh, triggerToast }) {
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const remove = async () => {
        await axios.delete(
            `http://localhost:5000/api/products/${product._id}`
        );
        setShowDelete(false);
        refresh();
        triggerToast("Product deleted successfully");
    };

    const togglePublish = async () => {
        await axios.patch(
            `http://localhost:5000/api/products/${product._id}/publish`
        );
        refresh();
    };


    const images = product.images?.length
        ? product.images.map(
            (img) => `http://localhost:5000/uploads/${img}`
        )
        : ["/placeholder.png"];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto slider
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            <div className="bg-white rounded-xl border border-[#EAECF0] shadow-sm p-4">

                {/* Image */}
                <div className="bg-[#F9FAFB] border border-[#DCDFE3] rounded-lg p-3 mb-3">
                    <img
                        src={images[currentIndex]}
                        className="h-40 w-full object-contain transition-all duration-500"
                        alt={product.name}
                    />

                    {/* Dynamic Dots */}
                    <div className="flex justify-center gap-1 mt-2">
                        {images.map((_, idx) => (
                            <span
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full ${idx === currentIndex
                                    ? "bg-[#000FB4]"
                                    : "bg-[#D0D5DD]"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Title */}
                <h4 className="text-sm font-semibold text-[#101828] mb-2">
                    {product.name}
                </h4>

                {/* Details */}
                <div className="text-xs text-[#667085] space-y-1">
                    <div className="flex justify-between">
                        <span>Product type -</span>
                        <span>{product.type}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Quantity Stock -</span>
                        <span>{product.quantity}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>MRP -</span>
                        <span>₹ {product.mrp}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Selling Price -</span>
                        <span>₹ {product.sellingPrice}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Brand Name -</span>
                        <span>{product.brand}</span>
                    </div>

                    {/* NEW */}
                    <div className="flex justify-between">
                        <span>Total Number of images -</span>
                        <span>{product.images?.length || 0}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Exchange Eligibility -</span>
                        <span>
                            {product.exchangeEligible ? "YES" : "NO"}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={togglePublish}
                        className={`flex-1 py-2 rounded-md text-sm font-medium cursor-pointer text-white cursor-pointer
    ${product.published
                                ? "bg-[#52D407]"   // green (Unpublish)
                                : "bg-[#000FB4]"   // blue (Publish)
                            }
  `}
                    >
                        {product.published ? "Unpublish" : "Publish"}
                    </button>

                    <button
                        onClick={() => setShowEdit(true)}
                        className="flex-1 border border-[#D0D5DD] py-2 rounded-md text-sm cursor-pointer"
                    >
                        Edit
                    </button>
                    {showEdit && (
                        <EditProductModal
                            product={product}
                            onClose={() => setShowEdit(false)}
                            onSuccess={(msg) => {
                                setShowEdit(false);
                                refresh();
                                triggerToast(msg);
                            }}
                        />
                    )}

                    <button
                        onClick={() => setShowDelete(true)}
                        className="border border-[#D0D5DD] px-3 rounded-md flex items-center justify-center cursor-pointer"
                    >
                        <Trash2 size={16} className="text-[#667085]" />
                    </button>
                </div>
            </div>
            {/* Delete Modal */}
            {showDelete && (
                <DeleteProductModal
                    productName={product.name}
                    onClose={() => setShowDelete(false)}
                    onConfirm={remove}
                />
            )}
        </>
    );
}

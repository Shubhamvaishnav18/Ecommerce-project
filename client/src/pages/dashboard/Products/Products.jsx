import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import AddProductModal from "./AddProductModal";
import ProductCard from "./ProductCard";
import EmptyState from "./ProductEmptyState";
import Toast from "./Toast";
import ProductNavbar from "../../../components/productNavbar";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
    });
    const [search, setSearch] = useState("");

    const triggerToast = (message) => {
        setToast({ show: true, message });

        setTimeout(() => {
            setToast({ show: false, message: "" });
        }, 3000);
    };

    const fetchProducts = async () => {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col bg-white">
                <ProductNavbar showSearch searchValue={search}
                    onSearch={setSearch} />

                {/* Header */}
                <div className="px-4 md:px-10 py-4 md:py-6 flex items-center justify-between">
                    {products.length > 0 && (
                        <h2 className="text-lg font-semibold text-[#101828]">
                            Products
                        </h2>
                    )}

                    {products.length > 0 && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-sm font-medium text-[#344054] flex items-center gap-1 whitespace-nowrap"
                        >
                            + Add Products
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 px-4 md:px-10 pb-6 md:pb-10 overflow-y-auto">
                    {products.length === 0 ? (
                        <EmptyState onAdd={() => setShowModal(true)} />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {products
                                .filter((p) =>
                                    p.name.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((p) => (
                                    <ProductCard
                                        key={p._id}
                                        product={p}
                                        refresh={fetchProducts}
                                        triggerToast={triggerToast}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <AddProductModal
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        setShowModal(false);
                        fetchProducts();
                        triggerToast("Product added successfully");
                    }}
                />
            )}

            {/* Toast */}
            {toast.show && (
                <Toast
                    message={toast.message}
                    onClose={() => setToast({ show: false, message: "" })}
                />
            )}
        </div>
    );
}

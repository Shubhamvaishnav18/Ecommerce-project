import { X } from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";

export default function EditProductModal({
    product,
    onClose,
    onSuccess,
}) {
    const [form, setForm] = useState({
        name: product.name || "",
        type: product.type || "",
        quantity: product.quantity || "",
        mrp: product.mrp || "",
        sellingPrice: product.sellingPrice || "",
        brand: product.brand || "",
        exchangeEligible: product.exchangeEligible ? "Yes" : "No",
    });

    const [existingImages, setExistingImages] = useState(
        product.images || []
    );

    const imageInputRef = useRef(null);

    const submit = async () => {
        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.set(
            "exchangeEligible",
            form.exchangeEligible === "Yes"
        );

        // remaining old images
        existingImages.forEach((img) =>
            formData.append("existingImages", img)
        );

        // newly added images
        const files = imageInputRef.current?.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i]);
            }
        }

        await axios.put(
            `https://ecommerce-project-backend-wine.vercel.app/api/products/${product._id}`,
            formData
        );

        onSuccess("Product updated successfully");
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[480px] max-h-[90vh] rounded-xl shadow-xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E7EC]">
                    <h3 className="text-sm font-semibold text-[#344054]">
                        Edit Product
                    </h3>
                    <button onClick={onClose}>
                        <X size={18} className="text-[#344054] cursor-pointer" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-4 space-y-4 text-sm overflow-y-auto">

                    {[
                        ["Product Name", "name"],
                        ["Quantity Stock", "quantity"],
                        ["MRP", "mrp"],
                        ["Selling Price", "sellingPrice"],
                        ["Brand Name", "brand"],
                    ].map(([label, key]) => (
                        <div key={key}>
                            <label className="block text-xs text-[#344054] mb-1">
                                {label}
                            </label>
                            <input
                                value={form[key]}
                                onChange={(e) =>
                                    setForm({ ...form, [key]: e.target.value })
                                }
                                className="w-full border border-[#E4E7EC] rounded-md px-3 py-2"
                            />
                        </div>
                    ))}

                    {/* Product Type */}
                    <div>
                        <label className="block text-xs text-[#344054] mb-1">
                            Product Type
                        </label>
                        <select
                            value={form.type}
                            onChange={(e) =>
                                setForm({ ...form, type: e.target.value })
                            }
                            className="w-full border border-[#E4E7EC] rounded-md px-3 py-2"
                        >
                            <option>Foods</option>
                            <option>Electronics</option>
                            <option>Clothes</option>
                            <option>Beauty Products</option>
                            <option>Others</option>
                        </select>
                    </div>

                    {/* Upload Images */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-xs text-[#344054]">
                                Upload Product Images
                            </label>
                            <button
                                type="button"
                                className="text-xs text-[#344054]"
                                onClick={() => imageInputRef.current.click()}
                            >
                                Add More Photos
                            </button>
                        </div>

                        <div className="border border-dashed border-[#E4E7EC] rounded-md p-4">
                            <div className="flex gap-3 flex-wrap">

                                {/* Existing images */}
                                {existingImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-16 h-16 border border-[#DCDFE3] rounded-md overflow-hidden"
                                    >
                                        <img
                                            src={`https://ecommerce-project-backend-wine.vercel.app/uploads/${img}`}
                                            className="w-full h-full object-contain"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setExistingImages(
                                                    existingImages.filter((_, i) => i !== idx)
                                                )
                                            }
                                            className="absolute -top-0 -right-0 bg-white border rounded-full p-0.5"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}

                                {/* New selected images preview */}
                                {imageInputRef.current &&
                                    Array.from(imageInputRef.current.files || []).map(
                                        (file, idx) => (
                                            <div
                                                key={idx}
                                                className="w-16 h-16 border rounded-md overflow-hidden"
                                            >
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )
                                    )}
                            </div>

                            <input
                                ref={imageInputRef}
                                type="file"
                                multiple
                                hidden
                                accept="image/*"
                            />
                        </div>
                    </div>


                    {/* Exchange */}
                    <div>
                        <label className="block text-xs text-[#344054] mb-1">
                            Exchange or return eligibility
                        </label>
                        <select
                            value={form.exchangeEligible}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    exchangeEligible: e.target.value,
                                })
                            }
                            className="w-full border border-[#E4E7EC] rounded-md px-3 py-2"
                        >
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#E4E7EC] flex justify-end">
                    <button
                        onClick={submit}
                        className="bg-[#000FB4] text-white px-6 py-2 rounded-md text-sm cursor-pointer"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

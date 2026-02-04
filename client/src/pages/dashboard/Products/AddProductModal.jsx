import { X } from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";

export default function AddProductModal({ onClose, onSuccess }) {
    const [form, setForm] = useState({
        name: "",
        type: "",
        quantity: "",
        mrp: "",
        sellingPrice: "",
        brand: "",
        exchangeEligible: "Yes",
    });

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

        const files = imageInputRef.current?.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i]);
            }
        }

        await axios.post(
            "https://ecommerce-project-backend-wine.vercel.app/api/products",
            formData
        );

        onSuccess();
    };


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[480px] max-h-[90vh] rounded-xl relative shadow-xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E7EC]">
                    <h3 className="text-sm font-semibold text-[#344054]">
                        Add Product
                    </h3>
                    <button onClick={onClose}>
                        <X className="text-[#344054] cursor-pointer" size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-4 space-y-4 text-sm overflow-y-auto">

                    {/* Product Name */}
                    <div>
                        <label className="block text-xs text-[#344054] mb-1">
                            Product Name
                        </label>
                        <input
                            placeholder="CakeZone Walnut Brownie"
                            className="w-full border border-[#E4E7EC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#07107466]"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    {/* Product Type */}
                    <div>
                        <label className="block text-xs text-[#344054] mb-1">
                            Product Type
                        </label>
                        <select
                            className="w-full border border-[#E4E7EC] rounded-md px-3 py-2 text-sm text-[#667085] focus:outline-none focus:ring-1 focus:ring-[#07107466]"
                            onChange={(e) =>
                                setForm({ ...form, type: e.target.value })
                            }
                        >
                            <option>Select product type</option>
                            <option>Foods</option>
                            <option>Electronics</option>
                            <option>Clothes</option>
                            <option>Beauty Products</option>
                            <option>Others</option>
                        </select>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-xs text-[#344054] mb-1">
                            Quantity Stock
                        </label>
                        <input
                            placeholder="Total numbers of Stock available"
                            className="w-full border border-[#E4E7EC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#07107466]"
                            onChange={(e) =>
                                setForm({ ...form, quantity: e.target.value })
                            }
                        />
                    </div>

                    {/* MRP */}
                    <div>
                        <label className="block text-xs text-[#344054] mb-1">
                            MRP
                        </label>
                        <input
                            placeholder="Total numbers of Stock available"
                            className="w-full border border-[#E4E7EC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#07107466]"
                            onChange={(e) =>
                                setForm({ ...form, mrp: e.target.value })
                            }
                        />
                    </div>

                    {/* Selling Price */}
                    <div>
                        <label className="block text-xs text-[#344054] mb-1">
                            Selling Price
                        </label>
                        <input
                            placeholder="Total numbers of Stock available"
                            className="w-full border border-[#E4E7EC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#07107466]"
                            onChange={(e) =>
                                setForm({ ...form, sellingPrice: e.target.value })
                            }
                        />
                    </div>

                    {/* Brand Name */}
                    <div>
                        <label className="block text-xs text-[#344054] mb-1">
                            Brand Name
                        </label>
                        <input
                            placeholder="Total numbers of Stock available"
                            className="w-full border border-[#E4E7EC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#07107466]"
                            onChange={(e) =>
                                setForm({ ...form, brand: e.target.value })
                            }
                        />
                    </div>

                    {/* Upload Images */}
                    {/* Upload Images */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs text-[#344054]">
                                Upload Product Images
                            </label>

                            <button
                                type="button"
                                onClick={() => imageInputRef.current.click()}
                                className="text-xs text-[#344054]"
                            >
                                Add More Photos
                            </button>
                        </div>

                        <div
                            className="border border-dashed border-[#E4E7EC] rounded-md p-4 cursor-pointer"
                            onClick={() => imageInputRef.current.click()}
                        >
                            {!imageInputRef.current ||
                                imageInputRef.current.files.length === 0 ? (
                                <div className="text-center text-xs text-[#667085]">
                                    Enter Description
                                    <br />
                                    <span className="text-[#344054] font-medium">
                                        Browse
                                    </span>
                                </div>
                            ) : (
                                <div className="flex gap-3 flex-wrap">
                                    {Array.from(imageInputRef.current.files).map(
                                        (file, index) => (
                                            <div
                                                key={index}
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
                            )}

                            <input
                                ref={imageInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                hidden
                            />
                        </div>
                    </div>



                    {/* Exchange Eligibility */}
                    <div>
                        <label className="block text-xs text-[#344054] mb-1">
                            Exchange or return eligibility
                        </label>
                        <select
                            className="w-full border border-[#E4E7EC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#07107466]"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    exchangeEligible: e.target.value,
                                })
                            }
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
                        className="bg-[#000FB4] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#000da0] cursor-pointer"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

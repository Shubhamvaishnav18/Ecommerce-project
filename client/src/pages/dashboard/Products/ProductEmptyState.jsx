import emptyIcon from "../../../assets/images/emptyicon.png";

export default function ProductEmptyState({ onAdd }) {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <img
                    src={emptyIcon}
                    alt="Empty"
                    className="mb-5 w-16 h-16"
                />

                {/* Title */}
                <h3 className="text-[15px] font-semibold text-[#344054] mb-1">
                    Feels a little empty over here…
                </h3>

                {/* Description */}
                <p className="text-[13px] text-[#98A2B3] leading-relaxed max-w-xs">
                    You can create products without connecting store
                    <br />
                    you can add products to store anytime
                </p>

                {/* Button */}
                <button
                    onClick={onAdd}
                    className="mt-6 w-56 bg-[#000FB4] text-white py-2.5 rounded-md text-sm font-medium hover:bg-[#000da0] transition cursor-pointer"
                >
                    Add your Products
                </button>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import emptyIcon from "../../assets/images/emptyicon.png";
import ProductCard from "./Products/ProductCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("published");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const publishedProducts = products.filter(
    (p) => p.published
  );

  const unpublishedProducts = products.filter(
    (p) => !p.published
  );

  const activeProducts =
    activeTab === "published"
      ? publishedProducts
      : unpublishedProducts;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col bg-white">
        <Navbar />

        {/* Tabs */}
        <div className="px-4 md:px-10 pt-4 md:pt-6 border-b border-gray-200">
          <div className="flex gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab("published")}
              className={`pb-2 transition ${activeTab === "published"
                  ? "text-[#101828] border-b-2 border-blue-600"
                  : "text-[#98A2B3]"
                }`}
            >
              Published ({publishedProducts.length})
            </button>

            <button
              onClick={() => setActiveTab("unpublished")}
              className={`pb-2 transition ${activeTab === "unpublished"
                  ? "text-[#101828] border-b-2 border-blue-600"
                  : "text-[#98A2B3]"
                }`}
            >
              Unpublished ({unpublishedProducts.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 md:px-10 py-6 overflow-y-auto">
          {activeProducts.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-sm">
                <img
                  src={emptyIcon}
                  alt="Empty"
                  className="mx-auto mb-4 w-14 h-14"
                />

                <h3 className="text-base font-semibold text-[#101828]">
                  {activeTab === "published"
                    ? "No Published Products"
                    : "No Unpublished Products"}
                </h3>

                <p className="text-sm text-[#98A2B3] mt-1">
                  {activeTab === "published"
                    ? "Your Published Products will appear here"
                    : "Your Unpublished Products will appear here"}
                  <br />
                  Create your first product to publish
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {activeProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  refresh={fetchProducts}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

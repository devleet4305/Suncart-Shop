import ProductCard from "@/app/components/ProductCard";
import products from "@/data/products.json";

export const metadata = {
  title: "Products – SunCart",
  description: "Browse all summer essentials at SunCart",
};

export default function ProductsPage() {
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Summer Essentials 🌞
          </h1>
          <p className="text-white/90 text-lg">
            Everything you need for the perfect summer
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <span
              key={cat}
              className="bg-white border border-orange-200 text-orange-600 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

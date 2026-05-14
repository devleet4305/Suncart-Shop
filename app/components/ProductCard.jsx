import Link from "next/link";

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="text-yellow-400 text-sm">
          {i < full ? "★" : i === full && half ? "½" : "☆"}
        </span>
      ))}
      <span className="text-gray-500 text-xs ml-1">({rating})</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden h-52">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-1">
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <div className="flex items-center justify-between mt-3">
          <span className="text-orange-500 font-extrabold text-xl">
            ${product.price.toFixed(2)}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

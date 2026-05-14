import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import products from "@/data/products.json";
import Link from "next/link";

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  return {
    title: product ? `${product.name} – SunCart` : "Product – SunCart",
  };
}

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="text-yellow-400 text-xl">
          {i < full ? "★" : i === full && half ? "½" : "☆"}
        </span>
      ))}
      <span className="text-gray-500 text-sm ml-2">({rating} / 5)</span>
    </div>
  );
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/login?redirect=/products/${id}`);
  }

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="text-orange-500 hover:underline font-medium"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-orange-500 transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-72 md:h-auto bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Details */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
                {product.name}
              </h1>

              <StarRating rating={product.rating} />

              <p className="text-gray-600 mt-4 leading-relaxed text-base">
                {product.description}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-4xl font-extrabold text-orange-500">
                  ${product.price.toFixed(2)}
                </span>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 0
                    ? `✓ In Stock (${product.stock} left)`
                    : "Out of Stock"}
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg">
                  🛒 Add to Cart
                </button>
                <button className="flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 px-6 rounded-full transition-colors">
                  ♡ Wishlist
                </button>
              </div>

              <Link
                href="/products"
                className="mt-6 text-sm text-gray-400 hover:text-orange-500 transition-colors inline-flex items-center gap-1"
              >
                ← Back to all products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

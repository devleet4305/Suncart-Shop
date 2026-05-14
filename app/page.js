import Link from "next/link";
import HeroSlider from "./components/HeroSlider";
import ProductCard from "./components/ProductCard";
import products from "@/data/products.json";

const popularProducts = products.slice(0, 3);

const summerTips = [
  {
    icon: "🧴",
    title: "Apply Sunscreen Daily",
    tip: "Use SPF 30+ sunscreen every morning, even on cloudy days. Reapply every 2 hours when outdoors.",
  },
  {
    icon: "💧",
    title: "Stay Hydrated",
    tip: "Drink at least 8 glasses of water daily. Carry a reusable water bottle to stay refreshed all day.",
  },
  {
    icon: "🕶️",
    title: "Protect Your Eyes",
    tip: "Wear UV-blocking sunglasses to shield your eyes from harmful rays that can cause cataracts.",
  },
  {
    icon: "👒",
    title: "Cover Up Smart",
    tip: "Wear lightweight, light-colored clothing and a wide-brim hat to reflect heat and protect skin.",
  },
];

const brands = [
  { name: "SunShade", emoji: "🕶️", tagline: "Premium UV Protection" },
  { name: "GlowGuard", emoji: "🧴", tagline: "Skincare Experts" },
  { name: "WaveRider", emoji: "🏄", tagline: "Beach Lifestyle" },
  { name: "CoastalCarry", emoji: "👜", tagline: "Summer Accessories" },
];

export default function Home() {
  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Popular Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Trending This Summer
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
              🔥 Popular Products
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Hand-picked summer essentials loved by thousands of customers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Expert Advice
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
              ☀️ Summer Care Tips
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Stay safe and healthy all summer long with these essential tips
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {summerTips.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-800 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Trusted Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
              🏆 Top Brands
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We partner with the best brands to bring you quality summer products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map((brand, i) => (
              <div
                key={i}
                className="border-2 border-orange-100 rounded-2xl p-6 text-center hover:border-orange-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {brand.emoji}
                </div>
                <h3 className="font-bold text-gray-800 text-lg">{brand.name}</h3>
                <p className="text-gray-400 text-xs mt-1">{brand.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-400 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready for Summer? 🌞
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of happy customers and gear up for the best summer yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition-colors shadow-lg"
            >
              Create Account
            </Link>
            <Link
              href="/products"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

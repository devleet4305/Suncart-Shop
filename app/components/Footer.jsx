import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">☀️</span>
              <span className="text-white font-extrabold text-xl">SunCart</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop summer essentials store. Stay cool, stay stylish,
              and enjoy the sun safely.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-orange-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-orange-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-orange-400 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>support@suncart.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+1 (800) SUN-CART</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Miami Beach, FL 33139</span>
              </li>
            </ul>
          </div>

          {/* Social & Policy */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors text-sm"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors text-sm"
              >
                ig
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors text-sm"
              >
                tw
              </a>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SunCart Essential Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

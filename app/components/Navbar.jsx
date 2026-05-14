"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-yellow-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="text-white font-extrabold text-xl tracking-tight">
              SunCart
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-white font-medium hover:text-yellow-100 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-white font-medium hover:text-yellow-100 transition-colors"
            >
              Products
            </Link>
            {session?.user && (
              <Link
                href="/my-profile"
                className="text-white font-medium hover:text-yellow-100 transition-colors"
              >
                My Profile
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-white/30 animate-pulse" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <Link href="/my-profile" className="flex items-center gap-2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white text-orange-500 flex items-center justify-center font-bold text-sm border-2 border-white">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-white font-medium text-sm hidden lg:block">
                    {session.user.name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-orange-500 font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-orange-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-white font-medium hover:text-yellow-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-orange-500 font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-orange-50 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-orange-400">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-white font-medium hover:text-yellow-100 px-2"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-white font-medium hover:text-yellow-100 px-2"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              {session?.user && (
                <Link
                  href="/my-profile"
                  className="text-white font-medium hover:text-yellow-100 px-2"
                  onClick={() => setMenuOpen(false)}
                >
                  My Profile
                </Link>
              )}
              <div className="border-t border-orange-400 pt-3 mt-1">
                {session?.user ? (
                  <div className="flex items-center justify-between px-2">
                    <span className="text-white text-sm">{session.user.name}</span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="bg-white text-orange-500 font-semibold px-4 py-1.5 rounded-full text-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3 px-2">
                    <Link
                      href="/login"
                      className="text-white font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-white text-orange-500 font-semibold px-4 py-1.5 rounded-full text-sm"
                      onClick={() => setMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

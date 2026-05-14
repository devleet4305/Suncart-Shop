"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Pre-fill form once session loads
  if (!isPending && session?.user && !initialized) {
    setForm({
      name: session.user.name || "",
      image: session.user.image || "",
    });
    setInitialized(true);
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.push("/login?redirect=/my-profile/update");
    return null;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const result = await updateUser({
        name: form.name.trim(),
        image: form.image.trim() || undefined,
      });
      if (result?.error) {
        toast.error(result.error.message || "Update failed");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/my-profile");
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 animate__animated animate__fadeInUp">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">✏️</div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              Update Profile
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Change your name or profile photo
            </p>
          </div>

          {/* Current Avatar Preview */}
          <div className="flex justify-center mb-6">
            {form.image ? (
              <img
                src={form.image}
                alt="Preview"
                className="w-20 h-20 rounded-full border-4 border-orange-200 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-orange-200 bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Profile Photo URL{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="image"
                name="image"
                type="url"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Information"}
            </button>
          </form>

          <div className="text-center mt-5">
            <Link
              href="/my-profile"
              className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
            >
              ← Back to Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

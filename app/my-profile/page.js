import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata = {
  title: "My Profile – SunCart",
};

export default async function MyProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?redirect=/my-profile");
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Cover */}
          <div className="h-24 bg-gradient-to-r from-orange-500 to-yellow-400" />

          {/* Avatar & Info */}
          <div className="px-8 pb-8">
            <div className="-mt-12 mb-6 flex items-end justify-between">
              <div>
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-orange-500 flex items-center justify-center text-white text-3xl font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <Link
                href="/my-profile/update"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full text-sm transition-colors shadow-md"
              >
                ✏️ Update Info
              </Link>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                  Full Name
                </p>
                <p className="text-gray-800 font-semibold text-lg">{user.name}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                  Email Address
                </p>
                <p className="text-gray-800 font-semibold">{user.email}</p>
              </div>

              {user.image && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                    Profile Photo
                  </p>
                  <a
                    href={user.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 text-sm hover:underline break-all"
                  >
                    {user.image}
                  </a>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                  Member Since
                </p>
                <p className="text-gray-800 font-semibold">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link
            href="/products"
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-3xl mb-2">🛍️</div>
            <p className="font-semibold text-gray-800 text-sm">Browse Products</p>
          </Link>
          <Link
            href="/my-profile/update"
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-3xl mb-2">⚙️</div>
            <p className="font-semibold text-gray-800 text-sm">Update Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

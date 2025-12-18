export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  loading,
  error,
  formErrors,
  activeTab,
  onForgotPassword,
}) {
  return (
    <>
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-6">
        <label className="text-sm font-semibold text-gray-800 block mb-1">Email</label>
        <input
          className="w-full p-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-500 text-gray-700 transition shadow-md"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!formErrors.email}
          aria-describedby={formErrors.email ? "email-error" : undefined}
          required
        />
        {formErrors.email && (
          <p id="email-error" className="text-xs text-red-600 mt-1">
            {formErrors.email}
          </p>
        )}

        <label className="text-sm font-semibold text-gray-800 block mb-1 mt-4">
          Password
        </label>
        <input
          className="w-full p-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-500 text-gray-700 transition shadow-md"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!formErrors.password}
          aria-describedby={formErrors.password ? "password-error" : undefined}
          required
        />
        {formErrors.password && (
          <p id="password-error" className="text-xs text-red-600 mt-1">
            {formErrors.password}
          </p>
        )}

        <div className="flex justify-end mt-2">
          {(activeTab === "student" || activeTab === "teacher") && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              Forgot password?
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2.5 rounded-lg font-semibold text-sm transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </>
  );
}
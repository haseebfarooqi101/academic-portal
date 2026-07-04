import { useRouter } from "next/router";

export default function AccountCreatedSuccess({ userType = "Student", onClose }) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/Login");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4 z-50">
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 bg-white w-full max-w-md shadow-2xl rounded-2xl p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {userType} Account created successfully!
          </h2>
          <p className="text-sm text-gray-600">
            You can now sign in to your account!
          </p>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full text-white font-semibold transition shadow-md hover:shadow-lg"
          style={{
            height: '44px',
            backgroundColor: '#8A36D0',
            paddingTop: '12px',
            paddingRight: '16px',
            paddingBottom: '12px',
            paddingLeft: '16px',
            borderRadius: '8px'
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

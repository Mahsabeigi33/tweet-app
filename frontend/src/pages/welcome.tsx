import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus ,LogInIcon} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { api } from "../lib/api";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const res = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <div className="text-center bg-white p-8 rounded-xl shadow-md w-[600px]">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 text-white p-3 rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="w-12 h-12" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-1">Welcome</h3>
        <p className="text-gray-500 text-sm mb-6">Get started with your account</p>

        <div className="space-y-3">
          <Button className="w-full" onClick={() => navigate("/signup")}>
            <UserPlus className="w-4 h-4 mr-2" />
            Sign Up
          </Button>
          <Button
            className="w-full border border-blue-600 text-blue-600 bg-white hover:bg-blue-50"
            variant="outline"
            onClick={() => navigate("/signin")}>
          
            <LogInIcon className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <div className="pt-2 border-t border-gray-200">
          <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Google Sign-In failed")}
        />
</div>

        </div>
      </div>
    </div>
  );
}

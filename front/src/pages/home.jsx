import { SignInButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">💰 App de Gestão de Gastos</h1>
      <SignInButton mode="modal" redirectUrl="/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Fazer Login
        </button>
      </SignInButton>
    </div>
  );
}

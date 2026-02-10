import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AnimatedBorderContainer from "../components/AnimatedBorderContainer";
import { Lock, Mail, MessageCircleIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    signUp(formData);
  };
  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-3xl md:h-140 h-130 ">
        <AnimatedBorderContainer>
          <div className="w-full h-full flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-2 md:mb-4">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 md:space-y-4"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="">
                      Full Name
                    </label>
                    <div className="relative w-full">
                      <UserIcon className="iconPosition" />
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        placeholder="John Doe"
                        className="inputStyle"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="">
                      Email
                    </label>
                    <div className="relative w-full">
                      <Mail className="iconPosition" />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="johndoe@gmail.com"
                        className="inputStyle"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="">
                      Password
                    </label>
                    <div className="relative w-full ">
                      <Lock className="iconPosition" />
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        placeholder="Your Password"
                        className="inputStyle"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn w-full bg-blue-500/50 rounded-lg hover:bg-blue-600/30 text-lg"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? "Creating Account..." : "Create Account"}
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <p className="bg-slate-400/10 text-blue-400 p-1 px-4 rounded-full border border-slate-400/20">
                      Already have an account?
                      <Link to={"/login"} className="ml-2 underline text-white">
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className="hidden md:w-1/2 md:flex items-center justify-center h-full p-4">
              <img
                src="/signupImage.png"
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </AnimatedBorderContainer>
      </div>
    </div>
  );
}

export default SignUpPage;

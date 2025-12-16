import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Apple } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImage from "figma:asset/b75b14f30055320d302fe5382f1cffa6a1290544.png";

interface LoginPageProps {
  onLoginSuccess: () => void;
  onSignUpClick: () => void;
}

export function LoginPage({ onLoginSuccess, onSignUpClick }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    onLoginSuccess();
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-red-50 flex items-center justify-center p-4 md:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 md:w-96 md:h-96 bg-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 md:w-[500px] md:h-[500px] bg-amber-200/30 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and Welcome Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <img src={logoImage} alt="Logo" className="w-16 h-16 md:w-20 md:h-20" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your StarKitchen account</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white/50 border-border/50 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-white/50 border-border/50 focus:bg-white transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="cursor-pointer text-sm">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-xl flex items-center justify-center gap-2 hover:from-yellow-600 hover:to-red-600 transition-all shadow-lg shadow-yellow-500/25"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/70 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="h-12 flex items-center justify-center gap-2 bg-white/50 hover:bg-white border border-border/50 rounded-xl transition-all"
            >
              <Chrome className="w-5 h-5" />
              <span className="hidden sm:inline">Google</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleSocialLogin("Apple")}
              className="h-12 flex items-center justify-center gap-2 bg-white/50 hover:bg-white border border-border/50 rounded-xl transition-all"
            >
              <Apple className="w-5 h-5" />
              <span className="hidden sm:inline">Apple</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Sign Up Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 text-sm text-muted-foreground"
        >
          Don&apos;t have an account?{' '}
          <button className="text-red-500 hover:text-red-600 transition-colors" onClick={onSignUpClick}>
            Sign up
          </button>
        </motion.p>

        {/* Featured Products Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-white/50"
        >
          <p className="text-sm text-muted-foreground mb-3 text-center">
            Join thousands of happy customers
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1648392345455-22bd0d2e0c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBibGVuZGVyfGVufDF8fHx8MTc2MTgzMTAyM3ww&ixlib=rb-4.1.0&q=80&w=400"
                alt="Kitchen product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1612455859448-ecf83d2b7e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwcG90cyUyMHBhbnN8ZW58MXx8fHwxNzYxODMxMDIzfDA&ixlib=rb-4.1.0&q=80&w=400"
                alt="Kitchen product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1669329606558-2dc9172d9f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwbXVnc3xlbnwxfHx8fDE3NjE4MzEwMjR8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="Kitchen product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
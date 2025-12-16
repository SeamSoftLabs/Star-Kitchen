import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Apple, User } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImage from "figma:asset/b75b14f30055320d302fe5382f1cffa6a1290544.png";

interface SignUpPageProps {
  onSignUpSuccess: () => void;
  onBackToLogin: () => void;
}

export function SignUpPage({ onSignUpSuccess, onBackToLogin }: SignUpPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    
    // Handle sign-up logic
    onSignUpSuccess();
  };

  const handleSocialSignUp = (provider: string) => {
    // Handle social sign-up
    console.log(`Sign up with ${provider}`);
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
          <h1 className="text-3xl md:text-4xl mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join StarKitchen today</p>
        </div>

        {/* Sign Up Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50"
        >
          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 bg-white/50 border-border/50 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-white/50 border-border/50 focus:bg-white transition-colors"
                  required
                  minLength={8}
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-white/50 border-border/50 focus:bg-white transition-colors"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed">
                I agree to the Terms & Conditions and Privacy Policy
              </Label>
            </div>

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-xl flex items-center justify-center gap-2 hover:from-yellow-600 hover:to-red-600 transition-all shadow-lg shadow-yellow-500/25"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/70 text-muted-foreground">Or sign up with</span>
            </div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleSocialSignUp("Google")}
              className="h-12 flex items-center justify-center gap-2 bg-white/50 hover:bg-white border border-border/50 rounded-xl transition-all"
            >
              <Chrome className="w-5 h-5" />
              <span className="hidden sm:inline">Google</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleSocialSignUp("Apple")}
              className="h-12 flex items-center justify-center gap-2 bg-white/50 hover:bg-white border border-border/50 rounded-xl transition-all"
            >
              <Apple className="w-5 h-5" />
              <span className="hidden sm:inline">Apple</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Login Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 text-sm text-muted-foreground"
        >
          Already have an account?{' '}
          <button 
            onClick={onBackToLogin}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            Sign in
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
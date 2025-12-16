import { motion } from "motion/react";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface EditProfilePageProps {
  onClose: () => void;
}

export function EditProfilePage({ onClose }: EditProfilePageProps) {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    bio: "Kitchen enthusiast and home chef",
  });

  const handleSave = () => {
    // Handle save logic
    onClose();
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border/50 px-4 py-4 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-lg">Edit Profile</h1>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-black/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-32">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 mb-8 flex flex-col items-center"
        >
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 p-2 bg-gradient-to-br from-yellow-500 to-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">Change profile picture</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-2xl p-6 border border-border/50">
            <h3 className="text-sm mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="mt-1.5"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border/50">
            <h3 className="text-sm mb-4">Account Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-xl border border-border hover:bg-accent transition-colors">
                <p className="text-sm">Change Password</p>
                <p className="text-xs text-muted-foreground">Update your password</p>
              </button>
              <button className="w-full p-3 text-left rounded-xl border border-red-200 hover:bg-red-50 transition-colors text-red-600">
                <p className="text-sm">Delete Account</p>
                <p className="text-xs">Permanently remove your account</p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
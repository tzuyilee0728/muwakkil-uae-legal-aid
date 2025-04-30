
import React, { useState } from 'react';
import { User, Check, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';

interface ProfileSectionProps {
  initialProfile: {
    name: string;
    email: string;
    phone: string;
    notifications: {
      email: boolean;
      push: boolean;
    }
  };
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ initialProfile }) => {
  const { toast } = useToast();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (type: 'email' | 'push', checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked
      }
    }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
      
      toast({
        title: "Image Uploaded",
        description: "Your profile picture has been updated",
      });
    }
  };

  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      {isEditingProfile ? (
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="flex items-center mb-4">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center ${profileImage ? '' : 'bg-muwakkil-purple bg-opacity-20 text-muwakkil-purple dark:bg-muwakkil-purple/40'}`}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={28} />
                )}
              </div>
              <label htmlFor="profile-image" className="absolute -right-1 -bottom-1 bg-muwakkil-purple text-white rounded-full p-1 cursor-pointer hover:bg-muwakkil-purple/90">
                <Upload size={12} />
                <input 
                  type="file" 
                  id="profile-image" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div className="ml-4 flex-1">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={profile.name} 
                  onChange={handleProfileChange} 
                  className="max-w-sm"
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              value={profile.email} 
              onChange={handleProfileChange} 
              className="max-w-sm"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              name="phone"
              value={profile.phone} 
              onChange={handleProfileChange} 
              className="max-w-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="bg-muwakkil-purple hover:bg-muwakkil-purple/90">
              <Check className="mr-1 h-4 w-4" /> Save Changes
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsEditingProfile(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-muwakkil-purple bg-opacity-20 text-muwakkil-purple dark:bg-muwakkil-purple/40">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={28} />
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium dark:text-white">{profile.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
            <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">{profile.phone}</p>
          </div>
          <button 
            className="ml-auto px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            onClick={() => setIsEditingProfile(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;

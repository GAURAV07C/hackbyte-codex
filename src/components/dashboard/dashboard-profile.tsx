"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Building,
  GraduationCap,
  Briefcase,
  Camera,
  Save,
  X,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { ProfileUpdate } from "@/actions/userAction";
import { getUserById } from "@/data/user";
import { toast } from "@/hooks/use-toast";
// Define the user type
interface User {
  id: string;
  name: string | null;
  image: string | null;
  userName: string | null;
  role: string | null;
  Bio: string | null;
  company: string | null;
  linkedin: string | null;
  location: string | null;
  phone: string | null;
  collegeLocation: string | null;
  collegeName: string | null;
  currentYear: string | null;
  designation: string | null;
  website: string | null;
  email: string | null;
  emailVerified: Date | null;
  createdAt: Date | null;
}

const Profile = () => {
  const [user, setUser] = useState<User>({} as User);
  const { data: session } = useSession();

  const userId = session?.user.id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      const responce = await getUserById(userId);

     
      if (responce) {
        setUser(responce);
      }
    };

    fetchUser();
  }, [userId]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "",
    phone: user?.phone || "",
    location: user?.location || "",
    website: user?.website || "",
    linkedinUrl: user?.linkedin || "",
    company: user?.company || "",
    designation: user?.designation || "",
    college: user?.collegeName || "",
    collegeLocation: user?.collegeLocation || "",
    currentYear: user?.currentYear || "",
    bio: user?.Bio || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

 const handleSave = async () => {
   try {
     if (!userId) {
       console.error("User ID is missing");
       return;
     }
    //  console.log("Saving user data:", formData);
     await ProfileUpdate(formData,userId); // 🔧 Send to backend
     setIsEditing(false);
            toast({
              title: "Success",
              description: "Profile Updated Successfully",
            });
   
   } catch (error) {
     
     // toast.error("Failed to update profile."); // Optional toast
     toast({
      title: "Error",
      description: `Failed to update profile ${error}`,

     })
   }
 };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      image: user?.image || "",
      location: user?.location || "",
      website: user?.website || "",
      linkedinUrl: user?.linkedin || "",
      company: user?.company || "",
      designation: user?.designation || "",
      college: user?.collegeName || "",
      collegeLocation: user?.collegeLocation || "",
      currentYear: user?.currentYear || "",
      bio: user?.Bio || "",
    });
    setIsEditing(false);
  };

  console.log(user)

  const yearOptions = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Masters",
    "PhD",
    "Graduate",
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={user?.image || "/placeholder.svg"}
                  alt={user?.name || "User Avatar"}
                />
                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {user?.name}
                  </h2>
                  <p className="text-gray-400">
                    {user?.designation || "Student"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {user?.company || user?.collegeName}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-blue-600 text-white"
                    >
                      {user?.role || "User"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    {/* <div className="text-2xl font-bold text-blue-400">0</div>
                    <div className="text-xs text-gray-400">Webinars</div> */}
                  </div>
                  <div>
                    {/* <div className="text-2xl font-bold text-green-400">
                      ₹2,500
                    </div>
                    <div className="text-xs text-gray-400">Spent</div> */}
                  </div>
                  <div>
                    {/* <div className="text-2xl font-bold text-yellow-400">5</div>
                    <div className="text-xs text-gray-400">Certificates</div> */}
                  </div>
                  <div>
                    {/* <div className="text-2xl font-bold text-purple-400">
                      4.8
                    </div>
                    <div className="text-xs text-gray-400">Rating</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-gray-300 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="text-white mt-1">
                    {user?.name || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-gray-300 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    readOnly
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="text-white mt-1">
                    {user?.email || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className="text-gray-300 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Phone
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="text-white mt-1">
                    {user?.phone || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="location"
                  className="text-gray-300 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="text-white mt-1">
                    {user?.location || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="website"
                  className="text-gray-300 flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </Label>
                {isEditing ? (
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="text-white mt-1">
                    {user?.website ? (
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {user.website}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="linkedinUrl"
                  className="text-gray-300 flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn URL
                </Label>
                {isEditing ? (
                  <Input
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      handleInputChange("linkedinUrl", e.target.value)
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="https://linkedin.com/in/username"
                  />
                ) : (
                  <p className="text-white mt-1">
                    {user?.linkedin ? (
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {user.linkedin}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-white mt-1">
                    {user?.Bio || "No bio provided"}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional & Educational Information */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Professional & Educational Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Professional
                </h4>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="company" className="text-gray-300">
                      Company
                    </Label>
                    {isEditing ? (
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white mt-1">
                        {user?.company || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="designation" className="text-gray-300">
                      Designation
                    </Label>
                    {isEditing ? (
                      <Input
                        id="designation"
                        value={formData.designation}
                        onChange={(e) =>
                          handleInputChange("designation", e.target.value)
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white mt-1">
                        {user?.designation || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Educational
                </h4>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="college" className="text-gray-300">
                      College/University
                    </Label>
                    {isEditing ? (
                      <Input
                        id="college"
                        value={formData.college}
                        onChange={(e) =>
                          handleInputChange("college", e.target.value)
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white mt-1">
                        {user?.collegeName || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="collegeLocation" className="text-gray-300">
                      College Location
                    </Label>
                    {isEditing ? (
                      <Input
                        id="collegeLocation"
                        value={formData.collegeLocation}
                        onChange={(e) =>
                          handleInputChange("collegeLocation", e.target.value)
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white mt-1">
                        {user?.collegeLocation || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="currentYear" className="text-gray-300">
                      Current Year
                    </Label>
                    {isEditing ? (
                      <Select
                        value={formData.currentYear}
                        onValueChange={(value) =>
                          handleInputChange("currentYear", value)
                        }
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select your current year" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {yearOptions.map((year) => (
                            <SelectItem
                              key={year}
                              value={year}
                              className="text-white hover:bg-gray-600"
                            >
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-white mt-1">
                        {user?.currentYear || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
              <div className="text-gray-300">Webinars Completed</div>
              <div className="text-sm text-gray-400 mt-1">Keep learning!</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400 mb-2">5</div>
              <div className="text-gray-300">Certificates Earned</div>
              <div className="text-sm text-gray-400 mt-1">Great progress!</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">48</div>
              <div className="text-gray-300">Hours Learned</div>
              <div className="text-sm text-gray-400 mt-1">Time well spent!</div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Video, UserPlus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/data/user";
import { createInstructor } from "@/actions/instructorAction";

export function InstructorsCreate() {
  const [instructors, setInstructors] = useState<any[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  // Fetch users
  useEffect(() => {
    async function fetchInstructors() {
      const result = await getAllUsers();
      if (result && result.success && Array.isArray(result.data)) {
        setInstructors(result.data);
      }
    }
    fetchInstructors();
  }, []);

  const handleCreateInstructor = async () => {
    if (!selectedUserId || !title || !specialization || !bio) {
      alert("Please fill all fields");
      return;
    }

    const res = await createInstructor(
      {
        title,
        specialization,
        bio,
      },
      selectedUserId
    );
    console.log("res", res.success);
    if (res.success) {
      alert("Instructor created successfully!");

      // ✅ Reset form
      setSelectedUserId("");
      setTitle("");
      setSpecialization("");
      setBio("");
    } else {
      alert(res.message);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Instructor
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Video className="mr-2 h-5 w-5 text-red-400" />
              Create New Instructor
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {/* User select */}
              <div>
                <Label htmlFor="userId" className="text-gray-300">
                  Select User *
                </Label>
                <select
                  name="userId"
                  required
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="text-black w-full p-2 rounded"
                >
                  <option value="">Select User</option>
                  {instructors.map((user) => (
                    <option
                      className="text-black"
                      key={user.id}
                      value={user.id}
                    >
                      {user.name || user.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-gray-300">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                  placeholder="Enter instructor title"
                />
              </div>

              {/* Specialization */}
              <div>
                <Label htmlFor="specialization" className="text-gray-300">
                  Specialization *
                </Label>
                <Input
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                  placeholder="Enter specialization"
                />
              </div>

              {/* Bio */}
              <div className="col-span-2">
                <Label htmlFor="bio" className="text-gray-300">
                  Bio *
                </Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                  placeholder="Write bio..."
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateInstructor}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Instructor
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Video } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createWebniar } from "@/actions/webniarAction";
import { Textarea } from "@/components/ui/textarea";
import { getAllInstructors } from "@/actions/instructorAction";
import { useSession } from "next-auth/react";

export function WebinarsCreateScetion() {
  // Temporary local state for webinars management (replace with your actual data fetching logic)

  const { data: session } = useSession();
  const userId = session?.user?.id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [instructors, setInstructors] = useState<any[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<any | null>(
    null
  );

  const [newWebinar, setNewWebinar] = useState({
    title: "",
    instructor: "",
    instructorTitle: "",
    date: "",
    time: "",
    duration: "",
    description: "",
    category: "",
    level: "",
    maxAttendees: "",
    price: "Free",
    status: "UPCOMING" as
      | "UPCOMING"
      | "LIVE"
      | "COMPLETED"
      | "CANCELED"
      | undefined,
  });

  useEffect(() => {
    async function fetchInstructors() {
      const result = await getAllInstructors();
      if (result && result.success && Array.isArray(result.data)) {
        setInstructors(result.data);
      }
    }
    fetchInstructors();
  }, []);

 

  const handleCreateWebinar = async () => {
    if (
      !newWebinar.title ||
      !newWebinar.instructor ||
      !newWebinar.date ||
      !newWebinar.time
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await createWebniar(
        newWebinar,
        userId ?? "",
        selectedInstructor?.id
      );

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        setIsCreateDialogOpen(false);

        // Reset form
        setNewWebinar({
          title: "",
          instructor: "",
          instructorTitle: "",
          date: "",
          time: "",
          duration: "",
          description: "",
          category: "",
          level: "",
          maxAttendees: "",
          price: "Free",
          status: "UPCOMING",
        });
        setSelectedInstructor(null);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong while creating webinar!",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  return (
    <div>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create New Webinar
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Video className="mr-2 h-5 w-5 text-red-400" />
              Create New Webinar
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={newWebinar.title}
                  onChange={(e) =>
                    setNewWebinar((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                  placeholder="Enter webinar title"
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-gray-300">
                  Category *
                </Label>
                <Select
                  value={newWebinar.category}
                  onValueChange={(value) =>
                    setNewWebinar((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="instructor" className="text-gray-300">
                  Instructor Name *
                </Label>
                <select
                  name="userId"
                  required
                  value={selectedInstructor?.id || ""}
                  onChange={(e) => {
                    const instructor = instructors.find(
                      (inst) => inst.id === e.target.value
                    );
                    setSelectedInstructor(instructor || null);
                    // optionally, also set it into newWebinar
                    setNewWebinar((prev) => ({
                      ...prev,
                      instructor: instructor?.id || "",
                      instructorTitle: instructor?.title || "", // if your instructor has `title`
                    }));
                  }}
                  className="text-black w-full p-2 rounded"
                >
                  <option value="">Select User</option>
                  {instructors.map((instructor) => (
                    <option
                      className="text-black"
                      key={instructor.id}
                      value={instructor.id}
                    >
                      {instructor?.user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="instructorTitle" className="text-gray-300">
                  Instructor Title
                </Label>
                <Input
                  id="instructorTitle"
                  value={selectedInstructor?.title || ""}
                  onChange={(e) =>
                    setNewWebinar((prev) => ({
                      ...prev,
                      instructorTitle: e.target.value,
                    }))
                  }
                  className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                  placeholder="e.g., Senior Developer, Google"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date" className="text-gray-300">
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newWebinar.date}
                  onChange={(e) =>
                    setNewWebinar((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-gray-300">
                  Time *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newWebinar.time}
                  onChange={(e) =>
                    setNewWebinar((prev) => ({ ...prev, time: e.target.value }))
                  }
                  className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                />
              </div>
              <div>
                <Label htmlFor="duration" className="text-gray-300">
                  Duration
                </Label>
                <Input
                  id="duration"
                  value={newWebinar.duration}
                  onChange={(e) =>
                    setNewWebinar((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                  placeholder="e.g., 2 hours"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="level" className="text-gray-300">
                  Level
                </Label>
                <Select
                  value={newWebinar.level}
                  onValueChange={(value) =>
                    setNewWebinar((prev) => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="maxAttendees" className="text-gray-300">
                  Max Attendees
                </Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={newWebinar.maxAttendees}
                  onChange={(e) =>
                    setNewWebinar((prev) => ({
                      ...prev,
                      maxAttendees: e.target.value,
                    }))
                  }
                  className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                  placeholder="100"
                />
              </div>
              <div>
                <Label htmlFor="price" className="text-gray-300">
                  Price
                </Label>
                <Input
                  id="price"
                  value={newWebinar.price}
                  onChange={(e) =>
                    setNewWebinar((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                  placeholder="Free or $99"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                value={newWebinar.description}
                onChange={(e) =>
                  setNewWebinar((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                placeholder="Enter webinar description..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateWebinar}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Webinar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Webinar } from "@/types/webinar";

interface InstructorInfoProps {
  webinar: Webinar;
  size?: "sm" | "lg";
}

export function InstructorInfo({ webinar, size = "lg" }: InstructorInfoProps) {
  const avatarSize = size === "lg" ? "w-12 h-12" : "w-10 h-10";
  const nameSize =
    size === "lg"
      ? "font-semibold text-white"
      : "font-semibold text-white text-sm";
  const titleSize =
    size === "lg" ? "text-sm text-gray-400" : "text-xs text-gray-400";

  return (
    <div className="flex items-center mb-4">
      <Avatar className={`mr-3 ${avatarSize}`}>
        <AvatarImage src={webinar.instructorImage} alt={webinar.instructor} />
        <AvatarFallback>
          {webinar.instructor
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className={nameSize}>{webinar.instructor}</p>
        <p className={titleSize}>{webinar.instructorTitle}</p>
      </div>
    </div>
  );
}

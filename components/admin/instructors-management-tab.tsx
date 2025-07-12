"use client";

import { InstructorStas } from "./instructor/statsCopm";
import { InstructorsCreate } from "./instructor/instructorCreate";
export function InstructorsManagementTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Instructor Management
          </h1>
          <p className="text-gray-400 mt-1">
            Manage instructors, their profiles, and performance
          </p>
        </div>

        {/*  */}

        <InstructorsCreate />
      </div>
      {/*  */}

      {/* Search */}
      <InstructorStas />
    </div>
  );
}

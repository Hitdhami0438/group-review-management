"use client";

import MemberList from "@/components/member-list";
import React from "react";

const Member = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-4xl mx-auto border rounded-lg overflow-hidden shadow-lg">
        <MemberList />
      </div>
    </div>
  );
};

export default Member;

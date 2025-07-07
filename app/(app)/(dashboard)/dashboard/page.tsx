"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full w-full p-4">
      <section>
        <div className="flex text-2xl font-medium justify-center w-[20%] mb-4">
          Dashboard
        </div>
        <div className="flex gap-4">
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle>Groups</CardTitle>
              <CardDescription>In this platform many group</CardDescription>
            </CardHeader>
            <CardContent>0</CardContent>
          </Card>

          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle>Member</CardTitle>
              <CardDescription>In this platform many member</CardDescription>
            </CardHeader>
            <CardContent>0</CardContent>
          </Card>

          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle>Project</CardTitle>
              <CardDescription>Each group member can create a project</CardDescription>
            </CardHeader>
            <CardContent>0</CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

"use client";

import React from "react";
import { format } from "date-fns";
import { ContactRound } from "lucide-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMembers } from "@/hooks/dashboard/useMembers";
import { UserRole } from "@/app/generated/prisma";
import { toast } from "sonner";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./button";
import { group } from "console";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
}

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-background border text-muted-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export interface User {
  id: string;
  username: string;
  email: string;
  image: string;
  role: UserRole;
  createdAt: Date;
  group: { id: string; title: string; description: string }[];
}

interface MemberLineProps {
  user: User;
}

interface GroupType {
  id: string;
  title?: string;
  description?: string;
  createdAt?: Date;
}

export function HoverGroup({ group }: { group: GroupType }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{group.id ? "@Group Member" : ""}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{group.title}</h4>
            <p className="text-sm">
              {group.description}
            </p>
            <div className="text-muted-foreground text-xs">
              Joined {format(new Date(group.createdAt!), "MMM yyyy")}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/glass/svg?seed=${seed}`;

function MemberLine({ user }: MemberLineProps) {
  return (
    <div className="w-full flex items-center py-3 px-6 border-b hover:bg-sidebar/50 border-muted-foreground/5 text-sm last:border-b-0">
      <div className="flex-grow flex items-center gap-2 overflow-hidden">
        <div className="relative">
          <Avatar>
            <AvatarImage
              src={user.image ?? avatarUrl(user.id)}
              alt={user.username}
            />
            <AvatarFallback>{user.username?.[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-start overflow-hidden">
          <span className="font-medium truncate w-full">{user.username}</span>
          <span className="text-xs text-muted-foreground truncate w-full">
            {user.email}
          </span>
        </div>
      </div>
      <div className="w-32 shrink-0 text-xs text-muted-foreground">
        {user.role}
      </div>
      <div className="w-32 shrink-0 text-xs text-muted-foreground">
        {format(new Date(user.createdAt), "MMM yyyy")}
      </div>
      <div className="w-40 shrink-0 flex text-xs text-muted-foreground">
        {user.group.map((group) => (
          <HoverGroup key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

const MemberList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { data: users, isFetched, isError, error } = useMembers();

  if (isFetched) toast.success("Data fetch successfuly");
  if (isError) toast.error(error.message);

  return (
    <div
      ref={ref}
      className={cn(
        "w-full h-full bg-white dark:bg-black text-black dark:text-white transition-colors duration-300",
        className
      )}
      {...props}
    >
      <div className="bg-container px-6 py-1.5 text-sm flex items-center text-muted-foreground border-b sticky top-0 z-10">
        <div className="flex-grow">Name</div>
        <div className="w-32 shrink-0">Status</div>
        <div className="w-32 shrink-0">Joined</div>
        <div className="w-40 shrink-0">Teams</div>
      </div>
      <div className="w-full">
        {users?.map((user: any) => (
          <MemberLine key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
});
MemberList.displayName = "MemberList";

export default MemberList;

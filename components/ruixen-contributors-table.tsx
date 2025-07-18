"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { useGroups } from "@/hooks/dashboard/useGroups";
import { format } from "date-fns";
import { toast } from "sonner";

type Contributor = {
  name: string;
  email: string;
  avatar: string;
  role: string;
};

type Project = {
  id: string;
  title: string;
  repo: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "BLOCKED";
  team: string;
  tech: string;
  createdAt: string;
  contributors: Contributor[];
};

const allColumns = [
  "Project",
  "Repository",
  "Team",
  "Tech",
  "Created At",
  "Contributors",
  "Status",
] as const;

function ContributorsTable() {
  const { data: groups, isFetched, isError, error } = useGroups();

  // if (isFetched) toast.success("Grops fatch successfully");
  if (isError) toast.error(error.message ?? "Faield to fetch groups");

  const avatarUrl = (seed: string) =>
    `https://api.dicebear.com/9.x/glass/svg?seed=${seed}`;

  const data: Project[] = (groups ?? []).map((group: any) => ({
    id: group.id,
    title: group?.projectName,
    repo: group?.codeRepositoryUri,
    status: group?.groupProjectStatus,
    team: group?.teamName,
    tech: group?.projectTech,
    createdAt: group?.createdAt,
    contributors: group.groupMembers.map((member: any) => ({
      name: member.user?.username,
      email: member.user?.email,
      avatar: member.user?.image ?? avatarUrl(member.user.email),
      role: member.user.role,
    })),

    // contributors: [
    //   {
    //     name: group.groupMembers.map((member: any) => member.user.username),
    //     email: group.groupMembers.map((member: any) => member.user.email),
    //     avatar: group.groupMembers.map(
    //       (member: any) => member.user.image ?? avatarUrl(group.id)
    //     ),
    //     role: group.groupMembers.map((member: any) => member.user.role),
    //   },
    // ],
  }));

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    ...allColumns,
  ]);
  // const [statusFilter, setStatusFilter] = useState("");
  const [techFilter, setTechFilter] = useState("");

  const filteredData = data.filter((project) => {
    return (
      // (!statusFilter || project.status === statusFilter) &&
      !techFilter ||
      project.tech.toLowerCase().includes(techFilter.toLowerCase())
    );
  });

  // const toggleColumn = (col: string) => {
  //   setVisibleColumns((prev) =>
  //     prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
  //   );
  // };

  return (
    <div className="container my-10 space-y-4 p-4 border border-border rounded-lg bg-background shadow-sm overflow-x-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Filter by technology..."
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            className="w-48"
          />
          {/* <Input
            placeholder="Filter by status..."
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-48"
          /> */}
        </div>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {allColumns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col}
                checked={visibleColumns.includes(col)}
                onCheckedChange={() => toggleColumn(col)}
              >
                {col}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {visibleColumns.includes("Project") && (
              <TableHead className="w-[180px]">Project</TableHead>
            )}
            {visibleColumns.includes("Repository") && (
              <TableHead className="w-[220px]">Repository</TableHead>
            )}
            {visibleColumns.includes("Team") && (
              <TableHead className="w-[150px]">Team</TableHead>
            )}
            {visibleColumns.includes("Tech") && (
              <TableHead className="w-[150px]">Tech</TableHead>
            )}
            {visibleColumns.includes("Created At") && (
              <TableHead className="w-[120px]">Created At</TableHead>
            )}
            {visibleColumns.includes("Contributors") && (
              <TableHead className="w-[150px]">Contributors</TableHead>
            )}
            {visibleColumns.includes("Status") && (
              <TableHead className="w-[100px]">Status</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length ? (
            filteredData.map((project) => (
              <TableRow key={project.id}>
                {visibleColumns.includes("Project") && (
                  <TableCell className="font-medium whitespace-nowrap">
                    {project.title}
                  </TableCell>
                )}
                {visibleColumns.includes("Repository") && (
                  <TableCell className="whitespace-nowrap">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {/* {project.repo.replace("https://", "")} */}
                      <div className="whitespace-nowrap flex gap-0.5">
                        {project.repo ? (
                          <>
                            Code Repo <ExternalLink size="20px" />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </a>
                  </TableCell>
                )}
                {visibleColumns.includes("Team") && (
                  <TableCell className="whitespace-nowrap">
                    {project.team}
                  </TableCell>
                )}
                {visibleColumns.includes("Tech") && (
                  <TableCell className="whitespace-nowrap">
                    {project.tech}
                  </TableCell>
                )}
                {visibleColumns.includes("Created At") && (
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(project.createdAt), "MMM yyyy")}
                  </TableCell>
                )}
                {visibleColumns.includes("Contributors") && (
                  <TableCell className="min-w-[120px]">
                    <div className="flex -space-x-2">
                      <TooltipProvider>
                        {project.contributors.map((contributor, idx) => (
                          <Tooltip key={idx}>
                            <TooltipTrigger asChild>
                              <Avatar className="h-8 w-8 ring-2 ring-white hover:z-10">
                                <AvatarImage
                                  src={contributor.avatar}
                                  alt={contributor.name}
                                />
                                <AvatarFallback>
                                  {contributor.name[0]}
                                </AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent className="text-sm">
                              <p className="font-semibold">
                                {contributor.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {contributor.email}
                              </p>
                              <p className="text-xs italic">
                                {contributor.role}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </TableCell>
                )}
                {visibleColumns.includes("Status") && (
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      className={cn(
                        "whitespace-nowrap",
                        project.status === "ACTIVE" &&
                          "bg-green-500 text-white",
                        project.status === "INACTIVE" &&
                          "bg-gray-400 text-white",
                        project.status === "PENDING" &&
                          "bg-yellow-500 text-white",
                        project.status === "BLOCKED" && "bg-red-500 text-white"
                      )}
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length}
                className="text-center py-6"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ContributorsTable;

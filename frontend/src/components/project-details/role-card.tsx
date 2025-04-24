
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatData } from "@/lib/utils";

import {  MapPin, Users } from "lucide-react";

interface RoleCardProps {
  role: {
    id: string;
    projectId: string;
    role: string;
    description: string;
    count: number;
    isRemote: boolean;
    experienceLevel: string;
  };
  onApply: () => void;
}

export function RoleCard({ role, onApply }: RoleCardProps) {
  return (
    <Card className="overflow-hidden border-2  border-neutral-500 hover:border-blue-500 transition duration-300 ease-in-out  hover:shadow-md">
      <CardContent className="p-5">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-lg">{formatData(role.role)}</h4>
            <Badge
              
              className="bg-white text-black border-neutral-900 p-2"
            >
              {role.count} {role.count === 1 ? "position" : "positions"}
            </Badge>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <span className="font-bold ">{role.description?"Role Description":""}</span>
            <div className="text-md mt-2">{role.description}</div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{role.isRemote ? "Remote" : "Not remote"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{role.experienceLevel}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onApply} className="w-[20%] cursor-pointer  hover:bg-neutral-700 ">
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

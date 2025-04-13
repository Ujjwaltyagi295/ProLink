
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreVertical, UserPlus } from "lucide-react";
import {  useNavigate } from "react-router-dom";

interface DraftCardProps {
  
  project: {
    id: string;
    name: string;
    lastUpdated: string;
    createdBy: string;
  };
}

export const DraftCard = ({ project }: DraftCardProps) => {
  const navigate=useNavigate()
  return (
  
    <Card onClick={()=>navigate(`/projects/edit/${project.id}`)} className="rounded-2xl p-4 shadow-sm space-y-4 hover:bg-neutral-100 cursor-pointer">
   
   <div className="flex justify-between items-start">
     <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-6 w-6 text-muted-foreground"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
       >
         <rect width="18" height="18" x="3" y="3" rx="2" />
         <circle cx="8.5" cy="8.5" r="1.5" />
         <path d="M21 15l-5-5L5 21" />
       </svg>
     </div>

     <div className="flex items-center gap-2">
       <UserPlus className="w-5 h-5 text-muted-foreground" />
       <MoreVertical className="w-5 h-5 text-muted-foreground" />
     </div>
   </div>
   <h3 className="text-lg font-semibold">{project.name}</h3>

   <CardContent className="px-0 space-y-2 text-sm text-muted-foreground">
     <div className="flex justify-between">
       <span>Last Edit</span>
       <span className="text-foreground">{project.lastUpdated.split("T")[0]}</span>
     </div>
     <div className="flex items-center gap-2">
       <Avatar className="h-6 w-6">
         <AvatarFallback>P</AvatarFallback>
       </Avatar>
       <span className="text-foreground">{project.createdBy}</span>
     </div>
   </CardContent>
 </Card>
  );
};


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { Card, CardContent } from "@/components/ui/card"

interface memberProps{
member:{
  id: string;
  name: string;
  projectId: string;
  userId: string;
  username: string;
  roleId: string | null;
  isOwner: boolean;
  joinedAt: string;
}[]
}
export default function ProjectTeam({member}:memberProps) {
 
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Team</h2>
        <p className="text-gray-700 mb-6">
          Meet the talented individuals working on this project and see the roles we're currently looking to fill.
        </p>
      </div>

      {/* Current Team Members */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Current Team</h3>
          <Badge variant="outline" className="bg-gray-50">
            {member.length} members
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {member.map((member) => (
            <Card key={member.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={ "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{member.username}</h4>
                    <p className="text-sm text-gray-600">{member.isOwner?"Project Lead":""}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    
    </div>
  )
}

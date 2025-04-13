import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom";

export const CreateProjectPage = () => {
    const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-10 px-4 sm:px-6 lg:px-8">
  
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/dashboard/projects")}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to My Projects
      </Button>
    </div>

    <div className="space-y-1">
      <h1 className="text-3xl font-bold">Create a New Project</h1>
      <p className="text-muted-foreground text-sm">
        Start something amazing by creating a new project. Invite team members, describe your idea, and get started right away.
      </p>
    </div>

  </div>
  
  )
}

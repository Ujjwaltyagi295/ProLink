import * as React from "react"
import { PlusCircle } from "lucide-react"
import createImage from "../assets/images/library.png"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"

export function CreateJoinDialog() {
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState<"create" | "join">("create")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const renderForm = () => {
    return mode === "create" ? <CreateForm /> : <JoinForm />
  }

  const ToggleButtons = () => (
    <div className="flex gap-2 mt-4">
      <Button
        variant={mode === "create" ? "default" : "outline"}
        onClick={() => setMode("create")}
     
      >
        Create
      </Button>
      <Button
        variant={mode === "join" ? "default" : "outline"}
        onClick={() => setMode("join")}
        
      >
        Join
      </Button>
    </div>
  )

  const Title = mode === "create" ? "Create a Project" : "Join a Team"
  const Description =
    mode === "create"
      ? "Start your project by inviting team members and adding details."
      : "Join an existing project by entering an invite or browsing teams."

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="rounded-2xl max-w-[20rem] border p-6 flex flex-col items-center justify-center hover:shadow-md transition">
            <img src={createImage} alt="Create Project" className="w-32 h-32" />
            <p className="text-lg font-medium mt-4 flex items-center gap-2">
              Create Project / Join Team <PlusCircle size={16} />
            </p>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{Title}</DialogTitle>
            <DialogDescription>{Description}</DialogDescription>
          </DialogHeader>
          {ToggleButtons()}
          {renderForm()}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="rounded-2xl max-w-[20rem] border p-6 flex flex-col items-center justify-center hover:shadow-md transition">
          <img src={createImage} alt="Create Project" className="w-32 h-32" />
          <p className="text-lg font-medium mt-4 flex items-center gap-2">
            Create Project / Join Team <PlusCircle size={16} />
          </p>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{Title}</DrawerTitle>
          <DrawerDescription>{Description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          {ToggleButtons()}
          {renderForm()}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function CreateForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4 mt-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="projectName">Project Name</Label>
        <Input id="projectName" placeholder="e.g. AI Startup" />
      </div>
   
      <Button type="submit">Create Project</Button>
    </form>
  )
}

function JoinForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4 mt-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="inviteCode">Invite Code</Label>
        <Input id="inviteCode" placeholder="Enter team invite code" />
      </div>
      
      <Button type="submit">Request to Join</Button>
    </form>
  )
}

import ProjectForm from "@/components/project-form/projectForm";


export default function NewProjectPage() {
  return (
    <div className="container max-w-5xl py-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Create New Project</h1>
      <ProjectForm />
    </div>
  )
}

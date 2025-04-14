import  ProjectForm  from "@/components/project-form";


export default function ProjectFormPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Create Your Project</h1>
          <p className="text-lg text-slate-600">
            Fill in the details below to create a new project and find collaborators
          </p>
        </div>
        <ProjectForm/>
      </div>
    </div>
  )
}

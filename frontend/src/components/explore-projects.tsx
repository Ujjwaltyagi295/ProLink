import HeroSection from './explore-hero'
import { Navbar } from './navbar'
import { FeaturedProject } from './featured-projects'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProjectsSection } from './project-section'

export const ExploreProjects = () => {
  return (
    <div>
      <Navbar/>
      <div className="flex min-h-screen flex-col">
        <HeroSection/>
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Featured Project</h2>
              <Link to="/projects" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                View all featured
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="flex justify-center">
              <FeaturedProject/>
            </div>
          </div>
        </section>
        <ProjectsSection/>
      </div>
    </div>
  )
}

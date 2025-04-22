import HeroSection from "./explore-hero";
import { Navbar } from "../navbar";

import { ProjectsSection } from "./project-section";
import ExtensionCards from "./featured-cards";
export const ExploreProjects = () => {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col">
        <HeroSection />
        <section className="min-h-screen bg-zinc-50   text-black p-8">
          <div className="max-w-6xl  mx-auto">
            <h1 className="text-5xl font-bold text-center mb-2">Explore</h1>
            <p className="text-xl text-gray-500 text-center mb-16">
            Browse Projects. Find Your Role. Contribute.


            </p>

            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2">Featured</h2>
              <p className="text-gray-500 mb-8">
                Our top picks to get you started
              </p>

              <ExtensionCards />
            </div>
          </div>
        </section>
        <div className="bg-zinc-50">
      <ProjectsSection/>
        </div>
      </div>
    </div>
  );
};
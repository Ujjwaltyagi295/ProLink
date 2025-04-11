import { useState } from "react";

import { CreateJoinDialog } from "@/components/create-dialog";
import { ArrowRight } from "lucide-react";
const tabs = ["Hackathon", "Voting Hackathon", "Past Hackathon"];

export const MyProjectsPage = () => {
    const [activeTab, setActiveTab] = useState("Hackathon");
  
  return (
    <div className="p-6 space-y-10">
    {/* My Project Section */}
    <section>
      <h2 className="text-xl font-bold mb-4">My Project</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <CreateJoinDialog/>
      </div>
    </section>

    {/* My Hackathon Section */}
    <section>
      <h2 className="text-xl font-semibold mb-4">My Hackathon</h2>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              activeTab === tab
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Explore Hackathon Card */}
      <div className="rounded-2xl border p-6 flex justify-between items-center hover:shadow-md transition">
        <div>
          <h3 className="text-lg font-medium">Explore Hackathon</h3>
        </div>
        <ArrowRight />
      </div>
    </section>
  </div>

  )
}

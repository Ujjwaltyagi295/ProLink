import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { myprojects } from "@/lib/api";
import { capitalizeFirst, formatData } from "@/lib/utils";

export default function ProjectRequirements() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["getbyid", id],
    queryFn: () => myprojects.getById(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading requirements...</div>;

  const project = data;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Project Requirements</h2>
        <p className="text-gray-700 mb-6">
          We're looking for talented individuals to join our team and help
          develop this extension. Below are the roles we're currently recruiting
          for:
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-semibold mb-4">Additional Requirements</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project?.project?.timeCommitment ? (
            <div>
              <h4 className="font-medium text-gray-900">Time Commitment</h4>
              <p className="text-gray-600 mt-1">
                {formatData(project?.project?.timeCommitment)}
              </p>
            </div>
          ) : (
            ""
          )}
          {project?.project?.meetingFrequency ? (
            <div>
              <h4 className="font-medium text-gray-900">Meeting Frequency</h4>
              <p className="text-gray-600 mt-1">
                {capitalizeFirst(project?.project?.meetingFrequency)}
              </p>
            </div>
          ) : (
            ""
          )}
          {project?.project?.timezonePreference ? (
            <div>
              <h4 className="font-medium text-gray-900">Timezone Preference</h4>
              <p className="text-gray-600 mt-1">
                {capitalizeFirst(project?.project?.timezonePreference)}
              </p>
            </div>
          ) : (
            ""
          )}
         {project?.project?.hoursPerWeek? <div>
            <h4 className="font-medium text-gray-900">Hours Per Week</h4>
            <p className="text-gray-600 mt-1">
              {project?.project?.hoursPerWeek}
            </p>
          </div>:""}
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-900">Application Process</h4>
          <p className="text-gray-600 mt-1">
            {project?.project?.applicationProcess ||
              "Submit your application through the 'Apply now' button. Our team will review your profile and reach out for an initial interview if there's a good match."}
          </p>
        </div>
      </div>
    </div>
  );
}

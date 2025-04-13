import { CreateJoinDialog } from "@/components/create-dialog";
import { DraftCard } from "@/components/draf-cards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { getMyProject } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface DraftCardProps {
  id: string;
  name: string;
  lastUpdated: string;
  createdBy: string;
}

export const MyProjectsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["draftcards"],
    queryFn: getMyProject,
  });

  if (isLoading) {
    return <div className="p-6">Loading projects...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">Failed to load your projects.</div>
    );
  }

  return (
    <section className="w-full px-4 md:px-6 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Projects</h2>
      </div>

      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            <CarouselItem className="pl-4 md:basis-full lg:basis-1/3">
              <CreateJoinDialog />
            </CarouselItem>

            {data?.data.map((project: DraftCardProps) => (
              <CarouselItem
                key={project.id}
                className="pl-4 md:basis-full lg:basis-1/3"
              >
                <DraftCard project={project} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute -top-6 mr-10 right-0 hidden lg:flex gap-2 z-10">
            <CarouselPrevious className="h-8 w-8 rounded-full border shadow bg-white hover:bg-gray-50" />
            <CarouselNext className="h-8 w-8 rounded-full border shadow bg-white hover:bg-gray-50" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

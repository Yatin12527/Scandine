import { Skeleton } from "@/components/ui/skeleton";

export default function StackMenuSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex flex-col items-center gap-y-4 justify-center mb-8 mt-2">
        <Skeleton className="h-8 w-30 rounded-lg" />
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
      <div className="w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-12">
            <div className="space-y-4 mb-6">
              <Skeleton className="h-12 w-48 rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-6 w-3/4 rounded" />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Skeleton className="h-10 w-40 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Skeleton className="h-12 w-36 rounded-lg" />
      </div>
    </div>
  );
}

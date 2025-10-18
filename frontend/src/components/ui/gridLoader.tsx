import { Skeleton } from "@/components/ui/skeleton";

export default function GridMenuSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex flex-col items-center gap-y-4 justify-center mb-8 mt-2">
        <Skeleton className="h-8 w-30 rounded-lg" />
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col justify-between">
            <div className="space-y-3 mb-4">
              <Skeleton className="h-8 w-48 rounded-lg" />
              <Skeleton className="h-px w-full" />
            </div>
            <div className="space-y-4 mb-6">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
            {i === 2 && <Skeleton className="h-48 w-full rounded-lg mb-4" />}
            <div className="flex justify-center mt-auto">
              <Skeleton className="h-10 w-32 rounded-lg" />
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

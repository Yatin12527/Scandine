import { Skeleton } from "@/components/ui/skeleton";

export default function StackMenuSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex flex-col items-center gap-y-4 justify-center mb-8 mt-2">
        <Skeleton className="h-8 w-30 rounded-lg" />
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>

      {/* Menu sections */}
      <div className="w-full">
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <div key={item} className="flex justify-between items-start">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-32 rounded mb-2" />
                    <Skeleton className="h-4 w-full rounded" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded ml-4" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2].map((img) => (
                <Skeleton key={img} className="w-full h-64 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Skeleton className="h-12 w-36 rounded-lg" />
      </div>
    </div>
  );
}

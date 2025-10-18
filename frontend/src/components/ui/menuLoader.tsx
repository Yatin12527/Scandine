import { Skeleton } from "@/components/ui/skeleton";

export default function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-3xl overflow-hidden">
          <Skeleton className="h-64 w-full rounded-t-3xl" />
          <div className="p-6">
            <div className="flex items-center gap-4 mb-2">
              <Skeleton className="h-8 w-8 rounded-sm" />
              <Skeleton className="h-6 w-32" />
            </div>

            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-5 w-20 rounded-lg mb-5" />
            <div className="flex gap-4">
              <Skeleton className="h-10 flex-1 rounded-xl" />
              <Skeleton className="h-12 flex-1 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/ui/shared/Container";

const QuotePageSkeleton = () => {
  return (
    <div className="bg-[#F8F6F2] px-5 py-10 lg:px-10">
      <div className="flex justify-between gap-10">
        {/* Left */}
        <div className="flex w-full flex-col gap-4 lg:w-[65%]">
          {/* Header */}
          <div className="mb-2 flex items-center justify-between">
            <Skeleton className="h-7 w-40 bg-zinc-300" />
            <Skeleton className="h-4 w-32 bg-zinc-300" />
          </div>

          {/* Quote Items */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-[#EAE6DD] bg-white"
            >
              <div className="flex">
                {/* Image */}
                <Skeleton className="h-[220px] w-50 rounded-none bg-zinc-300" />

                {/* Content */}
                <div className="flex flex-1 justify-between gap-6 p-6">
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-6 w-52 bg-zinc-300" />

                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-24 rounded bg-zinc-300" />
                      <Skeleton className="h-6 w-28 rounded bg-zinc-300" />
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded bg-zinc-300" />
                      <Skeleton className="h-5 w-5 bg-zinc-300" />
                      <Skeleton className="h-8 w-8 rounded bg-zinc-300" />
                    </div>
                  </div>

                  {/* Price + actions */}
                  <div className="flex flex-col items-end justify-between">
                    <Skeleton className="h-8 w-28 bg-zinc-300" />

                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-20 rounded bg-zinc-300" />
                      <Skeleton className="h-9 w-24 rounded bg-zinc-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Notes */}
          <div className="rounded-2xl border border-[#EAE6DD] bg-white p-7">
            <Skeleton className="mb-4 h-4 w-32 bg-zinc-300" />
            <Skeleton className="h-28 w-full rounded-lg bg-zinc-300" />
            <Skeleton className="mt-4 h-10 w-28 rounded bg-zinc-300" />
          </div>
        </div>

        {/* Summary */}
        <div className="hidden w-[30%] lg:block">
          <div className="rounded-2xl border border-[#EAE6DD] bg-white p-7">
            <Skeleton className="h-6 w-40 bg-zinc-300" />

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 bg-zinc-300" />
                <Skeleton className="h-4 w-16 bg-zinc-300" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 bg-zinc-300" />
                <Skeleton className="h-4 w-20 bg-zinc-300" />
              </div>

              <Skeleton className="h-px w-full bg-zinc-300" />

              <div className="flex justify-between">
                <Skeleton className="h-6 w-20 bg-zinc-300" />
                <Skeleton className="h-7 w-28 bg-zinc-300" />
              </div>

              <Skeleton className="h-12 w-full rounded-lg bg-zinc-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePageSkeleton;
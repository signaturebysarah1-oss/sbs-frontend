export default function GalleryLoading() {
    return (
      <main className="bg-[#F8F6F2]">
        <div className="h-[420px] animate-pulse bg-[#E9E2D8]" />
  
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 h-10 w-64 animate-pulse rounded bg-[#E6DED3]" />
  
          <div className="grid auto-rows-[240px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`animate-pulse rounded-3xl bg-[#E6DED3] ${
                  i % 5 === 0
                    ? "row-span-2 lg:col-span-2"
                    : "row-span-1"
                }`}
              />
            ))}
          </div>
        </section>
      </main>
    );
  }
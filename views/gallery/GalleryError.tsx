export default function GalleryError() {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F8F6F2] px-6">
        <div className="max-w-md text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B5E3C]">
            Gallery
          </p>
  
          <h2 className="mt-4 font-display text-3xl font-bold text-[#1C1917]">
            Something went wrong
          </h2>
  
          <p className="mt-4 text-sm leading-7 text-[#78716C]">
            We couldn't load the gallery images right now. Please refresh the page
            and try again.
          </p>
  
          <button
            onClick={() => window.location.reload()}
            className="mt-8 rounded-full bg-[#1C1917] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
          >
            Reload Gallery
          </button>
        </div>
      </main>
    );
  }
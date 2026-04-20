interface InstructorData {
  name: string;
  title: string;
  bio: string;
  image: string;
  credentials: { point: string }[];
}

export default function Instructor({ data }: { data: InstructorData }) {
  return (
    <section className="py-20 px-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Profile Image */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <div className="absolute inset-0 bg-[#EF9F27]/20 rounded-full blur-2xl" />
          <img
            src={data.image}
            alt={data.name}
            width={192}
            height={192}
            className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white dark:border-zinc-900 shadow-xl"
          />
        </div>

        {/* Content */}
        <div className="text-center md:text-left">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#EF9F27]">
            The Instructor
          </p>
          <h2 className="mb-2 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {data.name}
          </h2>
          <p className="mb-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {data.title}
          </p>
          <p className="mb-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xl">
            {data.bio}
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {data.credentials.map((cred, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
                <span className="text-yellow-500">🏆</span>
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {cred.point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

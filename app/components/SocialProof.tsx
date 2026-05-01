type SocialProofProps = {
  data: {
    headline: string;
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
};

export default function ProfessionalSocialProof({ data }: SocialProofProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          className="text-4xl md:text-4xl font-semibold text-gray-900">
          {data.headline}
        </h2>

        <div className="mt-4 w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {data.stats.map((s, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {s.number}
              </p>
              <p className="mt-2 text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

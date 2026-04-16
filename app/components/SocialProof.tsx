export default function SocialProof({ data }: any) {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold">{data.headline}</h2>

      <div className="flex justify-center gap-8 mt-6">
        {data.stats.map((s: any, i: number) => (
          <div key={i}>
            <p className="text-2xl font-bold">{s.number}</p>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

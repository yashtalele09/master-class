export default function WhoIsThisFor({ data }: any) {
  return (
    <section className="section bg-white">
      <div className="container">
        <h2 className="text-center mb-12">{data.headline}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card border-l-4 border-green-500">
            <h3 className="text-green-600 mb-4">This Is For You If...</h3>
            <ul className="space-y-3">
              {data.audience.map((item: any, i: number) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  {item.point}
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-l-4 border-red-500">
            <h3 className="text-red-600 mb-4">This Is NOT For You If...</h3>
            <ul className="space-y-3">
              {data.not_for.map((item: any, i: number) => (
                <li key={i} className="flex items-center">
                  <span className="text-red-500 mr-2">❌</span>
                  {item.point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Footer({ data }: any) {
  return (
    <footer className="bg-black text-white text-center py-6">
      <p>{data.company_name}</p>
      <p className="text-sm text-gray-400">{data.tagline}</p>
      <p className="text-xs mt-2">{data.refund_policy}</p>
    </footer>
  );
}

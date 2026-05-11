export const metadata = {
  title: 'Sanity Studio',
  description: 'Sanity Studio for Masterclass Landing Page',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

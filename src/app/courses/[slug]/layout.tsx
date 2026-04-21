// Course detail layout
export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      {/* Course layout: sidebar with lessons list */}
      {children}
    </div>
  );
}

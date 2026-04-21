// Dashboard layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Dashboard layout: sidebar, header */}
      {children}
    </div>
  );
}

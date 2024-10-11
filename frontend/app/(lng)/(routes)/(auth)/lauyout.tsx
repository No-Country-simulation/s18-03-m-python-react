import Sidebar from "@/components/SideBar/SideBar";





export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Sidebar />
        {children}
      </body>
    </html>
  );
}

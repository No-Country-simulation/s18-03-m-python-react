import Sidebar from "@/components/organisms/SideBar/SideBar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: {
    default: "Painel Administrativo",
    template: "%s | Admin — Bem Viver Ecoterapia",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 lg:p-8" id="admin-main">
        {children}
      </main>
    </div>
  );
}

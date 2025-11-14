import { notFound } from "next/navigation";
import AdminDashboard from "@/app/features/admin/components/AdminDashboard";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    adminPath: string;
  };
}

export default function AdminPage({ params }: Props) {
  if (params.adminPath !== process.env.NEXT_PUBLIC_ADMIN_PATH) {
    notFound();
  }
  
  return <AdminDashboard />;
}

import { Layout, EclipseCirclesLayout, Nav } from "@/app/components";
import AdminLoginForm from "@/app/features/admin/components/AdminLoginForm";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

interface Props {
  params: {
    adminPath: string;
  };
}

export default function AdminLoginPage({ params }: Props) {
  if (params.adminPath !== process.env.NEXT_PUBLIC_ADMIN_PATH) {
    notFound();
  }

  return (
    <>
      <Nav navbarIsColored={true} />
      <EclipseCirclesLayout midLeftEclipse1 lastRightEclipse>
        <Layout className="pt-[8.5rem] pb-[4.25rem]">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl font-bold text-blue-80 mb-8">
              Admin Login
            </h1>
            <div className="w-full max-w-md">
              <AdminLoginForm />
            </div>
          </div>
        </Layout>
      </EclipseCirclesLayout>
    </>
  );
}

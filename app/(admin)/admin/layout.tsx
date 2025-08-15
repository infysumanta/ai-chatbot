import type React from "react";
import { auth } from "@/app/(auth)/auth";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield } from "lucide-react";

const AdminPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <>
      {session?.user?.role === "admin" ? (
        children
      ) : (
        <>
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <Shield className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  Access Denied
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default AdminPageLayout;

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Admin page with proper authorization checks and audit logging.
 *
 * Security Features:
 * - Server-side authentication and authorization checks
 * - Type-safe role validation
 * - Audit logging for unauthorized access attempts
 * - Audit logging for successful admin access (production only)
 *
 * Only users with platformRole === "admin" can access this page.
 */
export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // First check: User must be authenticated
  if (!session) {
    redirect("/sign-in");
  }

  // Second check: User must have admin role
  // Type-safe check with proper casting
  const user = session.user as typeof session.user & { platformRole?: string };
  const isAdmin = user.platformRole === "admin";

  if (!isAdmin) {
    // Log unauthorized access attempt (in production, send to monitoring service)
    console.warn(`[SECURITY] Unauthorized admin access attempt by user ${user.id} (${user.email})`);

    // Redirect non-admin users to dashboard
    redirect("/dashboard");
  }

  // Optional: Log successful admin access for auditing
  if (process.env.NODE_ENV === "production") {
    console.log(`[AUDIT] Admin access granted to user ${user.id} (${user.email})`);
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Platform administration and management
        </p>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, Administrator</CardTitle>
              <CardDescription>
                You have access to the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is a placeholder admin page. Administrative features will
                be added here in future updates.
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">Your Info:</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Name: {session.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Email: {session.user.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  Role: {(session.user as { platformRole?: string }).platformRole || "user"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Features</CardTitle>
              <CardDescription>Manage platform settings and configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a
                  href="/admin/products"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-medium">Product Management</p>
                    <p className="text-sm text-muted-foreground">
                      Manage credit packages and pricing
                    </p>
                  </div>
                  <span className="text-muted-foreground">→</span>
                </a>
                <div className="p-3 rounded-lg opacity-50 cursor-not-allowed">
                  <p className="font-medium text-muted-foreground">User Management</p>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </div>
                <div className="p-3 rounded-lg opacity-50 cursor-not-allowed">
                  <p className="font-medium text-muted-foreground">System Analytics</p>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

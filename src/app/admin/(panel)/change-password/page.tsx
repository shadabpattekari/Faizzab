import { ChangePasswordForm } from "@/components/admin/AuthForms";
import { Card, PageHeader } from "@/components/admin/AdminUI";

export default function ChangePasswordPage() {
  return (
    <>
      <PageHeader
        title="Change password"
        description="Changing your password securely ends all active sessions, including this one."
      />
      <Card className="max-w-2xl">
        <ChangePasswordForm />
      </Card>
    </>
  );
}

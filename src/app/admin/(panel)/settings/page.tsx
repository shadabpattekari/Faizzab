import { ApiForm } from "@/components/admin/ApiForm";
import { Card, EmptyState, Field, JsonTextarea, PageHeader } from "@/components/admin/AdminUI";
import { getSessionUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { PROTECTED_COMPANY_SETTING_KEYS } from "@/lib/admin/settings";

export default async function SettingsPage() {
  const [user, settings] = await Promise.all([
    getSessionUser(),
    prisma.siteSetting.findMany({ orderBy: { key: "asc" } }),
  ]);
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  return (
    <>
      <PageHeader
        title="Site settings"
        description="Manage contact details, social links, and structured site configuration. Values are stored as JSON."
      />
      <Card className="mb-6">
        <details>
          <summary className="cursor-pointer font-bold text-navy-950">Add or replace a setting</summary>
          <ApiForm
            action="/api/admin/settings"
            submitLabel="Save setting"
            successMessage="Setting saved."
            className="mt-5 space-y-5"
          >
            <Field label="Setting key" name="key" required maxLength={100} placeholder="socialLinks" />
            <JsonTextarea label="JSON value" name="value" value={{}} />
          </ApiForm>
        </details>
      </Card>
      <div className="space-y-4">
        {settings.length ? (
          settings.map((setting) => {
            const isProtected = PROTECTED_COMPANY_SETTING_KEYS.has(setting.key);
            return (
              <Card key={setting.id}>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <h2 className="font-mono text-sm font-bold text-navy-950">{setting.key}</h2>
                  {isProtected ? (
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
                      PROTECTED IDENTITY
                    </span>
                  ) : null}
                </div>
                {isProtected && !isSuperAdmin ? (
                  <>
                    <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-200">
                      {JSON.stringify(setting.value, null, 2)}
                    </pre>
                    <p className="mt-3 text-sm text-slate-500">
                      Only a Super Admin can change this company identity setting.
                    </p>
                  </>
                ) : (
                  <ApiForm action="/api/admin/settings" successMessage="Setting saved.">
                    <input type="hidden" name="key" value={setting.key} />
                    <JsonTextarea label="JSON value" name="value" value={setting.value} />
                  </ApiForm>
                )}
              </Card>
            );
          })
        ) : (
          <EmptyState>No settings found. Run the database seed script first.</EmptyState>
        )}
      </div>
    </>
  );
}

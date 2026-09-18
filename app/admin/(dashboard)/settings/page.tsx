import { AdminHeader } from "@/app/admin/_components/ui";
import { SettingsForm } from "@/app/admin/_components/forms/SettingsForm";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { saved?: string };
}) {
  const settings = await getSiteSettings();
  return (
    <>
      <AdminHeader
        title="Site settings"
        description="Company details, contact info, hours and social links used across the site, footer and SEO."
      />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <SettingsForm settings={settings} saved={searchParams.saved === "1"} />
      </div>
    </>
  );
}

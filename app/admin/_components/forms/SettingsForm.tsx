"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Plus, X } from "lucide-react";
import { Field, TextInput, TextArea, ListEditor, ImageField, SubmitButton, FormError } from "../fields";
import { saveSettings } from "@/app/admin/_actions/settings";
import type { ActionState } from "@/app/admin/_actions/helpers";
import type { SiteSettings } from "@/types/content";
import { SOCIAL_ICON_KEYS } from "@/types/content";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100";

function HoursEditor({ defaultValue }: { defaultValue: SiteSettings["hours"] }) {
  const [rows, setRows] = useState(defaultValue.length ? defaultValue : [{ days: "", time: "" }]);
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-ink-700">Business hours</span>
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              name="hoursDays"
              value={row.days}
              onChange={(e) => setRows((p) => p.map((r, idx) => (idx === i ? { ...r, days: e.target.value } : r)))}
              placeholder="Monday – Friday"
              className={inputBase}
            />
            <input
              name="hoursTime"
              value={row.time}
              onChange={(e) => setRows((p) => p.map((r, idx) => (idx === i ? { ...r, time: e.target.value } : r)))}
              placeholder="8:00 AM – 6:00 PM"
              className={inputBase}
            />
            <button
              type="button"
              onClick={() => setRows((p) => (p.length === 1 ? [{ days: "", time: "" }] : p.filter((_, idx) => idx !== i)))}
              className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-ink-200 text-ink-400 hover:border-red-300 hover:text-red-600"
              aria-label="Remove row"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setRows((p) => [...p, { days: "", time: "" }])}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
      >
        <Plus className="h-4 w-4" /> Add hours row
      </button>
    </div>
  );
}

function SocialsEditor({ defaultValue }: { defaultValue: SiteSettings["socials"] }) {
  const [rows, setRows] = useState(
    defaultValue.length ? defaultValue : [{ label: "", href: "", icon: SOCIAL_ICON_KEYS[0] as string }]
  );
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-ink-700">Social links</span>
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              name="socialLabel"
              value={row.label}
              onChange={(e) => setRows((p) => p.map((r, idx) => (idx === i ? { ...r, label: e.target.value } : r)))}
              placeholder="LinkedIn"
              className={cn(inputBase, "sm:w-40")}
            />
            <input
              name="socialHref"
              value={row.href}
              onChange={(e) => setRows((p) => p.map((r, idx) => (idx === i ? { ...r, href: e.target.value } : r)))}
              placeholder="https://linkedin.com/company/…"
              className={inputBase}
            />
            <select
              name="socialIcon"
              value={row.icon}
              onChange={(e) => setRows((p) => p.map((r, idx) => (idx === i ? { ...r, icon: e.target.value } : r)))}
              className={cn(inputBase, "appearance-none sm:w-36")}
            >
              {SOCIAL_ICON_KEYS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() =>
                setRows((p) =>
                  p.length === 1 ? [{ label: "", href: "", icon: SOCIAL_ICON_KEYS[0] as string }] : p.filter((_, idx) => idx !== i)
                )
              }
              className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-ink-200 text-ink-400 hover:border-red-300 hover:text-red-600"
              aria-label="Remove row"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setRows((p) => [...p, { label: "", href: "", icon: SOCIAL_ICON_KEYS[0] as string }])}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
      >
        <Plus className="h-4 w-4" /> Add social link
      </button>
    </div>
  );
}

export function SettingsForm({ settings, saved }: { settings: SiteSettings; saved?: boolean }) {
  const [state, formAction] = useFormState<ActionState, FormData>(saveSettings, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      {saved && !state.error && (
        <p className="rounded-xl bg-accent-50 px-4 py-3 text-sm font-medium text-accent-700 ring-1 ring-inset ring-accent-100">
          Settings saved.
        </p>
      )}
      <FormError error={state.error} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company name" htmlFor="name" required error={fe.name}>
          <TextInput name="name" defaultValue={settings.name} required />
        </Field>
        <Field label="Short name" htmlFor="shortName" required error={fe.shortName}>
          <TextInput name="shortName" defaultValue={settings.shortName} required />
        </Field>
      </div>

      <Field label="Legal name" htmlFor="legalName" required error={fe.legalName}>
        <TextInput name="legalName" defaultValue={settings.legalName} required />
      </Field>

      <Field label="Tagline" htmlFor="tagline" required error={fe.tagline}>
        <TextInput name="tagline" defaultValue={settings.tagline} required />
      </Field>

      <Field label="Short description" htmlFor="description" required error={fe.description}>
        <TextArea name="description" defaultValue={settings.description} rows={2} required />
      </Field>

      <Field label="Long description" htmlFor="longDescription" required error={fe.longDescription}>
        <TextArea name="longDescription" defaultValue={settings.longDescription} rows={3} required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Website URL" htmlFor="url" required error={fe.url}>
          <TextInput name="url" defaultValue={settings.url} placeholder="https://bojtechnologies.com" required />
        </Field>
        <Field label="Location" htmlFor="location" required error={fe.location}>
          <TextInput name="location" defaultValue={settings.location} required />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Primary email" htmlFor="email" required error={fe.email}>
          <TextInput name="email" type="email" defaultValue={settings.email} required />
        </Field>
        <Field label="Sales email" htmlFor="salesEmail" error={fe.salesEmail}>
          <TextInput name="salesEmail" type="email" defaultValue={settings.salesEmail} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Primary phone" htmlFor="phonePrimary" required error={fe.phonePrimary}>
          <TextInput name="phonePrimary" defaultValue={settings.phonePrimary} required />
        </Field>
        <Field label="Secondary phone" htmlFor="phoneSecondary" error={fe.phoneSecondary}>
          <TextInput name="phoneSecondary" defaultValue={settings.phoneSecondary} />
        </Field>
      </div>

      <div className="rounded-2xl border border-ink-100 p-4">
        <ListEditor name="addressLines" label="Address lines" defaultValues={settings.addressLines} placeholder="Creadex Building" />
      </div>

      <div className="rounded-2xl border border-ink-100 p-4">
        <HoursEditor defaultValue={settings.hours} />
      </div>

      <div className="rounded-2xl border border-ink-100 p-4">
        <SocialsEditor defaultValue={settings.socials} />
      </div>

      <div className="space-y-5 rounded-2xl border border-ink-100 p-4">
        <p className="text-sm font-semibold text-ink-900">Homepage images</p>
        <ImageField
          name="heroImage"
          defaultValue={settings.heroImage}
          label="Hero image"
          hint="Main visual at the top of the home page. Leave blank to show the styled placeholder. Best around a 4:3 ratio."
        />
        <ImageField
          name="introImage"
          defaultValue={settings.introImage}
          label="Intro / “Who we are” image"
          hint="Visual in the “Who we are” section. Leave blank to show the styled placeholder. Best around a 4:3 ratio."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <SubmitButton label="Save settings" />
      </div>
    </form>
  );
}

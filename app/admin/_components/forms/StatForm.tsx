"use client";

import { useFormState } from "react-dom";
import { Field, TextInput, SubmitButton, FormError } from "../fields";
import { saveStat } from "@/app/admin/_actions/misc";
import type { ActionState } from "@/app/admin/_actions/helpers";

export type StatRecord = {
  id: number;
  value: string;
  suffix: string;
  label: string;
  shortLabel: string;
  order: number;
};

export function StatForm({ record }: { record?: StatRecord }) {
  const [state, formAction] = useFormState<ActionState, FormData>(saveStat, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <FormError error={state.error} />
      {record && <input type="hidden" name="id" value={record.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Value" htmlFor="value" required error={fe.value} hint="e.g. 12">
          <TextInput name="value" defaultValue={record?.value} required />
        </Field>
        <Field label="Suffix" htmlFor="suffix" hint="e.g. + or %">
          <TextInput name="suffix" defaultValue={record?.suffix} />
        </Field>
      </div>

      <Field label="Label" htmlFor="label" required error={fe.label} hint="Full label shown on the About page.">
        <TextInput name="label" defaultValue={record?.label} required />
      </Field>

      <Field label="Short label" htmlFor="shortLabel" required error={fe.shortLabel}>
        <TextInput name="shortLabel" defaultValue={record?.shortLabel} required />
      </Field>

      <Field label="Sort order" htmlFor="order" hint="Lower numbers appear first.">
        <TextInput name="order" type="number" defaultValue={String(record?.order ?? 0)} />
      </Field>

      <div className="flex gap-3 pt-2">
        <SubmitButton label={record ? "Save changes" : "Create stat"} />
      </div>
    </form>
  );
}

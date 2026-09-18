"use client";

import { useFormState } from "react-dom";
import { Field, TextInput, TextArea, IconPicker, SubmitButton, FormError } from "../fields";
import type { ActionState } from "@/app/admin/_actions/helpers";

export type IconItemRecord = {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
};

export function IconItemForm({
  action,
  record,
  submitLabel,
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  record?: IconItemRecord;
  submitLabel: string;
}) {
  const [state, formAction] = useFormState<ActionState, FormData>(action, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <FormError error={state.error} />
      {record && <input type="hidden" name="id" value={record.id} />}

      <Field label="Title" htmlFor="title" required error={fe.title}>
        <TextInput name="title" defaultValue={record?.title} required />
      </Field>

      <IconPicker name="icon" defaultValue={record?.icon} />

      <Field label="Description" htmlFor="description" required error={fe.description}>
        <TextArea name="description" defaultValue={record?.description} rows={3} required />
      </Field>

      <Field label="Sort order" htmlFor="order" hint="Lower numbers appear first.">
        <TextInput name="order" type="number" defaultValue={String(record?.order ?? 0)} />
      </Field>

      <div className="flex gap-3 pt-2">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}

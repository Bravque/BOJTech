"use client";

import { useFormState } from "react-dom";
import { Field, TextInput, ImageField, SubmitButton, FormError } from "../fields";
import { saveClient } from "@/app/admin/_actions/clients";
import type { ActionState } from "@/app/admin/_actions/helpers";

export type ClientRecord = {
  id: number;
  name: string;
  logo: string | null;
  url: string | null;
  order: number;
};

export function ClientForm({ record }: { record?: ClientRecord }) {
  const [state, formAction] = useFormState<ActionState, FormData>(saveClient, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <FormError error={state.error} />
      {record && <input type="hidden" name="id" value={record.id} />}

      <Field
        label="Client name"
        htmlFor="name"
        required
        error={fe.name}
        hint="Used as the logo's alt text (and shown if no logo is set)."
      >
        <TextInput name="name" defaultValue={record?.name} required />
      </Field>

      <ImageField name="logo" defaultValue={record?.logo ?? ""} />

      <Field
        label="Website URL"
        htmlFor="url"
        hint="Optional — links the logo to the client's site."
      >
        <TextInput
          name="url"
          type="url"
          defaultValue={record?.url ?? ""}
          placeholder="https://example.com"
        />
      </Field>

      <Field label="Sort order" htmlFor="order" hint="Lower numbers appear first.">
        <TextInput name="order" type="number" defaultValue={String(record?.order ?? 0)} />
      </Field>

      <div className="flex gap-3 pt-2">
        <SubmitButton label={record ? "Save changes" : "Add client"} />
      </div>
    </form>
  );
}

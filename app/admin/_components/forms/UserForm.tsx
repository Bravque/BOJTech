"use client";

import { useFormState } from "react-dom";
import { Field, TextInput, SelectInput, SubmitButton, FormError } from "../fields";
import { saveUser } from "@/app/admin/_actions/users";
import type { ActionState } from "@/app/admin/_actions/helpers";
import { USER_ROLES } from "@/types/content";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function UserForm({ record }: { record?: UserRecord }) {
  const [state, formAction] = useFormState<ActionState, FormData>(saveUser, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <FormError error={state.error} />
      {record && <input type="hidden" name="id" value={record.id} />}

      <Field label="Full name" htmlFor="name" required error={fe.name}>
        <TextInput name="name" defaultValue={record?.name} required />
      </Field>

      <Field label="Email" htmlFor="email" required error={fe.email}>
        <TextInput name="email" type="email" defaultValue={record?.email} required />
      </Field>

      <Field
        label={record ? "New password" : "Password"}
        htmlFor="password"
        required={!record}
        error={fe.password}
        hint={record ? "Leave blank to keep the current password." : "At least 8 characters."}
      >
        <TextInput name="password" type="password" />
      </Field>

      <Field label="Role" htmlFor="role" error={fe.role}>
        <SelectInput name="role" defaultValue={record?.role ?? "EDITOR"} options={USER_ROLES} />
      </Field>

      <div className="flex gap-3 pt-2">
        <SubmitButton label={record ? "Save changes" : "Create user"} />
      </div>
    </form>
  );
}

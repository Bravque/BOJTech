"use client";

import { useFormState } from "react-dom";
import {
  Field,
  TextInput,
  TextArea,
  IconPicker,
  ImageField,
  SubmitButton,
  FormError,
} from "../fields";
import { saveIndustry } from "@/app/admin/_actions/industries";
import type { ActionState } from "@/app/admin/_actions/helpers";

export type IndustryRecord = {
  id: number;
  slug: string;
  name: string;
  icon: string;
  description: string;
  image: string | null;
  imageAlt: string;
  imagePlaceholder: string;
  imageCategory: string;
  order: number;
};

export function IndustryForm({ record }: { record?: IndustryRecord }) {
  const [state, formAction] = useFormState<ActionState, FormData>(saveIndustry, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <FormError error={state.error} />
      {record && <input type="hidden" name="id" value={record.id} />}

      <Field label="Name" htmlFor="name" required error={fe.name}>
        <TextInput name="name" defaultValue={record?.name} required />
      </Field>

      <Field label="Slug" htmlFor="slug" hint="Leave blank to generate from the name." error={fe.slug}>
        <TextInput name="slug" defaultValue={record?.slug} placeholder="retail-supermarkets" />
      </Field>

      <IconPicker name="icon" defaultValue={record?.icon} />

      <Field label="Description" htmlFor="description" required error={fe.description}>
        <TextArea name="description" defaultValue={record?.description} rows={3} required />
      </Field>

      <ImageField name="image" defaultValue={record?.image ?? ""} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Image alt text" htmlFor="imageAlt" required error={fe.imageAlt}>
          <TextInput name="imageAlt" defaultValue={record?.imageAlt} required />
        </Field>
        <Field label="Image category" htmlFor="imageCategory" required error={fe.imageCategory}>
          <TextInput name="imageCategory" defaultValue={record?.imageCategory} required />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Image placeholder" htmlFor="imagePlaceholder" required error={fe.imagePlaceholder}>
          <TextInput name="imagePlaceholder" defaultValue={record?.imagePlaceholder} required />
        </Field>
        <Field label="Sort order" htmlFor="order" hint="Lower numbers appear first.">
          <TextInput name="order" type="number" defaultValue={String(record?.order ?? 0)} />
        </Field>
      </div>

      <div className="flex gap-3 pt-2">
        <SubmitButton label={record ? "Save changes" : "Create industry"} />
      </div>
    </form>
  );
}

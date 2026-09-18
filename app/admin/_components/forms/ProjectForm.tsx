"use client";

import { useFormState } from "react-dom";
import {
  Field,
  TextInput,
  TextArea,
  SelectInput,
  ImageField,
  ListEditor,
  SubmitButton,
  FormError,
} from "../fields";
import { saveProject } from "@/app/admin/_actions/projects";
import type { ActionState } from "@/app/admin/_actions/helpers";
import { PROJECT_CATEGORIES } from "@/types/content";

export type ProjectRecord = {
  id: number;
  slug: string;
  name: string;
  category: string;
  client: string;
  year: string;
  description: string;
  tags: string[];
  image: string | null;
  imageAlt: string;
  imagePlaceholder: string;
  imageCategory: string;
  order: number;
};

export function ProjectForm({ record }: { record?: ProjectRecord }) {
  const [state, formAction] = useFormState<ActionState, FormData>(saveProject, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <FormError error={state.error} />
      {record && <input type="hidden" name="id" value={record.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={fe.name}>
          <TextInput name="name" defaultValue={record?.name} required />
        </Field>
        <Field label="Category" htmlFor="category" error={fe.category}>
          <SelectInput name="category" defaultValue={record?.category ?? PROJECT_CATEGORIES[0]} options={PROJECT_CATEGORIES} />
        </Field>
      </div>

      <Field label="Slug" htmlFor="slug" hint="Leave blank to generate from the name." error={fe.slug}>
        <TextInput name="slug" defaultValue={record?.slug} placeholder="retail-pos-platform" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Client" htmlFor="client" required error={fe.client}>
          <TextInput name="client" defaultValue={record?.client} required />
        </Field>
        <Field label="Year" htmlFor="year" required error={fe.year}>
          <TextInput name="year" defaultValue={record?.year} placeholder="2025" required />
        </Field>
      </div>

      <Field label="Description" htmlFor="description" required error={fe.description}>
        <TextArea name="description" defaultValue={record?.description} rows={4} required />
      </Field>

      <div className="rounded-2xl border border-ink-100 p-4">
        <ListEditor name="tags" label="Tags" defaultValues={record?.tags} placeholder="POS" />
        {fe.tags && <p className="mt-1 text-xs font-medium text-red-600">{fe.tags}</p>}
      </div>

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
        <SubmitButton label={record ? "Save changes" : "Create project"} />
      </div>
    </form>
  );
}

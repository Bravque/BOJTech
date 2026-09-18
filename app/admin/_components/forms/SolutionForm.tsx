"use client";

import { useFormState } from "react-dom";
import {
  Field,
  TextInput,
  TextArea,
  SelectInput,
  IconPicker,
  ImageField,
  ListEditor,
  SubmitButton,
  FormError,
} from "../fields";
import { saveSolution } from "@/app/admin/_actions/solutions";
import type { ActionState } from "@/app/admin/_actions/helpers";
import { SOLUTION_STATUSES, SOLUTION_ACCENTS } from "@/types/content";

export type SolutionRecord = {
  id: number;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  icon: string;
  description: string;
  highlights: string[];
  status: string;
  accent: string;
  image: string | null;
  imageAlt: string;
  imagePlaceholder: string;
  imageCategory: string;
  order: number;
};

export function SolutionForm({ record }: { record?: SolutionRecord }) {
  const [state, formAction] = useFormState<ActionState, FormData>(saveSolution, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <FormError error={state.error} />
      {record && <input type="hidden" name="id" value={record.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={fe.name}>
          <TextInput name="name" defaultValue={record?.name} required />
        </Field>
        <Field label="Category" htmlFor="category" required error={fe.category}>
          <TextInput name="category" defaultValue={record?.category} required />
        </Field>
      </div>

      <Field label="Slug" htmlFor="slug" hint="Leave blank to generate from the name." error={fe.slug}>
        <TextInput name="slug" defaultValue={record?.slug} placeholder="boj-pos" />
      </Field>

      <Field label="Tagline" htmlFor="tagline" required error={fe.tagline}>
        <TextInput name="tagline" defaultValue={record?.tagline} required />
      </Field>

      <IconPicker name="icon" defaultValue={record?.icon} />

      <Field label="Description" htmlFor="description" required error={fe.description}>
        <TextArea name="description" defaultValue={record?.description} rows={4} required />
      </Field>

      <div className="rounded-2xl border border-ink-100 p-4">
        <ListEditor name="highlights" label="Highlights" defaultValues={record?.highlights} placeholder="Sales dashboard & fast checkout" />
        {fe.highlights && <p className="mt-1 text-xs font-medium text-red-600">{fe.highlights}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Status" htmlFor="status" error={fe.status}>
          <SelectInput name="status" defaultValue={record?.status ?? SOLUTION_STATUSES[0]} options={SOLUTION_STATUSES} />
        </Field>
        <Field label="Accent colour" htmlFor="accent" error={fe.accent}>
          <SelectInput name="accent" defaultValue={record?.accent ?? SOLUTION_ACCENTS[0]} options={SOLUTION_ACCENTS} />
        </Field>
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
        <SubmitButton label={record ? "Save changes" : "Create solution"} />
      </div>
    </form>
  );
}

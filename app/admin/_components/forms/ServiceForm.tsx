"use client";

import { useFormState } from "react-dom";
import {
  Field,
  TextInput,
  TextArea,
  IconPicker,
  ImageField,
  ListEditor,
  SubmitButton,
  FormError,
} from "../fields";
import { saveService } from "@/app/admin/_actions/services";
import type { ActionState } from "@/app/admin/_actions/helpers";

export type ServiceRecord = {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  icon: string;
  shortDescription: string;
  overview: string;
  features: string[];
  outcomes: string[];
  image: string | null;
  imageAlt: string;
  imagePlaceholder: string;
  imageCategory: string;
  order: number;
};

export function ServiceForm({ record }: { record?: ServiceRecord }) {
  const [state, formAction] = useFormState<ActionState, FormData>(saveService, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <FormError error={state.error} />
      {record && <input type="hidden" name="id" value={record.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={fe.name}>
          <TextInput name="name" defaultValue={record?.name} required />
        </Field>
        <Field label="Short name" htmlFor="shortName" required error={fe.shortName}>
          <TextInput name="shortName" defaultValue={record?.shortName} required />
        </Field>
      </div>

      <Field label="Slug" htmlFor="slug" hint="Leave blank to generate from the name." error={fe.slug}>
        <TextInput name="slug" defaultValue={record?.slug} placeholder="software-development" />
      </Field>

      <Field label="Tagline" htmlFor="tagline" required error={fe.tagline}>
        <TextInput name="tagline" defaultValue={record?.tagline} required />
      </Field>

      <IconPicker name="icon" defaultValue={record?.icon} />

      <Field label="Short description" htmlFor="shortDescription" required error={fe.shortDescription}>
        <TextArea name="shortDescription" defaultValue={record?.shortDescription} rows={2} required />
      </Field>

      <Field label="Overview" htmlFor="overview" required error={fe.overview}>
        <TextArea name="overview" defaultValue={record?.overview} rows={5} required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink-100 p-4">
          <ListEditor name="features" label="Features" defaultValues={record?.features} placeholder="Custom business software" />
          {fe.features && <p className="mt-1 text-xs font-medium text-red-600">{fe.features}</p>}
        </div>
        <div className="rounded-2xl border border-ink-100 p-4">
          <ListEditor name="outcomes" label="Outcomes" defaultValues={record?.outcomes} placeholder="Automate manual processes" />
          {fe.outcomes && <p className="mt-1 text-xs font-medium text-red-600">{fe.outcomes}</p>}
        </div>
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
        <Field label="Image placeholder" htmlFor="imagePlaceholder" required error={fe.imagePlaceholder} hint="Shown as the label when no image is set.">
          <TextInput name="imagePlaceholder" defaultValue={record?.imagePlaceholder} required />
        </Field>
        <Field label="Sort order" htmlFor="order" hint="Lower numbers appear first.">
          <TextInput name="order" type="number" defaultValue={String(record?.order ?? 0)} />
        </Field>
      </div>

      <div className="flex gap-3 pt-2">
        <SubmitButton label={record ? "Save changes" : "Create service"} />
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Plus, X, Upload, Check } from "lucide-react";
import { iconNames, resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100";
const labelBase = "mb-1.5 block text-sm font-medium text-ink-700";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelBase}>
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export function TextInput({
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      required={required}
      className={inputBase}
    />
  );
}

export function TextArea({
  name,
  defaultValue,
  placeholder,
  rows = 4,
  required,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <textarea
      id={name}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className={cn(inputBase, "resize-y")}
    />
  );
}

export function SelectInput({
  name,
  defaultValue,
  options,
}: {
  name: string;
  defaultValue?: string;
  options: readonly string[];
}) {
  return (
    <select id={name} name={name} defaultValue={defaultValue} className={cn(inputBase, "appearance-none")}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/**
 * Repeatable list of strings. Submits one form input per item under `name`;
 * the server action reads them with formData.getAll(name).
 */
export function ListEditor({
  name,
  label,
  defaultValues = [],
  placeholder,
}: {
  name: string;
  label: string;
  defaultValues?: string[];
  placeholder?: string;
}) {
  const [items, setItems] = useState<string[]>(
    defaultValues.length ? defaultValues : [""]
  );

  const update = (i: number, value: string) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? value : it)));
  const add = () => setItems((prev) => [...prev, ""]);
  const remove = (i: number) =>
    setItems((prev) => (prev.length === 1 ? [""] : prev.filter((_, idx) => idx !== i)));

  return (
    <div>
      <span className={labelBase}>{label}</span>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              name={name}
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className={inputBase}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-ink-200 text-ink-400 transition-colors hover:border-red-300 hover:text-red-600"
              aria-label="Remove item"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
      >
        <Plus className="h-4 w-4" /> Add item
      </button>
    </div>
  );
}

/** Searchable icon picker backed by lib/icons registry. */
export function IconPicker({ name, defaultValue }: { name: string; defaultValue?: string }) {
  const [selected, setSelected] = useState(defaultValue ?? "Sparkles");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const Selected = resolveIcon(selected);
  const filtered = query
    ? iconNames.filter((n) => n.toLowerCase().includes(query.toLowerCase()))
    : iconNames;

  return (
    <div>
      <span className={labelBase}>Icon</span>
      <input type="hidden" name={name} value={selected} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-left text-sm text-ink-900 transition-colors hover:border-brand-300"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
          <Selected className="h-5 w-5" />
        </span>
        <span className="flex-1">{selected}</span>
        <span className="text-xs text-ink-400">{open ? "Close" : "Change"}</span>
      </button>

      {open && (
        <div className="mt-2 rounded-xl border border-ink-200 bg-white p-3 shadow-soft">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search icons…"
            className={cn(inputBase, "mb-3")}
          />
          <div className="grid max-h-56 grid-cols-6 gap-2 overflow-y-auto sm:grid-cols-8">
            {filtered.map((iconName) => {
              const Icon = resolveIcon(iconName);
              const active = iconName === selected;
              return (
                <button
                  key={iconName}
                  type="button"
                  title={iconName}
                  onClick={() => {
                    setSelected(iconName);
                    setOpen(false);
                  }}
                  className={cn(
                    "relative flex h-10 items-center justify-center rounded-lg border transition-colors",
                    active
                      ? "border-brand-400 bg-brand-50 text-brand-700"
                      : "border-ink-100 text-ink-500 hover:border-brand-200 hover:text-brand-600"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {active && (
                    <Check className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-brand-600 text-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/** Image path field with optional upload to /api/admin/upload. */
export function ImageField({
  name,
  defaultValue,
  label = "Image",
  hint = "Upload a file or paste a path/URL. Leave blank to show the styled placeholder.",
}: {
  name: string;
  defaultValue?: string;
  label?: string;
  hint?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await res.json()) as { ok?: boolean; path?: string; error?: string };
      if (!res.ok || !data.path) throw new Error(data.error ?? "Upload failed");
      setValue(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Field label={label} htmlFor={name} hint={hint} error={error ?? undefined}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="/uploads/example.jpg"
          className={inputBase}
        />
        <label className="inline-flex flex-none cursor-pointer items-center gap-2 rounded-xl border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
        </label>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Preview" className="mt-3 h-28 w-auto rounded-lg border border-ink-100 object-cover" />
      )}
    </Field>
  );
}

export function SubmitButton({ label = "Save" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-semibold text-white transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Saving…
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function FormError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-100">
      {error}
    </p>
  );
}

import Link from "next/link";
import { Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getClients } from "@/lib/content";

const placeholders = Array.from({ length: 6 }, () => "Client Logo");

export async function TrustedStrip() {
  const clients = await getClients();

  return (
    <section className="border-y border-ink-100 bg-ink-50/50 py-10">
      <Container>
        <Reveal>
          <p className="text-center text-sm font-medium text-ink-500">
            Trusted technology solutions for growing businesses, institutions and
            organizations across Kenya
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {clients.length > 0
              ? clients.map((client) => {
                  const inner = client.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-10 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
                    />
                  ) : (
                    <span className="flex items-center gap-2 text-ink-400">
                      <Building2 className="h-5 w-5" strokeWidth={1.5} />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {client.name}
                      </span>
                    </span>
                  );
                  return (
                    <div
                      key={client.id}
                      className="flex items-center justify-center rounded-xl border border-ink-100 bg-white/60 px-4 py-4"
                    >
                      {client.url ? (
                        <Link
                          href={client.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                          aria-label={client.name}
                        >
                          {inner}
                        </Link>
                      ) : (
                        inner
                      )}
                    </div>
                  );
                })
              : placeholders.map((label, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-ink-200 bg-white/60 px-4 py-4 text-ink-300 transition-colors hover:text-ink-400"
                    title="Client logo placeholder"
                  >
                    <Building2 className="h-5 w-5" strokeWidth={1.5} />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

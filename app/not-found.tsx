import { Home, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-950 pt-[var(--header-height)] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] bg-grid-light"
        style={{ backgroundSize: "40px 40px" }}
      />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
      <Container className="relative py-20 text-center">
        <p className="font-display text-7xl font-bold text-gradient-light sm:text-8xl">404</p>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-brand-100/75">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="light" size="lg">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
          <Button href="/services" variant="outline-light" size="lg">
            Explore Services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}

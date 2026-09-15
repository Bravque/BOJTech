import type { Metadata } from "next";
import { Target, Eye, Check, Rocket, ShieldCheck, HeartHandshake, Lightbulb } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { CTASection } from "@/components/sections/CTASection";
import { coreValues, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BOJ Technologies Limited is an ICT company delivering innovative software, digital, networking and technology solutions across Kenya. Learn about our mission, vision and values.",
  alternates: { canonical: "/about" },
};

const commitments = [
  {
    icon: Lightbulb,
    title: "Commitment to Innovation",
    description:
      "We continually explore emerging technologies and modern engineering practices to deliver forward-thinking solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Commitment to Quality",
    description:
      "From design to deployment, we hold every project to high professional standards of quality and reliability.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-Focused Solutions",
    description:
      "We build around your goals — listening first, then tailoring technology to the way you actually work.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Building Africa&apos;s digital future,{" "}
            <span className="text-gradient-light">one solution at a time</span>
          </>
        }
        description="BOJ Technologies Limited is an Information and Communication Technology company delivering innovative, reliable and accessible technology solutions to businesses, organizations, institutions and communities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Company overview */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>Company overview</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-5 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
                  A technology partner you can build a future with
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-500 sm:text-lg">
                  <p>
                    BOJ Technologies Limited was established to bridge the gap
                    between ambitious organizations and the technology they need
                    to grow. We provide innovative digital, software, hardware,
                    networking and connectivity solutions — all under one roof.
                  </p>
                  <p>
                    Our multidisciplinary team of engineers, designers and
                    consultants works closely with each client to understand
                    their goals and deliver solutions that are practical,
                    scalable and built to last. From a single shop to a
                    nationwide institution, we help our clients operate smarter,
                    connect better and grow faster.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="rounded-[2rem] bg-white p-2.5 shadow-card ring-1 ring-ink-100">
                <ImagePlaceholder
                  title="BOJ Technologies team collaborating"
                  description="Our team working on innovative technology solutions"
                  alt="BOJ Technologies team working on innovative technology solutions"
                  category="About Visual"
                  icon={Rocket}
                  aspectRatio="4/3"
                  rounded="rounded-[1.6rem]"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] bg-grid-light"
          style={{ backgroundSize: "40px 40px" }}
        />
        <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-brand-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        <Container className="relative">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/25 to-accent-500/25 text-accent-300 ring-1 ring-inset ring-white/10" style={{ width: "3.25rem", height: "3.25rem" }}>
                  <Target className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-white">Our Mission</h3>
                <p className="mt-3 text-base leading-relaxed text-brand-100/75">
                  To deliver innovative, reliable and accessible technology
                  solutions that empower businesses, organizations and
                  communities.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <span className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/25 to-brand-500/25 text-brand-300 ring-1 ring-inset ring-white/10" style={{ width: "3.25rem", height: "3.25rem" }}>
                  <Eye className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-white">Our Vision</h3>
                <p className="mt-3 text-base leading-relaxed text-brand-100/75">
                  To become a trusted technology partner in Africa, delivering
                  innovative digital solutions that drive growth and
                  transformation.
                </p>
              </div>
            </Reveal>
          </div>

          {/* stats */}
          <div className="mt-6 grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                    {stat.value}
                    <span className="text-gradient-light">{stat.suffix}</span>
                  </p>
                  <p className="mt-2 text-xs leading-snug text-brand-100/60 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Our core values"
            title="The principles that guide everything we do"
            description="Our values shape how we work, how we build and how we partner with every client."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, i) => (
              <Reveal key={value.title} delay={(i % 3) * 80}>
                <FeatureCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Commitments */}
      <section className="bg-ink-50/60 py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="rounded-[2rem] bg-white p-2.5 shadow-card ring-1 ring-ink-100">
                <ImagePlaceholder
                  title="Innovation & quality in action"
                  description="Engineers and consultants delivering quality technology solutions"
                  alt="BOJ Technologies engineers delivering quality technology solutions"
                  category="Commitment Visual"
                  icon={ShieldCheck}
                  tone="accent"
                  aspectRatio="4/3"
                  rounded="rounded-[1.6rem]"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <Eyebrow>Why we exist</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-5 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
                  Committed to innovation, quality and our customers
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-base leading-relaxed text-ink-500">
                  BOJ Technologies was founded on a simple belief: that
                  world-class technology should be accessible to every
                  organization, not just the largest. That belief drives our
                  commitment across everything we do.
                </p>
              </Reveal>
              <div className="mt-8 space-y-5">
                {commitments.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={200 + i * 80}>
                      <div className="flex gap-4">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <div>
                          <h3 className="font-display text-base font-semibold text-ink-900">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-ink-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Partner with us"
        title="Ready to work with a team that gets technology?"
        description="Let's discuss how BOJ Technologies can help your organization operate smarter, connect better and grow faster."
      />
    </>
  );
}

import { profile, education } from "../data/profile";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {profile.title} · {profile.location}
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">{profile.tagline}</p>
      <p className="mt-4 max-w-2xl text-sm text-ink/50">
        {education.degree} — {education.school}, {education.period}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#contact"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Get in touch
        </a>
        <a
          href="#experience"
          className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
        >
          View experience
        </a>
        <a
          href="/resume/Ashvin_Sureskumar_Resume.pdf"
          className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
        >
          View Resume
        </a>
      </div>
    </section>
  );
}

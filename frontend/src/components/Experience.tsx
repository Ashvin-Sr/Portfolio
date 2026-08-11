import { experience } from "../data/profile";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Experience</h2>
      <div className="mt-8 space-y-10">
        {experience.map((job) => (
          <article key={job.role} className="border-l-2 border-accent-soft pl-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold">{job.role}</h3>
              <span className="text-sm text-ink/50">{job.period}</span>
            </div>
            <p className="text-sm text-ink/60">
              {job.company} — {job.location}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/70">
              {job.highlights.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

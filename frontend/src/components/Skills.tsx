import { skills, certifications } from "../data/profile";

export default function Skills() {
  return (

    <section id="skills" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Certifications</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <article
            key={cert.name}
            className="flex flex-col rounded-2xl border border-ink/10 bg-surface/60 p-6 shadow-sm"
          >
            <h4 className="text-sm font-semibold">{cert.name}</h4>
            <p className="mt-1 text-xs text-ink/50">
              {cert.org} — {cert.date}
            </p>
            {cert.proof && (
              <a
                href={cert.proof}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm font-medium text-accent transition hover:text-accent/80"
              >
                View certificate <span aria-hidden="true">→</span>
              </a>
            )}
          </article>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight sm:text-3xl">Skills</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-ink/80">{category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-ink/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

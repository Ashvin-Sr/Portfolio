import { projects } from "../data/profile";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Projects</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => {
          const projectLink =
            ("url" in project && typeof project.url === "string" && project.url) ||
            ("link" in project && typeof project.link === "string" && project.link) ||
            undefined;

          return (
            <article
              key={project.name}
              className="flex flex-col rounded-2xl border border-ink/10 bg-surface/60 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <span className="text-xs text-ink/40">{project.period}</span>
              </div>
              <p className="mt-1 text-xs font-medium text-accent">{project.stack}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{project.summary}</p>
              {projectLink ? (
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center text-sm font-medium text-accent transition hover:text-accent/80"
                >
                  View project <span aria-hidden="true">→</span>
                </a>
              ) : null}
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/60">
                {project.highlights.slice(0, 3).map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/30" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

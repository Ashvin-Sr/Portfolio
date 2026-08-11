import { profile } from "../data/profile";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-2xl border border-ink/10 bg-surface/60 p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Let's talk</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">
          I'm open to new opportunities — reach out directly, or ask the assistant in the corner
          about my background.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            {profile.email}
          </a>
          <a
            href={profile.links.linkedin}
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
          >
            GitHub
          </a>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-ink/30">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </section>
  );
}

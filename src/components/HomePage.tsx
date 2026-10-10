import { DATA, projects, secondary, hackathons } from "../data/resume";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Timeline, TimelineItem, TimelineConnectItem } from "./timeline";
import Motion from "./Motion";

export default function HomePage() {
  return (
    <div className="shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Saarbrücken, Germany
          </p>
          <h1 id="hero-title">
            Hi, I'm
            <br />
            <span>Usman.</span>
          </h1>
          <p className="hero-role">
            Software Engineer <span>·</span>
            <br className="mobile-break" /> Full-Stack & Applied AI
          </p>
          <p className="hero-summary">
            I build complete software products—from backend systems and polished
            interfaces to AI workflows designed around real users and reliable
            outcomes.
          </p>
          <p className="hero-current">
            CS at Saarland University · Engineering at Cyvalent
          </p>
          <div className="hero-actions">
            <Button asChild size="lg">
              <a href="#projects">
                Explore projects <span aria-hidden="true">↓</span>
              </a>
            </Button>
            <a href="https://github.com/indkhan">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/indkhan">LinkedIn ↗</a>
          </div>
        </div>
        <figure className="portrait">
          <img
            src="/usman-small.jpg"
            srcSet="/photos/usman-portrait.webp 2x"
            alt="Usman Khan"
            width="360"
            height="440"
            fetchPriority="high"
          />
          <figcaption>
            <span>Usman Khan</span>
            <span>Engineer. Student. Builder.</span>
          </figcaption>
        </figure>
      </section>
      <section id="about" className="about section-rule">
        <p className="eyebrow">A little about me</p>
        <p>{DATA.summary}</p>
      </section>
      <section id="experience" className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Along the way</p>
            <h2>Engineering in practice.</h2>
          </div>
          <p>
            Building for real workflows,
            <br />
            alongside real teams.
          </p>
        </div>
        <div className="work-list">
          {DATA.work.map((job) => (
            <article className="work-row" key={job.company}>
              <span className="company-mark" aria-hidden="true">
                {job.initials}
              </span>
              <div>
                <div className="work-title">
                  <h3>{job.company}</h3>
                  <span className="date">{job.dates}</span>
                </div>
                <p className="work-role">
                  {job.role} <span>· {job.note}</span>
                </p>
                <p>{job.description}</p>
                <p className="stack-text">{job.stack}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="projects" className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>Ideas, engineered.</h2>
          </div>
          <p>
            Independent products.
            <br />
            Careful systems. Useful outcomes.
          </p>
        </div>
        <div className="featured-list">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`feature feature-${project.id}`}
            >
              <div className="feature-media">
                <Motion
                  {...project}
                  caption={
                    project.id === "moneo"
                      ? "Illustrated workflow · fictional financial data"
                      : undefined
                  }
                />
              </div>
              <div className="feature-story">
                <p className="eyebrow">{project.status}</p>
                <h3>{project.title}</h3>
                <p className="project-kicker">{project.kicker}</p>
                <p>{project.description}</p>
                <div className="tags">
                  {project.stack.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="project-actions">
                  <Button asChild>
                    <a href={`/projects/${project.id}`}>Read case study ↗</a>
                  </Button>
                  <a
                    href={project.repository}
                    aria-label={`${project.title} source code`}
                  >
                    Code ↗
                  </a>
                </div>
                {"demo" in project && (
                  <a className="demo-link" href={project.demo}>
                    {project.demoLabel} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        className="section-block other-projects"
        aria-labelledby="other-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">More explorations</p>
            <h2 id="other-title">A few other things I've built.</h2>
          </div>
        </div>
        <div className="project-grid">
          {secondary.map((project) => (
            <article className="small-project" key={project.title}>
              <Motion {...project} />
              <div className="small-project-copy">
                <p className="eyebrow">{project.label}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.repository}>Explore {project.title} ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="education" className="education section-rule">
        <div>
          <p className="eyebrow">Always learning</p>
          <h2>Saarland University</h2>
          <p>B.Sc. Computer Science</p>
          <span className="date">Oct 2024 — Present</span>
        </div>
        <div>
          <h3>My toolkit</h3>
          <p className="toolkit-intro">
            Across interfaces, backend systems, and applied AI.
          </p>
          <div className="tags">
            {DATA.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      <section id="hackathons" className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Better together</p>
            <h2>Small teams. Big weekends.</h2>
          </div>
          <p>
            Five hackathons.
            <br />A lot of learning by doing.
          </p>
        </div>
        <p className="section-intro">
          Team projects, tight deadlines, and ideas taken all the way to a
          working prototype.
        </p>
        <Timeline className="award-timeline">
          {hackathons.map((event) => (
            <TimelineItem key={event.key} className="award-item">
              <TimelineConnectItem className="award-line">
                <span className="timeline-dot" />
              </TimelineConnectItem>
              <article className="award-content">
                <div className="award-top">
                  <div>
                    <p className="eyebrow">{event.location}</p>
                    <h3>{event.event}</h3>
                  </div>
                  <Badge variant="secondary" className="award-badge">
                    {event.award}
                  </Badge>
                </div>
                <div className="award-body">
                  <img
                    className="event-photo"
                    src={event.photo}
                    alt={`${event.event}: ${event.project} team project`}
                    width="300"
                    height="200"
                    loading="lazy"
                  />
                  <div>
                    <p>{event.description}</p>
                    <a href={event.media.repository}>
                      {event.project} source ↗
                    </a>
                    <details>
                      <summary>Project illustration & award reel</summary>
                      <div className="award-media">
                        <Motion {...event.media} />
                        <Motion
                          video={event.video}
                          poster={event.poster}
                          alt={`${event.event} graphic award reel`}
                          caption="Graphic award reel · placement from original portfolio"
                        />
                      </div>
                    </details>
                  </div>
                </div>
              </article>
            </TimelineItem>
          ))}
        </Timeline>
        <p className="provenance-note">
          Placements are carried over from my original portfolio. Exact event
          and award labels are pending confirmation before publication.
        </p>
      </section>
      <section className="photo-section" aria-labelledby="photos-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Beyond the code</p>
            <h2 id="photos-title">Built with people.</h2>
          </div>
          <p>A few moments from the journey.</p>
        </div>
        <div className="photo-strip">
          {[
            [
              "/photos/mittelstand2.webp",
              "Building together at Mittelstand Hackathon",
            ],
            ["/photos/start_hack2.webp", "A moment at START HACK"],
            ["/photos/swisshacks2.webp", "The SwissHacks team"],
            ["/photos/mittelstand3.webp", "Mittelstand Hackathon event"],
          ].map(([src, alt]) => (
            <img
              key={src}
              src={src}
              alt={alt}
              width="320"
              height="240"
              loading="lazy"
            />
          ))}
        </div>
      </section>
      <section id="contact" className="contact section-rule">
        <p className="eyebrow">What's next?</p>
        <h2>
          Let's build
          <br />
          something useful<span>.</span>
        </h2>
        <p>
          Interested in software engineering internships and engineering roles.
          <br />
          Have a team, an idea, or a good problem? I'd love to hear about it.
        </p>
        <a className="email-link" href={`mailto:${DATA.email}`}>
          {DATA.email} ↗
        </a>
        <div className="contact-social">
          <a href="https://github.com/indkhan">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/indkhan">LinkedIn ↗</a>
        </div>
      </section>
    </div>
  );
}

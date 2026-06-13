import { ProLaxText } from "./pro-lax";

export function ContactCard() {
  return (
    <div className="contact-card">
      <h2>
        <ProLaxText pro="Hit Me Up!" lax="Send a Raven 🐦" />
      </h2>
      <p className="contact-intro">
        <ProLaxText
          pro="I like talking to people who build things."
          lax="Talk to me about RPGs, keyboards, Linux ricing, or literally anything nerdy."
        />
      </p>

      <div className="contact-links">
        <a href="mailto:hey@ibzie.dev" className="contact-link">
          <span className="icon">@</span>
          Email
        </a>

        <a
          href="https://linkedin.com/in/ibrahim"
          target="_blank"
          rel="noopener"
          className="contact-link"
        >
          <span className="icon">in</span>
          LinkedIn
        </a>

        <a
          href="https://github.com/Ibzie"
          target="_blank"
          rel="noopener"
          className="contact-link"
        >
          <span className="icon">{`{ }`}</span>
          GitHub
        </a>

        <a href="https://ibzie.dev" className="contact-link">
          <span className="icon">~</span>
          ibzie.dev
        </a>
      </div>
    </div>
  );
}

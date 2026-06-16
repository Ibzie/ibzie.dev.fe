import { Reveal } from "@/components/reveal";
import { ContactCard } from "@/components/contact-card";

export const metadata = {
  title: "Hit Me Up!",
  description: "Get in touch with Ibz — email, LinkedIn, GitHub, and more.",
};

export default function ContactPage() {
  return (
    <main className="container page">
      <Reveal>
        <ContactCard />
      </Reveal>
    </main>
  );
}

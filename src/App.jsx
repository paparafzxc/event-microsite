import { motion } from "framer-motion";
import { ArrowDown, CalendarDays, MapPin } from "lucide-react";

const event = {
  eyebrow: "A celebration of love",
  title: "Our Beautiful Day",
  names: "Your Name & Your Name",
  date: "Saturday · 14 February 2027",
  location: "Tagaytay, Philippines",
};

export default function App() {
  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-overlay" />
        <nav className="nav">
          <span className="brand">E.</span>
          <a href="#details">Details</a>
        </nav>

        <div className="hero-content">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {event.eyebrow}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}>
            {event.title}
          </motion.h1>
          <motion.p className="names" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            {event.names}
          </motion.p>
          <motion.div className="hero-meta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <span><CalendarDays size={15} /> {event.date}</span>
            <span><MapPin size={15} /> {event.location}</span>
          </motion.div>
        </div>

        <a className="scroll-cue" href="#details" aria-label="Scroll to details">
          <ArrowDown size={18} strokeWidth={1.3} />
        </a>
      </section>

      <section id="details" className="intro section">
        <p className="eyebrow">Save the date</p>
        <h2>A day made for the people we love.</h2>
        <p className="body-copy">
          This is the first foundation of the microsite: quiet typography,
          generous whitespace, cinematic imagery, and subtle movement.
        </p>
      </section>

      <section className="image-break" aria-label="Event photograph placeholder">
        <div className="image-placeholder">
          <span>Your hero photograph goes here</span>
        </div>
      </section>

      <section className="section details-grid">
        <article>
          <p className="eyebrow">Ceremony</p>
          <h3>Four o'clock</h3>
          <p>Garden Chapel<br />Tagaytay, Philippines</p>
        </article>
        <article>
          <p className="eyebrow">Reception</p>
          <h3>Six o'clock</h3>
          <p>The Garden Hall<br />Tagaytay, Philippines</p>
        </article>
        <article>
          <p className="eyebrow">Dress code</p>
          <h3>Formal</h3>
          <p>Neutral tones and understated elegance.</p>
        </article>
      </section>

      <footer className="footer">
        <p>Made with love.</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
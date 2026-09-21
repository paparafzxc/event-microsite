import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Navigation,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const event = {
  couple: "Ismael & Bambie",
  date: "08 February 2027",
  weekday: "Sunday",
  venue: "Tagaytay, Philippines",
  ceremony: "4:00 PM",
  reception: "6:00 PM",
};

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function Countdown() {
  const target = new Date("2027-02-08T16:00:00+08:00").getTime();
  const [left, setLeft] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    ["Days", Math.floor(left / 86400000)],
    ["Hours", Math.floor((left / 3600000) % 24)],
    ["Minutes", Math.floor((left / 60000) % 60)],
    ["Seconds", Math.floor((left / 1000) % 60)],
  ];

  return (
    <div className="countdown" aria-label="Countdown to the event">
      {units.map(([label, value]) => (
        <div className="count-unit" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);

  return (
    <main className="site-shell">
      <header className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-vignette" />
        <nav className="nav">
          <a className="brand" href="#top" aria-label="Back to top">I & B</a>
          <div className={`nav-links ${menu ? "is-open" : ""}`}>
            {["Story", "Details", "Gallery", "RSVP"].map((item) => (
              <a href={`#${item.toLowerCase()}`} key={item} onClick={() => setMenu(false)}>{item}</a>
            ))}
          </div>
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu">
            {menu ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>

        <div className="hero-content">
          <motion.p className="eyebrow light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            Together with our families
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
            {event.couple}
          </motion.h1>
          <motion.p className="hero-date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 1 }}>
            {event.weekday} · {event.date}
          </motion.p>
          <motion.a className="hero-cta" href="#details" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}>
            Explore the celebration <ArrowDown size={15} />
          </motion.a>
        </div>

        <div className="hero-side-note">A new chapter</div>
      </header>

      <section className="statement section" id="story">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <p className="eyebrow">Our story</p>
          <h2>Some moments are meant to be remembered slowly.</h2>
          <p className="lead">
            We invite you to pause with us, celebrate the people who brought us here,
            and share in the beginning of our next chapter.
          </p>
          <div className="signature">with love, <em>I & B</em></div>
        </motion.div>
      </section>

      <section className="editorial-photo photo-one" aria-label="Couple portrait">
        <div className="photo-caption"><span>01</span><span>The beginning</span></div>
      </section>

      <section className="details section" id="details">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The celebration</p>
            <h2>Join us for a beautiful day.</h2>
          </div>
          <p className="section-note">Save the date and keep this little corner of the internet close.</p>
        </div>

        <div className="event-grid">
          <article className="event-card featured">
            <span className="card-index">01</span>
            <CalendarDays size={22} strokeWidth={1.2} />
            <p className="card-label">Ceremony</p>
            <h3>{event.ceremony}</h3>
            <p>Garden Chapel<br />Tagaytay, Philippines</p>
            <a href="#location">View location <ArrowUpRight size={14} /></a>
          </article>
          <article className="event-card">
            <span className="card-index">02</span>
            <Clock3 size={22} strokeWidth={1.2} />
            <p className="card-label">Reception</p>
            <h3>{event.reception}</h3>
            <p>The Garden Hall<br />Tagaytay, Philippines</p>
            <a href="#location">View location <ArrowUpRight size={14} /></a>
          </article>
          <article className="event-card">
            <span className="card-index">03</span>
            <Heart size={22} strokeWidth={1.2} />
            <p className="card-label">Dress code</p>
            <h3>Modern formal</h3>
            <p>Elegant neutrals, soft tailoring,<br />and timeless details.</p>
          </article>
        </div>
      </section>

      <section className="countdown-section">
        <div className="countdown-inner">
          <p className="eyebrow">Until we say “I do”</p>
          <h2>The days are counting down.</h2>
          <Countdown />
        </div>
      </section>

      <section className="gallery section" id="gallery">
        <div className="section-heading gallery-heading">
          <div>
            <p className="eyebrow">A glimpse</p>
            <h2>Moments before the moment.</h2>
          </div>
        </div>
        <div className="gallery-grid">
          <div className="gallery-image g1" />
          <div className="gallery-image g2" />
          <div className="gallery-image g3" />
        </div>
      </section>

      <section className="location section" id="location">
        <div className="location-copy">
          <p className="eyebrow">Find us</p>
          <h2>Meet us in Tagaytay.</h2>
          <p className="lead">A quiet garden, cool air, good food, and the people we love most.</p>
          <div className="location-meta">
            <MapPin size={19} strokeWidth={1.2} />
            <span>Tagaytay, Cavite<br />Philippines</span>
          </div>
          <a className="outline-button" href="https://maps.google.com" target="_blank" rel="noreferrer">
            Open in maps <Navigation size={14} />
          </a>
        </div>
        <div className="map-art">
          <div className="map-ring ring-one" />
          <div className="map-ring ring-two" />
          <span className="map-pin"><MapPin size={20} /></span>
          <span className="map-label">TAGAYTAY</span>
        </div>
      </section>

      <section className="rsvp section" id="rsvp">
        <div className="rsvp-card">
          <p className="eyebrow">Your presence is the gift</p>
          <h2>Will you celebrate with us?</h2>
          <p>Kindly let us know if you'll be joining us. We cannot wait to see you there.</p>
          <button className="primary-button">RSVP <ArrowUpRight size={15} /></button>
        </div>
      </section>

      <footer className="footer">
        <div>
          <span className="footer-mark">I & B</span>
          <p>Forever starts here.</p>
        </div>
        <a href="#top" className="back-top">Back to top <ChevronDown size={14} /></a>
        <div className="footer-social"><Instagram size={15} /> <span>2027</span></div>
      </footer>
    </main>
  );
}
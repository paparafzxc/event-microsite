
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, Cross, Heart, MapPin, Menu, Navigation, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const event = {
  child: "Gideon Caleb",
  date: "25 December 2026",
  weekday: "Friday",
  time: "Time to be announced",
  venue: "Timberland Highlands Resort",
  location: "Timberland Heights, San Mateo, Rizal",
  address: "Timberland Heights, Barangay Guitnang Bayan II, San Mateo, Rizal 1850, Philippines",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Timberland%20Highlands%20Resort%2C%20San%20Mateo%2C%20Rizal"
};

const photos = {
  hero: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=2400&q=90",
  family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1800&q=88",
  detail: "https://images.unsplash.com/photo-1604917019117-2f6f8b2c2a58?auto=format&fit=crop&w=1400&q=88",
  nature: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=88",
  candle: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1400&q=88"
};

const ease = [0.22, 1, 0.36, 1];
const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } }
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div className={className} variants={reveal} initial="hidden" whileInView="show"
      viewport={{ once: true, amount: 0.16 }} transition={{ delay, duration: 0.85, ease }}>
      {children}
    </motion.div>
  );
}

function Countdown() {
  const target = useMemo(() => new Date("2026-12-25T00:00:00+08:00").getTime(), []);
  const [left, setLeft] = useState(Math.max(0, target - Date.now()));

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    ["Days", Math.floor(left / 86400000)],
    ["Hours", Math.floor((left / 3600000) % 24)],
    ["Minutes", Math.floor((left / 60000) % 60)],
    ["Seconds", Math.floor((left / 1000) % 60)]
  ];

  return <div className="countdown" aria-label="Countdown to Gideon's baptism">
    {units.map(([label, value]) => (
      <motion.div className="count-unit" key={label} animate={{ y: [0, -2, 0] }} transition={{ duration: .5 }}>
        <strong>{String(value).padStart(2, "0")}</strong><span>{label}</span>
      </motion.div>
    ))}
  </div>;
}

function CalendarButton() {
  const addToCalendar = () => {
    const ics = [
      "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Gideon Caleb Baptism//EN","BEGIN:VEVENT",
      "UID:gideon-caleb-baptism-2026@event-microsite","DTSTAMP:20260921T000000Z",
      "DTSTART;VALUE=DATE:20261225","DTEND;VALUE=DATE:20261226",
      "SUMMARY:Gideon Caleb's Baptism","LOCATION:Timberland Highlands Resort, San Mateo, Rizal",
      "DESCRIPTION:Celebrating the baptism of Baby Gideon Caleb.","END:VEVENT","END:VCALENDAR"
    ].join("\\r\\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "gideon-caleb-baptism-2026.ics"; document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <motion.button className="outline-button" onClick={addToCalendar} whileHover={{ y: -2 }} whileTap={{ scale: .98 }}>
    Add to calendar <CalendarDays size={14} />
  </motion.button>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!rsvpOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setRsvpOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [rsvpOpen]);
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: .001 });
  const heroY = useTransform(smooth, [0, .2], ["0%", "18%"]);
  const heroScale = useTransform(smooth, [0, .2], [1.08, 1]);
  const parallaxY = useTransform(smooth, [.05, .35], ["-5%", "9%"]);
  const progress = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <main className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className="hero" id="top">
        <motion.div className="hero-image" style={{ y: heroY, scale: heroScale, backgroundImage: "url(" + photos.hero + ")" }} />
        <div className="hero-vignette" /><div className="hero-grain" />
        <nav className="nav">
          <a className="brand" href="#top">G C</a>
          <div id="site-navigation" className={"nav-links " + (menu ? "is-open" : "")}>
            {[["Welcome","top"],["Story","story"],["Details","details"],["Gallery","gallery"],["RSVP","rsvp"]].map(([label,id]) =>
              <a href={"#" + id} key={id} onClick={() => setMenu(false)}>{label}</a>
            )}
          </div>
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu} aria-controls="site-navigation">
            {menu ? <X size={19}/> : <Menu size={19}/>}
          </button>
        </nav>

        <div className="hero-content">
          <motion.div className="hero-symbol" initial={{opacity:0,scale:.7,rotate:-10}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1.2,ease}}>
            <Cross size={22} strokeWidth={1}/>
          </motion.div>
          <motion.p className="eyebrow light" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.15,ease}}>
            A Christmas celebration of faith & family
          </motion.p>
          <motion.p className="hero-kicker" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.25}}>The Baptism of</motion.p>
          <motion.h1 initial={{opacity:0,y:42}} animate={{opacity:1,y:0}} transition={{duration:1.15,delay:.25,ease}}>
            Gideon<em>Caleb</em>
          </motion.h1>
          <motion.p className="hero-date" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.55,duration:.8,ease}}>
            {event.weekday} · {event.date}
          </motion.p>
          <motion.a className="hero-cta" href="#story" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.75,duration:.8,ease}} whileHover={{gap:17}}>
            Enter the celebration <ArrowDown size={15}/>
          </motion.a>
        </div>
        <div className="hero-side-note">Born to be loved · Raised in grace</div>
        <a className="scroll-cue" href="#story"><span>Scroll</span><span className="scroll-line"/></a>
      </header>

      <section className="statement section" id="story">
        <Reveal>
          <p className="eyebrow">A little blessing</p>
          <h2>On Christmas Day, we gather to celebrate a life <em>entrusted to our care.</em></h2>
          <p className="lead">With grateful hearts, we invite our family and friends to witness and celebrate the baptism of our beloved Baby Gideon Caleb.</p>
          <div className="signature">with love, <em>Gideon Caleb</em></div>
        </Reveal>
      </section>

      <section className="parallax-frame" aria-label="Family celebration">
        <motion.div className="parallax-image" style={{ backgroundImage: "url(" + photos.family + ")", y: parallaxY }} />
        <div className="image-overlay"/>
        <div className="photo-caption"><span>01</span><span>A day of grace</span></div>
      </section>

      <section className="details section" id="details">
        <div className="section-heading">
          <Reveal><p className="eyebrow">The celebration</p><h2>A sacred moment,<br/><em>a joyful gathering.</em></h2></Reveal>
          <Reveal delay={.12}><p className="section-note">Christmas Day feels even more meaningful this year as we gather around Gideon and give thanks for the gift of his life.</p></Reveal>
        </div>

        <div className="event-grid">
          <Reveal><article className="event-card featured"><span className="card-index">01</span><CalendarDays size={22} strokeWidth={1.1}/><p className="card-label">The date</p><h3>25<br/>December</h3><p>Friday<br/>Christmas Day · 2026</p></article></Reveal>
          <Reveal delay={.08}><article className="event-card"><span className="card-index">02</span><Clock3 size={22} strokeWidth={1.1}/><p className="card-label">The ceremony</p><h3>Time<br/><em>TBA</em></h3><p>Baptism & thanksgiving<br/>Ceremony time to be announced.</p></article></Reveal>
          <Reveal delay={.16}><article className="event-card"><span className="card-index">03</span><MapPin size={22} strokeWidth={1.1}/><p className="card-label">The place</p><h3>Timberland<br/><em>Heights</em></h3><p>{event.location}<br/>Philippines</p><a href="#location">Explore venue <ArrowUpRight size={14}/></a></article></Reveal>
        </div>

        <div className="details-actions"><CalendarButton/><motion.a className="text-link" href="#location" whileHover={{x:4}}>View directions <ArrowUpRight size={14}/></motion.a></div>
      </section>

      <section className="countdown-section">
        <div className="countdown-orb orb-one"/><div className="countdown-orb orb-two"/>
        <Reveal><div className="countdown-inner">
          <div className="christmas-mark"><Sparkles size={15}/></div>
          <p className="eyebrow">Until Christmas Day</p>
          <h2>A little closer to the day we celebrate <em>Gideon.</em></h2>
          <Countdown/>
        </div></Reveal>
      </section>

      <section className="gallery section" id="gallery">
        <div className="section-heading gallery-heading"><Reveal><p className="eyebrow">A glimpse</p><h2>Christmas light,<br/><em>family, and little moments.</em></h2></Reveal></div>
        <div className="gallery-grid">
          <Reveal className="gallery-image g1"><motion.div className="gallery-media" style={{backgroundImage:"url(" + photos.detail + ")"}} whileHover={{scale:1.035}}/><span className="gallery-label">Little details</span></Reveal>
          <Reveal className="gallery-image g2" delay={.08}><motion.div className="gallery-media" style={{backgroundImage:"url(" + photos.nature + ")"}} whileHover={{scale:1.035}}/><span className="gallery-label">A place to gather</span></Reveal>
          <Reveal className="gallery-image g3" delay={.16}><motion.div className="gallery-media" style={{backgroundImage:"url(" + photos.candle + ")"}} whileHover={{scale:1.035}}/><span className="gallery-label">A season of light</span></Reveal>
        </div>
      </section>

      <section className="quote-band"><Reveal><div className="quote-mark">“</div><blockquote>Every good and perfect gift is from above.</blockquote><cite>James 1:17</cite></Reveal></section>

      <section className="location section" id="location">
        <Reveal><div className="location-copy">
          <p className="eyebrow">Find us</p><h2>See you at<br/><em>Timberland.</em></h2>
          <p className="lead">Come celebrate with us among the trees and hills of Timberland Heights in San Mateo, Rizal.</p>
          <div className="location-meta"><MapPin size={19} strokeWidth={1.1}/><span>{event.address}</span></div>
          <motion.a className="outline-button" href={event.mapUrl} target="_blank" rel="noreferrer" whileHover={{y:-2}} whileTap={{scale:.98}}>Open in maps <Navigation size={14}/></motion.a>
        </div></Reveal>
        <Reveal delay={.12}><motion.a className="map-art" href={event.mapUrl} target="_blank" rel="noreferrer" whileHover={{scale:.99}}>
          <div className="map-grid"/><div className="map-ring ring-one"/><div className="map-ring ring-two"/>
          <motion.span className="map-pin" animate={{y:[0,-6,0]}} transition={{duration:2.4,repeat:Infinity,ease:"easeInOut"}}><MapPin size={20} strokeWidth={1.2}/></motion.span>
          <span className="map-label">TIMBERLAND HEIGHTS</span><span className="map-open">Open directions <ArrowUpRight size={13}/></span>
        </motion.a></Reveal>
      </section>

      <section className="rsvp section" id="rsvp">
        <Reveal><div className="rsvp-card"><div className="rsvp-halo"/>
          <Heart size={18} strokeWidth={1.1}/><p className="eyebrow">Your presence means so much</p>
          <h2>Will you celebrate<br/><em>with us?</em></h2>
          <p>Kindly let us know if you will be joining Gideon Caleb's baptism and Christmas celebration.</p>
          <motion.button className="primary-button" onClick={() => setRsvpOpen(true)} whileHover={{y:-3}} whileTap={{scale:.98}}>Confirm attendance <ArrowUpRight size={15}/></motion.button>
        </div></Reveal>
      </section>

      <footer className="footer">
        <div><span className="footer-mark">G C</span><p>Held in grace · 25 December 2026</p></div>
        <a href="#top" className="back-top">Back to top <ChevronDown size={14}/></a>
        <div className="footer-social"><Cross size={14} strokeWidth={1}/><span>Gideon Caleb</span></div>
      </footer>

      <AnimatePresence>
        {rsvpOpen && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setRsvpOpen(false)}>
          <motion.div className="rsvp-modal" initial={{opacity:0,y:30,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.98}} transition={{duration:.45,ease}} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setRsvpOpen(false)} aria-label="Close RSVP"><X size={18}/></button>
            {!submitted ? <>
              <p className="eyebrow">RSVP</p><h2>We'll save you a seat.</h2>
              <p className="modal-copy">This is a preview RSVP for now. It can later be connected to Google Forms, Sheets, or a private RSVP service.</p>
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                <label>Your name<input name="name" required placeholder="Full name"/></label>
                <label>Number of guests<select name="guests" defaultValue="1"><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option></select></label>
                <button className="primary-button" type="submit">Send response <ArrowUpRight size={15}/></button>
              </form>
            </> : <div className="success-state">
              <span className="success-icon"><Check size={22}/></span><p className="eyebrow">Thank you</p>
              <h2>We can't wait to celebrate with you.</h2>
              <p className="modal-copy">Your response has been recorded for this preview. The production RSVP can be connected when you're ready.</p>
              <button className="outline-button" onClick={() => {setRsvpOpen(false);setSubmitted(false)}}>Close <X size={14}/></button>
            </div>}
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}

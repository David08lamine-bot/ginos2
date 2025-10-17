import React, { useEffect, useRef, useState } from "react";

// Link Stripe donazioni
const DONATE_URL = "https://donate.stripe.com/9B67sL3K3786aYc1YscMM00";

export default function Site() {
  const [open, setOpen] = useState(false);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addToReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-[env(safe-area-inset-top)]">
      <style>{`
        .to-reveal { opacity: 0; transform: translateY(24px) scale(.98); transition: opacity .9s ease, transform .9s cubic-bezier(.2,.65,.2,1); }
        .reveal-in { opacity: 1; transform: translateY(0) scale(1); }
        .link-elegant { position: relative; transition: color .25s ease; }
        .link-elegant::after { content: ""; position: absolute; left: 0; bottom: -4px; height: 2px; width: 0; background: linear-gradient(90deg, #e879f9, #a78bfa); transition: width .25s ease; }
        .link-elegant:hover { color: #fff; }
        .link-elegant:hover::after { width: 100%; }

        @keyframes zoomCycle { 
          0% { transform: scale(0.85); opacity: 0; } 
          40% { transform: scale(1.12); opacity: 1; } 
          60% { transform: scale(1.22); opacity: 0; } 
          61% { transform: scale(0.85); opacity: 0; } 
          100% { transform: scale(0.85); opacity: 0; } 
        }

        @keyframes pulseText { 
          0% { text-shadow: 0 0 10px rgba(233,163,255,0.15); color: rgba(233,163,255,0.34); } 
          50% { text-shadow: 0 0 34px rgba(168,85,247,0.9); color: rgba(168,85,247,0.9); } 
          100% { text-shadow: 0 0 10px rgba(233,163,255,0.15); color: rgba(233,163,255,0.34); } 
        }

        /* Mobile: zoom più contenuto per evitare tagli */
        @keyframes zoomCycleMobile { 
          0%   { transform: scale(0.94); opacity: 0; } 
          40%  { transform: scale(1.03); opacity: 1; } 
          60%  { transform: scale(1.06); opacity: 0; } 
          61%  { transform: scale(0.94); opacity: 0; } 
          100% { transform: scale(0.94); opacity: 0; } 
        }

        .waack-zoom { animation: zoomCycle 14s ease-in-out infinite; }
        .waack-text { filter: blur(9px); }

        @media (max-width: 640px) {
          .waack-zoom { animation: zoomCycleMobile 14s ease-in-out infinite; }
          .waack-text { filter: blur(7px); }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 opacity-80" aria-hidden={true}>
        <div
          className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(closest-side, rgba(168,85,247,0.7), transparent)",
          }}
        />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center">
            <img src="/logo-ginos2.png" alt="GINO’S II logo" className="h-10 w-auto" />
          </a>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md border border-white/20 px-3 py-1 text-xs"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#projets" className="link-elegant">Projets</a>
            <a href="#contacts" className="link-elegant">Contacts</a>
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
            >
              🌈 Soutenir
            </a>
          </nav>
        </div>
        {open && (
          <div className="md:hidden border-t border-white/10 bg-black">
            <div className="px-4 py-3 grid gap-3 text-white/90">
              <a href="#projets" className="link-elegant">Projets</a>
              <a href="#contacts" className="link-elegant">Contacts</a>
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
              >
                🌈 Soutenir
              </a>
            </div>
          </div>
        )}
      </header>

      <section id="top" className="relative">
        <div
          ref={addToReveal}
          className="to-reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">GINO’S II</h1>
          <p className="mt-6 text-lg text-white/80 leading-relaxed">
            L’association a pour objectif de promouvoir, soutenir et organiser des événements
            culturels et artistiques ancrés dans les cultures queer et clubbing, en valorisant les
            danses issues du mouvement punking/waacking ainsi que les formes d’expression nées des
            communautés marginalisées.
          </p>
          <p className="mt-5 text-sm text-white/60">
            SIRET 990 923 252 00011 • RNA W751280385
          </p>
        </div>
      </section>

      <section id="projets" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <h2
          ref={addToReveal}
          className="to-reveal text-3xl sm:text-4xl font-bold tracking-tight text-white relative z-10"
        >
          Projets
        </h2>

        <div
          ref={addToReveal}
          className="to-reveal mt-8 rounded-2xl border border-white/10 bg-white/5 text-white p-4 sm:p-10 md:p-16 relative h-[78vh] sm:h-[65vh] flex flex-col justify-end overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center waack-zoom">
            <h3
              className="leading-[0.9] tracking-tight text-center text-transparent bg-clip-text waack-text select-none whitespace-nowrap text-[12.5vw] sm:text-[13vw] md:text-[11vw] lg:text-[10vw]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(233,163,255,0.35) 25%, rgba(255,255,255,0.12) 50%, rgba(233,163,255,0.42) 75%, rgba(255,255,255,0.16) 100%)",
                animation: "pulseText 0.8s ease-in-out infinite",
              }}
            >
              WAACK ME UP
            </h3>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-sm tracking-widest uppercase px-4 py-2 rounded-lg bg-white/10 border border-white/10 shadow-md">
              ✨ Coming Soon
            </div>
            <p className="mt-6 text-white/75 max-w-3xl">
              Première annonce très bientôt. Restez informé·e·s pour découvrir notre prochain
              événement : danse, arts visuels et médiation publique.
            </p>

            <form className="mt-8 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="nl" className="block text-sm text-white/80 mb-2">
                Laissez votre email pour être informé·e·s :
              </label>
              <div className="flex gap-2">
                <input
                  id="nl"
                  type="email"
                  required
                  placeholder="votre@email"
                  className="flex-1 rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
                />
                <button className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10">
                  S’inscrire
                </button>
              </div>
              <p className="mt-2 text-xs text-white/50">
                Nous n’envoyons que des mises à jour sur l’événement. Pas de spam.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Sezione Donazioni */}
      <section
        id="donate"
        ref={addToReveal}
        className="to-reveal max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Soutenir</h2>
        <p className="mt-4 text-white/80 max-w-2xl">
          Soutenez les projets artistiques et culturels de GINO’S II — dédiés à la danse, à la
          création queer et aux échanges interculturels à Paris.
        </p>
        <div className="mt-6">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow hover:opacity-90"
          >
            🌈 Soutenir / Donate
          </a>
        </div>
      </section>

      <section
        id="contacts"
        ref={addToReveal}
        className="to-reveal max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Contacts</h2>
        <div className="mt-6 space-y-2 text-white/85">
          <p>
            <a className="link-elegant" href="mailto:ginos2.paris@gmail.com">
              ginos2.paris@gmail.com
            </a>
          </p>
          <p>GINO’S II, 10 Rue de Montyon, 75009 Paris, France</p>
          <p>
            <a href="tel:+33745028295" className="link-elegant">
              +33 7 45028295
            </a>
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-white/80">
          <div className="grid md:grid-cols-2 gap-4 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest">GINO’S II</span>
              <p className="mt-3">© 2025 GINO’S II · Tous droits réservés</p>
            </div>
            <div className="md:text-right">
              <p>
                <a className="link-elegant" href="mailto:ginos2.paris@gmail.com">
                  ginos2.paris@gmail.com
                </a>
              </p>
              <p className="text-white/70">Mentions légales · Confidentialité · Cookies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

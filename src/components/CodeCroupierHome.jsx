import { useEffect, useRef, useState } from 'react';
import './CodeCroupierHome.css';

/**
 * CodeCroupier — Home
 * -----------------------------------------------------------------------
 * Drop-in usage:
 *   1. Place cody-hero.png, cody-chips.png and cody-loop.mp4 in your
 *      Vite project's /public folder (referenced below as root-relative
 *      paths, e.g. "/cody-hero.png").
 *   2. Place your real whitepaper at /public/CodeCroupier-Whitepaper.pdf
 *      so the "Download Whitepaper" button works.
 *   3. Import and render <CodeCroupierHome /> from a route/page component.
 *
 * Everything is scoped under the .cc-home wrapper class in
 * CodeCroupierHome.css, so it won't clash with your existing theme.css
 * tokens (--red, --panel, etc.) — this component defines its own
 * --cc-* custom properties instead.
 */

const TICKER_DATA = [
  ['CC-CHIP', '$1.08 USD', 'up'],
  ['NETWORK', 'BSC Mainnet', ''],
  ['DAILY REWARD', 'Up to 1.00%', 'up'],
  ['TOTAL SUPPLY', '—', ''],
  ['CONTRACT', 'Active', 'up'],
  ['MIN. STAKE', '100 CC-CHIP', ''],
];

const NAV_LINKS = [
  ['Home', '#home'],
  ['How It Works', '#how'],
  ['Meet Cody', '#meet-cody'],
  ['About', '#about'],
  ['Whitepaper', '#whitepaper'],
];

const TOTAL_SLIDES = 3;
const DEFAULT_TOAST = 'Wallet not connected — this is a design preview.';

export default function CodeCroupierHome() {
  const [scrolled, setScrolled] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: DEFAULT_TOAST });
  const toastTimeoutRef = useRef(null);

  // header shrink on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // hero autoplay
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % TOTAL_SLIDES);
    }, 6000);
    return () => clearInterval(id);
  }, [paused]);

  function goSlide(i) {
    setSlide(((i % TOTAL_SLIDES) + TOTAL_SLIDES) % TOTAL_SLIDES);
  }
  function moveSlide(dir) {
    goSlide(slide + dir);
  }

  function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function closeMobileNav() {
    setMobileOpen(false);
  }

  function handleNavClick(e, href) {
    e.preventDefault();
    scrollToId(href.replace('#', ''));
    closeMobileNav();
  }

  function showToast(msg) {
    clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, msg: msg || DEFAULT_TOAST });
    toastTimeoutRef.current = setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      2800
    );
  }

  function handleExtLink(e, msg) {
    e.preventDefault();
    showToast(msg);
  }

  function handleMobileConnect() {
    showToast();
    closeMobileNav();
  }

  return (
    <div className="cc-home">
      <div className="bg-circuit" />
      <div className="bg-glow">
        <span className="g1" />
        <span className="g2" />
        <span className="g3" />
      </div>

      <header className={scrolled ? 'scrolled' : ''}>
        <a href="#home" className="brand" aria-label="CodeCroupier — home">
          <img
            className="brand-logo"
            src="/codecroupier-logo-100-transparent.png"
            alt="CodeCroupier — The Dealer Is Code"
          />
        </a>

        <nav className={`nav-links${mobileOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => handleNavClick(e, href)}>
              {label}
            </a>
          ))}
          <button className="btn btn-primary nav-mobile-cta" onClick={handleMobileConnect}>
            Connect Wallet
          </button>
        </nav>

        <div className="nav-actions">
          <div className="status-pill">
            <span className="dot" /> BSC Mainnet
          </div>
          <button className="btn btn-primary nav-desktop-cta" onClick={() => showToast()}>
            Connect Wallet
          </button>
          <button
            className={`nav-toggle${mobileOpen ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className="header-spacer" aria-hidden="true" />

      <section
        className="hero"
        id="home"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="slides"
          style={{ transform: `translateX(-${slide * (100 / TOTAL_SLIDES)}%)` }}
        >
          <div className="slide with-dealer">
            <div className="slide-grid">
              <div className="slide-inner">
                <div className="eyebrow">POWERED BY C-CHIP · $CCHIP</div>
                <h1>CodeCroupier <br /><span className="accent">The Dealer is Code</span></h1>
                <p>A fully on-chain casino platform powered by verifiable smart-contract logic and C-Chip ($CCHIP). No hidden dealer. No hidden odds.</p>
                <div className="slide-cta">
                  <button className="btn btn-primary" onClick={() => scrollToId('how')}>Get Started</button>
                  <button className="btn btn-secondary" onClick={() => showToast()}>Connect Wallet</button>
                </div>
              </div>
              <div className="dealer-visual">
                <div className="dealer-ring" />
                <div className="dealer-frame">
                  <video autoPlay muted loop playsInline poster="/cody-hero.png">
                    <source src="/cody-loop.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="dealer-badge"><span className="dot" /> Cody · Live Dealer</div>
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="slide-inner">
              <div className="eyebrow">STAKING · DAILY REWARDS</div>
              <h1>Stake C-Chip. <span className="accent">Earn Daily.</span></h1>
              <p>Stake multiples of 100 CC-CHIP to activate your account and earn up to 1% daily reward on your active deposit — tracked transparently on-chain.</p>
              <div className="slide-cta">
                <button className="btn btn-primary" onClick={() => scrollToId('how')}>Start Staking</button>
                <button className="btn btn-secondary" onClick={() => scrollToId('about')}>View Tokenomics</button>
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="slide-inner">
              <div className="eyebrow">PROVABLY FAIR</div>
              <h1>Every Spin, <span className="accent">Settled On-Chain.</span></h1>
              <p>Roulette results come straight from smart-contract logic — not a hidden backend. Connect your wallet and watch the code deal.</p>
              <div className="slide-cta">
                <button className="btn btn-primary" onClick={() => showToast()}>Launch Roulette</button>
                <button className="btn btn-secondary" onClick={() => scrollToId('risk')}>Read Risk Disclosure</button>
              </div>
            </div>
          </div>
        </div>

        <button className="slide-arrow prev" aria-label="Previous slide" onClick={() => moveSlide(-1)}>‹</button>
        <button className="slide-arrow next" aria-label="Next slide" onClick={() => moveSlide(1)}>›</button>
        <div className="dots">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              className={slide === i ? 'active' : ''}
              onClick={() => goSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker">
          {[...TICKER_DATA, ...TICKER_DATA].map(([label, val, cls], i) => (
            <div className="ticker-item" key={i}>
              <span className="tag">{label}</span>
              <b className={cls}>{val}</b>
            </div>
          ))}
        </div>
      </div>

      <section id="how">
        <div className="section-head">
          <div className="eyebrow">HOW IT WORKS</div>
          <h2>Four steps to the table</h2>
          <p>Connect, stake, earn and grow your network — every step verifiable on BSC Mainnet.</p>
        </div>
        <div className="cards">
          <div className="card">
            <div className="step">01</div>
            <h3>Connect Wallet</h3>
            <p>Link your BSC wallet to get started instantly — no sign-up, no forms.</p>
          </div>
          <div className="card">
            <div className="step">02</div>
            <h3>Stake CC-CHIP</h3>
            <p>Stake multiples of 100 CC-CHIP to activate your account and start earning.</p>
          </div>
          <div className="card">
            <div className="step">03</div>
            <h3>Earn Daily Reward</h3>
            <p>Earn up to 1% daily reward on your active deposit, credited automatically.</p>
          </div>
          <div className="card">
            <div className="step">04</div>
            <h3>Refer &amp; Earn</h3>
            <p>Get direct and level income by growing your team through your referral link.</p>
          </div>
        </div>
      </section>

      <section id="meet-cody" style={{ paddingTop: 0 }}>
        <div className="about" style={{ padding: 0 }}>
          <div>
            <div className="eyebrow">MEET THE DEALER</div>
            <h2>Cody runs the table — the contract calls the odds.</h2>
            <p>Cody is CodeCroupier&apos;s on-chain dealer: the face you&apos;ll see at every table, every stake confirmation and every payout. He doesn&apos;t set the odds and he can&apos;t tip the wheel — that&apos;s handled entirely by the smart contract, in full view of the chain.</p>
            <p>Think of Cody as your guide to the protocol, not the house edge. He&apos;s here to make a technical, on-chain product feel like sitting down at a table with someone you trust.</p>
            <ul>
              <li><span className="mark">→</span> Appears across staking, rewards and roulette confirmations</li>
              <li><span className="mark">→</span> Never holds custody — funds move through the contract, not through Cody</li>
              <li><span className="mark">→</span> A consistent face for a protocol built on verifiable logic</li>
            </ul>
          </div>
          <div className="dealer-portrait">
            <img src="/cody-hero.png" alt="Cody, the CodeCroupier on-chain dealer, stacking C-Chip tokens" loading="lazy" />
            <div className="portrait-caption">
              <span>CODY</span>
              <span className="tag2">ON-CHAIN DEALER</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div>
          <div className="eyebrow">ABOUT THE PROTOCOL</div>
          <h2>A protocol-grade casino, built like infrastructure.</h2>
          <p>CodeCroupier is a fully on-chain casino platform on BSC Mainnet. Every deposit, reward and roulette result is settled through smart-contract logic — transparent, auditable, and free from any hidden backend.</p>
          <p>C-Chip ($CCHIP) is the protocol&apos;s native token, powering staking, daily rewards, referral income and in-game settlement across the platform.</p>
          <ul>
            <li><span className="mark">→</span> Smart-contract settled roulette — the dealer is code, not a house edge you can&apos;t see.</li>
            <li><span className="mark">→</span> Fixed daily rewards and referral structure, published and unchanged.</li>
            <li><span className="mark">→</span> Direct, level and team rewards for growing your network.</li>
          </ul>
        </div>
        <div className="panel-visual" id="tokenomics">
          <div className="head">Protocol Snapshot</div>
          <div className="row"><span>CC-CHIP Price</span><span className="green">$1.08 USD</span></div>
          <div className="row"><span>Network</span><span className="cyan">BSC Mainnet</span></div>
          <div className="row"><span>Daily Reward</span><span>Up to 1.00%</span></div>
          <div className="row"><span>Min. Stake</span><span>100 CC-CHIP</span></div>
          <div className="row"><span>Contract Status</span><span className="green">● Active</span></div>
          <div className="row"><span>Settlement</span><span className="cyan">On-Chain</span></div>
        </div>
      </section>

      <section id="whitepaper">
        <div className="section-head">
          <div className="eyebrow">DOCUMENTATION</div>
          <h2>The whitepaper</h2>
          <p>Protocol mechanics, staking math, referral structure and roulette settlement logic — written up in full for anyone who wants to verify before they play.</p>
        </div>
        <div className="cards cards-3">
          <div className="card">
            <div className="step">01</div>
            <h3>Protocol Overview</h3>
            <p>How CodeCroupier structures staking, rewards and settlement on BSC Mainnet.</p>
          </div>
          <div className="card">
            <div className="step">02</div>
            <h3>Tokenomics</h3>
            <p>Supply, distribution and the role of C-Chip ($CCHIP) across the platform.</p>
          </div>
          <div className="card">
            <div className="step">03</div>
            <h3>Risk &amp; Disclosure</h3>
            <p>What&apos;s fixed, what&apos;s variable, and the risks involved in participating.</p>
          </div>
        </div>
          <div className="slide-cta" style={{ justifyContent: 'center', marginTop: 40 }}>
            <a
              className="btn btn-primary"
              href="/CodeCroupier-Whitepaper.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Whitepaper
            </a>
          <button className="btn btn-secondary" onClick={() => scrollToId('risk')}>Read Risk Disclosure</button>
        </div>
      </section>

      <footer>
        <div className="foot-top">
          <div className="foot-brand">
            <div className="brand">
              <div className="brand-word"><b>CODE<span>CROUPIER</span></b></div>
            </div>
            <p>A fully on-chain casino platform powered by verifiable smart-contract logic and C-Chip ($CCHIP).</p>
          </div>
          <div className="foot-social">
            <div className="social-row">
              <a
                className="social-icon"
                href="#"
                aria-label="Telegram"
                onClick={(e) => handleExtLink(e, 'Community links go live at launch.')}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 4L2.5 11.2c-.9.35-.9 1.6.02 1.9l4.6 1.5 1.8 5.7c.3.9 1.5 1.1 2.1.35l2.5-3.1 4.6 3.4c.8.6 2 .15 2.2-.85L22 5.1c.2-1-.8-1.8-1.7-1.4l.7.3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <path d="M7.1 14.6l10-7.4-8.3 8.9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                className="social-icon"
                href="#"
                aria-label="X (Twitter)"
                onClick={(e) => handleExtLink(e, 'Community links go live at launch.')}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4l7.2 9.4L4.4 20h2.3l6-6.7 4.5 6.7H21l-7.5-9.9L20 4h-2.3l-5.6 6.2L7.7 4H4z" fill="currentColor"/>
                </svg>
              </a>
              <a
                className="social-icon"
                href="#"
                aria-label="Discord"
                onClick={(e) => handleExtLink(e, 'Community links go live at launch.')}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 8.6c2.3-1 4.7-1 7 0M7.3 15.4c2.9 1.3 6.5 1.3 9.4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8.7 6.8C6.6 7.4 5 8.6 5 8.6s-1.5 3-1.5 7.4c0 0 1.4 1.6 4.3 1.9l.8-1.4M15.3 6.8c2.1.6 3.7 1.8 3.7 1.8s1.5 3 1.5 7.4c0 0-1.4 1.6-4.3 1.9l-.8-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="12.5" r="1.3" fill="currentColor"/>
                  <circle cx="15" cy="12.5" r="1.3" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <p id="risk">CodeCroupier and C-Chip involve on-chain risk. Digital assets are volatile — only participate with funds you can afford to lose. This is not financial advice.</p>
          <p className="small">© 2026 CODECROUPIER · $CCHIP</p>
        </div>
      </footer>

      <div className={`toast${toast.show ? ' show' : ''}`}>
        <span className="dot" /> {toast.msg}
      </div>
    </div>
  );
}
'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  /* ========== NAVBAR STATE ========== */
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ========== EXPERIENCES CAROUSEL STATE ========== */
  const [expIndex, setExpIndex] = useState(0)
  const experiences = [
    {
      role: 'Product Manager & E-commerce Manager',
      company: 'GAPIANNE',
      period: 'Septembre 2025 — Septembre 2026',
      tasks: [
        "Pilotage d'un portefeuille de 42 marques partenaires : définition et exécution des plans d'activation (lancements produits, opérations croisées).",
        "Supply Chain : conception et automatisation d'un outil de suivi de stocks sur mesure, générant une économie de 13 000 € et un gain de productivité de 300h/an.",
        "E-commerce management : Stratégie e-commerce, mise à jour du catalogue produits, activation de temps forts commerciaux, optimisation continue, analyse et suivi des chiffres.",
        "Influence & PR : Stratégie de portage, analyse de l'affinité influenceurs et activation terrain pour renforcer la notoriété de marque.",
        "Administratif : Gestion de la facturation et suivi des avoirs, gestion du service client et automatisation de fichiers pour améliorer la réactivité et le suivi.",
      ],
    },
    {
      role: 'E-Merchandiser / Cheffe de projet e-commerce',
      company: 'FAGUO',
      period: 'Septembre 2023 — Septembre 2025',
      tasks: [
        "AB test (création et enrichissement de road-map, A/B testing de pop-up, suivi des performances)",
        "UX/UI design (recommandation d'améliorations UX sur maquettes)",
        "CRO (analyse des conversions, identification des points de friction et des leviers d'amélioration, analyse du traffic)",
        "Mise en ligne des collections (2 collections annuelles, enrichissements des bases de données)",
        "Stratégie e-merchandising, cross-selling (gestion de 600 produits actifs)",
        "Création de landing pages, optimisation des fiches produits, gestion des pop-ups / notifications",
        "Benchmark (réalisation de 19 benchmarks sur les bonnes pratiques UX/UI design, pricing, veille sur les tendances e-commerçantes.)",
      ],
    },
    {
      role: 'Assistante de développement commercial & marketing',
      company: 'Comptoir Doré',
      period: 'Octobre 2022 — Août 2023',
      tasks: [
        "Stratégie SEO (création d'une stratégie, rédaction d'articles, maillage interne)",
        "Organisation d'évènements éphémères (2 pop-up store, dont 1 aux Galeries Lafayette)",
        "Création et animation d'une stratégie de communication (+ 4,5K d'abonnés en 6 mois)",
        "Gestion du e-merchandising (gestion de 900 produits, import réguliers de collection)",
        "Gestion des campagnes emailing (envoi de newsletters mensuelles)",
        "Veille concurrentielle & Benchmarking",
        "Création de supports photos & vidéos, bilan commercial.",
      ],
    },
  ]

  const nextExp = () => setExpIndex((prev) => (prev + 1) % experiences.length)
  const prevExp = () => setExpIndex((prev) => (prev - 1 + experiences.length) % experiences.length)

  /* ========== FORMATION CAROUSEL STATE ========== */
  const [carouselIndex, setCarouselIndex] = useState(0)
  const formations = [
    {
      title: 'MBA Digital Marketing & Business & Artificial Intelligence',
      subtitle: 'Spécialisation Cosmetics & Beauty — EFAP',
      items: ['Intelligence Artificielle', 'SEO', 'Cybersécurité', 'Growth Marketing', 'Social Ads & E-commerce', 'Blockchain', 'Content Marketing', 'CRM', 'Retail Media'],
    },
    {
      title: 'Mastère Manager Produits & Marketing',
      subtitle: 'ESG Nantes — Major de Promotion',
      items: ['Data Marketing', 'Gestion de la relation client', 'Gestion des prestataires', 'Business English', 'Stratégie (e-)merchandising', 'Expérience client & fidélisation', 'Gestion des budgets', "Management d'équipes"],
    },
    {
      title: 'Bachelor Responsable de Développement Commercial',
      subtitle: 'ESG Nantes',
      items: ['Droit du travail', 'Droit commercial', 'Stratégie de négociation', 'Conception tableaux de bords', 'Gestion administrative des ventes', 'Management interculturel', 'Marketing stratégique'],
    },
    {
      title: 'Diplôme universitaire en Droit, Économie & Gestion',
      subtitle: 'IAE Valenciennes',
      items: ['Comptabilité', 'Gestion', 'Droit des sociétés', 'Environnement politique et économique', 'Management', 'Mathématiques financières'],
    },
  ]

  const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % formations.length)
  const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + formations.length) % formations.length)

  /* ========== LIPSTICK CATCHER GAME ========== */
  const [gameOpen, setGameOpen] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [gameTime, setGameTime] = useState(30)
  const [gameRunning, setGameRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const canvasRef = useRef(null)
  const gameScoreRef = useRef(0)
  const gameRef = useRef({
    basket: { x: 180, width: 60 },
    lipsticks: [],
    animId: null,
    spawnTimer: 0,
  })

  const gameWinHref = `mailto:lea.maliar.pro@gmail.com?subject=${encodeURIComponent("🏆 Game Over : J'ai trouvé la pépite pour septembre 2026")}&body=${encodeURIComponent(
    "Hello Léa,\n\nChallenge validé. J'ai les 3 rouges à lèvres, mais je veux surtout le talent qui a codé cette expérience.\n\nVotre profil hybride (Data + Créa) semble parfaitement correspondre à nos besoins actuels.\n\nQuand êtes-vous disponible pour un premier échange ?\n\nBien à vous,\n[Signature]"
  )}`

  const startGame = () => {
    setGameOpen(true)
    setGameScore(0)
    gameScoreRef.current = 0
    setGameTime(30)
    setGameOver(false)
    setGameWon(false)
    gameRef.current.lipsticks = []
    gameRef.current.spawnTimer = 0
    setTimeout(() => setGameRunning(true), 300)
  }

  // Game timer
  useEffect(() => {
    if (!gameRunning) return
    const interval = setInterval(() => {
      setGameTime((t) => {
        if (t <= 1) {
          setGameRunning(false)
          setGameOver(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [gameRunning])

  // Watch for 3 lipsticks caught
  useEffect(() => {
    if (gameScore >= 3 && gameRunning) {
      setGameRunning(false)
      setGameOver(true)
      setGameWon(true)
    }
  }, [gameScore, gameRunning])

  // Game loop
  useEffect(() => {
    if (!gameRunning || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)
    const W = rect.width
    const H = rect.height

    const game = gameRef.current
    game.basket.x = W / 2 - 30

    const handleMouseMove = (e) => {
      const r = canvas.getBoundingClientRect()
      game.basket.x = Math.max(0, Math.min(W - game.basket.width, e.clientX - r.left - game.basket.width / 2))
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      const r = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      game.basket.x = Math.max(0, Math.min(W - game.basket.width, touch.clientX - r.left - game.basket.width / 2))
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })

    const loop = () => {
      ctx.clearRect(0, 0, W, H)

      // Spawn lipsticks
      game.spawnTimer++
      if (game.spawnTimer % 30 === 0) {
        game.lipsticks.push({
          x: Math.random() * (W - 24),
          y: -30,
          speed: 1.2 + Math.random() * 1.8,
        })
      }

      // Draw & update lipsticks
      game.lipsticks = game.lipsticks.filter((l) => {
        l.y += l.speed
        ctx.font = '24px serif'
        ctx.textAlign = 'center'
        ctx.fillText('💄', l.x + 12, l.y + 24)

        // Check catch
        if (
          l.y + 24 >= H - 40 &&
          l.y <= H - 10 &&
          l.x + 12 >= game.basket.x &&
          l.x + 12 <= game.basket.x + game.basket.width
        ) {
          setGameScore((s) => {
            const newScore = s + 1
            gameScoreRef.current = newScore
            return newScore
          })
          return false
        }

        return l.y < H + 10
      })

      // Draw basket 🧺
      ctx.font = '32px serif'
      ctx.textAlign = 'center'
      ctx.fillText('🧺', game.basket.x + game.basket.width / 2, H - 12)

      // Thin elegant line
      ctx.strokeStyle = 'rgba(204, 163, 166, 0.3)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(game.basket.x + 4, H - 36)
      ctx.lineTo(game.basket.x + game.basket.width - 4, H - 36)
      ctx.stroke()

      // Score indicators at top
      const collected = gameScoreRef.current
      for (let i = 0; i < 3; i++) {
        ctx.globalAlpha = i < collected ? 1 : 0.25
        ctx.font = '18px serif'
        ctx.fillText('💄', W / 2 - 30 + i * 30, 22)
      }
      ctx.globalAlpha = 1

      game.animId = requestAnimationFrame(loop)
    }

    game.animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(game.animId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
    }
  }, [gameRunning])

  /* ========== SURPRISE MAILTO ========== */
  const surpriseHref = `mailto:lea.maliar.pro@gmail.com?subject=${encodeURIComponent("Candidature Léa Maliar : Demande d'entretien")}&body=${encodeURIComponent(
    "Bonjour Léa,\n\nJ'ai choisi l'option \"Surprise\" pour aller droit au but.\n\nJe suis intéressé(e) par votre profil e-commerce / marketing digital.\nPrenons un moment pour discuter de vos expériences et de ce que vous pourriez apporter à notre équipe.\n\nMes disponibilités sont :\n• [Date / Heure]\n\nBien à vous,\n[Signature]"
  )}`

  /* ========== SOFT SKILLS DATA ========== */
  const softSkills = [
    { icon: '🔄', label: 'Polyvalence' },
    { icon: '🎯', label: 'Autonomie' },
    { icon: '🤝', label: "Esprit d'équipe" },
    { icon: '💡', label: 'Créativité' },
    { icon: '🔎', label: 'Curiosité' },
    { icon: '👑', label: 'Leadership' },
    { icon: '👂', label: "Sens de l'écoute" },
    { icon: '💪', label: 'Persévérance' },
  ]

  return (
    <>
      {/* ==================== MARQUEE BANNER ==================== */}
      <div className="marquee-banner">
        <div className="marquee-content">
          <a href="mailto:lea.maliar.pro@gmail.com">lea.maliar.pro@gmail.com</a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/léa-m-86342b21a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>•</span>
          <span>Le futur talent prêt à vous rejoindre</span>
          <span>•</span>
          <a href="mailto:lea.maliar.pro@gmail.com">lea.maliar.pro@gmail.com</a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/léa-m-86342b21a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>•</span>
          <span>Le futur talent prêt à vous rejoindre</span>
          <span>•</span>
          <a href="mailto:lea.maliar.pro@gmail.com">lea.maliar.pro@gmail.com</a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/léa-m-86342b21a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>•</span>
          <span>Le futur talent prêt à vous rejoindre</span>
          <span>•</span>
          <a href="mailto:lea.maliar.pro@gmail.com">lea.maliar.pro@gmail.com</a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/léa-m-86342b21a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>•</span>
          <span>Le futur talent prêt à vous rejoindre</span>
          <span>•</span>
        </div>
      </div>

      {/* ==================== NAVBAR ==================== */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#hero" className="navbar-logo">LM</a>
          <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#hero" onClick={() => setMenuOpen(false)}>Accueil</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>À Propos</a></li>
            <li><a href="#experiences" onClick={() => setMenuOpen(false)}>Expérience</a></li>
            <li><a href="#formation" onClick={() => setMenuOpen(false)}>Formation</a></li>
            <li><a href="#hard-skills" onClick={() => setMenuOpen(false)}>Compétences</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
          <button className="navbar-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* ==================== HERO ==================== */}
      <section className="hero" id="hero">
        <p className="hero-subtitle">Bienvenue sur le CV de</p>
        <h1 className="hero-name">Léa Maliar</h1>
        <p className="hero-tagline">Marketing Digital, Data & Business Development</p>
        <a href="#experiences" className="hero-cta">Découvrir les expériences</a>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section className="about" id="about">
        <div className="section-container">
          <h2 className="section-title">Qui suis-je ?</h2>
          <div className="about-grid">
            <img src="/photo-lea.png" alt="Léa Maliar" className="about-photo" />
            <div className="about-text">
              <p>
                Forte de 4 années d&apos;expérience opérationnelle, j&apos;ai construit mon profil à l&apos;intersection du marketing et de la technologie. Mon approche ne se limite pas à appliquer des recettes, mais à construire des systèmes de croissance durables.
              </p>
              <span className="pillar-title">Mon expertise repose sur 3 piliers complémentaires :</span>
              <ul className="pillar-list">
                <li>
                  <strong>L&apos;Analyse de la performance :</strong> Faire parler la donnée pour guider les décisions stratégiques.
                </li>
                <li>
                  <strong>L&apos;Optimisation CRO / UX :</strong> Fluidifier les parcours clients pour optimiser le taux de conversion.
                </li>
                <li>
                  <strong>L&apos;Automatisation via l&apos;IA :</strong> Déployer des workflows intelligents pour libérer du temps créatif et gagner en efficacité.
                </li>
              </ul>
            </div>
          </div>
          <div className="about-avis">
            <a href="https://gensdeconfiance.com/fr/ui/profiles/62ce9865-39aa-42b4-a060-2067c0a55980" target="_blank" rel="noopener noreferrer" className="avis-cta">
              Les Avis →
            </a>
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCES (CAROUSEL) ==================== */}
      <section className="experiences" id="experiences">
        <div className="section-container">
          <h2 className="section-title">Expériences Professionnelles</h2>
          <div className="carousel-wrapper">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${expIndex * 100}%)` }}
            >
              {experiences.map((exp, i) => (
                <div className="carousel-card exp-card" key={i}>
                  <h3>{exp.role}</h3>
                  <p className="school">{exp.company} — {exp.period}</p>
                  <ul className="exp-tasks">
                    {exp.tasks.map((task, j) => (
                      <li key={j}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-nav">
            <button className="carousel-btn" onClick={prevExp} aria-label="Précédent">‹</button>
            <div className="carousel-dots">
              {experiences.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === expIndex ? 'active' : ''}`}
                  onClick={() => setExpIndex(i)}
                  aria-label={`Expérience ${i + 1}`}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={nextExp} aria-label="Suivant">›</button>
          </div>
        </div>
      </section>

      {/* ==================== FORMATION ==================== */}
      <section className="formation" id="formation">
        <div className="section-container">
          <h2 className="section-title">Formation Académique</h2>
          <div className="carousel-wrapper">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {formations.map((f, i) => (
                <div className="carousel-card" key={i}>
                  <h3>{f.title}</h3>
                  <p className="school">{f.subtitle}</p>
                  <ul>
                    {f.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-nav">
            <button className="carousel-btn" onClick={prevSlide} aria-label="Précédent">‹</button>
            <div className="carousel-dots">
              {formations.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === carouselIndex ? 'active' : ''}`}
                  onClick={() => setCarouselIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={nextSlide} aria-label="Suivant">›</button>
          </div>
        </div>
      </section>

      {/* ==================== HARD SKILLS ==================== */}
      <section className="hard-skills" id="hard-skills">
        <div className="section-container">
          <h2 className="section-title">Hard Skills</h2>
          <div className="skills-grid">
            {[
              'Anglais — TOEIC 905 / 965',
              'CMS (Shopify & Prestashop)',
              'Google App Script, Looker Studio',
              'Méthodologie n8n, création de workflow, automatisation',
              'Google Analytics 4',
              'Maîtrise de Excel et Gsheet',
              'Certification Google Ads',
              'Gemini, ChatGPT, Claude, Manus',
              'Kameleoon, Klaviyo, Zendesk, Algolia, Target 2 Sell',
            ].map((skill, i) => (
              <div className="skill-item" key={i}>
                <span className="skill-icon" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MINI JEU ==================== */}
      <section className="mini-game" id="mini-game">
        <div className="section-container">
          <h2 className="section-title">Un petit défi ?</h2>
          <p className="game-intro">Attrapez 3 rouges à lèvres 💄 avec votre panier pour débloquer une surprise, ou allez droit au but.</p>
          <div className="game-ctas">
            <button className="game-btn game-btn-play" onClick={startGame}>
              Jouer
            </button>
            <a className="game-btn game-btn-surprise" href={surpriseHref}>
              Débloquer la surprise
            </a>
          </div>
        </div>
      </section>

      {/* Game Modal */}
      <div className={`game-modal-overlay ${gameOpen ? 'active' : ''}`} onClick={() => { setGameOpen(false); setGameRunning(false) }}>
        <div className="game-modal" onClick={(e) => e.stopPropagation()}>
          <h3>{gameWon ? '🏆 Challenge validé !' : gameOver ? 'Temps écoulé !' : 'Attrapez 3 💄'}</h3>
          <p className="game-score">💄 {gameScore} / 3</p>
          {!gameOver && <p className="game-timer">⏱ {gameTime}s</p>}
          {!gameOver && (
            <div className="game-canvas-container">
              <canvas ref={canvasRef} />
            </div>
          )}
          {gameWon && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ color: 'var(--accent)', marginBottom: 20, fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Bravo ! Vous avez attrapé les 3 rouges à lèvres.<br />
                Votre récompense : un email pré-rempli pour contacter Léa.
              </p>
              <a className="game-btn game-btn-surprise" href={gameWinHref} style={{ display: 'inline-block' }}>
                🏆 Envoyer l&apos;email
              </a>
            </div>
          )}
          {gameOver && !gameWon && (
            <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
              Vous avez attrapé {gameScore} rouge{gameScore > 1 ? 's' : ''} à lèvres. Il en fallait 3 !
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {gameOver && !gameWon && (
              <button className="game-close" onClick={startGame} style={{ background: 'var(--accent)', color: 'var(--bg-dark)' }}>
                Rejouer
              </button>
            )}
            <button className="game-close" onClick={() => { setGameOpen(false); setGameRunning(false) }}>
              Fermer
            </button>
          </div>
        </div>
      </div>

      {/* ==================== SOFT SKILLS ==================== */}
      <section className="soft-skills" id="soft-skills">
        <div className="section-container">
          <h2 className="section-title">Soft Skills</h2>
          <div className="soft-skills-grid">
            {softSkills.map((s, i) => (
              <div className="soft-skill-card" key={i}>
                <span className="soft-icon">{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== LOISIRS ==================== */}
      <section className="loisirs" id="loisirs">
        <div className="section-container">
          <h2 className="section-title">Loisirs</h2>
          <div className="loisirs-grid">
            <div className="loisir-card">
              <h4>Engagement</h4>
              <p>Déléguée de promotion — Bachelor & Mastère. Bénévolat — Association animale & étudiante.</p>
            </div>
            <div className="loisir-card">
              <h4>Arts</h4>
              <p>Musées, littérature, musique, cinéma, photographie.</p>
            </div>
            <div className="loisir-card">
              <h4>Sport</h4>
              <p>Randonnée, musculation, équitation, badminton, trail.</p>
            </div>
            <div className="loisir-card">
              <h4>Loisirs créatifs</h4>
              <p>Dessin, peinture, couture, créations digitales.</p>
            </div>
          </div>
          <div className="loisirs-photos" id="loisirs-photos">
            {/* Photos à ajouter ultérieurement */}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section className="contact" id="contact">
        <div className="section-container">
          <h2 className="section-title">Contact</h2>
          <p>Vous souhaitez échanger sur un projet ou une opportunité ? N&apos;hésitez pas à me contacter.</p>
          <div className="contact-links">
            <a href="mailto:lea.maliar.pro@gmail.com" className="contact-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
            </a>
            <a href="https://www.linkedin.com/in/léa-m-86342b21a" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
            <a href="https://wa.me/33695140740" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp
            </a>
            <a href="/CV-Lea-Maliar.pdf" download className="contact-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              CV
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FLOATING CTA ==================== */}
      <div className="floating-cta">
        <a href="#contact">✉ Contacter</a>
      </div>

      {/* ==================== FOOTER ==================== */}
      <footer>
        <p>© 2025 Léa Maliar — Tous droits réservés</p>
      </footer>
    </>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { AudioWaveform, ArrowDown, ArrowUpRight, CloudLightning, Radio, Volume2, VolumeX, ChevronRight, X } from 'lucide-react'

const records = [
  { id: '01', label: 'THE FIRST ANOMALY', title: 'A sky that remembers', copy: 'The clouds did not gather because rain was coming. They gathered because something beneath them had started to remember.', state: 'MEMORY / 001' },
  { id: '02', label: 'FIELD NOTE 02', title: 'The sound between heartbeats', copy: 'There is a fraction of a second after the heart contracts when the world seems to hold its breath. Something lives in that interval.', state: 'SIGNAL / 014' },
  { id: '03', label: 'UNVERIFIED RECORD', title: 'A name left in the static', copy: 'Every storm carries a voice. Most people hear only the thunder. The archive was built for those who stay long enough to listen.', state: 'ECHO / 039' },
]

function StormCanvas({ intensity, pointer, onStrike }: { intensity: number; pointer: { x: number; y: number }; onStrike: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const live = useRef({ intensity, pointer })
  useEffect(() => { live.current.intensity = intensity }, [intensity])
  useEffect(() => { live.current.pointer = pointer }, [pointer])
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !ctx) return
    let raf = 0, w = 0, h = 0, dpr = 1, last = 0, flash = 0
    let seed = 17
    const rand = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646 }
    const dust = Array.from({ length: 100 }, () => ({ x: rand(), y: rand(), r: rand() * 1.4 + .3, speed: rand() * .00013 + .00004, phase: rand() * 6.28 }))
    let bolt: { points: number[][]; life: number } | null = null
    const resize = () => { const r = canvas.getBoundingClientRect(); w = Math.max(1, r.width); h = Math.max(1, r.height); dpr = Math.min(devicePixelRatio || 1, 1.5); canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const strike = () => { let x = w * (.25 + rand() * .5), y = h * .12; const pts = [[x, y]]; for (let i = 0; i < 12; i++) { x += (rand() - .5) * 38; y += h * (.025 + rand() * .025); pts.push([x, y]) }; bolt = { points: pts, life: 1 }; flash = .85; onStrike() }
    const pulse = () => { if (live.current.intensity > .58 && Math.random() > .72) strike() }
    const key = (e: KeyboardEvent) => { if (e.code === 'Space' && !(e.target as HTMLElement).matches('button,input')) { e.preventDefault(); strike() } }
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw); if (now - last < 24) return; last = now
      const t = now * .0001, s = live.current, cx = w * (.51 + Math.sin(t) * .035), cy = h * .47
      ctx.fillStyle = '#080b12'; ctx.fillRect(0, 0, w, h)
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * .75); bg.addColorStop(0, '#293448'); bg.addColorStop(.42, '#151d2c'); bg.addColorStop(1, '#080b12'); ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < 10; i++) {
        const x = cx + Math.sin(t * (1 + i * .07) + i * 1.8) * w * .06 + (i - 4.5) * w * .095 + (s.pointer.x - .5) * w * .04
        const y = cy + Math.cos(t + i) * h * .09 + (i % 3 - 1) * h * .13 + (s.pointer.y - .5) * h * .03
        const r = Math.max(w, h) * (.18 + i % 4 * .04), g = ctx.createRadialGradient(x, y, r * .05, x, y, r)
        g.addColorStop(0, 'rgba(115,133,158,' + (.05 + s.intensity * .035) + ')'); g.addColorStop(.5, 'rgba(49,63,83,.13)'); g.addColorStop(1, 'rgba(8,11,18,0)')
        ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
      }
      dust.forEach(d => { d.y -= d.speed * (1 + s.intensity * 3); if (d.y < -.02) d.y = 1.02; const dx = d.x * w - s.pointer.x * w, dy = d.y * h - s.pointer.y * h, dist = Math.hypot(dx, dy), push = Math.max(0, 1 - dist / 180) * 14; ctx.beginPath(); ctx.arc(d.x * w + (dist ? dx / dist * push : 0), d.y * h + (dist ? dy / dist * push : 0), d.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(213,225,241,' + (.22 + Math.sin(t * 7 + d.phase) * .14) + ')'; ctx.fill() })
      if (bolt) { bolt.life -= .035; ctx.beginPath(); bolt.points.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = 'rgba(218,229,255,' + Math.max(0, bolt.life) + ')'; ctx.lineWidth = 1.7; ctx.shadowBlur = 26; ctx.shadowColor = '#a9c6ff'; ctx.stroke(); ctx.shadowBlur = 0; if (bolt.life <= 0) bolt = null }
      if (flash > .01) { ctx.fillStyle = 'rgba(190,205,235,' + (flash * .09) + ')'; ctx.fillRect(0, 0, w, h); flash *= .83 }
    }
    window.addEventListener('resize', resize); window.addEventListener('keydown', key); window.addEventListener('storm-pulse', pulse); resize(); raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('keydown', key); window.removeEventListener('storm-pulse', pulse) }
  }, [onStrike])
  return <canvas className="storm-canvas" ref={canvasRef} aria-label="Interactive animated storm" />
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const audio = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null)
  const [bpm, setBpm] = useState(68)
  const [intensity, setIntensity] = useState(.25)
  const [sound, setSound] = useState(false)
  const [pulseCount, setPulseCount] = useState(0)
  const [pointer, setPointer] = useState({ x: .5, y: .5 })
  const [strikes, setStrikes] = useState(0)
  const [record, setRecord] = useState<(typeof records)[number] | null>(null)

  const beat = useCallback(() => {
    setPulseCount(v => v + 1); window.dispatchEvent(new Event('storm-pulse'))
    gsap.fromTo('.heart-core', { scale: 1 }, { scale: 1.14, duration: .13, yoyo: true, repeat: 1, ease: 'power2.out', overwrite: true })
    gsap.fromTo('.pulse-ring', { scale: .72, opacity: .8 }, { scale: 1.8, opacity: 0, duration: .95, stagger: .12, ease: 'power2.out', overwrite: true })
    gsap.fromTo('.bpm-value', { color: '#f3c7c7' }, { color: '#e8e9ed', duration: .6 })
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.topline,.eyebrow', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .12 })
      .fromTo('.hero-title .word', { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.05, stagger: .12 }, '-=.35')
      .fromTo('.hero-sub,.storm-console,.side-data', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .1 }, '-=.55')
    return () => { tl.kill(); if (audio.current) { audio.current.ctx.close(); audio.current = null } }
  }, [])

  useEffect(() => { const timer = window.setInterval(beat, 60000 / bpm); return () => window.clearInterval(timer) }, [bpm, beat])

  const toggleSound = async () => {
    if (sound && audio.current) { audio.current.gain.gain.setTargetAtTime(0, audio.current.ctx.currentTime, .3); const old = audio.current; audio.current = null; window.setTimeout(() => old.ctx.close(), 500); setSound(false); return }
    const AC = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return
    const ctx = new AC(); await ctx.resume(); const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination)
    ;[55, 82.41, 110].forEach((hz, i) => { const osc = ctx.createOscillator(), filter = ctx.createBiquadFilter(), gain = ctx.createGain(); osc.type = i === 1 ? 'triangle' : 'sine'; osc.frequency.value = hz; filter.type = 'lowpass'; filter.frequency.value = 260 + i * 70; gain.gain.value = [0.19, .07, .035][i]; osc.connect(filter); filter.connect(gain); gain.connect(master); osc.start() })
    master.gain.setTargetAtTime(.55, ctx.currentTime, 1.4); audio.current = { ctx, gain: master }; setSound(true)
  }

  const move = (e: React.PointerEvent<HTMLElement>) => { const r = e.currentTarget.getBoundingClientRect(); setPointer({ x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)) }) }
  const intensify = () => { setBpm(v => Math.min(128, v + 4)); setIntensity(v => Math.min(1, v + .1)); beat() }
  const calm = () => { setBpm(58); setIntensity(.15) }

  return <main className="world" ref={root} onPointerMove={move}>
    <StormCanvas intensity={intensity} pointer={pointer} onStrike={() => setStrikes(v => v + 1)} />
    <div className="vignette" />
    <header className="topline">
      <a className="wordmark" href="#home"><span className="mark">F<span>/</span></span><span>FATE / STAY<br/>LAST TIME</span></a>
      <div className="top-status"><i /> WORLD SIGNAL <b>ACTIVE</b> · VOL. 01</div>
      <nav><a href="#home">THE STORM</a><a href="#archive">THE ARCHIVE</a></nav>
      <button className="sound-button" onClick={toggleSound}>{sound ? <Volume2 size={15}/> : <VolumeX size={15}/>}<span>{sound ? 'SOUND ON' : 'SOUND OFF'}</span></button>
    </header>
    <section className="hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span>AN INTERACTIVE FICTIONAL UNIVERSE</span><i/><span>NO. 001 / 2026</span></div>
        <h1 className="hero-title"><span className="word">THE SKY</span><span className="word second">HAS A</span><span className="word last">HEARTBEAT<span>.</span></span></h1>
        <p className="hero-sub">Somewhere between a pulse and a thunderclap,<br/>the world remembers that it is alive.</p>
        <div className="hero-cta"><a href="#archive">ENTER THE ARCHIVE <ArrowUpRight size={16}/></a><small>A STORY THAT RESPONDS TO YOU</small></div>
      </div>
      <div className="storm-interface">
        <div className="storm-label"><span><CloudLightning size={14}/> ATMOSPHERIC SYSTEM</span><span>LAT 00° / LON 00°</span></div>
        <div className="heart-stage">
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit orbit-c"/>
          <div className="pulse-ring ring-one"/><div className="pulse-ring ring-two"/>
          <button className="heart-button" onClick={intensify} aria-label="Increase heartbeat and storm intensity"><span className="heart-core"><AudioWaveform size={31}/></span></button>
          <span className="heart-label">TOUCH TO INTENSIFY</span><i className="cross left"/><i className="cross right"/>
        </div>
        <div className="storm-console">
          <div><label>HEART RATE</label><div className="bpm-number"><strong className="bpm-value">{bpm}</strong><small>BPM</small></div><input aria-label="Heartbeat rate" type="range" min="48" max="128" value={bpm} onChange={e => { const v = Number(e.target.value); setBpm(v); setIntensity((v - 48) / 80) }}/></div>
          <i className="divider"/>
          <div><label>STORM PRESSURE</label><strong className="pressure-value">{Math.round(intensity * 100)}<small>%</small></strong><div className="pressure-track"><i style={{ width: (intensity * 100) + '%' }}/></div></div>
          <button className="calm" onClick={calm}>RESET<br/>CALM</button>
        </div>
        <p className="storm-hint"><span>↗</span> TAP THE HEART. MOVE THROUGH THE CLOUDS. CHANGE THE WEATHER.</p>
      </div>
      <div className="side-data">FIELD RECORDING / 0001 <i/> OBSERVING THE IMPOSSIBLE</div>
      <a className="scroll-cue" href="#archive">SCROLL TO DESCEND <ArrowDown size={14}/></a>
    </section>
    <section className="signal-strip"><div><Radio size={15}/><span>LIVE SIGNAL</span><b>CONNECTED</b></div><div className="signal-wave">{Array.from({ length: 44 }, (_, i) => <i key={i} style={{ height: (8 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * .34)) * 27) + 'px', animationDelay: (i * -37) + 'ms' }}/>)}</div><div className="strike-count"><span>LIGHTNING EVENTS</span><b>{String(strikes).padStart(2, '0')}</b><small>· {pulseCount} PULSES</small></div></section>
    <section className="archive" id="archive">
      <div className="archive-head"><div><span className="section-index">01 — THE ARCHIVE / UNSTABLE RECORDS</span><h2>THE THINGS<br/><em>THE STORM</em> LEFT.</h2></div><p>Fragments recovered from the edge<br/>of a world that should have ended.</p></div>
      <div className="record-grid">{records.map((r, i) => <button className={'record-card record-' + (i + 1)} key={r.id} onClick={() => setRecord(r)}><span className="record-top">{r.label}<ArrowUpRight size={17}/></span><span className="record-glyph">{['◉', '⌁', '✳'][i]}</span><strong>{r.title}</strong><span className="record-foot">{r.state}<b>OPEN RECORD <ChevronRight size={13}/></b></span></button>)}</div>
      <div className="archive-foot"><span>THREE FRAGMENTS RECOVERED</span><span>THE REST IS STILL IN THE CLOUDS ↗</span></div>
    </section>
    <footer className="footer"><strong>F<span>/</span>SLT</strong><p>THE STORY DOESN'T END<br/>WHEN THE THUNDER FADES.</p><a href="#home">RETURN TO THE STORM ↑</a><small>AN ORIGINAL FICTION PROJECT · VOL. 01</small></footer>
    {record && <div className="record-overlay" role="dialog" aria-modal="true" aria-label={record.title}><button className="close-record" onClick={() => setRecord(null)}><X size={18}/> CLOSE RECORD</button><article><span>{record.state} / RECOVERED MEMORY</span><div className="record-glyph">✳</div><label>{record.label}</label><h2>{record.title}</h2><p>{record.copy}</p><footer>FATE / STAY LAST TIME <i/> END OF FRAGMENT</footer></article></div>}
    <div className="sound-note">{sound ? 'AMBIENT FIELD ACTIVE' : 'SOUND OPTIONAL · HEADPHONES RECOMMENDED'}</div>
  </main>
}
export default App
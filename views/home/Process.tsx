const ProcessSection =() => {
    const steps = [
      { n: '01', title: 'Consultation', desc: 'We begin with a private one-on-one session to understand your vision, requirements, and lifestyle.' },
      { n: '02', title: 'Material Selection', desc: 'Choose from our curated archive of fine leathers — full-grain, suede, nubuck, patent, and more.' },
      { n: '03', title: 'Measurements', desc: 'Detailed foot measurements ensure a fit that feels like a second skin from the first wear.' },
      { n: '04', title: 'Crafting', desc: 'Your shoes take shape over 60+ hours of skilled handwork in our Lagos atelier.' },
      { n: '05', title: 'Quality Inspection', desc: 'Every stitch and edge is scrutinized against our uncompromising standard before it leaves the workshop.' },
      { n: '06', title: 'Nationwide Delivery', desc: 'Your finished masterpiece arrives in our signature black box, insured and delivered to your door.' },
    ]
  
    return (
      <section style={{ background: '#F8F6F2', padding: '120px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Left: Steps */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ display: 'block', width: '40px', height: '2px', background: '#FAD90C' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0B0B0B' }}>The Process</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 3.5vw, 50px)', fontWeight: 700, color: '#0B0B0B', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '48px' }}>
                Your Custom Shoe,<br /><em>Step by Step.</em>
              </h2>
  
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {steps.map((step, i) => (
                  <div key={step.n} style={{ display: 'flex', gap: '24px', position: 'relative' }}>
                    {/* Line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: '40px', height: '40px', background: '#0B0B0B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, color: '#FAD90C' }}>{step.n}</span>
                      </div>
                      {i < steps.length - 1 && (
                        <div style={{ width: '1px', flex: 1, minHeight: '32px', background: 'linear-gradient(to bottom, #EAE6DD, transparent)', margin: '8px 0' }} />
                      )}
                    </div>
                    {/* Content */}
                    <div style={{ paddingBottom: i < steps.length - 1 ? '32px' : '0' }}>
                      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.06em', color: '#0B0B0B', marginBottom: '6px', textTransform: 'uppercase' }}>{step.title}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, lineHeight: 1.75, color: '#888', margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
  
              <div style={{ marginTop: '48px' }}>
                <button className="btn-gold" >Start Custom Order</button>
              </div>
            </div>
  
            {/* Right: Image */}
            <div className="img-zoom" style={{ borderRadius: '20px', overflow: 'hidden', height: '660px', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1653868250624-21d56ad36602?w=800&h=1000&fit=crop&auto=format" alt="SBS atelier craftsperson at work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(11,11,11,0.85)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '20px 24px' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FAD90C', marginBottom: '6px' }}>Production Time</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#F8F6F2' }}>3–4 Weeks · Nationwide Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  export default ProcessSection
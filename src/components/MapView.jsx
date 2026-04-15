import { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet'

const COLORS = {
  hotel:           '#3b82f6',  // blue-500
  non_traditional: '#22c55e',  // green-500
  tourist:         '#f97316',  // orange-500
}

const CATS = [
  { id: 'all',             label: 'All' },
  { id: 'hotel',           label: 'Hotels',      dot: COLORS.hotel },
  { id: 'non_traditional', label: 'Off path',    dot: COLORS.non_traditional },
  { id: 'tourist',         label: 'Tourist',     dot: COLORS.tourist },
]

// Flies the map to a target pin — must live inside <MapContainer>
function FlyController({ target }) {
  const map = useMap()
  const prev = useRef(null)
  useEffect(() => {
    if (target && target.name !== prev.current) {
      prev.current = target.name
      map.flyTo([target.lat, target.lng], 15, { duration: 0.6 })
    }
  }, [target, map])
  return null
}

function PlaceCard({ pin, active, onClick, cardRef }) {
  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className={`flex-shrink-0 w-44 text-left rounded-2xl p-3 transition-all duration-200 ${
        active
          ? 'bg-white shadow-2xl scale-[1.03]'
          : 'bg-slate-800/90 border border-slate-700/80'
      }`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[pin.category] }} />
        <span className={`text-[10px] font-semibold uppercase tracking-wide truncate ${
          active ? 'text-gray-500' : 'text-slate-500'
        }`}>
          {pin.category === 'hotel' ? 'Hotel' : pin.category === 'non_traditional' ? 'Off path' : 'Tourist'}
        </span>
      </div>
      <p className={`text-xs font-bold leading-snug line-clamp-2 ${active ? 'text-gray-900' : 'text-white'}`}>
        {pin.name}
      </p>
      <p className={`text-[11px] mt-1 font-medium ${active ? 'text-gray-500' : 'text-slate-400'}`}>
        {pin.subtitle}
      </p>
    </button>
  )
}

export default function MapView({ data }) {
  const [cat, setCat]       = useState('all')
  const [active, setActive] = useState(null)
  const cardRefs            = useRef({})
  const stripRef            = useRef(null)

  const allPins = [
    ...[
      ...data.accommodation.options,
      ...(data.accommodation_city_centre?.options || []),
    ].map(h => ({
      name: h.name, type: h.type,
      subtitle: `£${h.nightly_rate_gbp}/night`,
      location: h.location, lat: h.lat, lng: h.lng,
      category: 'hotel',
    })),
    ...data.activities.non_traditional.map(a => ({
      name: a.name, type: a.type, subtitle: a.cost,
      location: a.location, lat: a.lat, lng: a.lng,
      category: 'non_traditional',
    })),
    ...data.activities.traditional_tourist.map(a => ({
      name: a.name, type: a.type, subtitle: a.cost,
      location: a.location, lat: a.lat, lng: a.lng,
      category: 'tourist',
    })),
  ]

  const pins = cat === 'all' ? allPins : allPins.filter(p => p.category === cat)

  const handlePinClick = pin => {
    setActive(pin)
    setTimeout(() => {
      cardRefs.current[pin.name]?.scrollIntoView({
        behavior: 'smooth', inline: 'center', block: 'nearest',
      })
    }, 150)
  }

  const handleCardClick = pin => setActive(pin)

  return (
    <div className="relative h-full" style={{ background: '#0d1117' }}>

      {/* ── Category chips (floating top) ─────────────────── */}
      <div className="absolute top-3 left-0 right-0 z-[1000] px-3 pointer-events-none">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pointer-events-auto">
          {CATS.map(c => (
            <button
              key={c.id}
              onClick={() => { setCat(c.id); setActive(null) }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs
                          font-semibold transition-all backdrop-blur-md shadow-lg ${
                cat === c.id
                  ? 'bg-white text-gray-900'
                  : 'bg-black/60 text-white border border-white/15'
              }`}
            >
              {c.dot && (
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.dot }} />
              )}
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Map ───────────────────────────────────────────── */}
      <MapContainer
        center={[55.863, -4.265]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <FlyController target={active} />
        {pins.map(pin => {
          const isActive = active?.name === pin.name
          return (
            <CircleMarker
              key={pin.name}
              center={[pin.lat, pin.lng]}
              radius={isActive ? 13 : 8}
              fillColor={COLORS[pin.category]}
              color={isActive ? 'white' : 'rgba(255,255,255,0.35)'}
              weight={isActive ? 3 : 1.5}
              fillOpacity={isActive ? 1 : 0.82}
              eventHandlers={{ click: () => handlePinClick(pin) }}
            />
          )
        })}
      </MapContainer>

      {/* ── Bottom sheet ──────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1000] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.97) 55%, transparent 100%)', paddingTop: 48 }}
      >
        {/* Active pin detail */}
        {active && (
          <div className="px-4 pb-2 pointer-events-auto">
            <div className="bg-slate-800/95 backdrop-blur-md rounded-2xl px-4 py-3 border border-slate-600/60 mb-3 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: COLORS[active.category] }} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{active.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{active.type}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{active.location}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white font-bold text-sm">{active.subtitle}</p>
                  <button
                    onClick={() => setActive(null)}
                    className="text-slate-600 text-xl leading-none mt-1"
                  >×</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Horizontal card strip */}
        <div
          ref={stripRef}
          className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-5 pointer-events-auto"
        >
          {pins.map(pin => (
            <PlaceCard
              key={pin.name}
              pin={pin}
              active={active?.name === pin.name}
              onClick={() => handleCardClick(pin)}
              cardRef={el => { if (el) cardRefs.current[pin.name] = el }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import CostCalculator from './CostCalculator'

const TYPE_BADGE = {
  'Serviced apartment':       'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  'Boutique hotel':           'bg-amber-500/20  text-amber-300  border border-amber-500/30',
  'Luxury hotel / spa':       'bg-amber-500/20  text-amber-300  border border-amber-500/30',
  'Boutique luxury hotel':    'bg-amber-500/20  text-amber-300  border border-amber-500/30',
  'Hotel':                    'bg-blue-500/20   text-blue-300   border border-blue-500/30',
  'Design hotel':             'bg-blue-500/20   text-blue-300   border border-blue-500/30',
  'Lifestyle hotel':          'bg-blue-500/20   text-blue-300   border border-blue-500/30',
  'Airbnb / vacation rental': 'bg-green-500/20  text-green-300  border border-green-500/30',
}

function HotelCard({ hotel }) {
  const [open, setOpen] = useState(false)
  const badge = TYPE_BADGE[hotel.type] || 'bg-slate-700 text-slate-300'
  const stars = hotel.stars ? '★'.repeat(hotel.stars) : null

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700/60 overflow-hidden">
      <button className="w-full text-left p-4" onClick={() => setOpen(o => !o)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-white text-sm leading-snug">{hotel.name}</span>
              {stars && <span className="text-yellow-400 text-xs leading-none">{stars}</span>}
            </div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${badge}`}>
                {hotel.type}
              </span>
              {hotel.neighborhood && (
                <span className="text-[11px] text-slate-500 font-medium">{hotel.neighborhood}</span>
              )}
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-white leading-none">£{hotel.nightly_rate_gbp}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">per night</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{hotel.best_for}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-600 truncate flex items-center gap-1">
            <span>📍</span>
            {hotel.location.split(',').slice(-2).join(',').trim()}
          </span>
          <span className={`text-xs font-medium text-blue-400 inline-block transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-700/60 px-4 py-4 space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">{hotel.description}</p>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-400 mb-1">💡 Booking tip</p>
            <p className="text-xs text-amber-200/80 leading-relaxed">{hotel.booking_tip}</p>
          </div>

          <p className="text-xs text-slate-500 flex gap-1.5 items-start">
            <span className="shrink-0">📍</span>
            <span>{hotel.location}</span>
          </p>

          {hotel.website === 'airbnb.com' ? (
            <a href="https://www.airbnb.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center bg-rose-500 text-white text-sm font-semibold py-2.5 rounded-xl">
              Search on Airbnb →
            </a>
          ) : hotel.website ? (
            <a href={`https://${hotel.website}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl">
              Visit Website →
            </a>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default function HotelsTab({ data }) {
  const [areaFilter, setAreaFilter] = useState('All')

  const westEndHotels = data.accommodation.options.map(h => ({ ...h, neighborhood: 'West End' }))
  const cityCentreHotels = (data.accommodation_city_centre?.options || []).map(h => ({ ...h, neighborhood: 'City Centre' }))
  const allHotels = [...westEndHotels, ...cityCentreHotels]

  const hasCityCentre = cityCentreHotels.length > 0

  const hotels = areaFilter === 'All' ? allHotels
    : areaFilter === 'West End'      ? westEndHotels
    : cityCentreHotels

  const areaNote = areaFilter === 'City Centre'
    ? data.accommodation_city_centre?.area_note
    : data.accommodation.recommended_area

  const areaNoteDetail = areaFilter !== 'City Centre'
    ? data.accommodation.note_for_two_couples
    : null

  return (
    <div className="p-4 space-y-4 pb-8">
      {/* Area banner */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-1">📍 Where to Stay</p>
        <p className="text-sm text-blue-100 font-medium leading-snug">{areaNote}</p>
        {areaNoteDetail && (
          <p className="text-xs text-blue-400/70 mt-1.5 leading-relaxed">{areaNoteDetail}</p>
        )}
      </div>

      {/* Area filter */}
      {hasCityCentre && (
        <div className="flex gap-2">
          {['All', 'West End', 'City Centre'].map(f => (
            <button
              key={f}
              onClick={() => setAreaFilter(f)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                areaFilter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Cost calculator */}
      <CostCalculator hotels={hotels.length > 0 ? hotels : allHotels} />

      {/* Hotel cards */}
      <div className="space-y-3">
        {hotels.map(hotel => (
          <HotelCard key={hotel.name} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

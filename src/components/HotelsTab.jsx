import { useState } from 'react'
import CostCalculator from './CostCalculator'

const TYPE_BADGE = {
  'Serviced apartment':    'bg-purple-100 text-purple-700',
  'Boutique hotel':        'bg-amber-100  text-amber-700',
  'Hotel':                 'bg-blue-100   text-blue-700',
  'Airbnb / vacation rental': 'bg-green-100 text-green-700',
}

function HotelCard({ hotel }) {
  const [open, setOpen] = useState(false)
  const badge = TYPE_BADGE[hotel.type] || 'bg-gray-100 text-gray-600'
  const stars = hotel.stars ? '★'.repeat(hotel.stars) : null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Summary row — always visible */}
      <button className="w-full text-left p-4" onClick={() => setOpen(o => !o)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-gray-900 text-sm leading-snug">
                {hotel.name}
              </span>
              {stars && (
                <span className="text-yellow-400 text-xs leading-none">{stars}</span>
              )}
            </div>
            <span className={`inline-block mt-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${badge}`}>
              {hotel.type}
            </span>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-gray-900 leading-none">
              £{hotel.nightly_rate_gbp}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">per night</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">{hotel.best_for}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400 truncate flex items-center gap-1">
            <span>📍</span>
            {hotel.location.split(',').slice(-2).join(',').trim()}
          </span>
          <span className={`text-xs font-medium text-blue-400 inline-block transition-transform ${open ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-gray-100 px-4 py-4 space-y-3">
          <p className="text-sm text-gray-600 leading-relaxed">{hotel.description}</p>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-700 mb-1">💡 Booking tip</p>
            <p className="text-xs text-amber-800 leading-relaxed">{hotel.booking_tip}</p>
          </div>

          <p className="text-xs text-gray-400 flex gap-1.5 items-start">
            <span className="shrink-0">📍</span>
            <span>{hotel.location}</span>
          </p>

          {hotel.website === 'airbnb.com' ? (
            <a
              href="https://www.airbnb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-rose-500 text-white
                         text-sm font-semibold py-2.5 rounded-xl"
            >
              Search on Airbnb →
            </a>
          ) : hotel.website ? (
            <a
              href={`https://${hotel.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-blue-600 text-white
                         text-sm font-semibold py-2.5 rounded-xl"
            >
              Visit Website →
            </a>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default function HotelsTab({ data }) {
  const hotels = data.accommodation.options

  return (
    <div className="p-4 space-y-4 pb-8">
      {/* Where-to-stay banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4">
        <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">
          📍 Where to Stay
        </p>
        <p className="text-sm text-blue-900 font-medium leading-snug">
          {data.accommodation.recommended_area}
        </p>
        <p className="text-xs text-blue-600 mt-1.5 leading-relaxed">
          {data.accommodation.note_for_two_couples}
        </p>
      </div>

      {/* Cost calculator */}
      <CostCalculator hotels={hotels} />

      {/* Hotel cards */}
      <div className="space-y-3">
        {hotels.map(hotel => (
          <HotelCard key={hotel.name} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'

const PER_ROOM_TYPES = ['Hotel', 'Boutique hotel']

export default function CostCalculator({ hotels }) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [nights, setNights] = useState(3)

  const hotel = hotels[selectedIdx]
  const isPerRoom = PER_ROOM_TYPES.includes(hotel.type)
  const totalNightly = isPerRoom ? hotel.nightly_rate_gbp * 2 : hotel.nightly_rate_gbp
  const grandTotal = totalNightly * nights
  const perCouple = Math.ceil(grandTotal / 2)
  const perPerson = Math.ceil(grandTotal / 4)

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)' }}
    >
      <div className="p-4">
        <h2 className="text-white font-bold text-base mb-4">Cost Calculator</h2>

        {/* Hotel selector */}
        <div className="mb-4">
          <label className="text-blue-200 text-xs font-medium block mb-1.5">
            Accommodation
          </label>
          <div className="relative">
            <select
              value={selectedIdx}
              onChange={e => setSelectedIdx(Number(e.target.value))}
              className="w-full text-sm rounded-xl px-3 py-2.5 border-0 outline-none
                         text-gray-900 font-medium bg-white appearance-none pr-8"
            >
              {hotels.map((h, i) => (
                <option key={h.name} value={i}>{h.name}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
          </div>
          {isPerRoom && (
            <p className="text-blue-300 text-xs mt-1.5">
              Per-room rate — calculator shows 2 rooms for your group
            </p>
          )}
        </div>

        {/* Nights stepper */}
        <div className="mb-4">
          <label className="text-blue-200 text-xs font-medium block mb-2">
            Number of nights
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setNights(n => Math.max(1, n - 1))}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center
                         text-white text-2xl font-light active:bg-white/30 transition-colors select-none"
            >−</button>
            <span className="text-4xl font-bold text-white tabular-nums w-10 text-center">
              {nights}
            </span>
            <button
              onClick={() => setNights(n => n + 1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center
                         text-white text-2xl font-light active:bg-white/30 transition-colors select-none"
            >+</button>
            <span className="text-blue-200 text-sm">night{nights !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Results — per couple is the hero number */}
        <div className="bg-white/15 backdrop-blur rounded-xl p-3.5">
          {/* Hero: per couple */}
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-blue-200 text-xs font-medium mb-0.5">Per couple ({nights}n)</p>
              <p className="text-white text-3xl font-bold leading-none">
                £{perCouple.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-300 text-[11px]">per person</p>
              <p className="text-white/80 text-lg font-semibold">£{perPerson.toLocaleString()}</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-2.5 flex justify-between items-center">
            <span className="text-blue-200 text-xs">Group total ({nights}n)</span>
            <span className="text-white/70 font-medium text-sm">£{grandTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mt-1.5">
            <span className="text-blue-200 text-xs">Nightly (group)</span>
            <span className="text-white/70 text-sm">£{totalNightly}/night</span>
          </div>
        </div>

        <p className="text-blue-300 text-[11px] mt-2.5 leading-relaxed">{hotel.rate_note}</p>
      </div>
    </div>
  )
}

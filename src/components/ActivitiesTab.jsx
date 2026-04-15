import { useState } from 'react'

// Condense long cost strings to a short label for the card face
function shortCost(cost) {
  if (!cost) return ''
  const lower = cost.toLowerCase()
  if (lower.startsWith('free') && !cost.includes('£')) return 'Free'
  const match = cost.match(/~?£[\d,]+[–\-]?[\d,]*/)
  if (match) return match[0]
  if (lower.includes('free')) return 'Free'
  return cost.substring(0, 14)
}

function ActivityCard({ activity, color }) {
  const [open, setOpen] = useState(false)

  const isGreen = color === 'green'
  const badge  = isGreen ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                         : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
  const border = isGreen ? 'border-l-green-500' : 'border-l-orange-500'
  const bg     = isGreen ? 'bg-green-500/5'     : 'bg-orange-500/5'

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700/60 overflow-hidden">
      <button className="w-full text-left p-4" onClick={() => setOpen(o => !o)}>
        {/* Name — full width, max 2 lines */}
        <p className="font-semibold text-white text-sm leading-snug line-clamp-2 mb-2">
          {activity.name}
        </p>

        {/* Type badge + cost — both capped width */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full truncate max-w-[55%] ${badge}`}>
            {activity.type}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 shrink-0">
            {shortCost(activity.cost)}
          </span>
        </div>

        {/* Description preview */}
        <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
          {activity.description}
        </p>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className={`border-t border-slate-700/60 border-l-4 ${border} ${bg} px-4 py-3 space-y-2.5`}>
          <p className="text-xs font-semibold text-slate-300">{activity.cost}</p>
          <p className="text-sm text-slate-300 leading-relaxed">{activity.description}</p>
          {activity.hours && (
            <p className="text-xs text-slate-400 flex gap-1.5 items-start">
              <span className="shrink-0">🕐</span><span>{activity.hours}</span>
            </p>
          )}
          <p className="text-xs text-slate-500 flex gap-1.5 items-start">
            <span className="shrink-0">📍</span><span>{activity.location}</span>
          </p>
          {activity.website && (
            <a
              href={`https://${activity.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 flex gap-1.5 items-start"
            >
              <span className="shrink-0">🌐</span><span className="underline">{activity.website}</span>
            </a>
          )}
          {activity.note && (
            <p className="text-xs text-amber-400 flex gap-1.5 items-start">
              <span className="shrink-0">⚠️</span><span>{activity.note}</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

const FILTERS = [
  { id: 'all',     label: 'All' },
  { id: 'unique',  label: '🟢 Off the path' },
  { id: 'tourist', label: '🟠 Classic spots' },
]

export default function ActivitiesTab({ data }) {
  const [filter, setFilter] = useState('all')
  const nonTrad = data.activities.non_traditional
  const trad    = data.activities.traditional_tourist

  return (
    <div className="pb-8">
      <div className="sticky top-0 bg-slate-900 border-b border-slate-700/60 z-10 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                filter === f.id
                  ? 'bg-white text-gray-900'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {(filter === 'all' || filter === 'unique') && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
              <h2 className="font-bold text-sm text-white">Off the beaten path</h2>
              <span className="text-xs text-slate-600 ml-auto">{nonTrad.length} spots</span>
            </div>
            <div className="space-y-3">
              {nonTrad.map(a => <ActivityCard key={a.name} activity={a} color="green" />)}
            </div>
          </section>
        )}

        {(filter === 'all' || filter === 'tourist') && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
              <h2 className="font-bold text-sm text-white">Classic tourist spots</h2>
              <span className="text-xs text-slate-600 ml-auto">{trad.length} spots</span>
            </div>
            <div className="space-y-3">
              {trad.map(a => <ActivityCard key={a.name} activity={a} color="orange" />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

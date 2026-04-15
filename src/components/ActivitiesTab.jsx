import { useState } from 'react'

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
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm leading-snug">{activity.name}</p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${badge}`}>
                {activity.type}
              </span>
              {activity.neighborhood && (
                <span className="text-[11px] text-slate-500 font-medium">{activity.neighborhood}</span>
              )}
            </div>
          </div>
          <span className="shrink-0 text-[11px] font-semibold bg-slate-700 text-slate-300 px-2 py-1 rounded-lg whitespace-nowrap">
            {activity.cost}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
          {activity.description}
        </p>
      </button>

      {open && (
        <div className={`border-t border-slate-700/60 border-l-4 ${border} ${bg} px-4 py-3 space-y-2`}>
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
            <p className="text-xs text-slate-500 flex gap-1.5 items-start">
              <span className="shrink-0">🌐</span><span>{activity.website}</span>
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
      {/* Sticky filter bar */}
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

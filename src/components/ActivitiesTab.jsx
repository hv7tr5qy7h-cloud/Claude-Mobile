import { useState } from 'react'

function ActivityCard({ activity, color }) {
  const [open, setOpen] = useState(false)

  const isGreen = color === 'green'
  const badge    = isGreen ? 'bg-green-100 text-green-700'  : 'bg-orange-100 text-orange-700'
  const border   = isGreen ? 'border-l-green-500'           : 'border-l-orange-500'
  const bg       = isGreen ? 'bg-green-50'                  : 'bg-orange-50'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Summary */}
      <button className="w-full text-left p-4" onClick={() => setOpen(o => !o)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm leading-snug">
              {activity.name}
            </p>
            <span className={`inline-block mt-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${badge}`}>
              {activity.type}
            </span>
          </div>
          <span className="shrink-0 text-[11px] font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-lg whitespace-nowrap">
            {activity.cost}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">
          {activity.description}
        </p>
      </button>

      {/* Detail */}
      {open && (
        <div className={`border-t border-gray-100 border-l-4 ${border} ${bg} px-4 py-3 space-y-2`}>
          <p className="text-sm text-gray-700 leading-relaxed">{activity.description}</p>
          {activity.hours && (
            <p className="text-xs text-gray-500 flex gap-1.5 items-start">
              <span className="shrink-0">🕐</span>
              <span>{activity.hours}</span>
            </p>
          )}
          <p className="text-xs text-gray-500 flex gap-1.5 items-start">
            <span className="shrink-0">📍</span>
            <span>{activity.location}</span>
          </p>
          {activity.website && (
            <p className="text-xs text-gray-500 flex gap-1.5 items-start">
              <span className="shrink-0">🌐</span>
              <span>{activity.website}</span>
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

  const showUnique  = filter === 'all' || filter === 'unique'
  const showTourist = filter === 'all' || filter === 'tourist'

  return (
    <div className="pb-8">
      {/* Sticky filter bar */}
      <div className="sticky top-0 bg-gray-50 border-b border-gray-100 z-10 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                filter === f.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {showUnique && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
              <h2 className="font-bold text-sm text-gray-800">Off the beaten path</h2>
              <span className="text-xs text-gray-400 ml-auto">{nonTrad.length} spots</span>
            </div>
            <div className="space-y-3">
              {nonTrad.map(a => (
                <ActivityCard key={a.name} activity={a} color="green" />
              ))}
            </div>
          </section>
        )}

        {showTourist && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
              <h2 className="font-bold text-sm text-gray-800">Classic tourist spots</h2>
              <span className="text-xs text-gray-400 ml-auto">{trad.length} spots</span>
            </div>
            <div className="space-y-3">
              {trad.map(a => (
                <ActivityCard key={a.name} activity={a} color="orange" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

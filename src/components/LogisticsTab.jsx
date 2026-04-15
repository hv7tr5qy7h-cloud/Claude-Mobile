function InfoCard({ icon, title, content, warn }) {
  return (
    <div className={`rounded-2xl p-4 border ${
      warn
        ? 'bg-amber-500/10 border-amber-500/25'
        : 'bg-slate-800 border-slate-700/60'
    }`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span>{icon}</span>
        <h3 className={`font-semibold text-sm ${warn ? 'text-amber-300' : 'text-white'}`}>
          {title}
        </h3>
      </div>
      <p className={`text-sm leading-relaxed ${warn ? 'text-amber-200/80' : 'text-slate-400'}`}>
        {content}
      </p>
    </div>
  )
}

export default function LogisticsTab({ data }) {
  const { logistics, trip, neighborhoods } = data

  return (
    <div className="p-4 pb-8 space-y-4">
      {/* Trip hero */}
      <div className="rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/60">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
            <div>
              <h2 className="text-white font-bold text-base">{trip.destination}</h2>
              <p className="text-slate-500 text-xs">{trip.travel_month}</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Group', value: trip.group },
              { label: 'Vibe',  value: trip.vibe },
              { label: 'Base',  value: trip.base_neighborhood },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3 text-sm">
                <span className="text-slate-600 w-12 shrink-0">{label}</span>
                <span className="text-slate-300 leading-snug">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practical info */}
      <div className="space-y-3">
        <InfoCard icon="✈️" title="Getting There"  content={logistics.getting_there} />
        <InfoCard icon="🚇" title="Getting Around" content={logistics.getting_around} />
        <InfoCard icon="📅" title="August Notes"   content={logistics.august_notes} warn />
        <InfoCard icon="🌦️" title="Weather"        content={logistics.weather} />
      </div>

      {/* Neighborhoods */}
      <section>
        <h2 className="font-bold text-sm text-white mb-3">Neighborhoods</h2>
        <div className="space-y-3">
          {neighborhoods.map(n => (
            <div key={n.name} className="bg-slate-800 rounded-2xl border border-slate-700/60 p-4">
              <h3 className="font-bold text-sm text-white mb-1">{n.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{n.description}</p>

              {n.key_streets && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {n.key_streets.map(s => (
                    <span key={s} className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {n.vibe_tags.map(tag => (
                  <span key={tag} className="bg-blue-500/15 text-blue-300 text-[11px] px-2 py-0.5 rounded-full border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

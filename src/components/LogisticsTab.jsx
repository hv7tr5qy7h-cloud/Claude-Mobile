function InfoCard({ icon, title, content, warn }) {
  return (
    <div className={`rounded-2xl p-4 border ${
      warn
        ? 'bg-amber-50 border-amber-200'
        : 'bg-white border-gray-100 shadow-sm'
    }`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span>{icon}</span>
        <h3 className={`font-semibold text-sm ${warn ? 'text-amber-800' : 'text-gray-900'}`}>
          {title}
        </h3>
      </div>
      <p className={`text-sm leading-relaxed ${warn ? 'text-amber-700' : 'text-gray-600'}`}>
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
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
            <div>
              <h2 className="text-white font-bold text-base">{trip.destination}</h2>
              <p className="text-gray-400 text-xs">{trip.travel_month}</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Group', value: trip.group },
              { label: 'Vibe',  value: trip.vibe },
              { label: 'Base',  value: trip.base_neighborhood },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3 text-sm">
                <span className="text-gray-500 w-12 shrink-0">{label}</span>
                <span className="text-gray-200 leading-snug">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practical info */}
      <div className="space-y-3">
        <InfoCard icon="✈️" title="Getting There"   content={logistics.getting_there} />
        <InfoCard icon="🚇" title="Getting Around"  content={logistics.getting_around} />
        <InfoCard icon="📅" title="August Notes"    content={logistics.august_notes} warn />
        <InfoCard icon="🌦️" title="Weather"         content={logistics.weather} />
      </div>

      {/* Neighborhoods */}
      <section>
        <h2 className="font-bold text-sm text-gray-800 mb-3">Neighborhoods</h2>
        <div className="space-y-3">
          {neighborhoods.map(n => (
            <div
              key={n.name}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
            >
              <h3 className="font-bold text-sm text-gray-900 mb-1">{n.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{n.description}</p>

              {n.key_streets && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {n.key_streets.map(s => (
                    <span
                      key={s}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {n.vibe_tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-indigo-50 text-indigo-600 text-[11px] px-2 py-0.5 rounded-full"
                  >
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

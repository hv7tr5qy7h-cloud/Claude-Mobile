const TRIP = {
  depart: { date: 'Sun 24 Aug 2026', from: 'DUB', fromCity: 'Dublin', to: 'GLA', toCity: 'Glasgow Int\'l' },
  return: { date: 'Wed 27 Aug 2026', from: 'GLA', fromCity: 'Glasgow Int\'l', to: 'DUB', toCity: 'Dublin' },
  nights: 3,
  passengers: 4,
}

// Skyscanner deep-links (YYMMDD format)
const SEARCH_LINKS = [
  {
    name: 'Skyscanner',
    label: 'Best for comparing all airlines at once',
    url: 'https://www.skyscanner.net/transport/flights/dub/gla/260824/260827/?adults=4&cabinclass=economy',
    bg: 'bg-[#0770e3]',
    tag: 'Pre-filled',
  },
  {
    name: 'Google Flights',
    label: 'Great for price calendars and alerts',
    url: 'https://www.google.com/travel/flights/search?tfs=CBwQAhopEgoyMDI2LTA4LTI0agcIARIDREVCcgwIAxIIL20vMGQ5dGY&tfu=KgIIAw',
    bg: 'bg-slate-700',
    tag: null,
  },
  {
    name: 'Ryanair',
    label: 'DUB→GLA & DUB→PIK (Prestwick). Usually cheapest.',
    url: 'https://www.ryanair.com/gb/en/cheap-flights/dublin/glasgow',
    bg: 'bg-[#073590]',
    tag: 'Budget',
  },
  {
    name: 'Aer Lingus',
    label: 'DUB→GLA direct. Bags included, better legroom.',
    url: 'https://www.aerlingus.com/flights/dublin-to-glasgow',
    bg: 'bg-[#005e3b]',
    tag: 'Premium',
  },
]

const AIRPORTS = [
  {
    code: 'GLA',
    name: 'Glasgow International',
    note: '20 min to West End by taxi (~£25) or bus. Most Aer Lingus and some Ryanair flights land here. Preferred.',
    preferred: true,
  },
  {
    code: 'PIK',
    name: 'Glasgow Prestwick',
    note: '45 min south of Glasgow by train (£8) or taxi (~£50+). Ryanair hub. Cheaper fares but more hassle — factor in transfer cost.',
    preferred: false,
  },
]

function RouteArrow() {
  return (
    <div className="flex items-center gap-1.5 flex-1">
      <div className="h-px flex-1 bg-slate-600" />
      <span className="text-base">✈️</span>
      <div className="h-px flex-1 bg-slate-600" />
    </div>
  )
}

export default function FlightsTab() {
  return (
    <div className="p-4 pb-8 space-y-4">

      {/* Route overview */}
      <div className="bg-gradient-to-br from-blue-950/80 to-slate-800 border border-blue-500/25 rounded-2xl p-4">
        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">✈️ Your Route</p>

        {/* Outbound */}
        <div className="flex items-center gap-2 mb-3">
          <div className="text-center w-14 shrink-0">
            <p className="text-xl font-bold text-white">{TRIP.depart.from}</p>
            <p className="text-[10px] text-slate-500">{TRIP.depart.fromCity}</p>
          </div>
          <RouteArrow />
          <div className="text-center w-14 shrink-0">
            <p className="text-xl font-bold text-white">{TRIP.depart.to}</p>
            <p className="text-[10px] text-slate-500">{TRIP.depart.toCity}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="text-center w-14 shrink-0">
            <p className="text-xl font-bold text-white">{TRIP.return.from}</p>
            <p className="text-[10px] text-slate-500">{TRIP.return.fromCity}</p>
          </div>
          <RouteArrow />
          <div className="text-center w-14 shrink-0">
            <p className="text-xl font-bold text-white">{TRIP.return.to}</p>
            <p className="text-[10px] text-slate-500">{TRIP.return.toCity}</p>
          </div>
        </div>

        {/* Date / pax grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800/70 rounded-xl p-3">
            <p className="text-[9px] text-slate-500 uppercase tracking-wide mb-0.5">Depart</p>
            <p className="text-white font-semibold text-sm">{TRIP.depart.date}</p>
          </div>
          <div className="bg-slate-800/70 rounded-xl p-3">
            <p className="text-[9px] text-slate-500 uppercase tracking-wide mb-0.5">Return</p>
            <p className="text-white font-semibold text-sm">{TRIP.return.date}</p>
          </div>
          <div className="bg-slate-800/70 rounded-xl p-3">
            <p className="text-[9px] text-slate-500 uppercase tracking-wide mb-0.5">Passengers</p>
            <p className="text-white font-semibold text-sm">4 adults</p>
          </div>
          <div className="bg-slate-800/70 rounded-xl p-3">
            <p className="text-[9px] text-slate-500 uppercase tracking-wide mb-0.5">Trip length</p>
            <p className="text-white font-semibold text-sm">3 nights</p>
          </div>
        </div>
      </div>

      {/* Price context */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
        <p className="text-xs font-bold text-amber-400 mb-1.5">💡 Typical prices — August peak</p>
        <div className="space-y-1.5">
          {[
            { label: 'Ryanair (budget)', value: '£30–70 pp each way' },
            { label: 'Aer Lingus', value: '£60–130 pp each way' },
            { label: 'Return for 4 total', value: '~£250–700 depending on timing' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-baseline gap-2">
              <span className="text-xs text-amber-200/70">{label}</span>
              <span className="text-xs font-semibold text-amber-300 shrink-0">{value}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-amber-500/70 mt-2">Prices rise as August approaches — book now for best fares.</p>
      </div>

      {/* Search links */}
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Search & Book</p>
        <div className="space-y-2">
          {SEARCH_LINKS.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 ${link.bg} rounded-2xl p-4 border border-white/5`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-bold text-sm">{link.name}</span>
                  {link.tag && (
                    <span className="text-[9px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                      {link.tag}
                    </span>
                  )}
                </div>
                <p className="text-white/60 text-xs leading-snug">{link.label}</p>
              </div>
              <span className="text-white/40 shrink-0 text-lg">→</span>
            </a>
          ))}
        </div>
      </div>

      {/* Airport guide */}
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Glasgow Airports</p>
        <div className="space-y-2">
          {AIRPORTS.map(ap => (
            <div
              key={ap.code}
              className={`rounded-2xl p-4 border ${
                ap.preferred
                  ? 'bg-green-500/10 border-green-500/25'
                  : 'bg-slate-800 border-slate-700/60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-sm font-bold ${ap.preferred ? 'text-green-400' : 'text-slate-400'}`}>
                  {ap.code}
                </span>
                <span className={`text-xs font-semibold ${ap.preferred ? 'text-green-300' : 'text-white'}`}>
                  {ap.name}
                </span>
                {ap.preferred && (
                  <span className="text-[9px] font-bold bg-green-500/30 text-green-300 px-1.5 py-0.5 rounded-full ml-auto">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{ap.note}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

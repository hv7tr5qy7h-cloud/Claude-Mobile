import { useState } from 'react'
import data from './data/glasgow.json'
import HotelsTab from './components/HotelsTab'
import ActivitiesTab from './components/ActivitiesTab'
import MapView from './components/MapView'
import LogisticsTab from './components/LogisticsTab'
import FlightsTab from './components/FlightsTab'

const TABS = [
  { id: 'hotels',     label: 'Hotels',   emoji: '🏨' },
  { id: 'activities', label: 'Explore',  emoji: '🎯' },
  { id: 'flights',    label: 'Flights',  emoji: '✈️' },
  { id: 'map',        label: 'Map',      emoji: '🗺️' },
  { id: 'info',       label: 'Info',     emoji: '📋' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('hotels')

  return (
    <div
      className="flex flex-col bg-slate-900"
      style={{ height: '100dvh', maxWidth: '480px', margin: '0 auto' }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="bg-slate-900 border-b border-slate-700/60 px-4 py-3 shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-lg shrink-0">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
            <div className="min-w-0">
              <h1 className="text-[15px] font-bold text-white tracking-tight leading-none">
                Glasgow, Scotland
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                Aug 2026 · 4 people · 2 couples
              </p>
            </div>
          </div>
          <span className="text-slate-500 text-sm font-semibold shrink-0">£</span>
        </div>
      </header>

      {/* ── Tab content ────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'hotels' && (
          <div className="h-full overflow-y-auto">
            <HotelsTab data={data} />
          </div>
        )}
        {activeTab === 'activities' && (
          <div className="h-full overflow-y-auto">
            <ActivitiesTab data={data} />
          </div>
        )}
        {activeTab === 'map' && (
          <div className="h-full">
            <MapView data={data} />
          </div>
        )}
        {activeTab === 'flights' && (
          <div className="h-full overflow-y-auto">
            <FlightsTab />
          </div>
        )}
        {activeTab === 'info' && (
          <div className="h-full overflow-y-auto">
            <LogisticsTab data={data} />
          </div>
        )}
      </main>

      {/* ── Bottom tab bar ─────────────────────────────────── */}
      <nav className="bg-slate-900 border-t border-slate-700/60 shrink-0 flex">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
              activeTab === tab.id ? 'text-blue-400' : 'text-slate-600'
            }`}
          >
            <span className="text-lg leading-none">{tab.emoji}</span>
            <span className={`text-[10px] font-semibold ${
              activeTab === tab.id ? 'text-blue-400' : 'text-slate-600'
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}

import { useState } from 'react'
import data from './data/glasgow.json'
import HotelsTab from './components/HotelsTab'
import ActivitiesTab from './components/ActivitiesTab'
import MapView from './components/MapView'
import LogisticsTab from './components/LogisticsTab'

const TABS = [
  { id: 'hotels',     label: 'Hotels',     emoji: '🏨' },
  { id: 'activities', label: 'Activities',  emoji: '🎯' },
  { id: 'map',        label: 'Map',         emoji: '🗺️' },
  { id: 'info',       label: 'Info',        emoji: '📋' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('hotels')

  return (
    <div
      className="flex flex-col bg-gray-50"
      style={{ height: '100dvh', maxWidth: '480px', margin: '0 auto' }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">
              Glasgow, Scotland
            </h1>
            <p className="text-xs text-gray-400">
              {data.trip.travel_month} · {data.trip.group}
            </p>
          </div>
          <span className="ml-auto text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-full">
            {data.trip.currency}
          </span>
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
        {activeTab === 'info' && (
          <div className="h-full overflow-y-auto">
            <LogisticsTab data={data} />
          </div>
        )}
      </main>

      {/* ── Bottom tab bar ─────────────────────────────────── */}
      <nav className="bg-white border-t border-gray-200 shrink-0 flex">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <span className="text-lg leading-none">{tab.emoji}</span>
            <span className={`text-[10px] font-semibold ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}

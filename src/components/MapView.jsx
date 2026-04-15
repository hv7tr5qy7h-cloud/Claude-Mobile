import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'

const COLOR = {
  hotel:           '#2563eb',  // blue-600
  non_traditional: '#16a34a',  // green-600
  tourist:         '#ea580c',  // orange-600
}

const LEGEND = [
  { key: 'hotel',           label: 'Hotels' },
  { key: 'non_traditional', label: 'Off the path' },
  { key: 'tourist',         label: 'Tourist spots' },
]

export default function MapView({ data }) {
  const pins = [
    ...data.accommodation.options.map(h => ({
      name:     h.name,
      type:     h.type,
      subtitle: `£${h.nightly_rate_gbp}/night`,
      location: h.location,
      lat:      h.lat,
      lng:      h.lng,
      category: 'hotel',
    })),
    ...data.activities.non_traditional.map(a => ({
      name:     a.name,
      type:     a.type,
      subtitle: a.cost,
      location: a.location,
      lat:      a.lat,
      lng:      a.lng,
      category: 'non_traditional',
    })),
    ...data.activities.traditional_tourist.map(a => ({
      name:     a.name,
      type:     a.type,
      subtitle: a.cost,
      location: a.location,
      lat:      a.lat,
      lng:      a.lng,
      category: 'tourist',
    })),
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Legend */}
      <div className="flex items-center gap-5 px-4 py-2.5 bg-white border-b border-gray-100 shrink-0">
        {LEGEND.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: COLOR[key] }}
            />
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>

      {/* Map — fills remaining height */}
      <div className="flex-1">
        <MapContainer
          center={[55.863, -4.265]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pins.map(pin => (
            <CircleMarker
              key={pin.name}
              center={[pin.lat, pin.lng]}
              radius={9}
              fillColor={COLOR[pin.category]}
              color="white"
              weight={2}
              opacity={1}
              fillOpacity={0.9}
            >
              <Popup>
                <div style={{ minWidth: '150px' }}>
                  <p style={{ fontWeight: '700', fontSize: '13px', marginBottom: '2px' }}>
                    {pin.name}
                  </p>
                  {pin.type && (
                    <p style={{ color: '#6b7280', fontSize: '11px', marginBottom: '4px' }}>
                      {pin.type}
                    </p>
                  )}
                  <p style={{ fontSize: '12px', fontWeight: '600', color: COLOR[pin.category] }}>
                    {pin.subtitle}
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '10px', marginTop: '4px' }}>
                    {pin.location}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

'use client';

import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

type Place = {
  id?: number;
  name: string;
  lat: number;
  lng: number;
  distance?: string;
};

const venue: Place = {
  name: 'Cathedral Peak Hotel',
  lat: -28.947,
  lng: 29.219,
};

const accommodation: Place[] = [
  {
    id: 1,
    name: 'Cathedral Peak Hotel',
    lat: -28.947,
    lng: 29.219,
    distance: 'Op die venue',
  },
  {
    id: 2,
    name: 'Montusi Mountain Lodge',
    lat: -28.93,
    lng: 29.363,
    distance: '±15 km',
  },
  {
    id: 3,
    name: 'The Cavern Resort',
    lat: -28.677,
    lng: 29.097,
    distance: '±35 km',
  },
];

export default function Kaart() {
  const [selected, setSelected] = useState<Place | null>(null);

  const mapStyle = process.env.NEXT_PUBLIC_MAPTILER_KEY
    ? `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`
    : 'https://demotiles.maplibre.org/style.json';

  const openDirections = (lat: number, lng: number) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      '_blank'
    );
  };

  return (
    <main className="container">
      {/* Hero */}
      <section className="section center">
        <h1>Troue Beplanning 💍</h1>

        <p className="text-muted">
          Vind die venue, verblyf en jou roete.
        </p>
      </section>

      {/* Map */}
      <section className="section">
        <div
          className="card"
          style={{
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <Map
            initialViewState={{
              latitude: venue.lat,
              longitude: venue.lng,
              zoom: 11,
            }}
            mapStyle={mapStyle}
            style={{
              width: '100%',
              height: '650px',
            }}
          >
            {/* Venue */}
            <Marker
              latitude={venue.lat}
              longitude={venue.lng}
            >
              <button
                onClick={() => setSelected(venue)}
                style={{
                  background: 'transparent',
                  fontSize: '2rem',
                }}
              >
                ❤️
              </button>
            </Marker>

            {/* Accommodation */}
            {accommodation.map((place) => (
              <Marker
                key={place.id}
                latitude={place.lat}
                longitude={place.lng}
              >
                <button
                  onClick={() => setSelected(place)}
                  style={{
                    background: 'transparent',
                    fontSize: '1.8rem',
                  }}
                >
                  🏨
                </button>
              </Marker>
            ))}

            {selected && (
              <Popup
                latitude={selected.lat}
                longitude={selected.lng}
                closeOnClick={false}
                onClose={() => setSelected(null)}
                offset={20}
              >
                <div style={{ minWidth: '220px' }}>
                  <h3>{selected.name}</h3>

                  {selected.distance && (
                    <p className="text-muted">
                      {selected.distance}
                    </p>
                  )}

                  <button
                    className="btn btn-primary"
                    style={{
                      marginTop: '12px',
                      width: '100%',
                    }}
                    onClick={() =>
                      openDirections(
                        selected.lat,
                        selected.lng
                      )
                    }
                  >
                    Kry Roete
                  </button>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </section>

      {/* Accommodation */}
      <section className="section">
        <h2>Verblyf Naby Die Venue</h2>

        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {accommodation.map((place) => (
            <div
              key={place.id}
              className="card"
            >
              <h3>{place.name}</h3>

              <p className="text-muted">
                {place.distance}
              </p>

              <button
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
                onClick={() =>
                  openDirections(
                    place.lat,
                    place.lng
                  )
                }
              >
                Kry Roete
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
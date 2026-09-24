import React, { useEffect, useRef } from 'react';
import { PG, College } from '../types';
import { MapPin, Navigation, Building2 } from 'lucide-react';

interface MapViewProps {
  pg?: PG;
  college?: College;
  allPGs?: PG[];
  height?: string;
  onSelectPG?: (pg: PG) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  pg,
  college,
  allPGs,
  height = '350px',
  onSelectPG
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically load Leaflet script & map if window.L exists
    if (!mapContainerRef.current) return;

    const L = (window as any).L;
    if (L) {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        const centerLat = pg ? pg.lat : (college ? college.lat : 18.5204);
        const centerLng = pg ? pg.lng : (college ? college.lng : 73.8567);

        const map = L.map(mapContainerRef.current).setView([centerLat, centerLng], 14);
        mapInstanceRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // If College exists, add college marker
        if (college) {
          const colIcon = L.divIcon({
            className: 'custom-map-icon-col',
            html: `<div style="background-color: #034ea2; color: white; padding: 6px 10px; rounded-radius: 8px; border-radius: 20px; font-weight: bold; font-size: 11px; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">🎓 ${college.code}</div>`,
            iconSize: [80, 30]
          });
          L.marker([college.lat, college.lng], { icon: colIcon })
            .addTo(map)
            .bindPopup(`<b>${college.name}</b><br/>${college.city}`);
        }

        // If single PG
        if (pg) {
          const pgIcon = L.divIcon({
            className: 'custom-map-icon-pg',
            html: `<div style="background-color: #059669; color: white; padding: 6px 10px; rounded-radius: 8px; border-radius: 20px; font-weight: bold; font-size: 11px; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">🏠 ${pg.name}</div>`,
            iconSize: [120, 30]
          });
          L.marker([pg.lat, pg.lng], { icon: pgIcon })
            .addTo(map)
            .bindPopup(`<b>${pg.name}</b><br/>₹${pg.rentPerMonth}/month<br/>${pg.address}`);

          // Draw line between College and PG if college exists
          if (college) {
            L.polyline([
              [college.lat, college.lng],
              [pg.lat, pg.lng]
            ], { color: '#0284c7', weight: 4, dashArray: '6, 8' }).addTo(map);
          }
        }

        // If list of PGs
        if (allPGs && allPGs.length > 0) {
          allPGs.forEach(p => {
            const icon = L.divIcon({
              className: 'custom-map-icon-list',
              html: `<div style="background-color: #0284c7; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 10px; border: 2px solid white;">₹${p.rentPerMonth/1000}k</div>`
            });
            const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);
            marker.bindPopup(`<b>${p.name}</b><br/>₹${p.rentPerMonth}/mo`);
            if (onSelectPG) {
              marker.on('click', () => onSelectPG(p));
            }
          });
        }

      } catch (err) {
        console.warn('Leaflet map render note:', err);
      }
    }
  }, [pg, college, allPGs]);

  const activeCollegeDist = pg && pg.nearbyColleges.length > 0 ? pg.nearbyColleges[0] : null;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100" style={{ height }}>
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Fallback Graphic Overlay if Leaflet tile server is slow */}
      <div className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 border border-slate-700 shadow-md">
        <Navigation className="w-3.5 h-3.5 text-amber-400" />
        <span>OpenStreetMap Visualizer</span>
      </div>

      {pg && activeCollegeDist && (
        <div className="absolute bottom-3 left-3 z-20 p-2.5 rounded-xl bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold shadow-lg border border-slate-200 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Distance Matrix</div>
            <div className="text-slate-900">
              {activeCollegeDist.distanceKm} km to {activeCollegeDist.collegeName}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

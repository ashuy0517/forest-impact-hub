
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  trees?: number;
  area?: string;
}

interface ForestMapProps {
  locations?: Location[];
  height?: string;
  highlightedLocationId?: number | null;
}

// Default forest locations that match our organizations
const defaultLocations: Location[] = [
  { id: 1, name: "Green Earth Initiative", lat: -3.4653, lng: -62.2159, trees: 150000, area: "Amazon Basin, Brazil" },
  { id: 2, name: "Brazilian Environmental Protection Agency", lat: -10.7832, lng: -55.4915, trees: 750000, area: "Multiple Regions, Brazil" },
  { id: 3, name: "Reforest Africa", lat: -0.7832, lng: 23.6558, trees: 325000, area: "Congo Basin" },
  { id: 4, name: "Ministry of Forests - Indonesia", lat: 0.9619, lng: 114.5548, trees: 520000, area: "Borneo, Indonesia" },
  { id: 5, name: "Taiga Restoration Society", lat: 60.0000, lng: 105.0000, trees: 280000, area: "Siberia, Russia" },
  { id: 6, name: "Indigenous Forest Guardians", lat: 52.8821, lng: -128.1561, trees: 95000, area: "Great Bear Rainforest, Canada" },
  { id: 7, name: "Australian Reforestation Department", lat: -16.2500, lng: 145.4167, trees: 180000, area: "Queensland, Australia" },
];

const ForestMap = ({ 
  locations = defaultLocations, 
  height = '500px',
  highlightedLocationId = null
}: ForestMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{[key: number]: mapboxgl.Marker}>({});
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    // In a real app, this would come from environment variables or backend
    const token = localStorage.getItem('mapboxToken');
    if (token) {
      setMapboxToken(token);
    }
  }, []);

  const initializeMap = () => {
    if (!mapboxToken || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [0, 20],
      zoom: 1.5,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each forest location
    locations.forEach(location => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3 class="text-sm font-medium">${location.name}</h3>
         <p class="text-xs">${location.area || ''}</p>
         ${location.trees ? `<p class="text-xs">Trees: ${location.trees.toLocaleString()}</p>` : ''}`
      );

      const marker = new mapboxgl.Marker({ 
        color: location.id === highlightedLocationId ? '#FF5733' : '#4CAF50' 
      })
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      markersRef.current[location.id] = marker;
    });

    return () => {
      map.current?.remove();
    };
  };

  // Update markers when highlighted location changes
  useEffect(() => {
    if (!map.current) return;
    
    Object.entries(markersRef.current).forEach(([idStr, marker]) => {
      const id = parseInt(idStr);
      const el = marker.getElement();
      
      if (id === highlightedLocationId) {
        // Make highlighted marker larger and different color
        marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3 class="text-sm font-medium">${locations.find(loc => loc.id === id)?.name}</h3>
           <p class="text-xs">${locations.find(loc => loc.id === id)?.area || ''}</p>
           <p class="text-xs">Trees: ${locations.find(loc => loc.id === id)?.trees?.toLocaleString() || 0}</p>
           <p class="text-xs mt-2 font-medium">✨ Currently selected</p>`
        ));
        marker.getElement().style.zIndex = '10';
        
        // If highlighted, fly to that location
        const loc = locations.find(l => l.id === id);
        if (loc) {
          map.current?.flyTo({
            center: [loc.lng, loc.lat],
            zoom: 5,
            duration: 2000
          });
        }
      } else {
        // Reset other markers
        const loc = locations.find(l => l.id === id);
        if (loc) {
          marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3 class="text-sm font-medium">${loc.name}</h3>
             <p class="text-xs">${loc.area || ''}</p>
             ${loc.trees ? `<p class="text-xs">Trees: ${loc.trees.toLocaleString()}</p>` : ''}`
          ));
        }
        marker.getElement().style.zIndex = '1';
      }
      
      // Update marker color
      marker.remove();
      marker.setColor(id === highlightedLocationId ? '#FF5733' : '#4CAF50');
      marker.addTo(map.current!);
    });
  }, [highlightedLocationId, locations]);

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
  }, [mapboxToken]);
  
  // Fly to highlighted location when it changes
  useEffect(() => {
    if (!map.current || !highlightedLocationId) return;
    
    const location = locations.find(loc => loc.id === highlightedLocationId);
    if (location) {
      map.current.flyTo({
        center: [location.lng, location.lat],
        zoom: 5,
        duration: 1500
      });
    }
  }, [highlightedLocationId, locations]);

  if (!mapboxToken) {
    return (
      <div 
        className="flex flex-col items-center justify-center gap-4 p-4" 
        style={{ height }}
      >
        <p className="text-muted-foreground text-center">To display the interactive map, please enter your Mapbox access token</p>
        
        <div className="flex items-center gap-2 w-full max-w-md">
          <input 
            type="text" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Enter your Mapbox access token"
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                localStorage.setItem('mapboxToken', value);
                setMapboxToken(value);
              }
            }}
          />
        </div>
        
        <p className="text-xs text-muted-foreground">
          Get your token at <a href="https://mapbox.com" target="_blank" rel="noreferrer" className="text-forest-600">mapbox.com</a>
        </p>
      </div>
    );
  }

  return <div ref={mapContainer} style={{ height }} className="rounded-lg" />;
};

export default ForestMap;


import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface ForestMapProps {
  locations?: {
    id: number;
    name: string;
    lat: number;
    lng: number;
    trees?: number;
    area?: string;
  }[];
  height?: string;
}

const ForestMap = ({ 
  locations = [], 
  height = '500px' 
}: ForestMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
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

      new mapboxgl.Marker({ color: '#4CAF50' })
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
  }, [mapboxToken, locations]);

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

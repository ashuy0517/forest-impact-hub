
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
  { id: 1, name: "Green India Mission", lat: 28.6139, lng: 77.2090, trees: 250000, area: "Delhi, India" },
  { id: 2, name: "Grow-Trees", lat: 19.0760, lng: 72.8777, trees: 120000, area: "Mumbai, India" },
  { id: 3, name: "SankalpTaru Foundation", lat: 30.0668, lng: 79.0193, trees: 180000, area: "Uttarakhand, India" },
  { id: 4, name: "Rajasthan Forest Department", lat: 26.9124, lng: 75.7873, trees: 320000, area: "Jaipur, India" },
  { id: 5, name: "Isha Foundation - Cauvery Calling", lat: 11.1271, lng: 78.6569, trees: 450000, area: "Tamil Nadu, India" },
  { id: 6, name: "Kerala Community Forestry", lat: 10.8505, lng: 76.2711, trees: 95000, area: "Kerala, India" },
  { id: 7, name: "Himalayan Environmental Trust", lat: 32.0872, lng: 77.1730, trees: 75000, area: "Himachal Pradesh, India" },
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
      center: [78.9629, 20.5937], // Center on India
      zoom: 4,
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
      
      if (id === highlightedLocationId) {
        // Make highlighted marker's popup show and update content
        const location = locations.find(l => l.id === id);
        if (location) {
          marker.getPopup().setHTML(
            `<h3 class="text-sm font-medium">${location.name}</h3>
             <p class="text-xs">${location.area || ''}</p>
             <p class="text-xs">Trees: ${location.trees?.toLocaleString() || 0}</p>
             <p class="text-xs mt-2 font-medium">✨ Currently selected</p>`
          );
        }
        
        marker.getElement().style.zIndex = '10';
        
        // Create a new marker with different color
        const newMarker = new mapboxgl.Marker({ color: '#FF5733' })
          .setLngLat(marker.getLngLat())
          .setPopup(marker.getPopup())
          .addTo(map.current!);
        
        // Remove the old marker
        marker.remove();
        
        // Update the reference
        markersRef.current[id] = newMarker;
        
        // If highlighted, fly to that location
        const highlightedLoc = locations.find(l => l.id === id);
        if (highlightedLoc) {
          map.current?.flyTo({
            center: [highlightedLoc.lng, highlightedLoc.lat],
            zoom: 5,
            duration: 2000
          });
        }
      } else if (marker.getElement().style.zIndex === '10') {
        // Reset previously highlighted marker
        const location = locations.find(l => l.id === id);
        if (location) {
          marker.getPopup().setHTML(
            `<h3 class="text-sm font-medium">${location.name}</h3>
             <p class="text-xs">${location.area || ''}</p>
             ${location.trees ? `<p class="text-xs">Trees: ${location.trees.toLocaleString()}</p>` : ''}`
          );
        }
        
        marker.getElement().style.zIndex = '1';
        
        // Create a new marker with standard color
        const newMarker = new mapboxgl.Marker({ color: '#4CAF50' })
          .setLngLat(marker.getLngLat())
          .setPopup(marker.getPopup())
          .addTo(map.current!);
        
        // Remove the old marker
        marker.remove();
        
        // Update the reference
        markersRef.current[id] = newMarker;
      }
    });
  }, [highlightedLocationId, locations]);

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
    
    return () => {
      // Clean up markers and map on unmount
      if (map.current) {
        Object.values(markersRef.current).forEach(marker => marker.remove());
        map.current.remove();
      }
    };
  }, [mapboxToken]);

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

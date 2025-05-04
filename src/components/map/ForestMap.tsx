
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const mapInitializedRef = useRef<boolean>(false);

  // Load token from localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem('mapboxToken');
      if (token) {
        setMapboxToken(token);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  // Safely remove all markers from the map
  const clearAllMarkers = () => {
    Object.values(markersRef.current).forEach(marker => {
      try {
        if (marker) marker.remove();
      } catch (error) {
        console.error("Error removing marker:", error);
      }
    });
    markersRef.current = {};
  };

  // Initialize map when token is available
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || mapInitializedRef.current) return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [78.9629, 20.5937], // Center on India
        zoom: 4,
      });

      // Set flag that map is initialized
      mapInitializedRef.current = true;

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Handle map load event
      map.current.on('load', () => {
        addMarkers();
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map Error",
        description: "Failed to initialize map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }

    // Cleanup function
    return () => {
      clearAllMarkers();
      
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      
      mapInitializedRef.current = false;
    };
  }, [mapboxToken]);

  // Add markers to the map
  const addMarkers = () => {
    if (!map.current || !mapInitializedRef.current) return;
    
    // Clear existing markers first
    clearAllMarkers();
    
    try {
      // Add markers for each forest location
      locations.forEach(location => {
        if (!map.current) return;
        
        const isHighlighted = location.id === highlightedLocationId;
        
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3 class="text-sm font-medium">${location.name}</h3>
           <p class="text-xs">${location.area || ''}</p>
           ${location.trees ? `<p class="text-xs">Trees: ${location.trees.toLocaleString()}</p>` : ''}
           ${isHighlighted ? `<p class="text-xs mt-2 font-medium">✨ Currently selected</p>` : ''}`
        );

        const marker = new mapboxgl.Marker({ 
          color: isHighlighted ? '#FF5733' : '#4CAF50' 
        })
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(map.current!);
        
        markersRef.current[location.id] = marker;
        
        // If highlighted, fly to that location
        if (isHighlighted) {
          map.current.flyTo({
            center: [location.lng, location.lat],
            zoom: 5,
            duration: 2000
          });
        }
      });
    } catch (error) {
      console.error("Error adding markers:", error);
    }
  };

  // Update markers and map when highlighted location changes
  useEffect(() => {
    if (!map.current || !mapInitializedRef.current) return;
    
    addMarkers();
  }, [highlightedLocationId, locations]);

  return <div ref={mapContainer} style={{ height }} className="rounded-lg">
    {!mapboxToken && (
      <div 
        className="flex flex-col items-center justify-center gap-4 p-4 absolute inset-0 bg-white" 
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
                try {
                  localStorage.setItem('mapboxToken', value);
                  setMapboxToken(value);
                } catch (error) {
                  console.error("Error saving to localStorage:", error);
                  toast({
                    title: "Storage Error",
                    description: "Could not save the token. Private browsing mode may be enabled.",
                    variant: "destructive"
                  });
                }
              }
            }}
          />
        </div>
        
        <p className="text-xs text-muted-foreground">
          Get your token at <a href="https://mapbox.com" target="_blank" rel="noreferrer" className="text-forest-600">mapbox.com</a>
        </p>
      </div>
    )}
  </div>;
};

export default ForestMap;

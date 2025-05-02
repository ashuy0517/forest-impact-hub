
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from '@/components/ui/button';

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  trees?: number;
  area?: string;
}

interface GoogleEarthMapProps {
  locations?: Location[];
  height?: string;
  highlightedLocationId?: number | null;
}

const GoogleEarthMap = ({
  locations = [],
  height = '500px',
  highlightedLocationId = null,
}: GoogleEarthMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef<{ [key: number]: google.maps.Marker }>({});
  const infoWindows = useRef<{ [key: number]: google.maps.InfoWindow }>({});
  const [googleApiKey, setGoogleApiKey] = useState<string>('');

  useEffect(() => {
    // In a real app, this would come from environment variables or backend
    const apiKey = localStorage.getItem('googleMapsApiKey');
    if (apiKey) {
      setGoogleApiKey(apiKey);
    }
  }, []);

  const initializeMap = async () => {
    if (!googleApiKey || !mapContainer.current) return;

    const loader = new Loader({
      apiKey: googleApiKey,
      version: "weekly",
    });

    try {
      const google = await loader.load();

      // Create the map centered on India
      map.current = new google.maps.Map(mapContainer.current, {
        center: { lat: 20.5937, lng: 78.9629 }, // Center on India
        zoom: 4,
        mapTypeId: 'satellite',
        tilt: 45, // Tilt for 3D effect
      });

      // Add Earth view toggle control
      const earthToggleDiv = document.createElement('div');
      earthToggleDiv.className = 'bg-white rounded p-2 m-2 shadow';
      earthToggleDiv.style.cursor = 'pointer';
      
      const earthToggleButton = document.createElement('button');
      earthToggleButton.textContent = 'Toggle Earth View';
      earthToggleButton.className = 'text-xs font-medium';
      
      earthToggleDiv.appendChild(earthToggleButton);
      
      earthToggleDiv.addEventListener('click', () => {
        const currentType = map.current?.getMapTypeId();
        if (currentType === 'satellite') {
          map.current?.setMapTypeId('hybrid');
          earthToggleButton.textContent = 'Satellite View';
        } else {
          map.current?.setMapTypeId('satellite');
          earthToggleButton.textContent = 'Hybrid View';
        }
      });
      
      map.current.controls[google.maps.ControlPosition.TOP_RIGHT].push(earthToggleDiv);

      // Add markers for locations
      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map.current,
          title: location.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: location.id === highlightedLocationId ? '#FF5733' : '#4CAF50',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
          },
        });

        // Create info window
        const infoContent = `
          <div class="p-2">
            <h3 class="font-medium">${location.name}</h3>
            <p class="text-sm">${location.area || ''}</p>
            ${location.trees ? `<p class="text-sm">Trees: ${location.trees.toLocaleString()}</p>` : ''}
            ${location.id === highlightedLocationId ? `<p class="text-sm font-medium mt-2">✨ Currently selected</p>` : ''}
          </div>
        `;
        
        const infoWindow = new google.maps.InfoWindow({
          content: infoContent,
        });

        // Store references
        markers.current[location.id] = marker;
        infoWindows.current[location.id] = infoWindow;

        // Add click event
        marker.addListener('click', () => {
          // Close all other info windows
          Object.values(infoWindows.current).forEach(window => window.close());
          
          // Open this info window
          infoWindow.open(map.current, marker);
        });
        
        // If this is the highlighted location, open its info window and fly to it
        if (location.id === highlightedLocationId) {
          infoWindow.open(map.current, marker);
          
          map.current?.panTo({ lat: location.lat, lng: location.lng });
          map.current?.setZoom(5);
        }
      });
    } catch (error) {
      console.error("Error loading Google Maps:", error);
    }
  };

  // Effect to handle changes in highlighted location
  useEffect(() => {
    if (!map.current || Object.keys(markers.current).length === 0) return;

    // Update markers and infowindows based on highlightedLocationId
    locations.forEach(location => {
      const marker = markers.current[location.id];
      const infoWindow = infoWindows.current[location.id];
      
      if (!marker || !infoWindow) return;
      
      // Update marker appearance
      marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: location.id === highlightedLocationId ? '#FF5733' : '#4CAF50',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
      });
      
      // Update info window content
      const infoContent = `
        <div class="p-2">
          <h3 class="font-medium">${location.name}</h3>
          <p class="text-sm">${location.area || ''}</p>
          ${location.trees ? `<p class="text-sm">Trees: ${location.trees.toLocaleString()}</p>` : ''}
          ${location.id === highlightedLocationId ? `<p class="text-sm font-medium mt-2">✨ Currently selected</p>` : ''}
        </div>
      `;
      infoWindow.setContent(infoContent);
      
      // Handle highlighted location
      if (location.id === highlightedLocationId) {
        // Close all other info windows
        Object.values(infoWindows.current).forEach(window => window.close());
        
        // Open this info window
        infoWindow.open(map.current, marker);
        
        // Pan to location
        map.current?.panTo({ lat: location.lat, lng: location.lng });
        map.current?.setZoom(5);
      }
    });
  }, [highlightedLocationId, locations]);

  useEffect(() => {
    if (googleApiKey) {
      initializeMap();
    }
    
    // Cleanup function
    return () => {
      // Google Maps doesn't need explicit cleanup
      markers.current = {};
      infoWindows.current = {};
    };
  }, [googleApiKey]);

  if (!googleApiKey) {
    return (
      <div 
        className="flex flex-col items-center justify-center gap-4 p-4" 
        style={{ height }}
      >
        <p className="text-muted-foreground text-center">To display Google Earth, please enter your Google Maps API key</p>
        
        <div className="flex items-center gap-2 w-full max-w-md">
          <input 
            type="text" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Enter your Google Maps API key"
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) {
                localStorage.setItem('googleMapsApiKey', value);
                setGoogleApiKey(value);
              }
            }}
          />
        </div>
        
        <p className="text-xs text-muted-foreground">
          Get your API key at <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noreferrer" className="text-forest-600">Google Cloud Console</a>
        </p>
      </div>
    );
  }

  return <div ref={mapContainer} style={{ height }} className="rounded-lg" />;
};

export default GoogleEarthMap;

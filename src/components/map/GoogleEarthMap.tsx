
import { useRef, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

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
  highlightedLocationId = null
}: GoogleEarthMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Default to center of India if no locations
  const defaultCenter = { lat: 23.5937, lng: 78.9629 };

  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: '', // You'd typically use an API key here
        version: "weekly",
      });

      try {
        await loader.load();
        setMapLoaded(true);
        
        if (mapRef.current && !googleMapRef.current) {
          const center = locations.length > 0 ? 
            { lat: locations[0].lat, lng: locations[0].lng } : 
            defaultCenter;

          googleMapRef.current = new google.maps.Map(mapRef.current, {
            center,
            zoom: 5,
            mapTypeId: 'satellite',
            mapTypeControl: true,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_RIGHT,
              mapTypeIds: ['roadmap', 'terrain', 'satellite']
            }
          });
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    loadMap();
  }, []);

  // Create or update markers when locations change or map loads
  useEffect(() => {
    if (!mapLoaded || !googleMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    if (locations.length === 0) return;

    locations.forEach(location => {
      const isHighlighted = location.id === highlightedLocationId;
      
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: googleMapRef.current,
        title: location.name,
        animation: isHighlighted ? google.maps.Animation.BOUNCE : undefined,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: isHighlighted ? '#4CAF50' : '#2196F3',
          fillOpacity: 0.8,
          strokeWeight: 2,
          strokeColor: 'white',
          scale: 8
        }
      });

      // Add an info window
      const infoWindow = new google.maps.InfoWindow({
        content: `<div>
          <h3 style="font-weight: bold; margin-bottom: 4px;">${location.name}</h3>
          ${location.trees ? `<p>Trees planted: ${location.trees}</p>` : ''}
          ${location.area ? `<p>Area: ${location.area}</p>` : ''}
        </div>`
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // If a location is highlighted, center and zoom to it
    if (highlightedLocationId !== null) {
      const highlightedLocation = locations.find(loc => loc.id === highlightedLocationId);
      if (highlightedLocation && googleMapRef.current) {
        googleMapRef.current.setCenter({
          lat: highlightedLocation.lat,
          lng: highlightedLocation.lng
        });
        googleMapRef.current.setZoom(9);
      }
    }
  }, [locations, mapLoaded, highlightedLocationId]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: height,
        backgroundImage: !mapLoaded ? 
          'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNGMEYwRjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMHB4IiBmaWxsPSIjOTk5Ij5Mb2FkaW5nIG1hcC4uLjwvdGV4dD48L3N2Zz4=")' : 
          'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className="w-full"
    >
      {!mapLoaded && (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      )}
    </div>
  );
};

export default GoogleEarthMap;

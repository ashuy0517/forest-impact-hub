
import { useState } from 'react';
import ForestMap from './ForestMap';
import GoogleEarthMap from './GoogleEarthMap';
import { Button } from '@/components/ui/button';

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  trees?: number;
  area?: string;
}

interface MapSelectorProps {
  locations?: Location[];
  height?: string;
  highlightedLocationId?: number | null;
}

type MapProvider = 'mapbox' | 'googleEarth';

const MapSelector = ({ 
  locations,
  height = '500px',
  highlightedLocationId = null 
}: MapSelectorProps) => {
  const [mapProvider, setMapProvider] = useState<MapProvider>('mapbox');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-muted p-2 flex justify-end space-x-2 rounded-t-lg">
        <Button 
          size="sm" 
          variant={mapProvider === 'mapbox' ? 'default' : 'outline'} 
          onClick={() => setMapProvider('mapbox')}
          className={mapProvider === 'mapbox' ? 'bg-forest-600 hover:bg-forest-700' : ''}
        >
          Mapbox
        </Button>
        <Button 
          size="sm" 
          variant={mapProvider === 'googleEarth' ? 'default' : 'outline'} 
          onClick={() => setMapProvider('googleEarth')}
          className={mapProvider === 'googleEarth' ? 'bg-forest-600 hover:bg-forest-700' : ''}
        >
          Google Earth
        </Button>
      </div>
      
      <div className="flex-1">
        {mapProvider === 'mapbox' ? (
          <ForestMap 
            locations={locations} 
            height={height} 
            highlightedLocationId={highlightedLocationId} 
          />
        ) : (
          <GoogleEarthMap 
            locations={locations} 
            height={height} 
            highlightedLocationId={highlightedLocationId} 
          />
        )}
      </div>
    </div>
  );
};

export default MapSelector;

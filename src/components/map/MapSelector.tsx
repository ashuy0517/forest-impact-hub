
import { useState, useEffect } from 'react';
import ForestMap from './ForestMap';
import GoogleEarthMap from './GoogleEarthMap';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const [key, setKey] = useState<number>(0); // Used to force remounting of components
  const { toast } = useToast();
  
  // Force remount of map components when switching providers to avoid DOM cleanup issues
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [mapProvider]);
  
  const handleMapProviderChange = (provider: MapProvider) => {
    if (provider !== mapProvider) {
      setMapProvider(provider);
      toast({
        title: `Switched to ${provider === 'mapbox' ? 'Mapbox' : 'Google Earth'} map`,
        description: "Map view updated successfully",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-muted p-2 flex justify-end space-x-2 rounded-t-lg">
        <Button 
          size="sm" 
          variant={mapProvider === 'mapbox' ? 'default' : 'outline'} 
          onClick={() => handleMapProviderChange('mapbox')}
          className={mapProvider === 'mapbox' ? 'bg-forest-600 hover:bg-forest-700' : ''}
        >
          Mapbox
        </Button>
        <Button 
          size="sm" 
          variant={mapProvider === 'googleEarth' ? 'default' : 'outline'} 
          onClick={() => handleMapProviderChange('googleEarth')}
          className={mapProvider === 'googleEarth' ? 'bg-forest-600 hover:bg-forest-700' : ''}
        >
          Google Earth
        </Button>
      </div>
      
      <div className="flex-1">
        {mapProvider === 'mapbox' ? (
          <ForestMap 
            key={`mapbox-${key}`}
            locations={locations} 
            height={height} 
            highlightedLocationId={highlightedLocationId} 
          />
        ) : (
          <GoogleEarthMap 
            key={`google-${key}`}
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

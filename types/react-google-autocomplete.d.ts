declare module 'react-google-autocomplete' {
    import type { ComponentType } from 'react';
    
    interface UsePlacesWidgetOptions {
      apiKey: string;
      onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
    }
    
    export function usePlacesWidget<T extends HTMLElement>(options: UsePlacesWidgetOptions): {
      ref: React.RefObject<T>;
    };
    
    const Autocomplete: ComponentType<any>;
    export default Autocomplete;
  }
  import { useState, useEffect } from 'react';



  // Hook
  export default function useLocation() {
  
  
  
    const [position, setPosition] = useState<Position| null>(null);
  
    useEffect(() => {
      let id: number
      if (navigator.geolocation) {
         id = navigator.geolocation.watchPosition(setPosition);
      } 
    
      return () => navigator.geolocation && navigator.geolocation.clearWatch(id);
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return position 
  }
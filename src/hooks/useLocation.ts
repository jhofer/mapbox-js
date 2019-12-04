  import { useState, useEffect } from 'react';


  type Pos = {
     latitude: number;
     longitude: number;
  }

  // Hook
  export default function useLocation(defaultPos: Pos) {
  
  
  
    const [position, setPosition] = useState<Pos>(defaultPos);
  
    useEffect(() => {
      let id: number
      if (navigator.geolocation) {
         id = navigator.geolocation.watchPosition(
           (newPos: Position)=>setPosition({
               longitude: newPos.coords.longitude, 
               latitude: newPos.coords.latitude
           }));
      } 
    
      return () => navigator.geolocation && navigator.geolocation.clearWatch(id);
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return position
  }
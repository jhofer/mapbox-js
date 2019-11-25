import { useState, useEffect } from 'react';



// Hook
export default function useWindowSize() {

  function getSize() {
  
    return {
      width:  document.documentElement.clientWidth ,
      height:  document.documentElement.clientHeight
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
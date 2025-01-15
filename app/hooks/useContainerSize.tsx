import { useEffect, useState } from 'react';

export const useContainerSize = (containerRef: React.MutableRefObject<null>) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const element = containerRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width;
      const newHeight = entries[0].contentRect.height;
      setContainerWidth(newWidth);
      setContainerHeight(newHeight);
    });

    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  
  return {containerWidth, containerHeight};
}

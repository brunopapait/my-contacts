import { useEffect, createRef, useCallback, useRef, useState } from 'react';

export default function useAnimatedList() {
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);
  const [items, setItems] = useState([]);

  const animatedRefs = useRef(new Map());
  const animatedEndListenerRefs = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animatedEndListenerRefs.current.get(itemId);
    removeListener();

    animatedEndListenerRefs.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((prevState) => prevState.filter(item => item.id !== itemId));
    setPendingRemovalItemsIds((prevState) => prevState.filter(id => id !== itemId));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListener = animatedEndListenerRefs.current.has(itemId);

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => animatedElement.removeEventListener('animationend', onAnimationEnd);
        animatedElement.addEventListener('animationend', onAnimationEnd);
        animatedEndListenerRefs.current.set(itemId, removeListener);
      }
    });
  }, [handleAnimationEnd, pendingRemovalItemsIds]);

  useEffect(() => {
    const removeListeners = animatedEndListenerRefs.current;
    return () => removeListeners.forEach(removeListener => removeListener());
  }, [])

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback(itemId => {
    let animatedRef = animatedRefs.current.get(itemId);
    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);
      return renderItem(item, {
        isLeaving,
        animatedRef
      })
    })
  ), [items, pendingRemovalItemsIds, getAnimatedRef]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList
  };
}

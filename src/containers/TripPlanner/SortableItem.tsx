import React, { createContext, useContext, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Stop } from '../../context/types';
import { useDataContext } from '../../context/dataContext';
import SortableStopItem from './SortableStopItem';
import { DraggableIcon } from '../../assets/svg';

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function SortableItem({
  id,
  data,
  setIsRouteValid,
}: {
  id: UniqueIdentifier;
  data: Stop;
  setIsRouteValid: (isValid: boolean) => void;
}) {
  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
    id,
  });

  const { formData } = useDataContext();

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const index = formData.stops.findIndex((item) => item.id === id);

  return (
    <SortableItemContext.Provider value={context}>
      <li className="SortableItem" ref={setNodeRef} style={style}>
        <DragHandle />
        <SortableStopItem data={data} index={index} setIsRouteValid={setIsRouteValid} />
      </li>
    </SortableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <button className="DragHandle" {...attributes} {...listeners} ref={ref}>
      <DraggableIcon />
    </button>
  );
}

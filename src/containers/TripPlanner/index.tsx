import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { Active } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';
import { useDataContext } from '../../context/dataContext';
import useIsMobile from '../../hooks/useIsMobile';
import { SortableItem } from './SortableItem';
import { SortableOverlay } from './SortableOverlay';
import { Location, DestinationSVG, ErrorIcon } from '../../assets/svg';
import './tripPlanner.scss';

const TripPlanner: React.FC = () => {
  const { formData, setFormData } = useDataContext();
  const isMobile = useIsMobile();
  const [active, setActive] = useState<Active | null>(null);
  const [isRouteValid, setIsRouteValid] = useState<boolean>(true);

  const activeItem = useMemo(() => formData.stops.find((item) => item.id === active?.id), [active, formData.stops]);

  const onDragEnd = ({ active, over }: any) => {
    if (over && active.id !== over?.id) {
      const activeIndex = formData.stops.findIndex(({ id }) => id === active.id);
      const overIndex = formData.stops.findIndex(({ id }) => id === over.id);

      const sortedArr = arrayMove(formData.stops, activeIndex, overIndex);
      setFormData((prev) => ({ ...prev, stops: sortedArr }));
    }
    setActive(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const renderIcon = useCallback(
    (index: number) => {
      return index === 0 || index === formData.stops.length - 1 ? <Location /> : <DestinationSVG />;
    },
    [formData.stops]
  );

  return (
    <>
      {!isRouteValid && (
        <div className="invalid-route-wrapper">
          <div>
            <ErrorIcon />
          </div>
          <div className="invalid-route-text">
            <h5>We can't seem to find a drivable route between those locations.</h5>
            <p>
              Need help? Feel free to <b>get in touch</b> (866-428-7226) and we can help you plan your trip.
            </p>
          </div>
        </div>
      )}
      <div className="trip-planner">
        {formData.stops.map((_, index) => (
          <div
            className={`render-icon-wrapper d-flex stepper-main justify-content-center align-items-center flex-column icon-${index + 1}`}
            style={{ top:
                isMobile ? index !== formData.stops.length - 1 ?  `${index * 385 + 20}px` : `${index * 395}px`
                : index !== formData.stops.length - 1 ? `${index * 190 + 20}px` : `${index * 195}px` }}
            key={index}
          >
            <div>{renderIcon(index)}</div>
            {formData.stops.length - 1 !== index && <hr className="hr-wrapper position-absolute" />}
          </div>
        ))}
        <DndContext
          sensors={sensors}
          onDragStart={({ active }) => {
            setActive(active);
          }}
          onDragEnd={onDragEnd}
          onDragCancel={() => {
            setActive(null);
          }}
          modifiers={[restrictToFirstScrollableAncestor]}
        >
          <SortableContext items={formData.stops}>
            <ul className="SortableList" role="application">
              {formData.stops.map((item) => (
                <React.Fragment key={item.id}>
                  <SortableItem id={item.id} data={item} setIsRouteValid={setIsRouteValid} />
                </React.Fragment>
              ))}
            </ul>
          </SortableContext>
          {createPortal(
            <SortableOverlay>
              {activeItem ? (
                <SortableItem id={activeItem.id} data={activeItem} setIsRouteValid={setIsRouteValid} />
              ) : null}
            </SortableOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );
};

export default TripPlanner;

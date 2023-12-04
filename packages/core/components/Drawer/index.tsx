import { Droppable } from "@hello-pangea/dnd";
import styles from "./styles.module.css";
import getClassNameFactory from "../../lib/get-class-name-factory";
import { Draggable } from "../Draggable";
import { DragIcon } from "../DragIcon";
import { ReactNode, useMemo } from "react";

const getClassName = getClassNameFactory("Drawer", styles);
const getClassNameItem = getClassNameFactory("DrawerItem", styles);

export const DrawerDraggable = ({
  children,
  id,
  index,
}: {
  children: ReactNode;
  id: string;
  index: number;
}) => (
  <Draggable key={id} id={id} index={index} showShadow disableAnimations>
    {() => children}
  </Draggable>
);

export const DrawerItem = ({
  name,
  children,
  id = name,
  index,
}: {
  name: string;
  children?: (props: { children: ReactNode; name: string }) => ReactNode;
  id?: string;
  index: number;
}) => {
  const CustomInner = useMemo(
    () =>
      children ||
      (({ children }: { name: string; children: ReactNode }) => (
        <div className={getClassNameItem("default")}>{children}</div>
      )),
    [children]
  );

  return (
    <div className={getClassNameItem()}>
      <DrawerDraggable id={id} index={index}>
        <CustomInner name={name}>
          <div className={getClassNameItem("draggableWrapper")}>
            <div className={getClassNameItem("draggable")}>
              <div className={getClassNameItem("name")}>{name}</div>
              <div className={getClassNameItem("icon")}>
                <DragIcon />
              </div>
            </div>
          </div>
        </CustomInner>
      </DrawerDraggable>
    </div>
  );
};

export const Drawer = ({
  children,
  droppableId = "component-list",
  direction = "vertical",
}: {
  children: ReactNode;
  droppableId?: string;
  direction?: "vertical" | "horizontal";
}) => {
  return (
    <Droppable droppableId={droppableId} isDropDisabled direction={direction}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={getClassName({
            isDraggingFrom: !!snapshot.draggingFromThisWith,
          })}
        >
          {children}

          {/* Use different element so we don't clash with :last-of-type */}
          <span style={{ display: "none" }}>{provided.placeholder}</span>
        </div>
      )}
    </Droppable>
  );
};
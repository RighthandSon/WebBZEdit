import produce from 'immer';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { IBaseObject } from '../../Document/Obstacles/BaseObject';
import {
  implementsIPositionable,
  IPositionable,
} from '../../Document/attributePartials';
import { documentState, selectionState } from '../../atoms';
import PositionableControls from './Toolbox/PositionableControls';

const ToolboxPanel = () => {
  const [world, setBZWDocument] = useRecoilState(documentState);
  const selectedUUID = useRecoilValue(selectionState);

  const [selection, setSelection] = useState<IBaseObject | null>(null);

  useEffect(() => {
    if (world && selectedUUID) {
      setSelection(world.children[selectedUUID]);
    }
  }, [world, selectedUUID]);

  const handlePositionableOnChange = (data: IPositionable) => {
    if (!world || !selectedUUID) {
      return;
    }

    const nextWorld = produce(world, (draftWorld) => {
      const obstacle: IPositionable = draftWorld.children[selectedUUID] as any;

      obstacle.position = data.position;
      obstacle.size = data.size;
      obstacle.rotation = data.rotation;
    });

    setBZWDocument(nextWorld);
  };

  return (
    <div className="d-flex p-3">
      {selection && implementsIPositionable(selection) && (
        <PositionableControls
          data={selection}
          onChange={handlePositionableOnChange}
        />
      )}
    </div>
  );
};

export default ToolboxPanel;

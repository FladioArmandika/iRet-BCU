import React, { FC, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  showComponentControl,
  showRoomMoved
} from '@stores/app/action';
import { BottomSheet, Label, Modal, InputField, Button } from '@components/index';
import { IconBuilding, IconClose, IconEdit, IconMove } from '@assets/icons';
import { css, getColor } from '@styles/index';
import { Room } from '@type/type';

interface ComponentControlsProps {
  room: Room;
}

interface EditFormValue {
  name: string;
  width: number;
  height: number;
}

const ComponentControls: FC<ComponentControlsProps> = ({ room }) => {
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [formValue, setFormValue] = useState<EditFormValue>({
    name: room.name,
    width: room.width,
    height: room.height,
  });

  const cancelComponentControls = () => {
    dispatch(
      showComponentControl({
        roomId: null,
      })
    )
  }

  const moveRoom = () => {
    dispatch(showRoomMoved({roomId: room.id}))
  }

  const EditModal = () => {
    return (
      <Modal title='edit title'>
        <InputField
          placeholder='Name'
          value={formValue.name}
          onChange={(v) => setFormValue({ ...formValue, name: v })}
        />
        <Button
          text="Cancel"
          onPress={() => setShowEditForm(false)}
          bgColor={getColor('white')}
          textColor={getColor('gray-800')}
        />
      </Modal>
    );
  };

  return (
    <>
      {showEditForm && EditModal()}
      <BottomSheet>
        <ScrollView horizontal>
          <TouchableOpacity
            onPress={() => cancelComponentControls()}
            style={[
              css(
                'items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600'
              ),
            ]}>
            <IconClose />
            <Label style={css('text-white mt-3')}>Cancel</Label>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => moveRoom()}
            style={[
              css(
                'items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600'
              ),
            ]}>
            <IconMove />
            <Label style={css('text-white mt-3')}>Move</Label>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowEditForm(true)}
            style={[
              css(
                'items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600'
              ),
            ]}>
            <IconEdit />
            <Label style={css('text-white mt-3')}>Edit</Label>
          </TouchableOpacity>
        </ScrollView>
      </BottomSheet>
    </>
  );
};

export default ComponentControls;

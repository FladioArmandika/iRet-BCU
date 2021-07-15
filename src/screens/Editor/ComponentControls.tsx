import React, { FC, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { BottomSheet, Label, Modal, InputField } from '@components/index';
// import { IconBuilding } from '@assets/index';
import { css } from '@styles/index';
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
  const [showEditForm, setShowEditForm] = useState(false);
  const [formValue, setFormValue] = useState<EditFormValue>({
    name: room.name,
    width: room.width,
    height: room.height,
  });

  const EditModal = () => {
    return (
      <Modal title='edit title'>
        <InputField
          placeholder='Name'
          value={formValue.name}
          onChange={(v) => setFormValue({ ...formValue, name: v })}
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
            onPress={() => setShowEditForm(true)}
            style={[
              css(
                'items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600'
              ),
            ]}>
            {/* <IconBuilding /> */}
            <Label style={css('text-white mt-3')}>Edit</Label>
          </TouchableOpacity>
        </ScrollView>
      </BottomSheet>
    </>
  );
};

export default ComponentControls;

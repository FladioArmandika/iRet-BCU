import React, { FC, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PickerIOS } from '@react-native-picker/picker';

import { showComponentControl, showRoomMoved } from '@stores/app/action';
import {
  BottomSheet,
  Label,
  Modal,
  InputField,
  Button,
} from '@components/index';
import { Construction, Floor, RoomConstruction } from '@type/index';
import { IconClose, IconEdit, IconMove } from '@assets/icons';
import { css, getColor } from '@styles/index';
import { Room } from '@type/type';
import { rootState } from '@stores/createStore';

interface ComponentControlsProps {
  room: Room;
}

interface EditFormValue {
  name: string;
  width: number;
  height: number;
  constructionFloor: string;
  constructionRoof: string;
}

const ComponentControls: FC<ComponentControlsProps> = ({ room }) => {
  const dispatch = useDispatch();
  const app = useSelector((state: rootState) => state.app);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formValue, setFormValue] = useState<EditFormValue>({
    name: room.name,
    width: room.width,
    height: room.height,
    constructionFloor: room.construction.floor,
    constructionRoof: room.construction.roof,
  });

  const cancelComponentControls = () => {
    dispatch(
      showComponentControl({
        roomId: null,
      })
    );
  };

  const moveRoom = () => {
    dispatch(showRoomMoved({ roomId: room.id }));
  };

  const EditModal = () => {
    console.log(formValue);
    return (
      <Modal title='Edit Room'>
        <InputField
          placeholder='Name'
          value={formValue.name}
          onChange={(v) => setFormValue({ ...formValue, name: v })}
        />
        <View style={css('flex-row mt-4')}>
          <InputField
            placeholder='Width'
            keyboardType='number-pad'
            value={formValue.width.toString()}
            onChange={(v) => setFormValue({ ...formValue, height: v })}
            style={css('flex-1 mr-1')}
          />
          <InputField
            placeholder='Height'
            keyboardType='number-pad'
            value={formValue.height.toString()}
            onChange={(v) => setFormValue({ ...formValue, width: v })}
            style={css('flex-1 ml-1')}
          />
        </View>
        <View style={css('flex-row mt-4')}>
          <Button
            text='Cancel'
            onPress={() => setShowEditForm(false)}
            bgColor={getColor('white')}
            textColor={getColor('gray-800')}
            style={css('mr-1')}
          />
          <Button
            text='Save'
            onPress={() => setShowEditForm(false)}
            style={css('ml-1')}
          />
        </View>
        <View>
          <Label>Construction</Label>
          <PickerIOS
            selectedValue={formValue.constructionFloor}
            itemStyle={{ height: 50 }}
            style={{ height: 50, width: '100%', marginTop: 0 }}
            onValueChange={(itemValue) => setFormValue({ ...formValue, constructionFloor: itemValue.toString() })}>
            {app.construction.map(
              (roof: Construction, index: number) =>
                roof.category === 'roof' && (
                  <PickerIOS.Item
                    label={roof.name}
                    value={roof.name}
                    key={index}
                  />
                )
            )}
          </PickerIOS>
        </View>
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
            style={[css("items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600")]}
          >
            <IconClose />
            <Label style={css("text-white mt-3")}>Cancel</Label>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => moveRoom()}
            style={[css("items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600")]}
          >
            <IconMove />
            <Label style={css("text-white mt-3")}>Move</Label>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowEditForm(true)}
            style={[css("items-center justify-between w-20 mr-4 px-2 py-2 rounded-lg bg-gray-600")]}
          >
            <IconEdit />
            <Label style={css("text-white mt-3")}>Edit</Label>
          </TouchableOpacity>
        </ScrollView>
      </BottomSheet>
    </>
  );
};

export default ComponentControls;

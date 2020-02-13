import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-ionicons';
import styled from 'styled-components';

const CardButtonBig = styled.View`
  align-content: stretch;
  border-radius: 3px;
  elevation: 1;
  flex-direction: row;
  margin: 4px;
  overflow: hidden;
`;

const CardButtonBigItem = styled.TouchableOpacity`
  background-color: deepskyblue;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding: 8px;
`;

const CardButtonBigText = styled.Text`
  color: #fcfcfc;
  font-size: 16px;
  font-weight: bold;
  padding: 2px 8px;
`;

const ModalLogout = props => {
  const { handleConfirmation, modalVisible, handleClose } = props;
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          handleClose();
        }}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'black', opacity: 0.7 }}
          activeOpacity={0.7}
          onPress={() => {
            handleClose();
          }}
        />
        <View style={{ flex: 0.3, backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fcfcfc',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              overflow: 'hidden'
            }}>
            <View style={{ alignItems: 'center', padding: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Do you really want to log out?
              </Text>
            </View>
            <View style={{ padding: 8 }} />
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                flex: 1,
                paddingHorizontal: 16
              }}>
              <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <CardButtonBig>
                  <CardButtonBigItem
                    activeOpacity={0.5}
                    onPress={handleConfirmation}>
                    <CardButtonBigText>Yes</CardButtonBigText>
                  </CardButtonBigItem>
                </CardButtonBig>
              </View>
              <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <CardButtonBig>
                  <CardButtonBigItem
                    style={{ backgroundColor: '#ff4000' }}
                    activeOpacity={0.5}
                    onPress={() => {
                      handleClose();
                    }}>
                    <CardButtonBigText>No</CardButtonBigText>
                  </CardButtonBigItem>
                </CardButtonBig>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalLogout;

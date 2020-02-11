import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-ionicons';

const ModalDetailItem = props => {
  const { dataItem, modalVisible, handleClose } = props;
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
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#fcfcfc',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              overflow: 'hidden'
            }}>
            <View style={{ flex: 0.9 }} />
            <TouchableOpacity
              onPress={() => {
                handleClose();
              }}
              style={{
                flex: 0.1,
                paddingHorizontal: 8,
                paddingVertical: 2,
                position: 'absolute',
                top: 8,
                right: 8
              }}>
              <Icon name="md-close" style={{ color: '#454545' }} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalDetailItem;

import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-ionicons';

import styled from 'styled-components';

const NavigationChangePassword = screenProps => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        height: 51,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fcfcfc'
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.15
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => screenProps.navigation.goBack(null)}>
          <View>
            <Icon name="md-arrow-back" style={{ color: '#333333' }} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{ flex: 0.7, justifyContent: 'center', alignItems: 'stretch' }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#333333',
              textAlign: 'center'
            }}>
            Change Password
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.15
        }}
      />
    </View>
  );
};

export default NavigationChangePassword;

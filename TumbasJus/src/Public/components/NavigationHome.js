import React, { useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styled from 'styled-components';

import { useInputText } from '../helper';
import Icon from 'react-native-ionicons';

const NavigationHome = screenProps => {
  const { value: filterName, bindText: bindFilterName } = useInputText('');

  useEffect(() => {
    screenProps.navigation.setParams({
      filterName: filterName
    });
  }, [filterName]);

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
          activeOpacity={0.7}
          onPress={() => screenProps.navigation.toggleDrawer()}>
          <View>
            <Icon name="md-menu" style={{ color: '#454545' }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.7 }}>
        <View>
          <TextInput
            style={{
              backgroundColor: '#f3f3f3',
              borderWidth: 1,
              borderColor: '#ebebeb',
              color: '#555555',
              borderRadius: 5,
              marginVertical: 6,
              paddingVertical: 9,
              paddingHorizontal: 12
            }}
            {...bindFilterName}
            placeholder="Search product name..."
          />
        </View>
        <Icon
          name="md-search"
          style={{
            position: 'absolute',
            color: '#454545',
            right: 11,
            top: 9
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.15
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ backgroundColor: '#fcfcfc' }}>
          {screenProps.orders.cart.length > 0 ? (
            <View
              style={{
                position: 'absolute',
                zIndex: 10,
                top: -4,
                right: -10,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 15,
                paddingHorizontal: 4,
                backgroundColor: 'deepskyblue'
              }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: '#fcfcfc'
                }}>
                {screenProps.orders.cart.length}
              </Text>
            </View>
          ) : null}
          <Icon
            onPress={() => screenProps.navigation.navigate('Order')}
            name="md-list-box"
            style={{ color: '#454545' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    orders: state.orders
  };
};

export default connect(mapStateToProps)(NavigationHome);

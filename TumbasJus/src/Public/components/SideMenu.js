import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { NavigationActions } from 'react-navigation';
import styled from 'styled-components';

const SideMenu = props => {
  const navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    props.navigation.dispatch(navigateAction);
  };
  return (
    <View>
      <ScrollView>
        <View style={{ borderWidth: 1, alignItems: 'center' }}>
          <View
            style={{
              margin: 16,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              borderRadius: 50
            }}>
            <Text
              style={{ fontSize: 16 }}
              onPress={navigateToScreen('Profile')}>
              Profile
            </Text>
          </View>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text
            style={{
              borderWidth: 1,
              padding: 16,
              fontSize: 16,
              fontWeight: 'bold'
            }}
            onPress={navigateToScreen('Home')}>
            Home
          </Text>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text
            style={{
              borderWidth: 1,
              padding: 16,
              fontSize: 16,
              fontWeight: 'bold'
            }}
            onPress={navigateToScreen('Order')}>
            Order
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SideMenu;

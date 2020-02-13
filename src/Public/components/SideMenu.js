import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { API_HOST } from 'react-native-dotenv';

import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { NavigationActions } from 'react-navigation';
import styled from 'styled-components';

import { actionGetUser } from '../redux/actions/user';

const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 8px;
`;

const ListDivider = styled.View`
  padding-vertical: 2px;
  border-bottom-width: 1px;
  border-color: #cccccc;
`;

const ListPoint = styled.View`
  padding-vertical: 8px;
  padding-horizontal: 16px;
  flex: 0.1;
  align-items: flex-end;
`;

const ListIcon = styled(Icon)`
  font-size: 21px;
`;

const ListLabel = styled.View`
  padding-vertical: 8px;
  padding-horizontal: 16px;
  flex: 1;
`;

const ListText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const SideMenu = props => {
  const { auth, user, getUser } = props;
  const headers = {
    headers: {
      authorization: auth.data.token
    }
  };

  const setUser = async () => {
    const config = {
      ...headers,
      id: auth.data.id
    };
    await getUser(config);
  };

  const navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    props.navigation.dispatch(navigateAction);
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <View>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'deepskyblue'
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 180,
              overflow: 'hidden',
              borderWidth: 4,
              borderColor: 'white',
              elevation: 3,
              marginVertical: 32
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={navigateToScreen('Profile')}
              style={{ flex: 1 }}>
              <Image
                source={{
                  uri:
                    user.data.image !== API_HOST + '/'
                      ? user.data.image
                      : API_HOST + '/public/images/image-placeholder.jpg'
                }}
                style={{ flex: 1 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableNativeFeedback onPress={navigateToScreen('Home')}>
          <ListItem>
            <ListPoint>
              <ListIcon name="home" />
            </ListPoint>
            <ListLabel>
              <ListText>Home</ListText>
            </ListLabel>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={navigateToScreen('Order')}>
          <ListItem>
            <ListPoint>
              <ListIcon name="shopping-basket" />
            </ListPoint>
            <ListLabel>
              <ListText>Order Cart</ListText>
            </ListLabel>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={navigateToScreen('OrderHistory')}>
          <ListItem>
            <ListPoint>
              <ListIcon name="history" />
            </ListPoint>
            <ListLabel>
              <ListText>Order History</ListText>
            </ListLabel>
          </ListItem>
        </TouchableNativeFeedback>
        <ListDivider />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  getUser: config => dispatch(actionGetUser(config))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

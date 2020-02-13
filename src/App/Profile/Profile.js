import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { API_HOST } from 'react-native-dotenv';

import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-ionicons';

import NavigationProfile from '../../Public/components/NavigationProfile';
import ModalLogout from '../../Public/components/ModalLogout';

import styled from 'styled-components';

import { actionGetUser } from '../../Public/redux/actions/user';

const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 8px;
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
`;

const CoverImage = styled.View`
  align-items: center;
  padding-vertical: 16px;
  border-bottom-width: 2px;
  border-color: #eeeeee;
  background-color: deepskyblue;
`;

const CoverText = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: #fcfcfc;
`;

const Profile = props => {
  const { auth, user, navigation, getUser, requestLogout, clearCart } = props;
  const [modalVisible, setModalVisible] = useState(false);
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

  const setLogout = () => {
    requestLogout();
    clearCart();
    navigation.navigate('Auth');
  };

  const openModal = data => {
    setModalVisible(true);
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <View>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <CoverImage>
          <View
            style={{
              height: 150,
              width: 150,
              borderRadius: 180,
              overflow: 'hidden',
              borderWidth: 4,
              borderColor: 'white',
              elevation: 3,
              marginVertical: 8
            }}>
            <Image
              source={{
                uri:
                  user.data.image !== API_HOST + '/'
                    ? user.data.image
                    : API_HOST + '/public/images/image-placeholder.jpg'
              }}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <CoverText>{user.data.name}</CoverText>
          </View>
        </CoverImage>
        <ListItem />
        <ListItem>
          <ListPoint>
            <ListIcon name="md-person" />
          </ListPoint>
          <ListLabel>
            <ListText>{user.data.username}</ListText>
          </ListLabel>
        </ListItem>
        <ListItem>
          <ListPoint>
            <ListIcon name="md-mail" />
          </ListPoint>
          <ListLabel>
            <ListText>{user.data.email}</ListText>
          </ListLabel>
        </ListItem>
        <ListItem />
        <ListItem>
          <ListPoint>
            <ListIcon name="md-key" />
          </ListPoint>
          <ListLabel>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}>
              <ListText>Change Password</ListText>
            </TouchableOpacity>
          </ListLabel>
        </ListItem>
        <ListItem>
          <ListPoint>
            <ListIcon name="md-exit" />
          </ListPoint>
          <ListLabel>
            <TouchableOpacity onPress={() => openModal()}>
              <ListText>Logout</ListText>
            </TouchableOpacity>
          </ListLabel>
        </ListItem>
      </ScrollView>
      <ModalLogout
        modalVisible={modalVisible}
        handleClose={() => setModalVisible(false)}
        handleConfirmation={() => setLogout()}
      />
    </View>
  );
};

Profile.navigationOptions = screenProps => ({
  header: () => <NavigationProfile {...screenProps} />
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  getUser: config => dispatch(actionGetUser(config)),
  requestLogout: () => dispatch({ type: 'LOGOUT_REQUEST' }),
  clearCart: () => dispatch({ type: 'CLEAR_CART' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

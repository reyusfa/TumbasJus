import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { API_HOST } from 'react-native-dotenv';

import axios from 'axios';
import qs from 'qs';

import {
  View,
  Image,
  ScrollView,
  Text,
  Button,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-ionicons';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import NavigationChangePassword from '../../Public/components/NavigationChangePassword';

import styled from 'styled-components';

import { useInputText } from '../../Public/helper';

import { actionGetUser, actionPutUser } from '../../Public/redux/actions/user';

const RedText = styled.Text`
  color: #ff4000;
`;

const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 8px;
`;

const ListLabel = styled.View`
  padding-horizontal: 16px;
  flex: 1;
`;

const ListInputLabel = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
  padding-horizontal: 8px;
`;

const ListInput = styled.TextInput`
  border-width: 1px;
  font-size: 16px;
  padding-horizontal: 10px;
  padding-vertical: 4px;
  border-radius: 4px;
  border-color: #cccccc;
`;

const CardButtonBig = styled.View`
  align-content: stretch;
  border-radius: 3px;
  elevation: 1;
  flex-direction: row;
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

const PasswordSchema = yup.object().shape({
  oldPassword: yup.string().required(),
  newPassword: yup.string().required(),
  confirmNewPassword: yup
    .string()
    .required()
    .test('new-password-match', 'New Password does not match.', function(
      value
    ) {
      return this.parent.newPassword === value;
    })
});

const Profile = props => {
  const { auth, user, navigation, getUser, requestLogout, clearCart } = props;
  const {
    register,
    getValues,
    watch,
    setValue,
    handleSubmit,
    errors,
    setError
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: PasswordSchema
  });

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

  const onSubmit = async () => {
    const { username } = user.data;
    const { oldPassword, newPassword, confirmNewPassword } = getValues();
    const bodyCheck = qs.stringify({
      username,
      password: oldPassword
    });
    console.log(bodyCheck);
    await axios
      .post(`${API_HOST}/login`, bodyCheck)
      .then(async ({ data }) => {
        console.log(data.data);
        if (newPassword === confirmNewPassword) {
          const body = { password: newPassword };
          const config = { ...headers };
          await axios
            .put(`${API_HOST}/users/${data.data.id}`, body, config)
            .then(item => {
              ToastAndroid.showWithGravityAndOffset(
                'Your password has been changed.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
              setLogout();
            })
            .catch(console.log);
        }
      })
      .catch(({ response }) => {
        setError(
          'oldPassword',
          'old-password-match',
          response.data.error.message
        );
      });
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <ListItem />
      <ListItem>
        <ListLabel>
          <ListInputLabel>Current Password</ListInputLabel>
          <ListInput
            ref={register({ name: 'oldPassword' })}
            onChangeText={text => setValue('oldPassword', text, true)}
            placeholder="*********"
            secureTextEntry
          />
        </ListLabel>
      </ListItem>
      <ListLabel>
        {errors.oldPassword && errors.oldPassword.type === 'required' && (
          <RedText>Old Password is required.</RedText>
        )}
        {errors.oldPassword &&
          errors.oldPassword.type === 'old-password-match' && (
            <RedText>Old Password does not match.</RedText>
          )}
      </ListLabel>
      <ListItem>
        <ListLabel>
          <ListInputLabel>New Password</ListInputLabel>
          <ListInput
            ref={register({ name: 'newPassword' })}
            onChangeText={text => setValue('newPassword', text, true)}
            placeholder="*********"
            secureTextEntry
          />
        </ListLabel>
      </ListItem>
      <ListLabel>
        {errors.newPassword && errors.newPassword.type === 'required' && (
          <RedText>New Password is required.</RedText>
        )}
      </ListLabel>
      <ListItem>
        <ListLabel>
          <ListInputLabel>Confirm New Password</ListInputLabel>
          <ListInput
            ref={register({ name: 'confirmNewPassword' })}
            onChangeText={text => setValue('confirmNewPassword', text, true)}
            placeholder="*********"
            secureTextEntry
          />
        </ListLabel>
      </ListItem>
      <ListLabel>
        {errors.confirmNewPassword &&
          errors.confirmNewPassword.type === 'required' && (
            <RedText>Confirm New Password is required.</RedText>
          )}
        {errors.confirmNewPassword &&
          errors.confirmNewPassword.type === 'new-password-match' && (
            <RedText>New Password does not match.</RedText>
          )}
      </ListLabel>
      <ListItem />
      <ListItem />
      <ListLabel>
        <CardButtonBig>
          <CardButtonBigItem
            activeOpacity={0.5}
            onPress={handleSubmit(onSubmit)}>
            <CardButtonBigText>Submit</CardButtonBigText>
          </CardButtonBigItem>
        </CardButtonBig>
      </ListLabel>
    </ScrollView>
  );
};

Profile.navigationOptions = screenProps => ({
  header: () => <NavigationChangePassword {...screenProps} />
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

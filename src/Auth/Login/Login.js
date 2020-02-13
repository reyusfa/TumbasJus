import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Input, Item, Form, Label, Text } from 'native-base';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

import styled from 'styled-components';

const RedText = styled.Text`
  color: #ff4000;
`;

const ListItem = styled.View`
  padding-horizontal: 16px;
  padding-bottom: 16px;
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

const LoginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

const Login = props => {
  const { auth, setDataLogin, navigation } = props;
  console.log(props);

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
      username: '',
      password: ''
    },
    validationSchema: LoginSchema
  });

  const onSubmit = async () => {
    const { username, password } = getValues();
    const body = qs.stringify({
      username,
      password
    });
    await axios
      .post(`${API_HOST}/login`, body)
      .then(({ data }) => {
        setDataLogin(data.data);
        navigation.navigate('App');
      })
      .catch(({ response }) => {
        setError('login', 'notMatch', response.data.error.message);
      });
  };

  return (
    <ScrollView style={{ backgroundColor: 'deepskyblue' }}>
      <View style={{ flex: 1, padding: 16, marginTop: 30 }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 16,
            elevation: 10,
            borderRadius: 8
          }}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../Public/images/tumbas-jus.png')}
              style={{ flex: 1 }}
            />
            <Text
              style={{
                fontFamily: 'GreatVibes-Regular',
                fontSize: 60,
                textAlign: 'center'
              }}>
              Tumbas Jus
            </Text>
          </View>
          <ListItem>
            {errors.login && errors.login.type === 'notMatch' && (
              <RedText>{errors.login.message}</RedText>
            )}
          </ListItem>
          <ListItem>
            <Text>Username</Text>
            <ListInput
              placeholder="Username"
              ref={register({ name: 'username' })}
              onChangeText={text => setValue('username', text, true)}
            />
            {errors.username && errors.username.type === 'required' && (
              <RedText>Username is required.</RedText>
            )}
          </ListItem>
          <ListItem>
            <Text>Password</Text>
            <ListInput
              secureTextEntry
              placeholder="Password"
              ref={register({ name: 'password' })}
              onChangeText={text => setValue('password', text, true)}
            />
            {errors.password && errors.password.type === 'required' && (
              <RedText>Password is required.</RedText>
            )}
          </ListItem>
          <View style={{ paddingHorizontal: 16 }}>
            <CardButtonBig>
              <CardButtonBigItem
                activeOpacity={0.5}
                onPress={handleSubmit(onSubmit)}>
                <CardButtonBigText>Login</CardButtonBigText>
              </CardButtonBigItem>
            </CardButtonBig>
          </View>
          <ListItem />
          <ListItem>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text>Create new account</Text>
            </TouchableOpacity>
          </ListItem>
        </View>
      </View>
    </ScrollView>
  );
};

Login.navigationOptions = screenProps => ({
  headerShown: false
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  setDataLogin: payload =>
    dispatch({
      type: 'LOGIN_REQUEST',
      payload
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

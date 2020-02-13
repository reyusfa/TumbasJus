import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
  Button,
  Alert,
  ToastAndroid,
  ScrollView,
  TouchableOpacity
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

const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(5),
  name: yup
    .string()
    .required()
    .min(5),
  email: yup
    .string()
    .required()
    .email(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .test('password-match', 'Password does not match.', function(value) {
      return this.parent.password === value;
    })
});

const Register = props => {
  const { auth, setDataLogin, navigation } = props;

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
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: RegisterSchema
  });

  const onSubmit = async () => {
    const { username, password, name, email } = getValues();
    const body = qs.stringify({
      username,
      password,
      name,
      email,
      role_id: 3
    });
    await axios
      .post(`${API_HOST}/register`, body)
      .then(({ data }) => {
        ToastAndroid.showWithGravityAndOffset(
          'Registration success.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        navigation.navigate('Login');
      })
      .catch(({ response }) => {
        if (response) {
          setError('register', 'register-error', response.data.error.message);
        }
      });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <ScrollView style={{ backgroundColor: 'deepskyblue' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 16,
            elevation: 10,
            borderRadius: 8
          }}>
          <ListItem>
            {errors.register && errors.register.type === 'register-error' && (
              <RedText>{errors.register.message}</RedText>
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
            {errors.username && errors.username.type === 'min' && (
              <RedText>Username must be at least 5 characters.</RedText>
            )}
          </ListItem>
          <ListItem>
            <Text>Name</Text>
            <ListInput
              placeholder="Name"
              ref={register({ name: 'name' })}
              onChangeText={text => setValue('name', text, true)}
            />
            {errors.name && errors.name.type === 'required' && (
              <RedText>Name is required.</RedText>
            )}
            {errors.name && errors.name.type === 'min' && (
              <RedText>Name must be at least 5 characters.</RedText>
            )}
          </ListItem>
          <ListItem>
            <Text>Email</Text>
            <ListInput
              placeholder="Email"
              ref={register({ name: 'email' })}
              onChangeText={text => setValue('email', text, true)}
            />
            {errors.email && errors.email.type === 'required' && (
              <RedText>Email is required.</RedText>
            )}
            {errors.email && errors.email.type === 'email' && (
              <RedText>Email must be a valid email.</RedText>
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
          <ListItem>
            <Text>Confirm Password</Text>
            <ListInput
              secureTextEntry
              placeholder="Confirm Password"
              ref={register({ name: 'confirmPassword' })}
              onChangeText={text => setValue('confirmPassword', text, true)}
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'required' && (
                <RedText>Confirm Password is required.</RedText>
              )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'password-match' && (
                <RedText>Password does not match.</RedText>
              )}
          </ListItem>
          <View style={{ paddingHorizontal: 16 }}>
            <CardButtonBig>
              <CardButtonBigItem
                activeOpacity={0.5}
                onPress={handleSubmit(onSubmit)}>
                <CardButtonBigText>Register</CardButtonBigText>
              </CardButtonBigItem>
            </CardButtonBig>
          </View>
          <ListItem />
          <ListItem>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text>Sign in instead</Text>
            </TouchableOpacity>
          </ListItem>
        </View>
      </View>
    </ScrollView>
  );
};

Register.navigationOptions = screenProps => ({
  headerShown: false
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

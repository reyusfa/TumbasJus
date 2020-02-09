import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button, Alert } from 'react-native';
import { Input, Item, Form, Label, Text } from 'native-base';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import axios from 'axios';
import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(5),
  password: yup.string().required()
});

const Login = props => {
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

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <View>
      {errors.login && errors.login.type === 'notMatch' && (
        <Text>{errors.login.message}</Text>
      )}
      <TextInput
        ref={register({ name: 'username' })}
        onChangeText={text => setValue('username', text, true)}
      />
      {errors.username && errors.username.type === 'required' && (
        <Text>Username is required.</Text>
      )}
      {errors.username && errors.username.type === 'min' && (
        <Text>Username must be at least 5 characters.</Text>
      )}

      <TextInput
        ref={register({ name: 'password' })}
        onChangeText={text => setValue('password', text, true)}
      />
      {errors.password && errors.password.type === 'required' && (
        <Text>Password is required.</Text>
      )}

      <Button onPress={handleSubmit(onSubmit)} title="Login" />
    </View>
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

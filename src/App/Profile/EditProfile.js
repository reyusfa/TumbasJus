import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { API_HOST } from 'react-native-dotenv';

import ImagePicker from 'react-native-image-picker';

import {
  View,
  Image,
  ScrollView,
  Button,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-ionicons';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import NavigationEditProfile from '../../Public/components/NavigationEditProfile';

import styled from 'styled-components';

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

const CoverImage = styled.View`
  align-items: center;
  padding-vertical: 16px;
  border-bottom-width: 2px;
  border-color: #eeeeee;
  background-color: deepskyblue;
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

const UserSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(4),
  username: yup
    .string()
    .required()
    .min(4),
  email: yup
    .string()
    .required()
    .email()
});

const Profile = props => {
  const { auth, user, navigation, getUser, putUser } = props;
  const [imageProfile, setImageProfile] = useState(null);
  const [imageData, setImageData] = useState({});

  const options = {
    title: 'Select Profile Image',
    quality: 0.8,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  const uploadImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        setImageProfile(source);
        setImageData({
          uri: response.uri,
          type: response.type,
          name: response.fileName
        });
      }
    });
  };

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
    await getUser(config).catch(console.log);
  };

  useEffect(() => {
    setUser();
  }, []);

  const onSubmit = async () => {
    const { name, username, email } = getValues();
    const body = new FormData();
    body.append('name', name);
    body.append('username', username);
    body.append('email', email);
    if (imageData && imageProfile) {
      body.append('image', imageData);
    }
    const payload = {
      ...headers,
      id: auth.data.id,
      body
    };
    await putUser(payload).then(async () => {
      await setUser().then(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Your profile has been updated.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        navigation.navigate('Profile');
      });
    });
    setUser();
  };

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
      name: user.data.name,
      username: user.data.username,
      email: user.data.email
    },
    validationSchema: UserSchema
  });

  return (
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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={uploadImage}
            style={{ flex: 1 }}>
            <Icon
              style={{
                position: 'absolute',
                fontSize: 45,
                color: 'rgba(200,200,200,0.8)',
                top: 48,
                left: 52,
                zIndex: 10
              }}
              name="md-camera"
            />
            <Image
              source={
                imageProfile
                  ? imageProfile
                  : {
                      uri:
                        user.data.image !== API_HOST + '/'
                          ? user.data.image
                          : API_HOST + '/public/images/image-placeholder.jpg'
                    }
              }
              style={{ flex: 1 }}
            />
          </TouchableOpacity>
        </View>
      </CoverImage>
      <ListItem />
      <ListItem>
        <ListLabel>
          <ListInputLabel>Name</ListInputLabel>
          <ListInput
            defaultValue={user.data.name}
            ref={register({ name: 'name' })}
            onChangeText={text => setValue('name', text, true)}
          />
        </ListLabel>
      </ListItem>
      <ListLabel>
        {errors.name && errors.name.type === 'required' && (
          <RedText>Name is required.</RedText>
        )}
        {errors.name && errors.name.type === 'min' && (
          <RedText>Name must be at least 4 characters.</RedText>
        )}
      </ListLabel>
      <ListItem>
        <ListLabel>
          <ListInputLabel>Username</ListInputLabel>
          <ListInput
            defaultValue={user.data.username}
            ref={register({ name: 'username' })}
            onChangeText={text => setValue('username', text, true)}
          />
        </ListLabel>
      </ListItem>
      <ListLabel>
        {errors.username && errors.username.type === 'required' && (
          <RedText>Username is required.</RedText>
        )}
        {errors.username && errors.username.type === 'min' && (
          <RedText>Username must be at least 4 characters.</RedText>
        )}
      </ListLabel>
      <ListItem>
        <ListLabel>
          <ListInputLabel>Email</ListInputLabel>
          <ListInput
            defaultValue={user.data.email}
            ref={register({ name: 'email' })}
            onChangeText={text => setValue('email', text, true)}
          />
        </ListLabel>
      </ListItem>
      <ListLabel>
        {errors.email && errors.email.type === 'required' && (
          <RedText>Email is required.</RedText>
        )}
        {errors.email && errors.email.type === 'email' && (
          <RedText>Email must be a valid email.</RedText>
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
  header: () => <NavigationEditProfile {...screenProps} />
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  getUser: config => dispatch(actionGetUser(config)),
  putUser: payload => dispatch(actionPutUser(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

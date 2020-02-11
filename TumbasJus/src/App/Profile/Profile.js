import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Text, View, Image, FlatList, ScrollView } from 'react-native';

const NavigationProfile = screenProps => {
  return (
    <View>
      <Text>Navigation Profile</Text>
    </View>
  );
};

const Profile = props => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

Profile.navigationOptions = screenProps => ({
  header: () => <NavigationProfile {...screenProps} />
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
)(Profile);

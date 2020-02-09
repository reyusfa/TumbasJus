import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Button, Text, View, FlatList, TextInput } from 'react-native';
import { Badge, Icon, Text as NText } from 'native-base';
import CardProduct from '../Public/components/CardProduct';

import { useInputText } from '../Public/helper';
import { getProducts } from './action';
import {
  actionAddItemToCart,
  actionRemoveItemFromCart,
  actionAddQuantityItem,
  actionReduceQuantityItem
} from './Order/action';

import { useHeaderHeight } from 'react-navigation-stack';

const Home = props => {
  const {
    auth,
    products,
    getDataProducts,
    requestLogout,
    navigation,
    addItemToCart,
    removeItemFromCart,
    addQuantityItem,
    reduceQuantityItem,
    orders
  } = props;

  const filterName = navigation.getParam('filterName');

  const config = {
    headers: {
      authorization: auth.data.token
    },
    params: {
      filter: {
        name: filterName
      }
    }
  };

  const setDataProducts = async () => {
    await getDataProducts(config);
  };

  const logout = () => {
    requestLogout();
    navigation.navigate('Auth');
  };

  console.log(useHeaderHeight());

  useEffect(() => {
    navigation.setParams({
      logout: () => logout()
    });
  }, []);

  useEffect(() => {
    setDataProducts();
  }, [filterName]);

  useEffect(() => {
    navigation.setParams({
      orderCount: orders.cart.length
    });
  }, [
    orders,
    addItemToCart,
    removeItemFromCart,
    addQuantityItem,
    reduceQuantityItem
  ]);

  return (
    <View style={{ paddingHorizontal: 5 }}>
      <FlatList
        numColumns="2"
        keyExtractor={(item, index) => index.toString()}
        data={products.data}
        renderItem={({ item, index }) => (
          <CardProduct
            dataItem={item}
            dataOrder={orders}
            onAddItem={() => {
              addItemToCart(item);
            }}
            onRemoveItem={() => {
              removeItemFromCart(item);
            }}
            onAddQuantity={() => {
              addQuantityItem(item);
            }}
            onReduceQuantity={() => {
              reduceQuantityItem(item);
            }}
          />
        )}
      />
    </View>
  );
};

const OrderNavigation = screenProps => {
  const {
    value: filterName,
    bindText: bindFilterName,
    reset: resetFilterName,
    setValue: setFilterName
  } = useInputText('');

  useEffect(() => {
    screenProps.navigation.setParams({
      filterName: filterName
    });
  }, [filterName]);

  return (
    <Fragment>
      <View
        style={{
          borderWidth: 1,
          height: 51,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch'
        }}>
        <View style={{ borderWidth: 1, flex: 0.15 }}>
          <Text style={{ borderWidth: 1 }}>User</Text>
        </View>
        <View style={{ borderWidth: 1, flex: 0.7 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              margin: 5,
              paddingHorizontal: 10
            }}
            {...bindFilterName}
          />
        </View>
        <View style={{ borderWidth: 1, flex: 0.15 }}>
          {screenProps.navigation.getParam('orderCount') > 0 ? (
            <Badge info>
              <NText>{screenProps.navigation.getParam('orderCount')}</NText>
            </Badge>
          ) : null}
          <Text style={{ borderWidth: 1 }}>
            {screenProps.navigation.getParam('orderCount')}
          </Text>
        </View>
      </View>
    </Fragment>
  );
};

Home.navigationOptions = screenProps => ({
  header: () => <OrderNavigation {...screenProps} />
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    orders: state.orders
  };
};

const mapDispatchToProps = dispatch => ({
  getDataProducts: config => dispatch(getProducts(config)),
  requestLogout: () =>
    dispatch({
      type: 'LOGOUT_REQUEST'
    }),
  addItemToCart: data => dispatch(actionAddItemToCart(data)),
  removeItemFromCart: data => dispatch(actionRemoveItemFromCart(data)),
  addQuantityItem: data => dispatch(actionAddQuantityItem(data)),
  reduceQuantityItem: data => dispatch(actionReduceQuantityItem(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

// <Button
//   style={{ borderWidth: 1, flex: 1 }}
//   title="Logout"
//   onPress={screenProps.navigation.getParam('logout')}
// />

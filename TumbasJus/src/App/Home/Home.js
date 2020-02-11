import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Text, View, FlatList } from 'react-native';
import Icon from 'react-native-ionicons';

import CardProduct from '../../Public/components/CardProduct';
import NavigationHome from '../../Public/components/NavigationHome';
import ModalDetailItem from '../../Public/components/ModalDetailItem';

import { useInputText } from '../../Public/helper';
import { getProducts } from '../../Public/redux/actions/products';
import {
  actionAddItemToCart,
  actionRemoveItemFromCart,
  actionAddQuantityItem,
  actionReduceQuantityItem
} from '../../Public/redux/actions/orders';

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

  const [limit, setLimit] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemData, setItemData] = useState({});

  const countProducts = products.data.length;

  const filterName = navigation.getParam('filterName');

  const config = {
    headers: {
      authorization: auth.data.token
    },
    params: {
      filter: {
        name: filterName
      },
      limit: limit
    }
  };

  const setDataProducts = async () => {
    await getDataProducts(config);
  };

  const logout = () => {
    requestLogout();
    navigation.navigate('Auth');
  };

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

  useEffect(() => {
    setLimit(limit + 4);
  }, [countProducts]);

  const _handleLoadMore = () => {
    setDataProducts();
  };

  const openModal = data => {
    setModalVisible(true);
    setItemData(data);
  };

  return (
    <View>
      <FlatList
        style={{ paddingHorizontal: 5 }}
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
            onSelectItem={() => {
              openModal(item);
            }}
          />
        )}
        onEndReached={_handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={4}
      />
      <ModalDetailItem
        modalVisible={modalVisible}
        handleClose={() => setModalVisible(false)}
        data={itemData}
      />
    </View>
  );
};

Home.navigationOptions = screenProps => ({
  header: () => <NavigationHome {...screenProps} />
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

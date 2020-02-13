import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { View, FlatList } from 'react-native';

import CardProduct from '../../Public/components/CardProduct';
import NavigationHome from '../../Public/components/NavigationHome';

import {
  actionGetProducts,
  actionGetMoreProducts
} from '../../Public/redux/actions/products';
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
    getProducts,
    getMoreProducts,
    navigation,
    addItemToCart,
    removeItemFromCart,
    addQuantityItem,
    reduceQuantityItem,
    orders
  } = props;

  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const totalPages = products.pagination.total_page;
  const filterName = navigation.getParam('filterName');
  const sortBy = navigation.getParam('sortBy');
  const filterCategory = navigation.getParam('filterCategory');

  const headers = {
    headers: {
      authorization: auth.data.token
    }
  };

  const setInitProducts = async params => {
    const config = {
      ...headers,
      params: {
        filter: {
          ...(filterName ? { name: filterName } : null)
        },
        limit: limit
      }
    };
    await getProducts(config);
  };

  const setFilteredProducts = async params => {
    setPage(1);
    const config = {
      ...headers,
      params: {
        filter: {
          ...(filterName ? { name: filterName } : null),
          ...(filterCategory ? { category_id: filterCategory } : null)
        },
        ...(sortBy ? { sort: sortBy } : null)
      }
    };
    await getProducts(config);
  };

  const setMoreProducts = async params => {
    const config = {
      ...headers,
      params: {
        filter: {
          ...(filterName ? { name: filterName } : null)
        },
        limit: limit,
        page: page
      }
    };
    await getMoreProducts(config);
  };

  useEffect(() => {
    setInitProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts();
  }, [filterName, sortBy, filterCategory]);

  useEffect(() => {
    setMoreProducts();
  }, [page]);

  const _handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
      console.log(page);
    }
  };

  const openModal = data => {
    setModalVisible(true);
    setDataModal(data);
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
        onEndReachedThreshold={0.1}
        initialNumToRender={4}
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
  getProducts: config => dispatch(actionGetProducts(config)),
  getMoreProducts: config => dispatch(actionGetMoreProducts(config)),
  addItemToCart: data => dispatch(actionAddItemToCart(data)),
  removeItemFromCart: data => dispatch(actionRemoveItemFromCart(data)),
  addQuantityItem: data => dispatch(actionAddQuantityItem(data)),
  reduceQuantityItem: data => dispatch(actionReduceQuantityItem(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

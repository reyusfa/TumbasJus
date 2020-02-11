import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { API_HOST } from 'react-native-dotenv';

import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-ionicons';

import {
  actionRemoveItemFromCart,
  actionAddQuantityItem,
  actionReduceQuantityItem
} from '../../Public/redux/actions/orders';

const CartLayout = styled.View`
  flex-direction: row;
  padding: 8px;
  flex: 1;
`;

const CardButtonGroup = styled.View`
  flex-direction: row;
  align-content: stretch;
  border-radius: 3px;
  margin: 4px;
  overflow: hidden;
  elevation: 1;
  background-color: deepskyblue;
`;

const CardButtonItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 3px 8px;
`;

const CardButtonText = styled.Text`
  color: #fcfcfc;
  font-size: 15px;
  font-weight: bold;
  flex-direction: row;
  align-items: center;
  padding: 3px 8px;
`;

const CardButtonIcon = styled(Icon)`
  color: #fcfcfc;
  font-size: 20px;
`;

const CardButtonBig = styled.View`
  flex-direction: row;
  align-content: stretch;
  border-radius: 3px;
  margin: 4px;
  overflow: hidden;
  elevation: 1;
`;

const CardButtonBigItem = styled.TouchableOpacity`
  background-color: deepskyblue;
  flex-direction: row;
  justify-content: center;
  flex: 1
  padding: 8px;
`;

const CardButtonBigText = styled.Text`
  color: #fcfcfc;
  font-size: 16px;
  font-weight: bold;
  padding: 2px 8px;
`;

const NavigationOrder = screenProps => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        height: 51,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fcfcfc'
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.15
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => screenProps.navigation.goBack(null)}>
          <View>
            <Icon name="md-arrow-back" style={{ color: '#333333' }} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{ flex: 0.7, justifyContent: 'center', alignItems: 'stretch' }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333333' }}>
            Checkout Order
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.15
        }}
      />
    </View>
  );
};

const Order = props => {
  const {
    orders,
    removeItemFromCart,
    addQuantityItem,
    reduceQuantityItem
  } = props;

  const handleCheckout = async data => {
    const body = data;
    await axios.post(`${API_HOST}/orders`, body);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingHorizontal: 8 }}>
          {orders.order.map(item => {
            return (
              <CartLayout key={item.product_id}>
                <View
                  style={{
                    borderRadius: 8,
                    overflow: 'hidden',
                    elevation: 2
                  }}>
                  <Image
                    style={{ height: 115, width: 130 }}
                    source={{ uri: item.image }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingLeft: 8
                  }}>
                  <View
                    style={{
                      fontSize: 16,
                      paddingHorizontal: 8,
                      paddingBottom: 8
                    }}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#333333'
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingBottom: 8
                    }}>
                    <NumberFormat
                      decimalSeparator=","
                      thousandSeparator="."
                      prefix={'Rp '}
                      displayType={'text'}
                      value={item.price}
                      renderText={value => (
                        <Text
                          style={{ fontWeight: 'bold', color: 'deepskyblue' }}>
                          {value}
                        </Text>
                      )}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                    <CardButtonGroup>
                      <CardButtonItem
                        onPress={() =>
                          removeItemFromCart({ id: item.product_id, ...item })
                        }>
                        <CardButtonIcon name="md-close" />
                      </CardButtonItem>
                    </CardButtonGroup>
                    <CardButtonGroup>
                      <CardButtonItem
                        onPress={() =>
                          reduceQuantityItem({ id: item.product_id, ...item })
                        }>
                        <CardButtonIcon name="md-remove" />
                      </CardButtonItem>
                      <CardButtonText>{item.quantity}</CardButtonText>

                      <CardButtonItem
                        onPress={() =>
                          addQuantityItem({ id: item.product_id, ...item })
                        }>
                        <CardButtonIcon name="md-add" />
                      </CardButtonItem>
                    </CardButtonGroup>
                  </View>
                </View>
              </CartLayout>
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#ececec',
          height: 100,
          paddingVertical: 4,
          paddingHorizontal: 8,
          backgroundColor: '#fcfcfc'
        }}>
        <NumberFormat
          decimalSeparator=","
          thousandSeparator="."
          prefix={'Rp '}
          displayType={'text'}
          value={orders.totalOrder}
          renderText={value => (
            <Text
              style={{
                fontWeight: 'bold',
                color: '#333333',
                fontSize: 16,
                margin: 4
              }}>
              {value}
            </Text>
          )}
        />
        <CardButtonBig>
          <CardButtonBigItem activeOpacity={0.5}>
            <CardButtonBigText>Order</CardButtonBigText>
          </CardButtonBigItem>
        </CardButtonBig>
      </View>
    </View>
  );
};

Order.navigationOptions = screenProps => ({
  header: () => <NavigationOrder {...screenProps} />
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    orders: state.orders
  };
};

const mapDispatchToProps = dispatch => ({
  removeItemFromCart: data => dispatch(actionRemoveItemFromCart(data)),
  addQuantityItem: data => dispatch(actionAddQuantityItem(data)),
  reduceQuantityItem: data => dispatch(actionReduceQuantityItem(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);

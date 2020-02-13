import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { API_HOST } from 'react-native-dotenv';

import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-ionicons';

import NavigationOrder from '../../Public/components/NavigationOrder';
import ModalCheckout from '../../Public/components/ModalCheckout';

import {
  actionRemoveItemFromCart,
  actionAddQuantityItem,
  actionReduceQuantityItem,
  actionClearCart
} from '../../Public/redux/actions/orders';

const CartLayout = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 8px;
`;

const CardButtonGroup = styled.View`
  align-content: stretch;
  background-color: deepskyblue;
  border-radius: 3px;
  elevation: 1;
  flex-direction: row;
  margin: 4px;
  overflow: hidden;
`;

const CardButtonItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 3px 8px;
`;

const CardButtonText = styled.Text`
  align-items: center;
  color: #fcfcfc;
  flex-direction: row;
  font-size: 15px;
  font-weight: bold;
  padding: 3px 8px;
`;

const CardButtonIcon = styled(Icon)`
  color: #fcfcfc;
  font-size: 20px;
`;

const CardButtonBig = styled.View`
  align-content: stretch;
  border-radius: 3px;
  elevation: 1;
  flex-direction: row;
  margin: 4px;
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

const Order = props => {
  const {
    auth,
    orders,
    removeItemFromCart,
    addQuantityItem,
    reduceQuantityItem,
    clearCart
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState([]);

  const headers = {
    headers: {
      authorization: auth.data.token
    }
  };

  const handleCheckout = async () => {
    const body = {
      user_id: auth.data.id,
      orders: orders.order.map(item => {
        return {
          product_id: item.product_id,
          quantity: item.quantity
        };
      })
    };
    await axios.post(`${API_HOST}/orders`, body, headers).then(({ data }) => {
      setDataModal(data.data);
      setModalVisible(true);
      clearCart();
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {orders.order.length > 0 ? (
        <Fragment>
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
                              style={{
                                fontWeight: 'bold',
                                color: 'deepskyblue'
                              }}>
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
                              removeItemFromCart({
                                id: item.product_id,
                                ...item
                              })
                            }>
                            <CardButtonIcon name="md-close" />
                          </CardButtonItem>
                        </CardButtonGroup>
                        <CardButtonGroup>
                          <CardButtonItem
                            onPress={() =>
                              reduceQuantityItem({
                                id: item.product_id,
                                ...item
                              })
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
              <CardButtonBigItem
                activeOpacity={0.5}
                onPress={() => handleCheckout()}>
                <CardButtonBigText>Checkout</CardButtonBigText>
              </CardButtonBigItem>
            </CardButtonBig>
          </View>
        </Fragment>
      ) : (
        <View style={{ alignItems: 'center', margin: 16 }}>
          <Icon
            name="ios-analytics"
            style={{ fontSize: 250, color: '#dddddd' }}
          />
          <Text style={{ fontSize: 25, color: '#666666', fontWeight: 'bold' }}>
            Cart is empty!
          </Text>
        </View>
      )}
      <ModalCheckout
        {...props}
        modalVisible={modalVisible}
        handleClose={() => {
          setModalVisible(false);
          setDataModal([]);
        }}
        dataItem={dataModal}
      />
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
  reduceQuantityItem: data => dispatch(actionReduceQuantityItem(data)),
  clearCart: data => dispatch(actionClearCart(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);

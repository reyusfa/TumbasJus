import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

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

const ModalCheckout = props => {
  console.log(props);
  const { dataItem, modalVisible, handleClose, navigation } = props;
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          handleClose();
        }}>
        <TouchableOpacity
          style={{ flex: 0.4, backgroundColor: 'black', opacity: 0.7 }}
          activeOpacity={0.7}
          onPress={() => {
            handleClose();
          }}
        />
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#fcfcfc',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              overflow: 'hidden'
            }}>
            <View
              style={{
                borderWidth: 1,
                flex: 1,
                paddingHorizontal: 8,
                paddingVertical: 16,
                justifyContent: 'flex-end'
              }}>
              <View>
                <Text
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#bbbbbb',
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    paddingBottom: 8
                  }}>
                  Order Success!
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingHorizontal: 8,
                    marginTop: 8
                  }}>
                  <Icon name="receipt" style={{ fontSize: 20 }} />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16
                    }}>
                    {' '}
                    {dataItem.reference}
                  </Text>
                </View>
              </View>
              <ScrollView style={{ margin: 4 }}>
                {(dataItem.orders || []).map(item => {
                  return (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        padding: 4
                      }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                          {item.product_name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            paddingVertical: 4
                          }}>
                          <NumberFormat
                            decimalSeparator=","
                            thousandSeparator="."
                            prefix={'Rp '}
                            displayType={'text'}
                            value={item.price}
                            renderText={value => (
                              <Text style={{ fontSize: 16 }}>{value}</Text>
                            )}
                          />
                          <Text style={{ fontSize: 16 }}>
                            {' '}
                            x {item.quantity}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.5,
                          justifyContent: 'flex-end'
                        }}>
                        <NumberFormat
                          decimalSeparator=","
                          thousandSeparator="."
                          prefix={'Rp '}
                          displayType={'text'}
                          value={item.subtotal}
                          renderText={value => (
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'right'
                              }}>
                              {value}
                            </Text>
                          )}
                        />
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 8,
                  borderTopWidth: 1,
                  borderColor: '#bbbbbb'
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    flex: 1
                  }}>
                  Total:
                </Text>
                <NumberFormat
                  decimalSeparator=","
                  thousandSeparator="."
                  prefix={'Rp '}
                  displayType={'text'}
                  value={dataItem.total}
                  renderText={value => (
                    <Text
                      style={{
                        fontSize: 24,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        flex: 1
                      }}>
                      {value}
                    </Text>
                  )}
                />
              </View>
              <View>
                <CardButtonBig>
                  <CardButtonBigItem
                    activeOpacity={0.5}
                    onPress={() => {
                      handleClose();
                      navigation.navigate('Home');
                    }}>
                    <CardButtonBigText>Back to Home</CardButtonBigText>
                  </CardButtonBigItem>
                </CardButtonBig>
                <CardButtonBig>
                  <CardButtonBigItem
                    activeOpacity={0.5}
                    onPress={() => {
                      handleClose();
                      navigation.navigate('OrderHistory');
                    }}>
                    <CardButtonBigText>Order History</CardButtonBigText>
                  </CardButtonBigItem>
                </CardButtonBig>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalCheckout;

import React, { useState } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { Icon } from 'native-base';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const CardTouchable = styled.View`
  background-color: white;
  border-radius: 6px;
  elevation: 5;
  margin: 0px 8px;
  overflow: hidden;
`;

const CardView = styled.View`
  margin: 0;
  padding: 0;
`;

const CardItem = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  padding: 0px 6px 6px 6px;
`;

const CardItemRight = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin: 0;
  padding: 0px 6px 6px 6px;
`;

const CardButton = styled.TouchableOpacity`
  background-color: skyblue;
  border-radius: 3px;
  elevation: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 2px;
  overflow: hidden;
  padding: 2px 7px;
`;

const CardButtonText = styled.Text`
  color: white;
  font-family: monospace;
  font-size: 15px;
  font-weight: bold;
`;

const CardButtonIcon = styled(Icon)`
  color: white;
  font-size: 13px;
`;

const CardImage = styled(Image)`
  height: 150px;
  margin: 0;
  padding: 0;
`;

const CardProduct = props => {
  const {
    dataItem,
    dataOrder,
    onAddItem,
    onRemoveItem,
    onAddQuantity,
    onReduceQuantity
  } = props;
  const order = dataOrder.order.filter(item => {
    return item.product_id === dataItem.id;
  })[0];
  const quantity = order && order.quantity ? order.quantity : 0;
  return (
    <View
      style={{
        alignContent: 'stretch',
        flex: 0.5
      }}>
      <CardTouchable>
        <CardView>
          <CardImage source={{ uri: dataItem.image }} />
          <CardItem>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {dataItem.name}
            </Text>
          </CardItem>
          <CardItem>
            <NumberFormat
              decimalSeparator=","
              thousandSeparator="."
              prefix={'Rp '}
              displayType={'text'}
              value={dataItem.price}
              renderText={value => (
                <Text style={{ fontWeight: 'bold', color: 'deepskyblue' }}>
                  {value}
                </Text>
              )}
            />
          </CardItem>
          {quantity < 1 ? (
            <CardItemRight>
              <CardButton onPress={onAddItem}>
                <CardButtonIcon type="FontAwesome" name="plus" />
                <CardButtonText> Add</CardButtonText>
              </CardButton>
            </CardItemRight>
          ) : (
            <CardItemRight>
              <CardButton onPress={onRemoveItem}>
                <CardButtonIcon type="FontAwesome" name="times" />
              </CardButton>
              <CardButton onPress={onReduceQuantity}>
                <CardButtonIcon type="FontAwesome" name="minus" />
              </CardButton>
              <CardButton>
                <CardButtonText>{quantity}</CardButtonText>
              </CardButton>
              <CardButton onPress={onAddQuantity}>
                <CardButtonIcon type="FontAwesome" name="plus" />
              </CardButton>
            </CardItemRight>
          )}
        </CardView>
      </CardTouchable>
      <View style={{ margin: 8 }} />
    </View>
  );
};

export default CardProduct;

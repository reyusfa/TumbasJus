import React, { useState } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-ionicons';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const CardLayout = styled.View`
  align-content: stretch;
  flex: 0.5;
`;

const CardContainer = styled.View`
  background-color: #fcfcfc;
  border-radius: 6px;
  elevation: 2;
  margin: 8px;
  overflow: hidden;
`;

const CardItem = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 8px 8px 8px;
`;

const CardItemRight = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin: 4px;
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

const CardButtonLabel = styled.Text`
  color: #fcfcfc;
  font-size: 15px;
  font-weight: bold;
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

const CardImage = styled(Image)`
  height: 150px;
  margin: 0px 0px 8px 0px;
  padding: 0;
`;

const CardProduct = props => {
  const {
    dataItem,
    dataOrder,
    onAddItem,
    onRemoveItem,
    onAddQuantity,
    onReduceQuantity,
    onSelectItem
  } = props;
  const order = dataOrder.order.filter(item => {
    return item.product_id === dataItem.id;
  })[0];
  const quantity = order && order.quantity ? order.quantity : 0;
  return (
    <CardLayout>
      <CardContainer>
        <View>
          <TouchableOpacity activeOpacity={0.9} onPress={onSelectItem}>
            <CardImage source={{ uri: dataItem.image }} />
          </TouchableOpacity>
          <CardItem>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ fontWeight: 'bold', fontSize: 16 }}>
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
              <CardButtonGroup>
                <CardButtonItem onPress={onAddItem}>
                  <CardButtonIcon name="md-add" />
                  <CardButtonLabel> Add</CardButtonLabel>
                </CardButtonItem>
              </CardButtonGroup>
            </CardItemRight>
          ) : (
            <CardItemRight>
              <CardButtonGroup>
                <CardButtonItem onPress={onReduceQuantity}>
                  <CardButtonIcon name="md-remove" />
                </CardButtonItem>
                <CardButtonText>{quantity}</CardButtonText>
                <CardButtonItem onPress={onAddQuantity}>
                  <CardButtonIcon name="md-add" />
                </CardButtonItem>
              </CardButtonGroup>
            </CardItemRight>
          )}
        </View>
      </CardContainer>
    </CardLayout>
  );
};

export default CardProduct;

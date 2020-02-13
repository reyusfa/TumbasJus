import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { actionGetOrderHistory } from '../../Public/redux/actions/history';
import NavigationHistory from '../../Public/components/NavigationHistory';

const OrderHistory = props => {
  const { auth, history, getOrderHistory } = props;

  const headers = {
    headers: {
      authorization: auth.data.token
    }
  };

  const setInitHistory = async params => {
    const config = {
      ...headers,
      params: {
        filter: {
          ...(auth.data.id ? { user_id: auth.data.id } : null)
        },
        sort: 'created_at.desc'
      }
    };
    await getOrderHistory(config);
  };

  useEffect(() => {
    setInitHistory();
    console.log(history);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View>
        {(history.data || []).map(item => {
          return (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: '#dddddd'
              }}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 8,
                    alignItems: 'center'
                  }}>
                  <Icon name="event" style={{ fontSize: 20 }} />
                  <Text
                    style={{
                      fontSize: 16,
                      alignItems: 'center'
                    }}>
                    {' '}
                    {moment(item.created_at).format('MMMM DD, YYYY')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <Icon name="receipt" style={{ fontSize: 20 }} />
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 4,
                      color: 'deepskyblue'
                    }}>
                    {' '}
                    {item.reference}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <NumberFormat
                  decimalSeparator=","
                  thousandSeparator="."
                  prefix={'Rp '}
                  displayType={'text'}
                  value={item.total}
                  renderText={value => (
                    <Text
                      style={{
                        fontSize: 16,
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
      </View>
    </ScrollView>
  );
};

OrderHistory.navigationOptions = screenProps => ({
  header: () => <NavigationHistory {...screenProps} />
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    history: state.history
  };
};

const mapDispatchToProps = dispatch => ({
  getOrderHistory: config => dispatch(actionGetOrderHistory(config))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);

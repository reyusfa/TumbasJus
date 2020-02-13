import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton
} from 'react-native-modals';
import { connect } from 'react-redux';

import styled from 'styled-components';

import { actionGetCategories } from '../../Public/redux/actions/categories';

import { useInputText } from '../helper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavigationHome = screenProps => {
  const { auth, orders, categories, navigation, getCategories } = screenProps;
  const { value: filterName, bindText: bindFilterName } = useInputText('');
  const [sortBy, setSortBy] = useState('name.asc');
  const [filterCategory, setFilterCategory] = useState('');
  const [openModalSort, setOpenModalSort] = useState(false);
  const [openModalFilter, setOpenModalFilter] = useState(false);

  const headers = {
    headers: {
      authorization: auth.data.token
    }
  };

  const setCategories = async () => {
    const config = {
      ...headers
    };
    await getCategories(config);
  };

  useEffect(() => {
    setCategories();
  }, []);

  useEffect(() => {
    navigation.setParams({
      filterName: filterName
    });
  }, [filterName]);

  useEffect(() => {
    navigation.setParams({
      sortBy: sortBy
    });
  }, [sortBy]);

  useEffect(() => {
    navigation.setParams({
      filterCategory: filterCategory
    });
  }, [filterCategory]);

  const handleSelectFilter = params => {
    setFilterCategory(params);
    setOpenModalFilter(false);
  };

  const handleSelectSort = params => {
    setSortBy(params);
    setOpenModalSort(false);
  };

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        height: 51,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fcfcfc',
        paddingLeft: 4,
        paddingRight: 8
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.15
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.toggleDrawer()}>
          <View>
            <Icon name="menu" size={22} style={{ color: '#454545' }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.7 }}>
        <View>
          <TextInput
            style={{
              backgroundColor: '#f3f3f3',
              borderWidth: 1,
              borderColor: '#ebebeb',
              color: '#555555',
              borderRadius: 5,
              marginVertical: 6,
              marginHorizontal: 4,
              paddingVertical: 9,
              paddingHorizontal: 12
            }}
            {...bindFilterName}
            placeholder="Search product name..."
          />
        </View>
        <Icon
          name="search"
          size={22}
          style={{
            position: 'absolute',
            color: '#555555',
            right: 11,
            top: 13
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.15
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ backgroundColor: '#fcfcfc' }}>
          <Icon
            onPress={() => setOpenModalSort(true)}
            name="sort"
            size={25}
            style={{ color: '#454545' }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.15
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ backgroundColor: '#fcfcfc' }}>
          <Icon
            onPress={() => setOpenModalFilter(true)}
            name="tune"
            size={25}
            style={{ color: '#454545' }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.15
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ backgroundColor: '#fcfcfc' }}>
          {orders.cart.length > 0 ? (
            <View
              style={{
                position: 'absolute',
                zIndex: 10,
                top: -4,
                right: -7,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 15,
                paddingHorizontal: 4,
                backgroundColor: 'deepskyblue'
              }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: '#fcfcfc'
                }}>
                {orders.cart.length}
              </Text>
            </View>
          ) : null}
          <Icon
            onPress={() => navigation.navigate('Order')}
            name="shopping-basket"
            size={25}
            style={{ color: '#454545' }}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={openModalSort}
        width={0.9}
        onTouchOutside={() => setOpenModalSort(false)}
        modalTitle={<ModalTitle title="Sort Items" />}>
        <ModalContent>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#dddddd'
            }}>
            <TouchableOpacity
              onPress={() => {
                handleSelectSort('name.asc');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  alignItems: 'center'
                }}>
                Name - A to Z
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#dddddd'
            }}>
            <TouchableOpacity
              onPress={() => {
                handleSelectSort('name.desc');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  alignItems: 'center'
                }}>
                Name - Z to A
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#dddddd'
            }}>
            <TouchableOpacity
              onPress={() => {
                handleSelectSort('price.asc');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  alignItems: 'center'
                }}>
                Price - Low to High
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#dddddd'
            }}>
            <TouchableOpacity
              onPress={() => {
                handleSelectSort('price.desc');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  alignItems: 'center'
                }}>
                Price - High to Low
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#dddddd'
            }}>
            <TouchableOpacity
              onPress={() => {
                handleSelectSort('updated_at.asc');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  alignItems: 'center'
                }}>
                Update date - Oldest to Newest
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#dddddd'
            }}>
            <TouchableOpacity
              onPress={() => {
                handleSelectSort('updated_at.desc');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  alignItems: 'center'
                }}>
                Update date - Newest to Oldest
              </Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
      </Modal>
      <Modal
        visible={openModalFilter}
        width={0.9}
        onTouchOutside={() => setOpenModalFilter(false)}
        modalTitle={<ModalTitle title="Filter by Category" />}>
        <ModalContent>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#dddddd'
            }}>
            <TouchableOpacity
              onPress={() => {
                handleSelectFilter('');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  alignItems: 'center'
                }}>
                All Categories
              </Text>
            </TouchableOpacity>
          </View>
          {categories.data.map(item => {
            return (
              <View
                key={item.id}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: '#dddddd'
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleSelectFilter(item.id);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      alignItems: 'center'
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ModalContent>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    orders: state.orders,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => ({
  getCategories: config => dispatch(actionGetCategories(config))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationHome);

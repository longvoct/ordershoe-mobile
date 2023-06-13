import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../utils/config';
import {getUserInfo} from '../utils/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AccountScreen = ({navigation}) => {
  const [accountInfo, setAccountInfo] = useState(null);
  useEffect(() => {
    const fetchAccountInfo = async () => {
      const {id} = await getUserInfo();
      const token = await AsyncStorage.getItem('accessToken');
      try {
        const response = await axios.get(
          `${config.url}/wp-json/wc/v3/customers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setAccountInfo(response.data);
      } catch (error) {
        console.error(error.response);
      }
    };

    fetchAccountInfo();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        position: 'relative',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={{
          backgroundColor: '#fff',
          position: 'relative',
        }}
        stickyHeaderIndices={[0]}>
        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#fff',
            elevation: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              paddingTop: 15,
              width: '100%',
            }}>
            <View
              style={{
                borderRadius: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../assets/images/icons/back.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginLeft: 20,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Profile
              </Text>
            </View>
            <Entypo name="dots-three-vertical" size={20} color="#000" />
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
            paddingHorizontal: 25,
          }}>
          {accountInfo ? (
            <>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 15,
                  borderColor: '#ccc',
                  borderBottomWidth: 0.5,
                }}>
                <Image
                  source={{uri: accountInfo.avatar_url}}
                  style={{
                    width: '100%',
                    height: 90,
                    borderRadius: 100,
                    margin: 'auto',
                    maxWidth: 90,
                  }}
                />
                <Text
                  style={{
                    color: '#000',
                    fontSize: 20,
                    fontFamily: 'Poppins-SemiBold',
                    marginTop: 15,
                  }}>
                  {accountInfo.first_name} {accountInfo.last_name}
                </Text>
                <Text style={{fontFamily: 'Poppins-Medium', color: '#181930'}}>
                  {accountInfo.billing.phone}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    backgroundColor: '#f8f8f8',
                    borderRadius: 16,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 45,
                      height: 45,
                      borderRadius: 100,
                      backgroundColor: '#e2e2e2',
                      marginRight: 15,
                    }}>
                    <MaterialCommunityIcons
                      name="email"
                      size={20}
                      color="#000"
                    />
                  </View>
                  <View>
                    <Text
                      style={{fontFamily: 'Poppins-SemiBold', color: '#000'}}>
                      Email
                    </Text>
                    <Text
                      style={{
                        color: '#616161',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {accountInfo.email}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#f8f8f8',
                    borderRadius: 16,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 45,
                      height: 45,
                      borderRadius: 100,
                      backgroundColor: '#e2e2e2',
                      marginRight: 15,
                    }}>
                    <Ionicons name="location" size={20} color="#000" />
                  </View>
                  <View>
                    <Text
                      style={{fontFamily: 'Poppins-SemiBold', color: '#000'}}>
                      Address
                    </Text>
                    <Text
                      style={{
                        color: '#616161',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {accountInfo.billing.address_1}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#f8f8f8',
                    borderRadius: 16,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 45,
                      height: 45,
                      borderRadius: 100,
                      backgroundColor: '#e2e2e2',
                      marginRight: 15,
                    }}>
                    <FontAwesome5
                      name="location-arrow"
                      size={20}
                      color="#000"
                    />
                  </View>
                  <View>
                    <Text
                      style={{fontFamily: 'Poppins-SemiBold', color: '#000'}}>
                      City
                    </Text>
                    <Text
                      style={{
                        color: '#616161',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {accountInfo.billing.city}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#f8f8f8',
                    borderRadius: 16,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 45,
                      height: 45,
                      borderRadius: 100,
                      backgroundColor: '#e2e2e2',
                      marginRight: 15,
                    }}>
                    <MaterialIcons name="my-location" size={20} color="#000" />
                  </View>
                  <View>
                    <Text
                      style={{fontFamily: 'Poppins-SemiBold', color: '#000'}}>
                      State
                    </Text>
                    <Text
                      style={{
                        color: '#616161',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {accountInfo.billing.state}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#f8f8f8',
                    borderRadius: 16,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 45,
                      height: 45,
                      borderRadius: 100,
                      backgroundColor: '#e2e2e2',
                      marginRight: 15,
                    }}>
                    <MaterialIcons
                      name="location-city"
                      size={20}
                      color="#000"
                    />
                  </View>
                  <View>
                    <Text
                      style={{fontFamily: 'Poppins-SemiBold', color: '#000'}}>
                      Company
                    </Text>
                    <Text
                      style={{
                        color: '#616161',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {accountInfo.billing.company}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

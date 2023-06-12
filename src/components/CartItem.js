import {useState} from 'react';
import {TouchableOpacity, Image, View, Text, Pressable} from 'react-native';

const CartItem = ({item, onUpdateCartItem}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = newQuantity => {
    setQuantity(newQuantity);
    onUpdateCartItem({...item, quantity: newQuantity});
  };

  return (
    <Pressable
      style={{
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        height: 130,
        borderRadius: 16,
        backgroundColor: '#fafafd',
        padding: 10,
        marginBottom: 15,
      }}>
      <View
        style={{
          width: 110,
          height: 110,
          borderRadius: 8,
          elevation: 1,
          backgroundColor: '#f5f5f5',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
        <Image
          source={{uri: item.images[0].src}}
          style={{
            width: 110,
            height: 110,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{height: '100%', width: '100%'}}>
        <Text
          style={{
            fontSize: 14,
            color: '#000',
            marginBottom: 5,
            width: 210,
            fontFamily: 'Poppins-SemiBold',
          }}
          numberOfLines={1}>
          {item.name}
        </Text>
        <View style={{flexDirection: 'row', width: '100%', marginTop: 2}}>
          {item.variation && item.variation.length > 0 && (
            <View>
              {item.variation.map((variation, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 13,
                    color: '#606266',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {variation.value}
                </Text>
              ))}
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: 200,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              marginTop: 4,
              fontWeight: '500',
              color: '#181930',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
            }}
            numberOfLines={1}>
            ₫
            {`${item.prices.sale_price * quantity}`
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f0f0f3',
              borderRadius: 20,
              paddingHorizontal: 5,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleQuantityChange(Math.max(1, quantity - 1))}>
              <Text style={{lineHeight: 25, color: '#000', fontSize: 25}}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={{paddingHorizontal: 10, color: '#000'}}>
              {quantity}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleQuantityChange(Math.max(1, quantity + 1))}>
              <Text style={{lineHeight: 20, color: '#000', fontSize: 18}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
export default CartItem;

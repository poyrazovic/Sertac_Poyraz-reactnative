import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ProductType } from '../models/product.model';
import { UseNavigationType } from '../models/general.model';

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { navigate } = useNavigation<UseNavigationType>();

  const handlePress = () => {
    navigate('ProductDetail', { id: product._id, name: product.name });
  };

  return (
    <Card>
      <Card.Cover source={{ uri: product.avatar }} />
      <Card.Title title={product.name} subtitle={`$${product.price}`} />
      <View style={styles.actions}>
        <Button mode="contained" onPress={handlePress}>
          Detail
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  actions: {
    margin: 16,
  },
});

export default ProductCard;

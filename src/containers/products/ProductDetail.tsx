import React, { FC, useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, Paragraph, Snackbar, Text, MD3LightTheme } from 'react-native-paper';
import { useQuery } from 'react-query';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getProduct } from '../../config/api';
import { Loader } from '../../components';

type ErrorStateType = {
  visible: boolean;
  message: string;
};

type ParamList = {
  ProductDetail: {
    id: string;
    name: string;
  };
};

const ProductDetail: FC = () => {
  const [visibleError, setVisibleError] = useState<ErrorStateType>({
    visible: false,
    message: '',
  });
  const {
    params: { id },
  } = useRoute<RouteProp<ParamList, 'ProductDetail'>>();
  const { isLoading, isError, data } = useQuery(['productDetail', id], () => getProduct(id));

  const onDissmissSnackBar = () =>
    setVisibleError({
      visible: false,
      message: '',
    });

  useEffect(() => {
    if (data?.message.includes('not authorized')) {
      setVisibleError({
        visible: true,
        message: data.message ?? 'Something went wrong',
      });
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    setVisibleError({
      visible: true,
      message: 'Something went wrong',
    });
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: data?.product?.avatar }} resizeMode="cover" style={styles.cardImage} />
          <Card.Content>
            <View style={styles.product}>
              <Text style={styles.productName} variant="titleMedium">
                {data?.product?.name}
              </Text>
              <Text variant="labelLarge">${data?.product?.price}</Text>
            </View>
            <Paragraph>{data?.product?.description}</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
      <Snackbar visible={visibleError.visible} onDismiss={onDissmissSnackBar}>
        <Text style={styles.error}>{visibleError.message}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  card: {
    margin: 16,
  },
  cardImage: {
    height: 350,
  },
  product: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 8,
    backgroundColor: MD3LightTheme.colors.primaryContainer,
  },
  productName: {
    width: '80%',
    flex: 1,
  },
  error: {
    color: '#FFFFFF',
  },
});

export default ProductDetail;

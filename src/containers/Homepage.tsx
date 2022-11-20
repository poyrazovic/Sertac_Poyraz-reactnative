import React, { FC, useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import { Snackbar, FAB, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { getProducts } from '../config/api';
import { ProductType } from '../models/product.model';
import { UseNavigationType } from '../models/general.model';
import { CategoryList, Loader, ProductCard } from '../components';
import { ProductContext } from '../../App';

type ErrorStateType = {
  visible: boolean;
  message: string;
};

const INITIAL_ERROR_STATE = {
  visible: false,
  message: '',
};

const INITIAL_CATEGORY_STATE = {
  id: '',
  title: '',
};

const Homepage: FC = () => {
  const { navigate } = useNavigation<UseNavigationType>();
  const [productData, setProductData] = useState<ProductType[]>([]);
  const [visibleError, setVisibleError] = useState<ErrorStateType>(INITIAL_ERROR_STATE);
  const [selectedCategory, setSelectedCategory] = useState(INITIAL_CATEGORY_STATE);
  const { searchQuery } = useContext(ProductContext);

  const { isLoading, isError, data } = useQuery('products', getProducts);

  const onDissmissSnackBar = () => setVisibleError(INITIAL_ERROR_STATE);

  useEffect(() => {
    if (data?.message.includes('not authorized')) {
      setVisibleError({
        visible: true,
        message: data.message ?? 'Something went wrong',
      });
    }

    setProductData(data?.products ?? []);
  }, [data]);

  useEffect(() => {
    if (selectedCategory.id) {
      const filteredProducts = data?.products.filter(product => product.category === selectedCategory.title);
      setProductData(filteredProducts ?? []);
    } else {
      setProductData(data?.products ?? []);
    }
  }, [data?.products, selectedCategory]);

  useEffect(() => {
    if (searchQuery && searchQuery.length >= 3) {
      const filteredProducts = data?.products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setProductData(filteredProducts ?? []);
    } else {
      setProductData(data?.products ?? []);
    }
    setSelectedCategory(INITIAL_CATEGORY_STATE);
  }, [data?.products, searchQuery]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.categoryWrapper}>
        <CategoryList state={{ selectedCategory, setSelectedCategory }} />
      </View>
      <ScrollView style={styles.scrollArea}>
        <View style={styles.list}>
          {productData?.map((product: ProductType) => (
            <View key={product._id} style={styles.listItem}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        label="Create a product"
        accessibilityLabel="Create a product"
        onPress={() => navigate('Create Product')}
      />
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
  categoryWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollArea: {
    marginTop: 70,
  },
  list: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listItem: {
    width: '50%',
    padding: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 32,
  },
  error: {
    color: '#FFFFFF',
  },
});

export default Homepage;

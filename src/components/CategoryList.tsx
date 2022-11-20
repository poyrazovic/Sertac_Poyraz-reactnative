import React, { FC } from 'react';
import { FlatList, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, MD3LightTheme } from 'react-native-paper';
import { useQuery } from 'react-query';
import { getCategories } from '../config/api';
import Loader from './Loader';

type FlatCategoryType = {
  id: string;
  title: string;
};

type CategoryListPropsType = {
  state: {
    selectedCategory: FlatCategoryType;
    setSelectedCategory: React.Dispatch<React.SetStateAction<FlatCategoryType>>;
  };
};

type CategoryItemType = {
  item: FlatCategoryType;
  onPress: () => void;
  backgroundColor: object;
};

const CategoryItem: FC<CategoryItemType> = ({ item, onPress, backgroundColor }) => (
  <TouchableHighlight onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableHighlight>
);

const CategoryList: FC<CategoryListPropsType> = ({ state: { selectedCategory, setSelectedCategory } }) => {
  const { isLoading, isError, data } = useQuery('categories', getCategories);

  const renderItem = ({ item }: any) => {
    const backgroundColor =
      item.id === selectedCategory.id ? MD3LightTheme.colors.primary : MD3LightTheme.colors.secondary;

    return (
      <CategoryItem
        item={item}
        onPress={() => setSelectedCategory({ id: item.id, title: item.title })}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <FlatList
      data={data?.categories.map(category => ({ id: category._id, title: category.name }))}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      extraData={selectedCategory.id}
      horizontal={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 12,
    marginHorizontal: 4,
    marginVertical: 16,
    borderRadius: 32,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default CategoryList;

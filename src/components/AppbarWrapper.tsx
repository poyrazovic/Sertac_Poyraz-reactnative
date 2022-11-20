import React, { FC, useState, useContext } from 'react';
import { Appbar, Searchbar } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { ProductContext } from '../../App';

interface AppbarWrapperProps extends NativeStackHeaderProps {}

const AppbarWrapper: FC<AppbarWrapperProps> = ({ navigation: { goBack }, back, route }) => {
  const [visibleSearch, setVisibleSearch] = useState<boolean>(false);
  const { searchQuery, onChangeSearch } = useContext(ProductContext);

  const handleSearchOnPress = () => {
    setVisibleSearch(!visibleSearch);
    onChangeSearch('');
  };

  return (
    <>
      <Appbar.Header dark mode="center-aligned">
        {back && (
          <Appbar.BackAction
            onPress={() => {
              goBack();
            }}
          />
        )}
        <Appbar.Content title={route?.params?.name ?? route.name} />
        {!back && <Appbar.Action icon="magnify" onPress={handleSearchOnPress} />}
      </Appbar.Header>
      {visibleSearch && (
        <Searchbar
          placeholder="Search"
          autoFocus={visibleSearch}
          elevation={5}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      )}
    </>
  );
};

export default AppbarWrapper;

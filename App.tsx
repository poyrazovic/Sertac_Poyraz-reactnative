import React, { createContext, useState } from 'react';
import { DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Homepage } from './src/containers';
import { CreateProduct, ProductDetail } from './src/containers/products';
import { AppBarWrapper } from './src/components';

type RootStackParamList = {
  Homepage: undefined;
  'Create Product': undefined;
  ProductDetail: undefined;
};

type ProductContextType = {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
};

export const ProductContext = createContext<ProductContextType>({
  searchQuery: '',
  onChangeSearch: () => {},
});

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac6',
  },
};

const App = () => {
  const queryClient = new QueryClient();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <QueryClientProvider client={queryClient}>
      <ProductContext.Provider value={{ searchQuery, onChangeSearch }}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Navigator
              initialRouteName="Homepage"
              screenOptions={{
                header: props => <AppBarWrapper {...props} />,
                headerBlurEffect: 'light',
              }}>
              <Screen name="Homepage" component={Homepage} />
              <Screen name="Create Product" component={CreateProduct} />
              <Screen name="ProductDetail" component={ProductDetail} />
            </Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ProductContext.Provider>
    </QueryClientProvider>
  );
};

export default App;

import React, { FC, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Button, HelperText, Snackbar, TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { CreateProductRequestType } from '../../models/product.model';
import { createProduct } from '../../config/api';
import { UseNavigationType } from '../../models/general.model';

const CreateProduct: FC = () => {
  const [visibleError, setVisibleError] = useState({
    visible: false,
    message: '',
  });
  const queryClient = useQueryClient();
  const { navigate } = useNavigation<UseNavigationType>();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateProductRequestType>({
    mode: 'onChange',
  });

  const REGEX = {
    price: /^\d+$/,
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    url: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
  };

  const { mutate, isLoading } = useMutation(createProduct, {
    onSuccess: () => {
      navigate('Homepage');
      onDissmissSnackBar();
    },
    onError: () => {
      setVisibleError({
        visible: true,
        message: 'Something went wrong',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const onDissmissSnackBar = () =>
    setVisibleError({
      visible: false,
      message: '',
    });

  const submit = (data: any) => {
    const newData = {
      ...data,
      price: Number(data.price),
    };
    mutate(newData);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Controller
          control={control}
          name="name"
          rules={{ required: { value: true, message: 'Name is required!' } }}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextInput
                mode="outlined"
                label="Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
              />
              <HelperText type="error">{errors.name?.message}</HelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="price"
          rules={{
            required: { value: true, message: 'Price is required!' },
            min: { value: 1, message: 'Price must be greater than 0!' },
            pattern: { value: REGEX.price, message: 'Price is invalid!' },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextInput
                mode="outlined"
                label="Price"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
              />
              <HelperText type="error">{errors.price?.message}</HelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: { value: true, message: 'Category is required!' } }}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextInput
                mode="outlined"
                label="Category"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
              />
              <HelperText type="error">{errors.category?.message}</HelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: { value: true, message: 'Description is required!' } }}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextInput
                mode="outlined"
                label="Description"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
              />
              <HelperText type="error">{errors.description?.message}</HelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="avatar"
          rules={{
            required: { value: true, message: 'Avatar is required!' },
            pattern: { value: REGEX.url, message: 'Avatar URL is invalid!' },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextInput
                mode="outlined"
                label="Avatar"
                keyboardType="url"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
              />
              <HelperText type="error">{errors.avatar?.message}</HelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="developerEmail"
          rules={{
            required: { value: true, message: 'Email is required!' },
            pattern: { value: REGEX.email, message: 'Email is invalid!' },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextInput
                mode="outlined"
                label="Developer Email"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
              />
              <HelperText type="error">{errors.developerEmail?.message}</HelperText>
            </>
          )}
        />
        <Button mode="contained" onPress={handleSubmit(submit)} disabled={!isValid} loading={isLoading}>
          Submit
        </Button>
      </ScrollView>
      <Snackbar visible={visibleError.visible} onDismiss={onDissmissSnackBar}>
        <Text style={styles.error}>{visibleError.message}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  error: {
    color: '#FFFFFF',
  },
});

export default CreateProduct;

import { createApi } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosBaseQuery =
    ({ baseUrl }: { baseUrl: string }) =>
        async ({ url, method, data, params }: any) => {
            const token = await AsyncStorage.getItem('token');
            const config = {
                baseURL: baseUrl,
                method,
                url,
                data,
                params: {
                    ...params,
                    key: token,
                }
            };

            try {
                const result = await axios(config);
                return { data: result.data };
            } catch (axiosError: any) {
                return {
                    error: {
                        status: axiosError.response?.status,
                        data: axiosError.response?.data,
                    },
                };
            }
        };

export const apiSlice = createApi({
    reducerPath: 'apiSlicer',
    baseQuery: axiosBaseQuery({ baseUrl: 'https://pixabay.com/api/' }),
    endpoints: (builder) => ({
        fetchImages: builder.query({
            query: ({ query, page, sizePerPage }) => ({
                url: '',
                method: 'GET',
                params: {
                    q: query,
                    page,
                    per_page: sizePerPage,
                },
            }),
        }),
    }),
});

export const { useFetchImagesQuery } = apiSlice;

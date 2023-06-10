import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Products {
    _id: string,
    name: string,
    description: string,
    price: number,
    rating: number,
    category: string,
    supply: number,
    stat: any,
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/'}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products"],
    endpoints: (build) => ({
        getUser: build.query<any, string>({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query<Products[], void>({
            query: () => 'client/products',
            providesTags: ["Products"]
        })
    })
})

export const { useGetUserQuery, useGetProductsQuery } = api
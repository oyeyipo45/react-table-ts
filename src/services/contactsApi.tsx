import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Contact} from "../model/contactModel"


export const contactsApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        contacts: builder.query<Contact[], void>({
            query: () => '/contacts',
            providesTags : ["Contact"],
        }),
        getContact: builder.query<Contact, string>({
            query: (id) => `/contacts/${id}`,
            providesTags : ["Contact"],
        }),
        addContact: builder.mutation<{}, Contact>({
            query: (contact) => ({
                url: '/contacts',
                method: 'POST',
                body : contact
            }),
            invalidatesTags: ["Contact"],
        }),
        deleteContact: builder.mutation<void, string>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["Contact"],
        }),
        updateContact: builder.mutation<void, Contact>({
             query: ({id, ...rest}) => ({
                url: `/contacts/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["Contact"],
        })
       
    })
})


export const {
    useContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation,
    useGetContactQuery,
    useUpdateContactMutation
} = contactsApi

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://backend-7p6wplabhq-uc.a.run.app/api",
//     // prepareHeaders: (headers: Headers) => {
//     //   const { data: session, status } = useSession();
//     //   const token = session.user.token;
//     //   if (token) {
//     //     headers.set("authorization", `Bearer ${token}`);
//     //   }
//     //   return headers;
//     // },
//   }),
//   endpoints: (builder) => ({
//     getClients: builder.query<any, void>({
//       query: () => "/clients",
//     }),
//   }),
// });
//This file defines an API service using Redux Toolkit's createApi and fetchBaseQuery for handling user authentication-related operations.
//In summary, this file sets up API endpoints for user registration and login, handling the requests and updating the Redux store with the user data upon successful login.
//This is the concept of RTK query of redux toolkit..
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
const USER_API = "http://localhost:8080/api/v1/user/"  //this is the endpoint url for user

export const authApi = createApi({  //The createApi function is used to define an API slice for managing backend communication. It automatically generates hooks to perform API operations (e.g., queries and mutations).
    reducerPath:"authApi", //this name 'authApi' can be anything but generally jeta file er name thake setai diye diy
    baseQuery:fetchBaseQuery({ //A fetchBaseQuery function that sets up the base URL and includes credentials with each request.
        baseUrl:USER_API,   //The base URL for the API endpoints.
        credentials:'include'  // Ensures that cookies are included in cross-origin requests.
    }),

//Each endpoint has a query method (for GET) or a mutation method (for other HTTP methods like POST, PUT, etc.):
    endpoints: (builder) => ({   //Defines the API endpoints je kon kon endPoints e amra request pathabo. It defines the API routes and their behavior. These can be either: Queries: For fetching data (e.g., loadUser). Or, Mutations: For sending data (e.g., registerUser, loginUser, logoutUser, updateUser).
    //Purpose: Sends a POST request to /register on the server to register a new user.
        registerUser: builder.mutation({  //'registerUser' is a endpoint..we use .mutation() when post the data to the api ... registerUser: A mutation endpoint for user registration.
            query: (inputData) => ({   //query: is a callback function which return kon particular url e request pathabo tar method..ete inputdata asche which is come from the signup, login form..inputData contains the user data (e.g., name, email, password).
                url:"register", //to etate baseUrl niye http://localhost:8080/api/v1/user/regiseter e request pathabe with the inputdata. 
                method:"POST",
                body:inputData    //The request body containing the user data.
            })
        }),
        loginUser: builder.mutation({   //loginUser: A mutation endpoint for user login...get bade onno kono operation er khetre .mutation use korbo
            query: (inputData) => ({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {   //onQueryStarted: An optional lifecycle method that runs when the query starts || queryFulfilled: A promise that resolves when the query is successful || dispatch: A function to dispatch actions to the Redux store.
                try {  //try-catch block: Handles the query result
                    const result = await queryFulfilled;  
                    dispatch(userLoggedIn({user:result.data.user})); //On successful login (queryFulfilled), it dispatches the userLoggedIn action to update the Redux store with the logged-in user's data.
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logoutUser: builder.mutation({  
            query: () => ({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try { 
                    dispatch(userLoggedOut()); //Dispatches the userLoggedOut action to reset the authentication state in Redux.
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({  //Sends a GET request to /profile to fetch the current user's data. jehetu data get korchi tai use .query
            query: () => ({
                url:"profile",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));// If successful, it dispatches the userLoggedIn action to update the Redux store with the user's profile.
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({//Purpose: Sends a PUT request to /profile/update to update the user's profile.
            query: (formData) => ({
                url:"profile/update",
                method:"PUT",
                body:formData,  //formData containing the updated user details.
                credentials:"include"
            })
        })
    })
});
/*The authApi automatically generates React hooks for each endpoint:
Mutations: Hooks like useRegisterUserMutation, useLoginUserMutation allow you to send data (e.g., POST or PUT requests).
Queries: Hooks like useLoadUserQuery allow you to fetch data (e.g., GET requests) */
export const {
    useRegisterUserMutation,  //These are the one type of hook which we can use anywhere
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation
} = authApi;

/*
Summary of Steps:

1. Frontend Sends Request:
    Call the generated hook (e.g., useRegisterUserMutation) and pass the necessary data.
    RTK Query sends the request to the server (http://localhost:8080/api/v1/user/...).
2. Backend Handles Request:
    The backend processes the request (e.g., validates data, interacts with the database) and sends a response.

3. Frontend Receives Response:
    RTK Query handles the response, automatically caches the data, and updates the component state.
4. Redux Store Updates:
    Optional: Use onQueryStarted to dispatch additional actions (e.g., userLoggedIn, userLoggedOut) to update the Redux store.
This approach ensures clean, maintainable, and efficient data fetching in your application!
 */
import * as React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

// Get configuration from environment variables (remove quotes if present)

// Configure Amplify with Cognito

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
      }
    }
  });


const formFields={
    signUp:{
        username:{
            order:1,
            placeholder:"Enter your username",
            label:"Username",
            isRequired: true,
        },
        email:{
            order:2,
            placeholder:"Enter your email address",
            label:"Email",
            type:"email",
            isRequired: true,
        },
        password:{
            order:3,
            placeholder:"Enter your password",
            label:"Password",
            type:"password",
            isRequired: true,
        },
        confirm_password:{
            order:4,
            placeholder:"Confirm your password",
            label:"Confirm Password",
            type:"password",
            isRequired: true,
        },
    }
};
type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <Authenticator 
      formFields={formFields}
      loginMechanisms={['username']}
      signUpAttributes={['email']}
    >
      {({ user }) => {
        // When user is authenticated, show the app
        // When user is not authenticated, Authenticator automatically shows login/signup form
        if (user) {
          return <div>{children}</div>;
        }
        // Return null to let Authenticator show the login form
        return null;
      }}
    </Authenticator>
  )
}
export default AuthProvider;
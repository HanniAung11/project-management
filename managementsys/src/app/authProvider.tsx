import * as React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

// Get configuration from environment variables (remove quotes if present)
const userPoolId = (process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "").replace(/^"|"$/g, '');
const userPoolClientId = (process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "").replace(/^"|"$/g, '');

// Configure Amplify with Cognito
if (userPoolId && userPoolClientId) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: userPoolId,
        userPoolClientId: userPoolClientId,
      }
    }
  });
} else if (typeof window !== 'undefined') {
  // Only log in browser, not during SSR
  console.warn('AWS Cognito configuration is missing. Please check your environment variables.');
}


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
  // If Cognito is not configured, show children anyway (for development/testing)
  if (!userPoolId || !userPoolClientId) {
    return <div>{children}</div>;
  }

  return (
    <Authenticator 
      formFields={formFields}
      loginMechanisms={['username']}
      signUpAttributes={['email']}
    >
      {({ user }) => {
        // This function is only called when user is authenticated
        // When user is not authenticated, Authenticator automatically shows login/signup form
        return <div>{children}</div>;
      }}
    </Authenticator>
  )
}
export default AuthProvider;
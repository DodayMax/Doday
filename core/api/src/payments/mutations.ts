import { Token } from 'react-stripe-checkout';

export const handleStripeToken = async (token: Token) => {
  return fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(token), // body data type must match "Content-Type" header
  });
};

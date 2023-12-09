import { defineStore } from "pinia";

export const useTransactionStore = defineStore('transactionStore', {
    state: () => ({
        transactions: [],
        isLoading: false,
        validationErrors: null,
    }),
    getters: {},
    actions: {
        addTransaction(payload) {
            this.transactions.push(payload);
            
        },
        async postTransaction(payload) {
            try {
                const accessToken = '31|rKQWgV3N68F0Fqv2e99CBex70jBxFB0OdF59VhG0569769ef';
                const response = await fetch("https://omahit.my.id/api/transactions", {
                      method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(payload),
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response}`);
                }
        
                const data = await response.json();
        
                if (data.status === 'error' && data.message === 'Validation failed' && data.errors) {
                    // Handle specific validation errors
                    console.log('Validation errors:', data.errors);
                    console.log(payload);
        
                    // Optionally, you can update your store's validationErrors property
                    this.validationErrors = data.errors;
                } else if (!data.success) {
                    console.log(payload);
                    console.error('Transaction failed with non-validation error:', data.message);

                } else {
                    // Reset validation errors if there are none
                    this.validationErrors = null;
                    console.log('Transaction posted successfully:', data);
                    // You might want to update state or perform other actions based on the response
                }
            } catch (error) {
                console.error('Error posting transaction:', error);
        
                // Check if error is a TypeError and has a response property
                if (error instanceof TypeError && error.hasOwnProperty('response')) {
                    console.error('Response from server:', await error.response.json());
                } else {
                    console.log('Unable to get response from server');
                }
            } finally {
                this.isLoading = false;
            }
        }
        ,
    },
});

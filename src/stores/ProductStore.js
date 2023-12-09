import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
    state: () => ({
        products: [],
        loading: false,
    }),
    getters: {},
    actions: {
        async getProducts() {
            const accessToken = '31|rKQWgV3N68F0Fqv2e99CBex70jBxFB0OdF59VhG0569769ef';

            try {
                const res = await fetch("https://omahit.my.id/api/products", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`, // Fix template string
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                console.log(data.data);
                this.products = data.data;
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                this.loading = false;
            }
        }
    },
});

import { defineStore } from "pinia";

export const useReportStore = defineStore("reportStore", {
    state: () => ({
        report: [],
        isLoading: false,
    }),
    getters: {},
    actions: {
        async getReport() {
            this.isLoading = true;
            // const res = await fetch("http://localhost:3001/reports");
            const res = await fetch("https://my-json-server.typicode.com/gede-wahyu/dandang-api/reports");
            const data = await res.json();

            this.report = data;
            this.isLoading = false;
        },
        formatCurrency(value) {
            if (value || value == 0)
                return value.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                });
            return;
        },
    },
});

export const menuItem = [
    {
        label: "Home",
        icon: "home",
        to: { name: "home" },
        children: [
            {
                label: "Produk Saya",
                icon: "local_mall",
                to: { name: "home-product-list" },
            },
            {
                label: "Riwayat Transaksi",
                icon: "payments",
                to: { name: "home-transaction-list" },
            },
            {
                label: "Transaksi Terjeda",
                icon: "other_admission",
                to: { name: "home-transaction-delay" },
            },
            {
                label: "Riwayat Distribusi",
                icon: "local_shipping",
                to: { name: "home-distribution-list" },
            },
            {
                label: "Daftar Saler",
                icon: "account_box",
                to: { name: "home-saler-list" },
            },
        ],
    },
    {
        label: "Daftar Toko",
        icon: "store",
        to: { name: "store-list" },
    },
    {
        label: "Buat Transaksi",
        icon: "add",
        to: { name: "transaction-add" },
    },
    {
        label: "Notifikasi",
        icon: "notifications",
        to: { name: "notifications" },
    },
    {
        label: "Pengaturan",
        icon: "settings",
        to: { name: "settings" },
    },
];

const homeChildren = [
    {
        label: "Produk Saya",
        icon: "local_mall",
        to: { name: "home-product-list" },
    },
    {
        label: "Buat Transaksi",
        icon: "shopping_cart",
        to: { name: "transaction-add" },
    },
    {
        label: "Semua Transaksi",
        icon: "paid",
        to: { name: "home-transaction-list" },
    },
    {
        label: "Transaksi Terjeda",
        icon: "pending_actions",
        to: { name: "home-transaction-delay" },
    },
    {
        label: "Distribusi",
        icon: "local_shipping",
        to: { name: "home-distribution-list" },
    },
    {
        label: "Saler",
        icon: "deployed_code_account",
        to: { name: "home-saler-list" },
    },
];

<template>
    <InputText
        placeholder="Cari produk..."
        class="search-products"
        v-model="searchProduct"
        @type="searchOnType()"
    />
    <div class="card">
        <h5 style="margin-bottom: 1rem; padding: 1.5rem">Pilih Produk</h5>
        <ul class="products">
            <div
                v-for="(product, index) in products"
                :class="{
                    hidden: checkSearch(searchOnType(), product.id),
                }"
            >
                <li
                    class="product-item"
                    :class="{ 'product-item-marked': checkCart(product.id) }"
                >
                    <div class="product-item-left">
                        <div class="product-item-name">
                            <span>{{ product.name }}</span>
                        </div>
                        <div class="product-item-stock">
                            <span
                                >Terjual
                                <span class="product-item-stock-number"
                                    >5</span
                                ></span
                            >
                            <span>|</span>
                            <span
                                >Sisa
                                <span class="product-item-stock-number"
                                    >100</span
                                ></span
                            >
                        </div>
                        <div class="product-item-variant">
                            <Tag
                                v-for="item in product.packaging"
                                :label="`${item.size}${
                                    item.uom === 'grams' ? 'gr' : item.uom
                                }`"
                            />
                        </div>
                        <div class="product-item-price">
                            <span>{{ priceRange(product.packaging) }}</span>
                        </div>
                    </div>
                    <div class="product-item-right">
                        <div class="product-item-img">
                            <img
                                v-if="product.image"
                                :src="'https://omahit.my.id/' + product.image"
                                :alt="'product-' + index"
                                style="
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                "
                            />
                            <div v-else class="img-none">
                                <span class="material-symbols-outlined"
                                    >image</span
                                >
                            </div>
                        </div>
                        <div class="product-item-button">
                            <Button
                                @click="onSelectProduct(index)"
                                label="Tambah"
                                :class="{ hidden: checkCart(product.id) }"
                            />
                            <div
                                class="product-item-button-one-var"
                                v-if="product.packaging.length === 1"
                                :class="{ hidden: !checkCart(product.id) }"
                            >
                                <Button
                                    icon="remove"
                                    @click.prevent="
                                        removeProductOfCart(product.id)
                                    "
                                    style="padding: 0.5rem"
                                />
                                <span class="add-remove-span">{{
                                    checkCart(product.id)
                                        ? checkCart(product.id).amount
                                        : 0
                                }}</span>
                                <Button
                                    icon="add"
                                    @click.prevent="
                                        addProductOfCart(product.id)
                                    "
                                    style="padding: 0.5rem"
                                />
                            </div>
                            <div
                                class="product-item-button-many-var"
                                v-else
                                :class="{ hidden: !checkCart(product.id) }"
                            >
                                <Button
                                    icon="edit_note"
                                    :label="
                                        checkCart(product.id)
                                            ? countSameProductOfCart(
                                                  product.id
                                              ) + ' item'
                                            : 0 + ' item'
                                    "
                                    @click="
                                        onPreviewProductOfCart(index, product)
                                    "
                                    outline
                                />
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        </ul>
    </div>

    <div class="cart-wrapper">
        <div
            class="cart"
            role="button"
            tabindex="-1"
            @click.prevent="onOpenCart()"
        >
            <div class="cart-amount-item">
                <span class="material-symbols-outlined"> shopping_cart </span>
                <span
                    >Total
                    {{
                        cart.length ? cart.reduce((p, c) => p + c.amount, 0) : 0
                    }}
                    item</span
                >
            </div>
            <div class="cart-amount-price">
                {{
                    cart.length
                        ? new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                          }).format(
                              cart.reduce((p, c) => p + c.amount * c.price, 0)
                          )
                        : 0
                }}
            </div>
        </div>
    </div>

    <Modal
        v-model:visible="visible"
        navType="back"
        :modalStyle="modalStyle"
        :footerStyle="{ 'padding-bottom': '2.5rem' }"
        :maskStyle="{ 'z-index': 4 }"
    >
        <template #header>{{ name }}</template>
        <template #footer>
            <div class="summ" :class="{ hidden: modalMode.preview }">
                <div class="total-item">
                    {{ `Total ( ${amount} ) produk` }}
                </div>
                <div class="total-price">
                    {{
                        model.price
                            ? new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                              }).format(amount * model.price)
                            : 0
                    }}
                </div>
            </div>
            <div
                class="add-to-cart-label"
                :class="{ hidden: modalMode.preview }"
            >
                <span class="label">Jumlah pembelian</span>
                <div class="amount-set">
                    <Button
                        icon="remove"
                        outline
                        rounded
                        style="padding: 0.4rem"
                        @click.prevent="if (amount > 1 && model.size) amount--;"
                    />
                    <div class="amount">
                        <InputNumber
                            v-model="amount"
                            inputId="amount"
                            tabindex="-1"
                            style="text-align: center"
                        />
                    </div>
                    <Button
                        icon="add"
                        outline
                        rounded
                        style="padding: 0.4rem"
                        @click.prevent="if (model.size) amount++;"
                    />
                </div>
            </div>
            <div class="add-to-cart-button">
                <Button
                    @click.prevent="
                        modalMode.preview
                            ? onSelectProduct(productIndex)
                            : modalMode.edit
                            ? addToCart()
                            : addToCart()
                    "
                    :label="
                        modalMode.preview
                            ? 'Tambah Varian Lain'
                            : modalMode.edit
                            ? 'Perbarui'
                            : 'Tambah'
                    "
                    icon="shopping_cart"
                    class="flex w-full"
                    tabindex="-1"
                    style="padding: 1rem"
                />
            </div>
        </template>

        <div class="select-variant" :class="{ hidden: modalMode.preview }">
            <div class="title">Pilih varian</div>
            <div class="options">
                <div
                    v-for="(_model, index) in products[productIndex].packaging"
                    class="options-variant"
                >
                    <RadioButton
                        name="variant"
                        :value="_model"
                        v-model="model"
                        :inputId="`variant-${index}`"
                        :checked="model.size === _model.size"
                    />
                    <label :for="`variant-${index}`">
                        <span>{{ `${_model.size} ${_model.uom}` }}</span>
                        <span>{{
                            new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(_model.price)
                        }}</span>
                    </label>
                </div>
            </div>
        </div>

        <div class="preview-product" :class="{ hidden: !modalMode.preview }">
            <div
                v-for="(item, index) in checkSameIdProductofCart(id)"
                class="preview-product-item"
            >
                <div class="label">
                    <span>Varian</span>
                    <span>{{ item.size + " " + item.uom }}</span>
                </div>
                <div class="preview-product-right">
                    <div class="price">
                        {{
                            new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(item.price)
                        }}
                    </div>
                    <div class="amount-button-set">
                        <Button
                            icon="edit_note"
                            label="Edit"
                            insStyle="gap: 0.25rem"
                            outline
                            @click="onEditProductOfCart(item)"
                        />
                        <Button
                            icon="remove"
                            @click.prevent="
                                removeProductOfCart(item.id, item.size)
                            "
                            style="padding: 0.5rem"
                        />
                        <span class="add-remove-span">{{
                            checkCart(item.id, item.size)
                                ? checkCart(item.id, item.size).amount
                                : 0
                        }}</span>
                        <Button
                            icon="add"
                            @click.prevent="
                                addProductOfCart(item.id, item.size)
                            "
                            style="padding: 0.5rem"
                        />
                    </div>
                </div>
            </div>
        </div>
    </Modal>

    <Modal
        v-model:visible="cartVisible"
        navType="back"
        :modalStyle="cartModalStyle"
        :footerStyle="{
            padding: '1.5rem 1.5rem 2.5rem 1.5rem',
            background: 'var(--surface-ground)',
        }"
        :maskStyle="{ 'z-index': 2 }"
    >
        <template #header> Keranjang </template>
        <template #footer>
            <div class="cart-footer">
                <div class="cart-footer-button">
                    <Button
                        label="Buat Transaksi"
                        @click.prevent="makeTransaction()"
                        rounded
                    />
                </div>
            </div>
        </template>

        <div class="cart-content">
            <div class="cart-product">
                <span class="cart-info-header">Informasi Keranjang</span>
                <div v-for="(item, index) in cart" class="cart-product-item">
                    <div class="cart-product-item-left">
                        <div class="left-top">
                            <span>{{ item.name }}</span>
                            <span>{{ `${item.size} ${item.uom}` }}</span>
                        </div>
                        <div class="left-bot">
                            <span class="price">{{
                                new Intl.NumberFormat().format(item.price)
                            }}</span>
                            <div>
                                <Button
                                    icon="edit_note"
                                    label="Edit"
                                    insStyle="gap:0.25rem"
                                    outline
                                    @click="onEditProductOfCart(item, true)"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="cart-product-item-right">
                        <div class="image">
                            <img
                                v-if="item.image"
                                :src="'https://omahit.my.id/' + item.image"
                                :alt="'product-' + index"
                                style="
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                "
                            />
                            <div v-else class="img-none">
                                <span class="material-symbols-outlined"
                                    >image</span
                                >
                            </div>
                        </div>
                        <div class="add-remove-set">
                            <Button
                                @click="removeProductOfCart(item.id, item.size)"
                                icon="remove"
                                style="padding: 0.5rem"
                            />
                            <span class="add-remove-span">{{
                                item.amount
                            }}</span>
                            <Button
                                @click="addProductOfCart(item.id, item.size)"
                                icon="add"
                                style="padding: 0.5rem"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-info">
                <span class="cart-info-header">Informasi Transaksi</span>
                <div class="cart-info-item">
                    <InputText
                        v-model="customer"
                        inputId="customer"
                        placeholder="Pelanggan"
                    />
                    <InputText
                        v-model="address"
                        inputId="address"
                        placeholder="Alamat"
                    />
                    <InputText
                        v-model="contact"
                        inputId="contact"
                        placeholder="No Telepon"
                    />
                    <InputNumber
                        v-model="discount"
                        inputId="discount"
                        placeholder="Diskon"
                    />
                    <InputText
                        v-model="payment"
                        inputId="payment"
                        placeholder="Metode Pembayaran"
                    />
                    <InputDate
                        v-model="due"
                        inputId="due"
                        placeholder="Jatuh Tempo"
                    />
                    <pre>{{{ due} }}</pre>
                    <InputText
                        v-model="warehouse"
                        inputId="warehouse"
                        placeholder="Gudang"
                    />
                </div>
            </div>
            <div class="cart-summary">
                <span class="cart-info-header">Ringkasan Pembayaran</span>
                <div class="detail">
                    <div class="flex justify-content-between">
                        <span>Harga</span>
                        <span>{{
                            new Intl.NumberFormat("id-ID").format(
                                countTotalPriceCart()
                            )
                        }}</span>
                    </div>
                    <div class="flex justify-content-between">
                        <span>PPN ( {{ tax * 100 }}% )</span>
                        <span>{{
                            new Intl.NumberFormat("id-ID").format(
                                countTaxCart()
                            )
                        }}</span>
                    </div>
                    <div class="flex justify-content-between">
                        <span>Diskon</span>
                        <span>{{ discount ? discount : 0 }}</span>
                    </div>
                    <div class="flex justify-content-between">
                        <span>Total Pembayaran</span>
                        <span>{{
                            new Intl.NumberFormat().format(countBill())
                        }}</span>
                    </div>
                </div>
            </div>
            <div id="success-message" class="success-message">
    <span class="icon">&#10004;</span>
    <span class="text">Transaksi berhasil</span>
</div>

        </div>
    </Modal>
</template>

<script setup>
import { useProductStore } from "../../stores/ProductStore";
import { useTransactionStore } from "../../stores/TransactionStore";
import { ref, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const transactionStore = useTransactionStore();
const products = ref([]);
const visible = ref(false);
const cartVisible = ref(false);
const modalStyle = ref({
    position: "fixed",
    bottom: "-1rem",
    height: "auto",
    width: "100%",
});
const cartModalStyle = ref({
    position: "fixed",
    bottom: "-1rem",
    height: "96%",
    width: "100%",
});
const modalMode = ref({
    view: false,
    preview: false,
    edit: false,
});
const editFromCart = ref(false);

const id = ref("");
const name = ref("");
const image = ref("");
const amount = ref(null);
const model = ref({});

const searchProduct = ref("");
const productIndex = ref(null);
const cart = ref([]);
const editedCartIndex = ref(null);

const salesId = ref(null);
const driverId = ref(null);
const customer = ref(null);
const address = ref(null);
const contact = ref(null);
const payment = ref(null);
const due = ref(null);
const tax = ref(0.11);
const discount = ref(null);
const warehouse = ref(null);

onBeforeMount(async () => {
    await productStore.getProducts();
    products.value = productStore.products;
});
watch(visible, () => {
    /** if cart modal close, then route name change to default w/o query */
    if (route.query?.cart) return;
    else if (!visible.value) router.replace({ name: route.name });
});
watch(route, (newVal) => {
    visible.value = newVal.query?.detail ? true : false;
});
watch(cartVisible, () => {
    /** if cart modal close, then route name change to default w/o query */
    if (!cartVisible.value) router.replace({ name: route.name });
});
watch(route, (newVal) => {
    cartVisible.value = newVal.query?.cart ? true : false;
});

const searchOnType = () => {
    return products.value.filter((item) =>
        item.name.includes(searchProduct.value)
    );
};
const checkSearch = (target, id) => {
    // console.log(target);
    return !target.map((item) => item.id).includes(id);
};
const openModal = () => {
    visible.value = true;
    router.push({ name: route.name, query: { detail: "open" } });
};
const closeModal = () => {
    visible.value = false;
    modalMode.view = false;
    modalMode.preview = false;
    modalMode.edit = false;
};

const onSelectProduct = (index) => {
    /** set inital value on select a product */
    id.value = products.value[index].id;
    name.value = products.value[index].name;
    image.value = products.value[index].image;
    model.value = products.value[index].packaging[0];
    amount.value = 1;

    /** pass the index of selected product and open the modal */
    productIndex.value = index;
    modalMode.value.preview = false;
    openModal();
};

const addToCart = () => {
    /** validating before push to cart */
    if (!id.value) return;
    if (!name.value) return;
    if (isNaN(amount.value)) return;
    if (amount.value < 1) return;
    if (!model.value.size) return;
    if (!model.value.uom) return;
    if (!model.value.price) return;

    let _product = checkCart(id.value, model.value.size)
        ? checkCart(id.value, model.value.size)
        : checkCart(id.value)
        ? checkCart(id.value)
        : false;

    let productToAdd = {
        id: id.value,
        name: name.value,
        amount: amount.value,
        size: model.value.size,
        uom: model.value.uom,
        price: model.value.price,
        image: image.value,
    };

    if (!modalMode.value.edit) {
        /** assign to cart */
        if (_product.id === id.value && _product.size === model.value.size) {
            productToAdd.amount = productToAdd.amount + _product.amount;
            cart.value.splice(
                checkCartIndex(id.value, model.value.size),
                1,
                productToAdd
            );
        } else {
            cart.value.push(productToAdd);
        }
        editedCartIndex.value = null;
    } else if (modalMode.value.edit) {
        cart.value.splice(editedCartIndex.value, 1);
        modalMode.value.edit = false;
        addToCart();
    }

    /** close the modal */
    closeModal();
    if (editFromCart) {
        onOpenCart();
    }
};

const checkCart = (id, size) => {
    if (cart.value.length < 1) return;
    /** match ? return Obj.product : return undefined */
    let foundProduct = size
        ? cart.value.find((p) => p.id === id && p.size === size)
        : cart.value.find((p) => p.id === id);
    if (!foundProduct) return false;
    if (foundProduct) return foundProduct;
};
const checkSameIdProductofCart = (id) => {
    /** match ? return ArrObj.product : return [] */
    return cart.value.filter((item) => item.id === id);
};
const checkCartIndex = (id, size) => {
    return size
        ? cart.value
              .map((item) => item.id === id && item.size === size)
              .indexOf(true)
        : cart.value.map((item) => item.id).indexOf(id);
};
const countSameProductOfCart = (id) => {
    return cart.value.reduce(
        (sum, p) => (p.id === id ? sum + p.amount : sum),
        0
    );
};

const addProductOfCart = (id, size) => {
    cart.value[checkCartIndex(id, size)].amount++;
};
const removeProductOfCart = (id, size) => {
    if (cart.value[checkCartIndex(id, size)].amount <= 1) {
        cart.value.splice(checkCartIndex(id, size), 1);
        return;
    }
    cart.value[checkCartIndex(id, size)].amount--;
};

const onPreviewProductOfCart = (index, product) => {
    let previewedProduct = checkCart(product.id, product.size);
    id.value = previewedProduct.id;
    name.value = previewedProduct.name;
    product.value = previewedProduct.product;
    model.value = {
        size: previewedProduct.size,
        uom: previewedProduct.uom,
        price: previewedProduct.price,
        image: previewedProduct.image,

    };
    amount.value = previewedProduct.amount;

    productIndex.value = index;
    modalMode.value.preview = true;
    openModal();
};

const onEditProductOfCart = (item, isFromCart) => {
    id.value = item.id;
    name.value = item.name;
    image.value = item.image;
    amount.value = item.amount;
    model.value = {
        size: item.size,
        uom: item.uom,
        price: item.price,
    };
    modalMode.value.edit = true;
    modalMode.value.preview = false;
    editedCartIndex.value = checkCartIndex(item.id, item.size);
    if (isFromCart) {
        visible.value = true;
        editFromCart.value = true;
    }
};

const onOpenCart = () => {
    if (!cart.value.length) return;
    cartVisible.value = true;
    router.push({ name: route.name, query: { cart: "open" } });
};
const makeTransaction = () => {
    if (!cart.value.length) {
        // Cart is empty, handle accordingly
        console.error("Cart is empty. Cannot make the transaction.");
        return;
    }

    let transaction = {
        sales_id: salesId.value ? salesId.value : 3,
        driver_id: driverId.value ? driverId.value : 1,
        customer_id: customer.value ? customer.value : 1,
        metode_pembayaran: payment.value ? payment.value : "cash",
        diskon: discount.value ? discount.value : 0,
        ppn: tax.value,
        jatuh_tempo: due.value ? due.value : new Date().toJSON(),
        details: cart.value,
    };

    console.log(due.value);

    /** post to API with store */
    transactionStore
        .postTransaction(transaction)
        .then((response) => {
            // Transaction was successful
            console.log("Transaction successful!", response);

            // Add your success message here
            document.getElementById("success-message").style.display = "block";

            // You may want to reset the form or take other actions
        })
        .catch((error) => {
            // Handle the error, show an error message, etc.
            console.error("Transaction failed:", error);

            // Optionally, you can show an error message to the user
            alert("Transaction failed. Please try again later.");
        });
};


const countTotalPriceCart = () => {
    return cart.value.length
        ? cart.value
              .map((item) => item.amount * item.price)
              .reduce((sum, c) => sum + c)
        : 0;
};
const countTaxCart = () => {
    return countTotalPriceCart() * 0.11;
};
const countBill = () => {
    let _discount = discount.value ? discount.value : 0;
    return countTotalPriceCart() + countTaxCart() - _discount;
};

const priceRange = (items) => {
    let lowest = new Intl.NumberFormat("id-ID").format(
        items.reduce(
            (min, p) => (p.price < min ? p.price : min),
            items[0].price
        )
    );
    let higest = new Intl.NumberFormat("id-ID").format(
        items.reduce(
            (max, p) => (p.price > max ? p.price : max),
            items[0].price
        )
    );
    if (lowest === higest) return lowest;
    return `${lowest} - ${higest}`;
};

//
</script>

<style lang="scss" scoped>
ul {
    padding: 0;
    margin: 0;
    list-style: none;
}

.card {
    user-select: none;
    padding: 0;
}

.search-products {
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1rem;
    padding: 0.75rem;
}

.products {
    display: flex;
    flex-direction: column;
    padding-bottom: 3rem;

    div:last-child .product-item::after {
        border-bottom: 2px dashed var(--surface-input-border);
    }

    div:first-child .product-item::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: calc(85% / 2 * -1);
        width: 85%;
        border-top: 2px dashed var(--surface-input-border);
    }

    .product-item {
        display: flex;
        position: relative;
        justify-content: space-between;
        padding: 1.5rem 1.5rem 1.5rem 2rem;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: var(--primary-a0);
        }

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: calc(85% / 2 * -1);
            width: 85%;
            border-bottom: 2px dashed var(--surface-input-border);
        }

        .product-item-left {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;

            .product-item-name {
                text-transform: capitalize;
                max-width: 10rem;
                font-weight: 500;
            }

            .product-item-rank {
                font-size: 0.8rem;
                color: var(--text-color-secondary);
            }

            .product-item-stock {
                font-size: 0.8rem;
                color: var(--text-color-secondary);
                display: flex;
                gap: 0.5rem;

                .product-item-stock-number {
                    font-weight: 500;
                    color: var(--text-color);
                }
            }

            .product-item-variant {
                display: flex;
                gap: 0.3rem;
            }

            .product-item-price {
                font-weight: 500;
                height: 100%;
                display: flex;
                align-items: end;
            }
        }

        .product-item-right {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;

            .product-item-img {
                display: flex;
                aspect-ratio: 7/6;
                width: 7rem;
            }

            .product-item-button {
                display: flex;
                align-items: center;
                justify-content: center;
                & > button {
                    width: 100%;
                }
                .product-item-button-many-var {
                    width: 100%;

                    button {
                        width: 100%;
                    }
                }
            }
        }
    }

    .product-item-marked {
        background-color: var(--primary-a1);
        .product-item-name {
            color: var(--primary-600);
        }
    }
}

.img-none {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: var(--surface-ground-darker);
    border-radius: var(--border-radius);
    border: 1px solid var(--surface-input-border);

    & > span {
        color: var(--text-color-secondary);
    }
}

.select-variant {
    user-select: none;

    .title {
        font-weight: 500;
        margin-bottom: 1rem;
    }

    .options {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .options-variant {
            display: flex;
            gap: 0.5rem;

            label {
                display: flex;
                width: 100%;
                justify-content: space-between;
            }
        }
    }
}
.success-message {
    display: none;
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4caf50;
    color: #fff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: fadeInOut 4s ease-in-out; /* Add a fade-in/fade-out animation */
}

.success-message .icon {
    font-size: 24px;
    margin-right: 10px;
}

/* Animation keyframes */
@keyframes fadeInOut {
    0%, 100% {
        opacity: 0;
    }
    10%, 90% {
        opacity: 1;
    }
}

.preview-product {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;

    .preview-product-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 2px dashed var(--surface-input-border);
        &:first-child {
            border-top: 2px dashed var(--surface-input-border);
        }

        .label {
            display: flex;
            flex-direction: column;
        }

        .preview-product-right {
            display: flex;
            flex-direction: column;
            align-items: end;
            gap: 0.5rem;

            .amount-button-set button:first-child {
                padding: calc(0.5rem - 2px);
                margin-right: 1rem;
            }
        }
    }
}
span.add-remove-span {
    display: inline-block;
    padding: 0 0.5rem;
    width: 3rem;
    text-align: center;
}
.summ {
    display: flex;
    justify-content: space-between;
    padding-top: 1.5rem;
    border-top: 2px dashed var(--surface-input-border);
}

.add-to-cart-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3rem 0 1.25rem 0;
    user-select: none;

    .amount-set {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        .amount {
            width: 2.5rem;

            input[type="number"] {
                width: 100%;
                padding: 0.5rem 0;
                border: none;
            }
        }
    }
}

.cart-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0 1.25rem 1.5rem 1.25rem;

    .cart {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
        box-sizing: border-box;
        border-radius: var(--border-radius-2);
        box-shadow: var(--box-shadow-set);
        transition: all 0.2s ease;
        user-select: none;

        // <!-- Pilih style cart -->

        // GLASSMORPHISM
        // color: var(--text-primary);
        // background: var(--primary-a7);
        // border: 2px solid var(--primary-a7);
        // backdrop-filter: blur(15px);

        // OUTLINED
        // color: var(--primary);
        // background: var(--surface-card);
        // border: 2px solid var(--primary);

        // FILLED
        color: var(--text-primary);
        background: var(--primary);
        border: 1px solid var(--primary-200);

        &:hover {
            filter: brightness(90%);
        }
        &:active {
            filter: brightness(100%);
        }
        &:focus {
            outline: 3px solid var(--primary-a);
        }

        .cart-amount-item {
            display: flex;
            gap: 0.5rem;
            align-items: center;

            span:first-child {
                font-size: 1.5rem;
            }
        }
    }
}

.cart-footer {
    .cart-footer-button {
        width: 100%;
        button {
            width: 100%;
        }
    }
}

.cart-content {
    .cart-info {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        .cart-info-item {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
    .cart-product {
        display: flex;
        flex-direction: column;
        user-select: none;

        .cart-product-item {
            display: flex;
            justify-content: space-between;
            padding: 1.5rem 0;
            border-bottom: 2px dashed var(--text-color-secondary);
            &:first-of-type {
                border-top: 2px dashed var(--text-color-secondary);
            }

            .cart-product-item-left {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .left-top {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;

                    & span:first-child {
                        text-transform: capitalize;
                    }

                    & span:first-child {
                        font-weight: 600;
                    }
                }
                .left-bot {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;

                    button {
                        padding: calc(0.5rem - 2px);
                    }
                }
            }
            .cart-product-item-right {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                .image {
                    display: flex;
                    aspect-ratio: 7/6;
                    width: 7rem;
                }
            }
        }
    }
    .cart-summary {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        .detail {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            & > div:last-child {
                font-weight: 600;
                padding-top: 0.5rem;
                border-top: 2px dashed var(--text-color-secondary);
            }
        }
    }

    .cart-info-header {
        font-weight: 600;
        margin-bottom: 1rem;
    }
}
</style>

<template>
    <div class="greeting">
        <span class="greet">Hi Thomas,</span>
        <div class="span message">Welcome back!</div>
    </div>

    <div class="report-wrapper">
        <div class="report">
            <div
                v-for="(report, index) in reports"
                class="report-item"
                :class="'bg-' + index"
            >
                <div class="report-item-left">
                    <div class="report-item-icon">
                        <span class="material-symbols-outlined">
                            {{
                                `${
                                    report.period === "today"
                                        ? "today"
                                        : report.period === "week"
                                        ? "date_range"
                                        : report.period === "month"
                                        ? "calendar_month"
                                        : report.period === "year"
                                        ? "event_note"
                                        : "calendar_today"
                                }`
                            }}
                        </span>
                    </div>
                    <div class="report-item-text">
                        <span>{{
                            `transaksi ${
                                report.period === "today"
                                    ? "hari"
                                    : report.period === "week"
                                    ? "minggu"
                                    : report.period === "month"
                                    ? "bulan"
                                    : report.period === "year"
                                    ? "tahun"
                                    : ""
                            } ini`
                        }}</span
                        ><span>{{
                            reportStore.formatCurrency(report.amount)
                        }}</span>
                    </div>
                </div>
                <div
                    class="report-item-percentage"
                    :class="{
                        'percentage-minus': report.percentage <= 0,
                        'percentage-plus': report.percentage > 0,
                    }"
                >
                    {{ report.percentage }}%
                </div>
            </div>
        </div>
    </div>

    <ul class="layout-menu">
        <li
            class="layout-menuitem"
            v-for="(item, index) in menuItemStore.getHomeChildren"
        >
            <router-link :to="item.to">
                <div class="layout-menuitem-icon">
                    <span class="material-symbols-outlined">{{
                        item.icon
                    }}</span>
                </div>
                <div class="layout-menuitem-text">
                    <span>{{ item.label }}</span>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script setup>
import { useMenuItemStore } from "../stores/MenuItemStore";
import { useReportStore } from "../stores/ReportStore";
import { ref, onBeforeMount } from "vue";

const menuItemStore = useMenuItemStore();
const reportStore = useReportStore();

const reports = ref([]);

onBeforeMount(async () => {
    await reportStore.getReport();
    reports.value = reportStore.report;
});

//
</script>

<style scoped lang="scss">
.greeting {
    margin: 0 0 1.25rem 0.5rem;
    font-weight: 500;
    user-select: none;
    .greet {
        font-size: 1.75rem;
        font-weight: 700;
    }
}

.report-wrapper {
    position: relative;
    width: 100%;
    height: 10rem;
    overflow-x: scroll;
    overflow-y: visible;

    &::-webkit-scrollbar {
        width: 0;
    }

    display: flex;
    align-items: center;

    .report {
        z-index: -1;
        position: absolute;
        display: flex;
        flex-direction: row;
        gap: 1.25rem;
        user-select: none;

        .bg-0 {
            background-color: var(--primary);
        }
        .bg-1 {
            background-color: var(--cyan-500);
        }
        .bg-2 {
            background-color: var(--red-500);
        }
        .bg-3 {
            background-color: var(--indigo-500);
        }

        .report-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            width: 20rem;
            color: var(--text-primary);

            border-radius: var(--border-radius);
            border: 1px solid var(--surface-border);
            // box-shadow: var(--box-shadow-set);
            transition: box-shadow, filter 0.2s ease;

            &:hover {
                box-shadow: var(--box-shadow-set-hover);
            }
            .report-item-left {
                display: flex;
                flex-direction: row;
                gap: 1rem;
            }
            .report-item-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                // color: var(--text-color-secondary);
                color: var(--text-primary);

                span {
                    font-size: 1.75rem;
                }
            }
            .report-item-text {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;

                span:first-of-type {
                    // color: var(--text-color-secondary);
                    text-transform: uppercase;
                    font-size: 0.75rem;
                }

                span:last-of-type {
                    font-weight: 500;
                }
            }
            .report-item-percentage {
                background-color: var(--surface-card);
                padding: 0.2rem 0;
                width: 4rem;
                border-radius: var(--border-radius);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 500;
            }
            .percentage-minus {
                color: var(--red-600);
            }
            .percentage-plus {
                color: var(--green-600);
            }
        }
    }
}

.layout-menu {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin-bottom: 1.25rem;
    padding: 0;
    list-style: none;
    user-select: none;

    .layout-menuitem {
        background-color: var(--surface-card);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        transition: box-shadow, filter 0.2s ease;
        box-shadow: var(--box-shadow-set);
        aspect-ratio: 5/4;

        a {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 1rem;
            height: 100%;
            width: 100%;
        }

        &:hover {
            box-shadow: var(--box-shadow-set-hover);
        }
        &:active {
            filter: brightness(95%);
        }

        .layout-menuitem-icon {
            width: 3rem;
            height: 3rem;
            background-color: var(--surface-ground-darker);
            border-radius: 50%;
            border: 1px solid var(--surface-border);
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                font-size: 2rem;
                color: var(--primary);
            }
        }

        .layout-menuitem-text {
            margin-top: 0.5rem;
            color: var(--text-color);
            font-weight: 600;
            font-size: 0.9rem;
        }
    }
}
</style>

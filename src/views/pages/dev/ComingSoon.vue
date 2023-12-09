<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
    <div class="container">
        <div class="company">
            <span>dandang apps</span>
        </div>
        <div class="content">
            <span class="header">Coming soon!</span>
            <p class="message">
                Halaman ini sedang dibangun. Silakan kembali ke halaman utama.
            </p>
            <div class="footer">
                <Button
                    style="background-color: var(--tone-green)"
                    label="Kembali"
                    @click="router.push({ name: 'home' })"
                />
            </div>
        </div>
        <div class="dev">
            <span>Omah IT</span>
            <div class="contact">
                <a
                    tabindex="-1"
                    href="https://www.linkedin.com/in/i-gede-wahyu-sedana/"
                    ><i class="pi pi-linkedin"
                /></a>
                <span>|</span>
                <a tabindex="-1" href="https://github.com/gede-wahyu"
                    ><i class="pi pi-github"
                /></a>
                <span>|</span>
                <a
                    tabindex="-1"
                    href="https://www.linkedin.com/in/thomas-edwin-suryo-prayogo-02670a212/"
                    ><i class="pi pi-linkedin"
                /></a>
                <span>|</span>
                <a tabindex="-1" href="https://github.com/Thomasborn"
                    ><i class="pi pi-github"
                /></a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100vh;
    padding: 2rem 15vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient((to right bottom, #46c4ff, #58e0a9));
    .company {
        text-transform: uppercase;
        font-size: 0.75rem;
        font-weight: 600;
        text-align: center;
    }
    .content {
        color: var(--text-primary);
        text-align: center;
        .header {
            font-size: 2rem;
            font-weight: 600;
        }
        .message {
            margin-top: 0.75rem;
            line-height: 1.5rem;
            font-size: 0.9rem;
        }
        .footer {
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
        }
    }
    .dev {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
        text-align: center;
        text-transform: uppercase;

        & > span {
            font-size: 0.75rem;
            font-weight: 600;
        }
        .contact {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 0.5rem;
            a,
            span {
                color: var(--text-color);
            }
        }
    }
}
</style>

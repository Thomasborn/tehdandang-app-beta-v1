<template>
    <div class="dev">
        <span>Omah IT</span>
        <div class="contact">
            <a
                tabindex="-1"
                style="color: var(--text-color)"
                href="https://www.linkedin.com/in/i-gede-wahyu-sedana/"
                ><i class="pi pi-linkedin"
            /></a>
            <span>|</span>
            <a
                tabindex="-1"
                style="color: var(--text-color)"
                href="https://github.com/gede-wahyu"
                ><i class="pi pi-github"
            /></a>
            <span>|</span>
            <a
                tabindex="-1"
                style="color: var(--text-color)"
                href="https://www.linkedin.com/in/thomas-edwin-suryo-prayogo-02670a212/"
                ><i class="pi pi-linkedin"
            /></a>
            <span>|</span>
            <a
                tabindex="-1"
                style="color: var(--text-color)"
                href="https://github.com/Thomasborn"
                ><i class="pi pi-github"
            /></a>
        </div>
    </div>
</template>

<style scoped>
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

        span {
            color: var(--text-color);
        }
    }
}
</style>

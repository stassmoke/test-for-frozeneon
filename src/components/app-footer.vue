<template>
    <v-footer
            dark
            padless
            class="footer-base"

    >
        <v-card
                flat
                tile
                class="indigo lighten-1 white--text text-center"
        >

            <div class="footer-desc">
                <a class="footer-link" href="#">Git</a>
                <a class="footer-link" href="https://telegram.im/@k_stanislav1">Telegram</a>
                <div class="footer-dev__name">Stanislav Kulynych</div>
                <div class="img-holder footer-dev__img">
                    <img src="../../public/img/dev-img.jpg" alt="">
                </div>
            </div>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">

    .img-holder {
        width: 100%;
        height: auto;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
        }
    }

    .footer-dev__img {
        max-width: 5em;
        max-height: 5em;
        overflow: hidden;
        border-radius: 50%;
    }

    .footer-link {
        font-size: 1.3em;
        margin-right: 1em;
        color: white!important;
        text-decoration: none;

        @media screen and (max-width: 576px){
            margin: 0 0 1em 0;
        }
    }

    .footer-dev__name {
        font-size: 1.3em;
        color: wheat;
        margin-right: 1em;

        @media screen and (max-width: 576px){
            margin: 0 0 1em 0;
        }
    }

    .footer-desc {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;

        @media screen and (max-width: 576px){
            flex-direction: column;
        }
    }

    .v-footer {
        &.footer-base {
            display: block;
        }
    }




</style>
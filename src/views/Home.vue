<template>
    <Header class="sticky top-0 w-screen" />
    <Home />
    <Footer />
</template>

<script>
import Header from "../components/Utilities/Header.vue";
import Home from "../components/Home/Index.vue";
export default {
    components: {
        Header,
        Home
    },
};
</script>

<style>
</style>
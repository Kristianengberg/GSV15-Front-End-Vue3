<template>
    <div class="flex justify-between mx-20 space-x-24">
        <MembersList />
        <Posts />
        <Events />
    </div>
</template>

<script>
import MembersList from "./MembersList.vue"
import Posts from "./Posts.vue"
import Events from "./Events.vue"


export default {
    components: {
        MembersList,
        Posts,
        Events
    },
    setup() {


        return {

        }
    }
}
</script>

<style>
</style>
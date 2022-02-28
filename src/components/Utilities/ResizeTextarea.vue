<script>
import { ref } from '@vue/reactivity'
import { onMounted } from 'vue'
export default {

    setup(props, context) {

        const el = ref(null)

        const resizeTarget = (target) => {
            target.style.height = 'auto'
            target.style.height = `${target.scrollHeight}px`
        }

        const resize = (e) => {
            resizeTarget(e.target)
        }

        onMounted(() => {
            resizeTarget(el.value)
        })

        return () => context.slots.default({
            resize,
            el
        })

    },
}
</script>
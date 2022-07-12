/**
 * @author MaZiXiao
 * @date 2022-07-11 19:14
 */

export default {
    namespaced: true,
    state: {
        tags: []
    },
    mutations: {
        addTag(state, tag) {
            const index = state.tags.findIndex(val => val.path === tag.path)
            if (index >= 0) return
            state.tags.push(tag)
        },
        delTag(state, index) {
            state.tags.splice(index, 1)
        },
        removeTag(state) {
            state.tags = []
        }
    }
}

import {
  fetchItems,
  fetchSingle,
  fetchSingleById
} from '@/api'

export default {
  getSingleBySlug({ getters, commit }, { type, slug, showLoading = false }) {
    if ( ! getters.singleBySlug({ type, slug }) ) {
      if (showLoading) {
        commit('SET_LOADING', true)
      }
      return fetchSingle({ type, params: { slug } }).then(({ data: [ item ] }) => {

        commit('ADD_ITEM', { type, item  })
        if (showLoading) {
          commit('SET_LOADING', false)
        }
        return item
      })
    }
  },
  getBriefDefinition({ getters, commit }, text){
    const type ='definition';
    const slug=`definition-of-${text}`;
    if ( !getters.singleBySlug({ type:'definition', slug:slug}) ) {
      const request = { type, params: { slug:slug,_fields:['brief','id','link','slug','title'] } };
      return fetchSingle(request).then(({ data: [ item ] }) => {
        commit('ADD_ITEM', { type:'definition', item  })
        // if (showLoading) {
        //   commit('SET_LOADING', false)
        // }
        return item;
      })
    }
    console.log(getters.singleBySlug({ type:'definition', slug: slug }));
    return getters.singleBySlug({ type:'definition', slug: slug });
  },
  getSingleById({ getters, commit }, { type, id, showLoading = false, batch = false }) {
    if ( ! getters.singleById({ type, id }) ) {
      if ( showLoading ) {
        commit('SET_LOADING', true)
      }
      return fetchSingleById({ type, id, batch }).then(({ data }) => {
        if (batch) {
          data.forEach(item => commit('ADD_ITEM', { type, item }))
        } else {
          commit('ADD_ITEM', { type, item: data  })
        }
        if (showLoading) {
          commit('SET_LOADING', false)
        }
      })
    }
  },
  getItems({ getters, commit }, { type, params, showLoading = false }) {
    if ( ! getters.request({ type, params }) ) {
      if (showLoading) {
        commit('SET_LOADING', true)
      }
      return fetchItems({ type, params })
		  .then(({ data: items, headers: { 'x-wp-total': total, 'x-wp-totalpages': totalPages } }) => {
          items.forEach(item => commit('ADD_ITEM', { type, item }))
          commit('ADD_REQUEST', { type, request: { params, total: parseInt(total), totalPages: parseInt(totalPages), data: items.map(i => i.id) } })
          if (showLoading) {
            commit('SET_LOADING', false)
          }
        })
    }
  },
  updateDocTitle ({ state, commit }, { parts = [], sep = ' – ' }) {
    commit('SET_DOC_TITLE', parts.join(sep))
    document.title = state.site.docTitle
  },
}

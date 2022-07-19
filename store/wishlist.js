import { fireStoreWishlist as conf } from "~/wedvite.config";
import firebase from "firebase/app";
import { fireDb } from "~/plugins/firebase";
import { makeid } from '~/helpers/random';
import { orderBy, pickBy } from "lodash";

export const state = () => ({
  list: [],
  loading: false
});

export const actions = {
  getWishlist({ commit }) {
    commit("SET_LOADING", true);
    fireDb
      .collection(conf.collection)
      .doc(conf.doc)
      .onSnapshot(doc => {
        commit("SET_LOADING", false);

        doc = doc.data();
        // console.log("Current data: ", doc);
        if (doc?.list) commit("SET_WISHLIST", Object.values(doc.list));
      });
  },
  updateList({ }, list) {
    if (list?.id) {
      fireDb
        .collection(conf.collection)
        .doc(conf.doc)
        .update({
          [`list.${list.id}`]: pickBy(list)
        })
    }
  },
  importWishlist({ }, wishlist = []) {
    const updated = {}
    wishlist.forEach(list => {
      const id = makeid();
      updated[`list.${id}`] = {
        ...list,
        id,
      }
    });

    console.log({ updated });

    fireDb
      .collection(conf.collection)
      .doc(conf.doc)
      .update(updated)
  },
  deleteList({ }, id) {
    fireDb
      .collection(conf.collection)
      .doc(conf.doc)
      .update({
        [`list.${id}`]: firebase.firestore.FieldValue.delete()
      })
  }
}

export const mutations = {
  SET_WISHLIST(state, data) {
    state.list = orderBy(data, ['sponsoredBy', 'item'], ['desc', 'asc']);
  },
  SET_LOADING(state, val) {
    state.loading = val;
  }
};
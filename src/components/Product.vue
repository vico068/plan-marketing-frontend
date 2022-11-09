<template>
  <div>
    <a-list
      class="demo-loadmore-list"
      :loading="initLoading"
      item-layout="horizontal"
      :data-source="products"
    >
      <template #loadMore>
        <div
          v-if="!initLoading && !loading"
          :style="{
            textAlign: 'center',
            marginTop: '12px',
            height: '32px',
            lineHeight: '32px',
          }"
        ></div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <RouterLink :to="{ path: 'edit/' + item.id }"
              ><a key="list-loadmore-edit">Editar</a></RouterLink
            >
            <a key="list-loadmore-more" @click="removeProduct(item)">Excluir</a>
          </template>
          <a-skeleton avatar :title="false" :loading="!!item.loading" active>
            <a-list-item-meta>
              <template #description>
                {{ item.description }}
              </template>
              <template #title>
                {{ item.name }}
              </template>
              <template #avatar>
                <img :src="item.thumbnail_url" width="125" height="125" />
              </template>
            </a-list-item-meta>
            <div>
              <span class="price">{{ item.price }}</span>
            </div>
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
const apiEndPoint = `http://localhost:8000/api/products`;
export default defineComponent({
  setup() {
    const initLoading = ref(true);
    const loading = ref(false);
    const store = useStore();

    const products = computed(function () {
      return store.state.products;
    });

    onMounted(() => {
      fetch(apiEndPoint)
        .then((res) => res.json())
        .then((res) => {
          initLoading.value = false;
          console.log(res);
          store.commit("setProducts", res.data);
        });
    });

    return {
      removeProduct: (item) => {
        fetch(`${apiEndPoint}/${item.id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            message.success("Produto deletado com sucesso");
            store.commit("removeProduct", item);
          })
          .catch(() => {
            message.error("Ocorreu um erro ao deletaro produto");
          });
      },
      loading,
      initLoading,
      products,
    };
  },
});
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}
.price {
  color: hsl(26deg 98% 55%);
  font-size: 24px;
}
</style>

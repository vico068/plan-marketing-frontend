<template>
  <div style="height: 100vh">
    <div
      style="
        width: 500px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
      "
    >
      <a-form
        layout="horizontal"
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item>
          <a-input v-model:value="formState.name" placeholder="Nome">
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-textarea
            v-model:value="formState.description"
            placeholder="Descricao"
          >
          </a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formState.user === '' || formState.password === ''"
          >
            Atualizar
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const initLoading = ref(true);
    const loading = ref(false);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const productId = route.params.productId;
    const apiEndPoint = `http://localhost:8000/api/products/${productId}`;
    const productEdit = computed(function () {
      return store.state.productEdit;
    });

    const formState = reactive({
      name: "",
      description: "",
    });

    onMounted(() => {
      fetch(apiEndPoint)
        .then((res) => res.json())
        .then((res) => {
          initLoading.value = false;
          store.commit("setProductEdit", res.data);
          formState.name = res.data.name;
          formState.id = res.data.id;
          formState.description = res.data.description;
        });
    });

    const handleFinish = (values) => {
      console.log(values, formState);
      updateProduct(formState);
    };
    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    const updateProduct = (form) => {
      fetch(`${apiEndPoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((res) => {
          message.success(res.msg);
          router.push({
            name: "home",
          });
          //store.commit("removeProduct", item);
        })
        .catch(() => {
          message.error("Ocorreu um erro ao editar os produto");
        });
    };

    return {
      loading,
      initLoading,
      formState,
      updateProduct,
      handleFinish,
      handleFinishFailed,
      productEdit,
    };
  },
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

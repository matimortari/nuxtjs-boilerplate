<template>
  <Dialog :is-open="isOpen" :title="t('forgotPassword.title')" @update:is-open="close">
    <form class="flex flex-col gap-4 p-4" @submit.prevent="resetPassword">
      <input v-model="email" required type="email" :placeholder="t('forgotPassword.emailPlaceholder')">

      <p v-if="authError" class="text-sm text-danger">{{ authError }}</p>
      <p v-if="authSuccess" class="text-sm text-success">{{ authSuccess }}</p>
    </form>

    <template #footer>
      <button class="btn-secondary" @click="close">{{ t("dialog.closeButton") }}</button>
      <button class="btn-primary" @click="resetPassword">{{ t("dialog.confirmButton") }}</button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { supabase } from "~/lib/supabase"

const { t } = useI18n()

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(["update:isOpen"])

const email = ref("")
const authSuccess = ref("")
const authError = ref("")

function close() {
  emit("update:isOpen", false)
}

watch(() => props.isOpen,
  (value) => {
    if (value) {
      email.value = ""
      authSuccess.value = ""
      authError.value = ""
    }
  }
)

async function resetPassword() {
  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/auth/new-password`
  })
  if (error) {
    authError.value = t("forgotPassword.invalidEmail")
    setTimeout(() => (authError.value = ""), 5000)
  } else {
    authSuccess.value = t("forgotPassword.successMessage")
    setTimeout(() => {
      authSuccess.value = ""
      close()
    }, 5000)
  }
}
</script>

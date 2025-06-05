<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <header class="my-4 flex flex-col items-center justify-center gap-2">
      <h2>{{ t("pages.newPassword.title") }}</h2>
    </header>

    <form class="flex flex-col items-center justify-center gap-4" @submit.prevent="updatepassword">
      <p v-if="authError" class="text-danger">
        {{ authError }}
      </p>
      <p v-if="authSuccess" class="text-success">
        {{ authSuccess }}
      </p>

      <input v-model="password" type="password" :placeholder="t('pages.newPassword.passwordPlaceholder')">
      <input v-model="passwordConfirm" type="password" :placeholder="t('pages.newPassword.repeatPlaceholder')">

      <button type="submit" class="btn-primary">
        {{ t("pages.newPassword.submitButton") }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { supabase } from "~/lib/supabase"

const { t } = useI18n()

useHead({
  title: t("pages.newPassword.meta.title"),
  meta: [{ name: "description", content: t("pages.newPassword.meta.description") }]
})
useSeoMeta({
  title: t("pages.newPassword.meta.title"),
  description: t("pages.newPassword.meta.description")
})

const password = ref("")
const passwordConfirm = ref("")
const authSuccess = ref("")
const authError = ref("")

async function updatepassword() {
  if (password.value !== passwordConfirm.value) {
    authError.value = t("pages.newPassword.passwordMismatch")
    return
  }
  const { error } = await supabase.auth.updateUser({
    password: password.value
  })
  await supabase.auth.signOut()
  if (error) {
    authError.value = t("pages.newPassword.updateFailed")
    setTimeout(() => {
      authError.value = ""
    }, 5000)
  }
  else {
    authSuccess.value = t("pages.newPassword.updateSuccess")
    setTimeout(() => {
      authSuccess.value = ""
      navigateTo("/auth/login")
    }, 5000)
  }
}
</script>

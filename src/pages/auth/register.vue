<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <header class="my-4 flex flex-col items-center justify-center gap-2">
      <h2>{{ t("pages.register.title") }}</h2>
    </header>

    <form class="flex flex-col items-center justify-center gap-4" @submit.prevent="register">
      <p v-if="authError" class="text-danger">{{ authError }}</p>

      <input v-model="name" type="text" :placeholder="t('pages.register.firstNamePlaceholder')">
      <input v-model="lastname" type="text" :placeholder="t('pages.register.lastNamePlaceholder')">
      <input v-model="email" type="text" :placeholder="t('pages.register.emailPlaceholder')">
      <input v-model="password" type="password" :placeholder="t('pages.register.passwordPlaceholder')">

      <div class="flex w-full max-w-sm flex-row items-center justify-center gap-2">
        <button type="submit" class="btn-primary">{{ t("pages.register.submitButton") }}</button>
      </div>

      <p class="my-4 text-sm">
        {{ t("pages.register.agreementText") }}
        <a href="https://policies.google.com/terms" class="font-semibold text-primary">
          {{ t("pages.register.termsOfService") }}
        </a>
        {{ t("pages.register.and") }}
        <a href="https://policies.google.com/privacy" class="font-semibold text-primary">
          {{ t("pages.register.privacyPolicy") }}</a>.
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { supabase } from "~/lib/supabase"

const user = useSupabaseUser()
const { t } = useI18n()

const email = ref("")
const password = ref("")
const name = ref("")
const lastname = ref("")
const authError = ref("")

useHead({
  title: t("pages.register.meta.title"),
  meta: [{ name: "description", content: t("pages.register.meta.description") }]
})
useSeoMeta({
  title: t("pages.register.meta.title"),
  description: t("pages.register.meta.description")
})

watchEffect(async () => {
  if (user.value) {
    await navigateTo("/")
  }
})

const register = async () => {
  authError.value = ""
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })

  if (error) {
    authError.value = error.message
    return
  }

  const user = data.user
  if (user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id
    })
    if (profileError) authError.value = profileError.message
  }
}
</script>

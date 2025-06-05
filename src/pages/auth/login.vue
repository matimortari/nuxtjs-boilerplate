<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <header class="my-4 flex flex-col items-center justify-center gap-2">
      <h2>{{ t("pages.login.title") }}</h2>
    </header>

    <form class="flex flex-col items-center justify-center gap-4" @submit.prevent="login">
      <p v-if="authError" class="text-danger">
        {{ authError }}
      </p>

      <input v-model="email" type="text" :placeholder="t('pages.login.emailPlaceholder')">
      <input v-model="password" type="password" :placeholder="t('pages.login.passwordPlaceholder')">

      <div class="flex w-full max-w-sm flex-row items-center justify-center gap-2">
        <button type="submit" class="btn-primary">
          {{ t("pages.login.submitButton") }}
        </button>
        <button class="btn-secondary" @click="showForgotPassword = true">
          {{ t("pages.login.forgotPassword") }}
        </button>
      </div>
    </form>

    <div class="my-4 flex flex-col items-center gap-2">
      <p class="text-sm text-muted-foreground">
        {{ t("pages.login.orSignInWith") }}
      </p>
      <div class="flex gap-4">
        <button class="btn bg-[#db4437] text-[#ebe8e8]" @click="signInWithGoogle">
          <Icon name="simple-icons:google" size="20" />
          {{ t("pages.login.googleLogin") }}
        </button>
        <button class="btn bg-[#333333] text-[#ebe8e8]" @click="signInWithGithub">
          <Icon name="simple-icons:github" size="20" />
          {{ t("pages.login.githubLogin") }}
        </button>
      </div>
    </div>

    <ForgotPassword :is-open="showForgotPassword" @update:is-open="showForgotPassword = $event" />

    <p class="my-4 text-sm">
      {{ t("pages.login.noAccount") }}
      <a href="https://policies.google.com/terms" class="font-semibold text-primary">
        {{ t("pages.login.createAccount") }}
      </a>.
    </p>
  </div>
</template>

<script setup lang="ts">
import { supabase } from "~/lib/supabase"

const user = useSupabaseUser()
const { t } = useI18n()

useHead({
  title: t("pages.login.meta.title"),
  meta: [{ name: "description", content: t("pages.login.meta.description") }]
})
useSeoMeta({
  title: t("pages.login.meta.title"),
  description: t("pages.login.meta.description")
})

watchEffect(async () => {
  if (user.value) {
    await navigateTo("/")
  }
})

const authError = ref("")
const email = ref("")
const password = ref("")
const showForgotPassword = ref(false)

async function login() {
  authError.value = ""
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    authError.value = error.message
    return
  }

  const user = data.user
  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError)
      authError.value = profileError.message
    // eslint-disable-next-line no-console
    else console.log("User profile:", profile)
  }
}

async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "/"
    }
  })
  if (error) {
    authError.value = t("pages.login.oauthError")
    setTimeout(() => {
      authError.value = ""
    }, 5000)
  }
}

async function signInWithGithub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "/"
    }
  })
  if (error) {
    authError.value = t("pages.login.oauthError")
    setTimeout(() => {
      authError.value = ""
    }, 5000)
  }
}
</script>

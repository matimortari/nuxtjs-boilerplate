<template>
  <nav class="flex w-full flex-row items-center justify-between gap-2 p-4">
    <div class="flex flex-row items-center gap-2">
      <NuxtLink to="/">
        <Icon name="simple-icons:nuxt" size="35" class="text-primary" />
      </NuxtLink>

      <div v-if="user" class="flex flex-row items-center gap-2">
        <p class="text-sm">
          {{ t("pages.index.greeting") }},
          <span class="font-semibold text-primary">{{ user.user_metadata.first_name }}</span>
        </p>
        <button class="btn" @click="logout">
          {{ t("pages.index.logout") }}
        </button>
      </div>

      <div v-else class="flex flex-row items-center gap-2">
        <p class="text-sm">
          {{ t("pages.index.unauthenticated") }}
        </p>
        <NuxtLink to="/auth/login" class="btn">
          {{ t("pages.index.login") }}
        </NuxtLink>
        <NuxtLink to="/auth/register" class="btn">
          {{ t("pages.index.register") }}
        </NuxtLink>
      </div>
    </div>

    <div class="flex flex-row items-center gap-2">
      <a href="https://github.com/matimortari/nuxtjs-boilerplate" class="btn">
        <Icon name="simple-icons:github" size="20" />
      </a>

      <button class="btn" @click="toggleTheme">
        <Icon :name="iconName" size="20" />
      </button>

      <LanguageSelector />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { supabase } from "~/lib/supabase"

const user = useSupabaseUser()
const { t } = useI18n()
const { toggleTheme, colorMode } = useTheme()

const iconName = computed(() =>
  colorMode.value === "light" ? "ph:moon" : "ph:sun"
)

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    // eslint-disable-next-line no-alert
    return alert(t("pages.index.errorLogout"))
  }
}
</script>

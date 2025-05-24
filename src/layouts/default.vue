<template>
  <div>
    <Navbar />

    <main class="min-h-screen">
      <slot />
    </main>

    <footer class="py-4 text-center text-xs">
      <p>
        {{ t("footer.taglineStart") }}
        <a href="https://supabase.com/privacy" class="text-primary">{{ t("footer.taglineHighlightStart") }}</a>
        {{ t("footer.taglineMiddle") }}
        <a href="https://supabase.com/terms" class="text-primary">{{ t("footer.taglineHighlightEnd") }}</a>
        {{ t("footer.taglineEnd") }}
      </p>

      <p>© {{ new Date().getFullYear() }} - {{ $t("site.name") }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useLocaleHead({
  dir: true,
  key: "id",
  seo: true,
  lang: true
})
</script>

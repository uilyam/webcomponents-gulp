module.exports = `
<template id="{{ element }}-template">
    <link rel="stylesheet" href="/src/{{ fileName }}/{{ fileName }}.css">
    <div>
        <p class="example-text">{{ component }} works!</p>
    </div>
</template>
<script type="text/javascript" src="/src/{{ fileName }}/{{ fileName }}.js"></script>
`
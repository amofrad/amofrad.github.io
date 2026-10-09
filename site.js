// The site remains fully navigable without JavaScript.
document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
});

// Expired upcoming labels are removed without implying that a planned talk occurred.
document.querySelectorAll('[data-upcoming-end]').forEach((node) => {
    if (Date.now() >= Date.parse(node.dataset.upcomingEnd)) {
        node.hidden = true;
    }
});

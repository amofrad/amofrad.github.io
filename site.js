// The site remains fully navigable without JavaScript.
// Keep anchor targets clear of the sticky header, including when navigation wraps.
const siteHeader = document.querySelector('.site-header');
if (siteHeader && 'ResizeObserver' in window) {
    new ResizeObserver(() => {
        document.documentElement.style.setProperty('--header-height', `${siteHeader.getBoundingClientRect().height}px`);
    }).observe(siteHeader);
}

document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
});

// Expired upcoming labels are removed without implying that a planned talk occurred.
document.querySelectorAll('[data-upcoming-end]').forEach((node) => {
    if (Date.now() >= Date.parse(node.dataset.upcomingEnd)) {
        node.hidden = true;
    }
});

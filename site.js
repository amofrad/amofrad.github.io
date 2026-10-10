// The site remains fully navigable without JavaScript.
// Keep anchor targets clear of the sticky header.
const siteHeader = document.querySelector('.site-header');
if (siteHeader && 'ResizeObserver' in window) {
    new ResizeObserver(() => {
        document.documentElement.style.setProperty('--header-height', `${siteHeader.getBoundingClientRect().height}px`);
    }).observe(siteHeader);
}

// Keep the full navigation as a fallback when JavaScript is unavailable.
const navigation = document.querySelector('.nav');
const menuToggle = navigation?.querySelector('.menu-toggle');
const menuLinks = navigation?.querySelector('.nav-links');
if (menuToggle && menuLinks) {
    const compactNavigation = window.matchMedia('(max-width: 400px)');
    const setMenuOpen = (open) => {
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        menuLinks.toggleAttribute('data-open', open);
    };

    menuToggle.addEventListener('click', () => {
        setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('click', (event) => {
        if (!navigation.contains(event.target)) setMenuOpen(false);
    });
    document.addEventListener('focusin', (event) => {
        if (!navigation.contains(event.target)) setMenuOpen(false);
    });
    navigation.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });
    const updateNavigation = () => {
        const compact = compactNavigation.matches;
        const moveFocus = compact
            ? menuLinks.contains(document.activeElement)
            : document.activeElement === menuToggle;
        setMenuOpen(false);
        // Update visibility after checking focus so a hidden link does not lose it.
        navigation.toggleAttribute('data-compact', compact);
        if (moveFocus) (compact ? menuToggle : menuLinks.querySelector('a')).focus();
    };
    compactNavigation.addEventListener('change', updateNavigation);

    menuToggle.hidden = false;
    updateNavigation();
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

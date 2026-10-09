// Apply the preference before styles load, avoiding a flash of the wrong theme.
(() => {
    const key = 'academic-profile-theme';
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const valid = (value) => value === 'light' || value === 'dark';
    let preference = null;

    try {
        const saved = localStorage.getItem(key);
        if (valid(saved)) preference = saved;
    } catch (_) {
        // The switch still works when browser storage is unavailable.
    }

    function apply() {
        const theme = preference || (system.matches ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
        const color = document.querySelector('meta[name="theme-color"]');
        if (color) color.content = theme === 'dark' ? '#141c24' : '#faf9f6';
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.setAttribute('aria-pressed', String(theme === 'dark'));
            toggle.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
        }
    }

    apply();

    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;
        apply();
        toggle.hidden = false;
        toggle.addEventListener('click', () => {
            preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem(key, preference);
            } catch (_) {
                // Retain the choice for this page even without persistence.
            }
            apply();
        });
    });

    system.addEventListener('change', () => {
        if (preference === null) apply();
    });

    // Keep open pages in sync when the choice changes in another tab.
    window.addEventListener('storage', (event) => {
        if (event.key !== key && event.key !== null) return;
        preference = valid(event.newValue) ? event.newValue : null;
        apply();
    });
})();

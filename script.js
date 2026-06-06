/* ========================================
   APOLLORPG WIKI - JAVASCRIPT (JSON VERSION)
   + SPA ROUTER (GitHub Pages friendly)
   ======================================== */

/**
 * IMPORTANT:
 * For GitHub Pages deep links to work, add a 404.html that redirects to /ApolloRPG/
 * and stores the original path in sessionStorage.redirect (see instructions).
 */

// ========================================
// RESTORE REDIRECTED PATH (from 404.html)
// ========================================
(function restoreRedirectPath() {
    try {
        if (sessionStorage.redirect) {
            const redirectPath = sessionStorage.redirect;
            delete sessionStorage.redirect;
            history.replaceState(null, '', redirectPath);
        }
    } catch (e) {
        // ignore
    }
})();

// ========================================
// CONFIG
// ========================================
const BASE_PATH = location.hostname === '127.0.0.1' || location.hostname === 'localhost'
    ? ''              // Local dev (Live Server)
    : '/ApolloRPG';   // GitHub Pages


function stripBasePath(pathname) {
    // Ensure we only route within /ApolloRPG
    if (pathname === BASE_PATH) return '/';
    if (pathname.startsWith(BASE_PATH + '/')) {
        return pathname.slice(BASE_PATH.length);
    }
    // If hosted somewhere else, fall back to raw pathname
    return pathname;
}

// ========================================
// THEME SYSTEM
// ========================================
const THEMES = {
    ocean:      { label: 'Ocean',      dot: 'linear-gradient(135deg,#667eea,#0a0a0f)' },
    crimson:    { label: 'Crimson',    dot: 'linear-gradient(135deg,#ef4444,#0f0808)' },
    corruption: { label: 'Corruption', dot: 'linear-gradient(135deg,#2a2a2a,#050505)' },
    void:    { label: 'Void',    dot: 'linear-gradient(135deg,#a855f7,#07050f)' },
    inferno: { label: 'Inferno', dot: 'linear-gradient(135deg,#f97316,#0f0700)' },
    abyss:   { label: 'Abyss',   dot: 'linear-gradient(135deg,#06b6d4,#00080f)' },
    phantom: { label: 'Phantom', dot: 'linear-gradient(135deg,#ec4899,#0f0008)' },
    toxic:   { label: 'Toxic',   dot: 'linear-gradient(135deg,#eab308,#080f00)' },
    spectre: { label: 'Spectre', dot: 'linear-gradient(135deg,#e0e0e0,#080808)' },
    earth:      { label: 'Earth',      dot: 'linear-gradient(135deg,#4ade80,#060e06)' },
};

function applyTheme(name) {
    if (!THEMES[name]) name = 'ocean';
    document.documentElement.setAttribute('data-theme', name);
    const dot = document.getElementById('themeToggleDot');
    const label = document.getElementById('themeToggleLabel');
    if (dot)   dot.style.background = THEMES[name].dot;
    if (label) label.textContent = THEMES[name].label;
    document.querySelectorAll('.theme-option').forEach(el => {
        el.classList.toggle('active', el.dataset.theme === name);
    });
}

function setTheme(name) {
    applyTheme(name);
    try { localStorage.setItem('apolloTheme', name); } catch(e) {}
    closeThemeDropdown();
}

function toggleThemeDropdown() {
    const dd = document.getElementById('themeDropdown');
    dd.classList.toggle('open');
}

function closeThemeDropdown() {
    document.getElementById('themeDropdown')?.classList.remove('open');
}

// Close when clicking outside
document.addEventListener('click', e => {
    const switcher = document.getElementById('themeSwitcher');
    if (switcher && !switcher.contains(e.target)) closeThemeDropdown();
});

window.setTheme = setTheme;
window.toggleThemeDropdown = toggleThemeDropdown;

// ========================================
// SLUG HELPERS
// ========================================
function toSlug(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')   // remove symbols
        .replace(/\s+/g, '-')          // spaces -> -
        .replace(/-+/g, '-');          // collapse multiple -
}

function fromSlug(slug, categoryItems) {
    // Find real subcategory name from slug
    const match = categoryItems.find(item => {
        if (!item.subcategory) return false;
        return toSlug(item.subcategory) === slug;
    });
    return match ? match.subcategory : slug;
}


function normalizePath(path) {
    if (!path) return '/';
    // remove repeated slashes and trailing slash (except root)
    path = path.replace(/\/{2,}/g, '/');
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    return path;
}

function encodeSeg(seg) {
    return encodeURIComponent(seg);
}

function decodeSeg(seg) {
    try {
        return decodeURIComponent(seg);
    } catch {
        return seg;
    }
}

function isValidCategory(cat) {
    return [
        'bosses',
        'equipment',
        'armor',
        'accessories',
        'locations',
        'questlines',
        'enemies',
        'materials',
        'loreitems'
    ].includes(cat);
}

function buildCategoryPath(category, subcategory = null) {
    if (!subcategory) return `${BASE_PATH}/${toSlug(category)}`;
    return `${BASE_PATH}/${toSlug(category)}/${toSlug(subcategory)}`;
}

function buildItemPath(item) {
    const cat = item.category;
    const sub = item.subcategory;
    if (sub) return `${BASE_PATH}/${toSlug(cat)}/${toSlug(sub)}/${toSlug(item.id)}`;
    return `${BASE_PATH}/${toSlug(cat)}/${toSlug(item.id)}`;
}


function navigateTo(path) {
    const target = normalizePath(path);
    const current = normalizePath(location.pathname);
    if (target !== current) {
        history.pushState(null, '', target);
    }
    handleRoute();
}

// ========================================
// SECRETS / EASTER EGGS PAGES
// ========================================
const SECRETS_PAGES = {
    "new-changes": {
        title: "Unreleased: New Changes",
        description: "Stuff that exists in-dev but not released to the wiki yet.",
        bodyHTML: `
            <h2>Coming Soon</h2>
            <p>These are planned features / content that are being worked on.</p>

            <h3>Features</h3>
            <ul>
                <li>New boss chain + progression tweaks</li>
                <li>Drop tables + crafting paths</li>
                <li>Comparison tool (items/bosses)</li>
                <li>Secret lore pages + ARG trail</li>
            </ul>

            <h3>Content</h3>
            <ul>
                <li>Darklands expansions</li>
                <li>More awakened lore chapters</li>
                <li>New accessories + crystals</li>
            </ul>

            <p style="opacity:.7; margin-top: 1.5rem;">
                (If you found this page, don’t spoil it 😈)
            </p>
        `
    },

    // Add more secret pages here:
    // "the-archive": { title: "...", description: "...", bodyHTML: "..." }
};


// ========================================
// GLOBAL STATE MANAGEMENT
// ========================================
const STATE = {
    currentView: 'home',
    currentCategory: 'all',
    currentItem: null,
    searchQuery: '',
    dataLoaded: false
};

// ========================================
// WIKI DATA CONTAINER
// ========================================
const WIKI_DATA = {
    bosses: [],
    equipment: [],
    armor: [],
    accessories: [],
    locations: [],
    questlines: [],
    enemies: [],
    materials: [],
    loreitems: []
};

let ALL_ITEMS = [];

// ========================================
// DATA LOADING
// ========================================
async function loadCategoryData(category) {
    try {
        const response = await fetch(`${BASE_PATH}/data/${category}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load ${category}.json`);
        }
        const data = await response.json();
        WIKI_DATA[category] = data;
        console.log(`Loaded ${data.length} items from ${category}.json`);
        return data;
    } catch (error) {
        console.error(`Error loading ${category} data:`, error);
        return [];
    }
}

async function loadAllData() {
    const categories = [
        'bosses',
        'equipment',
        'armor',
        'accessories',
        'locations',
        'loreitems',
        'questlines',
        'enemies',
        'materials'
    ];

    console.log('Loading wiki data...');

    // Show loading indicator
    showLoadingIndicator();

    try {
        // Load all categories in parallel
        await Promise.all(categories.map((cat) => loadCategoryData(cat)));

        // Combine all items
        ALL_ITEMS = [
            ...WIKI_DATA.bosses,
            ...WIKI_DATA.equipment,
            ...WIKI_DATA.armor,
            ...WIKI_DATA.accessories,
            ...WIKI_DATA.locations,
            ...WIKI_DATA.questlines,
            ...WIKI_DATA.enemies,
            ...WIKI_DATA.materials,
            ...WIKI_DATA.loreitems
        ];

        STATE.dataLoaded = true;
        console.log(`Total items loaded: ${ALL_ITEMS.length}`);

        // Hide loading indicator
        hideLoadingIndicator();

        return true;
    } catch (error) {
        console.error('Error loading wiki data:', error);
        showErrorMessage('Failed to load wiki data. Please refresh the page.');
        return false;
    }
}

// ========================================
// LOADING & ERROR UI
// ========================================
function showLoadingIndicator() {
    const mainContent = document.querySelector('.main-content');
    const loadingHTML = `
        <div id="loadingIndicator" style="text-align: center; padding: 3rem;">
            <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: var(--accent-primary);"></i>
            <p style="margin-top: 1rem; color: var(--text-secondary);">Loading wiki data...</p>
        </div>
    `;
    mainContent.insertAdjacentHTML('afterbegin', loadingHTML);
}

function hideLoadingIndicator() {
    const indicator = document.getElementById('loadingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function showErrorMessage(message) {
    hideLoadingIndicator();
    const mainContent = document.querySelector('.main-content');
    const errorHTML = `
        <div style="text-align: center; padding: 3rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444;"></i>
            <h2 style="margin-top: 1rem; color: var(--text-primary);">Error</h2>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">${message}</p>
            <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--accent-primary); color: white; border: none; border-radius: 8px; cursor: pointer;">
                Reload Page
            </button>
        </div>
    `;
    mainContent.innerHTML = errorHTML;
}

// ========================================
// DATA UTILITIES
// ========================================
function getItemById(id) {
    return ALL_ITEMS.find((item) => item.id === id);
}

function getItemsByCategory(category) {
    if (category === 'all') return ALL_ITEMS;
    return ALL_ITEMS.filter((item) => item.category === category);
}

function showSecrets(slug = null, push = true) {
    const homeView = document.getElementById('homeView');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');
    const secretsView = document.getElementById('secretsView');

    if (!secretsView) {
        console.error('secretsView not found in DOM. Did you add the #secretsView div?');
        return;
    }

    // Hide all other views
    if (homeView) homeView.classList.add('hidden');
    if (listView) listView.classList.add('hidden');
    if (detailView) detailView.classList.add('hidden');
    secretsView.classList.remove('hidden');

    // Clear sidebar active state
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });

    const pageKey = slug ? toSlug(slug) : null;
    const page = pageKey ? SECRETS_PAGES[pageKey] : null;

    const titleEl = document.getElementById('secretsTitle');
    const descEl = document.getElementById('secretsDescription');
    const bodyEl = document.getElementById('secretsBody');

    if (!pageKey) {
        titleEl.textContent = "Secrets";
        descEl.textContent = "You found the hidden pages 👀";
        bodyEl.innerHTML = `
            <h2>Known Secrets</h2>
            <ul>
                ${Object.keys(SECRETS_PAGES)
                    .map(k => `<li><a onclick="navigateTo('${BASE_PATH}/secrets/${k}')">${k}</a></li>`)
                    .join('')}
            </ul>
        `;
    } 
    else if (!page) {
        titleEl.textContent = "Secret Not Found";
        descEl.textContent = "Nice try 😈";
        bodyEl.innerHTML = `
            <p>This secret page doesn't exist.</p>
            <p style="opacity:.7;">Try: <code>/secrets/new-items</code></p>
        `;
    } 
    else {
        titleEl.textContent = page.title;
        descEl.textContent = page.description || "";
        bodyEl.innerHTML = page.bodyHTML || "";
    }

    // Breadcrumb
    document.getElementById('breadcrumb').innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome(true)">Home</a>
        <span>›</span>
        <span>Secrets</span>
        ${pageKey ? `<span>›</span><span>${pageKey}</span>` : ''}
    `;

    if (push) {
        const target = pageKey 
            ? `${BASE_PATH}/secrets/${pageKey}` 
            : `${BASE_PATH}/secrets`;
        history.pushState(null, '', target);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.showSecrets = showSecrets;

function searchItems(query) {
    if (!query) return ALL_ITEMS;
    const lowerQuery = query.toLowerCase();
    return ALL_ITEMS.filter(
        (item) =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            (item.tags &&
                item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
    );
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// ========================================
// ZOOM-PROOF SIDEBAR
// ========================================
function lockSidebarSize() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    const scale = 1 / window.devicePixelRatio;
    // Only apply if zoomed
    if (Math.abs(scale - 1) > 0.05) {
        sidebar.style.transform = `scale(${scale})`;
        sidebar.style.width = `${280 / scale}px`;
        sidebar.style.transformOrigin = 'top left';
    } else {
        sidebar.style.transform = '';
        sidebar.style.width = '';
    }
}

window.addEventListener('resize', lockSidebarSize);
lockSidebarSize();

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
let lastEscapeTime = 0;

document.addEventListener('keydown', (e) => {
    const searchInput = document.getElementById('searchInput');
    const isTyping = document.activeElement === searchInput;

    // Press / to focus search
    if (e.key === '/' && !isTyping) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
        showToast('Search focused');
        return;
    }

    // Escape key handling
    if (e.key === 'Escape') {
        if (isTyping) {
            // Single escape — exit search, clear input, go home
            searchInput.blur();
            searchInput.value = '';
            STATE.searchQuery = '';
            showHome(true);
            showToast('Search cleared');
            return;
        }

        // Double escape — return to homepage
        const now = Date.now();
        if (now - lastEscapeTime < 400) {
            showHome(true);
            showToast('Home');
        }
        lastEscapeTime = now;
    }
});

// ========================================
// RECENTLY VIEWED
// ========================================
const MAX_RECENT = 5;

function getRecentlyViewed() {
    try {
        return JSON.parse(localStorage.getItem('apolloRecent') || '[]');
    } catch { return []; }
}

function addToRecentlyViewed(itemId) {
    try {
        let recent = getRecentlyViewed();
        recent = recent.filter(id => id !== itemId);
        recent.unshift(itemId);
        recent = recent.slice(0, MAX_RECENT);
        localStorage.setItem('apolloRecent', JSON.stringify(recent));
    } catch {}
}

function renderRecentlyViewed() {
    const container = document.getElementById('recentlyViewedGrid');
    if (!container) return;
    const recent = getRecentlyViewed();
    const items = recent.map(id => getItemById(id)).filter(Boolean);

    if (items.length === 0) {
        container.parentElement.style.display = 'none';
        return;
    }

    container.parentElement.style.display = 'block';
    container.innerHTML = items.map(item => `
        <div class="wiki-card fade-in" onclick="showItemDetail('${item.id}', true)">
            <div class="wiki-card-header">
                <div class="wiki-card-icon" style="background: ${item.gradient};">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="wiki-card-title">
                    <h3>${item.name}</h3>
                    <div class="wiki-card-category">${item.category}</div>
                </div>
            </div>
            <div class="wiki-card-description">${item.description}</div>
        </div>
    `).join('');

    container.querySelectorAll('.wiki-card').forEach(attachTilt);
}

// ========================================
// FAVOURITES
// ========================================
function getFavourites() {
    try {
        return JSON.parse(localStorage.getItem('apolloFavourites') || '[]');
    } catch { return []; }
}

function toggleFavourite(itemId, e) {
    e.stopPropagation();
    try {
        let favs = getFavourites();
        if (favs.includes(itemId)) {
            favs = favs.filter(id => id !== itemId);
            showToast('Removed from favourites');
        } else {
            favs.push(itemId);
            showToast('Added to favourites ★');
        }
        localStorage.setItem('apolloFavourites', JSON.stringify(favs));
        // Update all visible star buttons
        document.querySelectorAll(`[data-fav-id="${itemId}"]`).forEach(btn => {
            btn.classList.toggle('fav-active', favs.includes(itemId));
        });
    } catch {}
}

function isFavourite(itemId) {
    return getFavourites().includes(itemId);
}

function showFavourites() {
    if (!STATE.dataLoaded) return;
    const favs = getFavourites();
    const items = favs.map(id => getItemById(id)).filter(Boolean);

    STATE.currentView = 'list';

    document.getElementById('homeView').classList.add('hidden');
    document.getElementById('listView').classList.remove('hidden');
    document.getElementById('detailView').classList.add('hidden');

    document.getElementById('categoryTitle').innerHTML =
        `<i class="fas fa-star" style="color:var(--accent-primary);margin-right:8px"></i>Favourites`;
    document.getElementById('categoryDescription').textContent =
        items.length > 0 ? `${items.length} saved item${items.length !== 1 ? 's' : ''}` : 'Nothing saved yet — star items to add them here';

    document.getElementById('breadcrumb').innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome(true)">Home</a>
        <span>›</span>
        <span>Favourites</span>
    `;

    renderWikiGrid(items);
    history.pushState(null, '', `${BASE_PATH}/favourites`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.toggleFavourite = toggleFavourite;
window.showFavourites = showFavourites;

// ========================================
// COLLAPSIBLE CATEGORY SIDEBAR (SIMPLER)
// ========================================
function toggleCategoryDropdown(categoryElement) {
    const children = categoryElement.nextElementSibling;

    if (children && children.classList.contains('category-children')) {
        // Close all other expanded categories
        document.querySelectorAll('.category-children.expanded').forEach((el) => {
            if (el !== children) {
                el.classList.remove('expanded');
                el.previousElementSibling.classList.remove('expanded');
            }
        });

        // Toggle this category
        children.classList.toggle('expanded');
        categoryElement.classList.toggle('expanded');
    }
}

// Initialize collapsible categories
function initCollapsibleCategories() {
    const allCategories = document.querySelectorAll(
        '.category-item[data-category]'
    );

    allCategories.forEach((categoryItem) => {
        const nextElement = categoryItem.nextElementSibling;

        if (nextElement && nextElement.classList.contains('category-children')) {
            categoryItem.classList.add('has-children');

            // Get the icon and span elements
            const icon = categoryItem.querySelector('i');
            const span = categoryItem.querySelector('span');

            // Remove default onclick
            categoryItem.removeAttribute('onclick');

            // Clicking the main item toggles dropdown
            categoryItem.addEventListener('click', function (e) {
                if (e.target === this) {
                    e.preventDefault();
                    toggleCategoryDropdown(this);
                }
            });

            // Clicking icon or span navigates
            if (icon) {
                icon.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const category = categoryItem.getAttribute('data-category');
                    if (category && category !== 'home') {
                        filterCategory(category, null, true);
                    } else if (category === 'home') {
                        showHome(true);
                    }
                });
            }

            if (span) {
                span.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const category = categoryItem.getAttribute('data-category');
                    if (category && category !== 'home') {
                        filterCategory(category, null, true);
                    } else if (category === 'home') {
                        showHome(true);
                    }
                });
            }
        }
    });
}

window.toggleCategoryDropdown = toggleCategoryDropdown;

// ========================================
// UPDATE LOG PAGES
// ========================================
const UPDATE_PAGE_CONTENT = {
    past: {
        title: 'Past Updates',
        description: 'The full history of ApolloRPG updates',
        body: `
            <div class="update-card major" style="margin-bottom: var(--spacing-xl);">
                <div class="update-header">
                    <div class="update-title">
                        <span>Update: The Awakening</span>
                        <span class="update-badge badge-major">Major</span>
                    </div>
                    <div class="update-date"><i class="far fa-calendar"></i> Late 2025</div>
                </div>
                <div class="update-description">
                    Added awakened boss forms, new lore chapters, and the crystal accessory system.
                </div>
                <ul class="update-features">
                    <li class="added"><strong>Awakened Bosses:</strong> New powered-up boss forms for existing roster</li>
                    <li class="added"><strong>Lore Chapters:</strong> New story content and boss lore entries</li>
                    <li class="added"><strong>Crystals:</strong> Introduced the crystal accessory system</li>
                    <li class="changed"><strong>Rebalanced:</strong> Early game difficulty curve</li>
                    <li class="changed"><strong>Reworked:</strong> Boss summon mechanics</li>
                </ul>
            </div>

            <div class="update-card minor" style="margin-bottom: var(--spacing-xl);">
                <div class="update-header">
                    <div class="update-title">
                        <span>Update: Origins</span>
                        <span class="update-badge badge-minor">Launch</span>
                    </div>
                    <div class="update-date"><i class="far fa-calendar"></i> Mid 2025</div>
                </div>
                <div class="update-description">
                    The original launch of ApolloRPG with core bosses, progression and base systems.
                </div>
                <ul class="update-features">
                    <li class="added"><strong>Launch:</strong> Core game systems and progression</li>
                    <li class="added"><strong>Bosses:</strong> Initial Pre-Hardmode and Hardmode boss roster</li>
                    <li class="added"><strong>Locations:</strong> Starting dimensions and zones</li>
                    <li class="added"><strong>Equipment:</strong> Base weapons, armour and accessories</li>
                </ul>
            </div>
        `
    },

    future: {
        title: 'Future Updates',
        description: 'Planned content and the ApolloRPG roadmap',
        body: `
            <div class="update-card" style="border-left-color: var(--accent-primary); margin-bottom: var(--spacing-xl);">
                <div class="update-header">
                    <div class="update-title">
                        <span>Next Update: TBA</span>
                        <span class="update-badge" style="background: rgba(var(--glow-rgb),0.15); color: var(--accent-primary);">Planned</span>
                    </div>
                    <div class="update-date"><i class="far fa-calendar"></i> Coming Soon</div>
                </div>
                <div class="update-description">
                    What the team is currently working towards after Daylight/Eclipse.
                </div>
                <ul class="update-features">
                    <li class="added"><strong>New Dimension:</strong> Post-Darklands area — details TBA</li>
                    <li class="added"><strong>New Boss Chain:</strong> Continued post-Darklands progression</li>
                    <li class="added"><strong>Drop Tables:</strong> Full crafting paths and upgrade routes</li>
                    <li class="added"><strong>More Lore:</strong> Expanded awakening chapters</li>
                    <li class="changed"><strong>Wiki:</strong> Comparison tool, secret lore pages, ARG trail</li>
                </ul>
            </div>

            <div class="update-card" style="border-left-color: var(--text-tertiary); opacity: 0.6;">
                <div class="update-header">
                    <div class="update-title">
                        <span>Far Future: Unknown</span>
                        <span class="update-badge" style="background: rgba(255,255,255,0.05); color: var(--text-secondary);">Concept</span>
                    </div>
                    <div class="update-date"><i class="far fa-calendar"></i> Unknown</div>
                </div>
                <div class="update-description">
                    Long term concepts being considered — nothing confirmed yet.
                </div>
                <ul class="update-features">
                    <li class="fixed"><strong>More to come</strong> as the team shares more details</li>
                </ul>
            </div>
        `
    }
};

function showUpdatePage(type, push = true) {
    if (!UPDATE_PAGE_CONTENT[type]) return;
    const page = UPDATE_PAGE_CONTENT[type];

    // Hide everything else
    document.getElementById('homeView').classList.add('hidden');
    document.getElementById('listView').classList.add('hidden');
    document.getElementById('detailView').classList.add('hidden');
    document.getElementById('secretsView')?.classList.add('hidden');
    document.getElementById('updatePageView').classList.remove('hidden');

    // Clear sidebar active states
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));

    document.getElementById('updatePageTitle').textContent = page.title;
    document.getElementById('updatePageDescription').textContent = page.description;
    document.getElementById('updatePageBody').innerHTML = page.body;

    document.getElementById('breadcrumb').innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome(true)">Home</a>
        <span>›</span>
        <span>${page.title}</span>
    `;

    if (push) {
        history.pushState(null, '', `${BASE_PATH}/updates/${type}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// RENDER FUNCTIONS
// ========================================
function renderWikiGrid(items) {
    const grid = document.getElementById('wikiGrid');

    if (items.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <h3>No items found</h3>
                <p>Try adjusting your search or filter</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items
        .map((item) => {
            return `
            <div class="wiki-card fade-in" onclick="showItemDetail('${item.id}', true)">
                <div class="wiki-card-header">
                    <div class="wiki-card-icon" style="background: ${item.gradient};">
                        <i class="fas ${item.icon}"></i>
                    </div>
                    <div class="wiki-card-title">
                        <h3>${item.name}</h3>
                        <div class="wiki-card-category">${item.category}</div>
                    </div>
                    <button class="fav-btn ${isFavourite(item.id) ? 'fav-active' : ''}"
                        data-fav-id="${item.id}"
                        onclick="toggleFavourite('${item.id}', event)"
                        title="Add to favourites">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
                <div class="wiki-card-description">
                    ${item.description}
                </div>
                <div class="wiki-card-footer">
                    ${
                        item.tags
                            ? item.tags
                                  .map(
                                      (tag) =>
                                          `<span class="wiki-card-tag">${tag}</span>`
                                  )
                                  .join('')
                            : ''
                    }
                </div>
            </div>
        `;
        })
        .join('');

    // Reattach tilt to newly rendered cards
    document.querySelectorAll('.wiki-card').forEach(attachTilt);
}

function renderItemDetail(item) {
    const homeView = document.getElementById('homeView');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');

    homeView.classList.add('hidden');
    listView.classList.add('hidden');
    detailView.classList.remove('hidden');

    const categoryLabel = item.category;
    const sub = item.subcategory;

    // Update breadcrumb (category + optional subcategory)
    const breadcrumb = document.getElementById('breadcrumb');
    breadcrumb.innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome(true)">Home</a>
        <span>›</span>
        <a onclick="filterCategory('${item.category}', null, true)">${categoryLabel}</a>
        ${
            sub
                ? `
            <span>›</span>
            <a onclick="filterCategory('${item.category}', '${sub}', true)">${sub}</a>
        `
                : ''
        }
        <span>›</span>
        <span>${item.name}</span>
    `;

    // Render header
    document.getElementById('detailIcon').style.background = item.gradient;
    document.getElementById('detailIcon').innerHTML = `<i class="fas ${item.icon}"></i>`;
    document.getElementById('detailTitle').textContent = item.name;
    document.getElementById('detailMeta').innerHTML = item.tags
        ? item.tags.map((tag) => `<span class="detail-badge">${tag}</span>`).join('')
        : '';

    // Render stats
    const statsHTML = Object.entries(item.stats)
        .map(
            ([key, value]) => `
        <div class="stat-item">
            <div class="stat-label">${key}</div>
            <div class="stat-value">${value}</div>
        </div>
    `
        )
        .join('');
    document.getElementById('detailStats').innerHTML = statsHTML;

    // Render description
    document.getElementById('detailDescription').innerHTML = `
        <h2>About</h2>
        <p>${item.fullDescription}</p>
    `;

    // Render sections
    const sectionsHTML = item.sections
        .map(
            (section) => `
        <div class="detail-section">
            <h3>${section.title}</h3>
            <ul>
                ${section.content.map((line) => `<li>${line}</li>`).join('')}
            </ul>
        </div>
    `
        )
        .join('');
    document.getElementById('detailSections').innerHTML = sectionsHTML;

    // Render related items
    const relatedItems = item.related.map((id) => getItemById(id)).filter(Boolean);

    const relatedHTML =
        relatedItems.length > 0
            ? relatedItems
                  .map(
                      (related) => `
        <div class="wiki-card fade-in" onclick="showItemDetail('${related.id}', true)">
            <div class="wiki-card-header">
                <div class="wiki-card-icon" style="background: ${related.gradient};">
                    <i class="fas ${related.icon}"></i>
                </div>
                <div class="wiki-card-title">
                    <h3>${related.name}</h3>
                    <div class="wiki-card-category">${related.category}</div>
                </div>
            </div>
            <div class="wiki-card-description">
                ${related.description}
            </div>
        </div>
    `
                  )
                  .join('')
            : '<p style="color: var(--text-secondary);">No related items</p>';

    document.getElementById('relatedItems').innerHTML = relatedHTML;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// NAVIGATION FUNCTIONS (now with URL updates)
// ========================================
function showHome(push = true) {
    STATE.currentView = 'home';
    STATE.currentCategory = 'home';
    STATE.currentItem = null;
    STATE.searchQuery = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    const homeView = document.getElementById('homeView');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');

    homeView.classList.remove('hidden');
    listView.classList.add('hidden');
    detailView.classList.add('hidden');

    // Update breadcrumb
    document.getElementById('breadcrumb').innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome(true)">Home</a>
    `;

    // Update active category in sidebar
    document.querySelectorAll('.category-item').forEach((item) => {
        const category = item.dataset.category;
        if (category) item.classList.toggle('active', category === 'home');
    });

    if (push) {
        history.pushState(null, '', `${BASE_PATH}/`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderRecentlyViewed();
    document.querySelectorAll('.category-card').forEach(attachTilt);
    document.getElementById('updatePageView')?.classList.add('hidden');
}

function filterCategory(category, subcategory = null, push = true) {
    if (!STATE.dataLoaded) {
        console.log('Data not loaded yet');
        return;
    }

    STATE.currentView = 'list';
    STATE.currentCategory = category;
    STATE.currentItem = null;
    STATE.searchQuery = '';
    document.getElementById('searchInput').value = '';

    const homeView = document.getElementById('homeView');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');

    homeView.classList.add('hidden');
    listView.classList.remove('hidden');
    detailView.classList.add('hidden');

    // Update active category in sidebar
    document.querySelectorAll('.category-item').forEach((item) => {
        const itemCategory = item.dataset.category;
        const itemSubcategory = item.dataset.subcategory;
        if (itemCategory) {
            const isActive =
                itemCategory === category &&
                (subcategory === null ||
                    subcategory === undefined ||
                    itemSubcategory === subcategory);
            item.classList.toggle('active', isActive);
        }
    });

    // Update breadcrumb (include subcategory if present)
    document.getElementById('breadcrumb').innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome(true)">Home</a>
        <span>›</span>
        <a onclick="filterCategory('${category}', null, true)">${category}</a>
        ${
            subcategory
                ? `
            <span>›</span>
            <span>${subcategory}</span>
        `
                : ''
        }
    `;

    // Category names and descriptions
    const categoryNames = {
        bosses: 'Bosses',
        equipment: 'Equipment',
        armor: 'Armor',
        accessories: 'Accessories',
        locations: 'Locations',
        questlines: 'Questlines',
        enemies: 'Enemies',
        materials: 'Materials',
        loreitems: 'Lore Items'
    };

    const categoryDescriptions = {
        bosses: 'Face legendary foes in epic battles',
        equipment: 'Weapons, tools, and combat gear',
        armor: 'Protect yourself with powerful equipment',
        accessories: 'Enhance your character with special items',
        locations: 'Explore diverse worlds and dungeons',
        questlines: 'Embark on epic adventures',
        enemies: 'Know your foes and their weaknesses',
        materials: 'Crafting materials and upgrade components',
        loreitems: 'Learn Lore about the server and its origins'
    };

    document.getElementById('categoryTitle').textContent =
        categoryNames[category] || category;
    document.getElementById('categoryDescription').textContent =
        categoryDescriptions[category] || '';

    // Render items
    const items = getItemsByCategory(category);

    let filteredItems = items;
    if (subcategory) {
        filteredItems = items.filter((item) => item.subcategory === subcategory);
    }

    renderWikiGrid(filteredItems);

    if (push) {
        history.pushState(null, '', buildCategoryPath(category, subcategory));
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('updatePageView')?.classList.add('hidden');
}

function handleSearch(query) {
    if (!STATE.dataLoaded) {
        console.log('Data not loaded yet');
        return;
    }

    STATE.searchQuery = query;
    STATE.currentView = 'list';
    STATE.currentItem = null;

    const homeView = document.getElementById('homeView');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');

    homeView.classList.add('hidden');
    listView.classList.remove('hidden');
    detailView.classList.add('hidden');

    // Update breadcrumb
    document.getElementById('breadcrumb').innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome(true)">Home</a>
        <span>›</span>
        <span>Search Results</span>
    `;

    // Update category header
    const results = searchItems(query);
    document.getElementById('categoryTitle').textContent = `Search: "${query}"`;
    document.getElementById('categoryDescription').textContent = query
        ? `Found ${results.length} result${results.length !== 1 ? 's' : ''}`
        : 'Showing all items';

    // Clear active category in sidebar
    document.querySelectorAll('.category-item').forEach((item) => {
        item.classList.remove('active');
    });

    // Render search results
    renderWikiGrid(results);

    // Optional: reflect search in URL (commented out)
    // history.pushState(null, '', `${BASE_PATH}/search?q=${encodeURIComponent(query)}`);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showItemDetail(itemId, push = true) {
    if (!STATE.dataLoaded) {
        console.log('Data not loaded yet');
        return;
    }

    const item = getItemById(itemId);
    if (!item) {
        console.error('Item not found:', itemId);
        return;
    }

    STATE.currentView = 'detail';
    STATE.currentItem = item;

    renderItemDetail(item);
    document.getElementById('updatePageView')?.classList.add('hidden');
    addToRecentlyViewed(item.id);

    if (push) {
        history.pushState(null, '', buildItemPath(item));
    }
}

// ========================================
// TOAST
// ========================================
let toastTimeout = null;

function showToast(message) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'globalToast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2000);
}

window.showToast = showToast;

// ========================================
// ROUTER
// ========================================
function handleRoute() {
    if (!STATE.dataLoaded) return;

    const raw = stripBasePath(location.pathname);
    const path = normalizePath(raw);

    // root
    if (path === '/' || path === '') {
        showHome(false);
        return;
    }

    const segments = path.split('/').filter(Boolean);
    const first = segments[0]?.toLowerCase();

    // ========================================
    // SECRETS ROUTES
    // /secrets
    // /secrets/<slug>
    // ========================================
    if (first === 'secrets') {
        const secretSlug = segments[1] ? segments[1].toLowerCase() : null;
        showSecrets(secretSlug, false);
        return;
    }

   if (first === 'updates') {
       const type = segments[1] || 'current';
       if (type === 'current') {
           showHome(false);
           setTimeout(() => openUpdateModal(), 100);
       } else {
           showUpdatePage(type, false);
       }
       return;
   }

   if (first === 'favourites') {
       showFavourites();
       return;
   }

    // normal category routing
    const category = first;

    if (!isValidCategory(category)) {
        // Unknown route -> send home
        showHome(false);
        return;
    }

    // /category
    if (segments.length === 1) {
        filterCategory(category, null, false);
        return;
    }

    // /category/something
    if (segments.length === 2) {
        const slug = segments[1];

        // Try item first
        const possibleItem = ALL_ITEMS.find(
            item => toSlug(item.id) === slug && item.category === category
        );

        if (possibleItem) {
            showItemDetail(possibleItem.id, false);
            return;
        }

        // Try subcategory
        const realSubcategory = fromSlug(slug, ALL_ITEMS.filter(i => i.category === category));
        filterCategory(category, realSubcategory, false);
        return;
    }

    // /category/subcategory/item
    if (segments.length >= 3) {
        const subSlug = segments[1];
        const itemSlug = segments[2];

        const realSubcategory = fromSlug(subSlug, ALL_ITEMS.filter(i => i.category === category));

        const item = ALL_ITEMS.find(
            i => toSlug(i.id) === itemSlug && i.category === category
        );

        if (item) {
            showItemDetail(item.id, false);
            return;
        }

        filterCategory(category, realSubcategory, false);
        return;
    }
}


// Back/forward navigation
window.addEventListener('popstate', () => {
    handleRoute();
});

// ========================================
// EVENT LISTENERS & INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('ApolloRPG Wiki initializing...');

   // Load saved theme immediately to avoid flash
   try {
       const saved = localStorage.getItem('apolloTheme') || 'ocean';
       applyTheme(saved);
   } catch(e) {
       applyTheme('ocean');
   }

    // Initialize collapsible categories FIRST
    initCollapsibleCategories();

    // Load all data
    const success = await loadAllData();

    if (success) {
        // Set up search with debounce
        const searchInput = document.getElementById('searchInput');
        const debouncedSearch = debounce((query) => {
            if (query.trim()) {
                handleSearch(query);
            } else if (STATE.searchQuery) {
                showHome(true);
            }
        }, 300);

        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    handleSearch(query);
                }
            }
        });

        // ROUTE BASED ON CURRENT URL
        handleRoute();
        initTilt();
        console.log('ApolloRPG Wiki loaded successfully!');
    }
});

// ========================================
// 3D TILT ON HOVER
// ========================================
function initTilt() {
    document.querySelectorAll('.wiki-card, .category-card').forEach(attachTilt);
}

function attachTilt(card) {
    card.addEventListener('mousemove', onTiltMove);
    card.addEventListener('mouseleave', onTiltLeave);
}

let tiltFrame = null;

function onTiltMove(e) {
    const card = e.currentTarget;
    if (tiltFrame) return; // skip if a frame is already queued
    tiltFrame = requestAnimationFrame(() => {
        tiltFrame = null;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const maxTilt = 6;
        const rotateX = ((y - cy) / cy) * -maxTilt;
        const rotateY = ((x - cx) / cx) * maxTilt;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
}

function onTiltLeave(e) {
    if (tiltFrame) {
        cancelAnimationFrame(tiltFrame);
        tiltFrame = null;
    }
    e.currentTarget.style.transform = '';
}

window.initTilt = initTilt;
window.attachTilt = attachTilt;

// ========================================
// UPDATE MODAL FUNCTIONS
// ========================================
function openUpdateModal() {
    const modal = document.getElementById('updateModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ========================================
// CHANGELOG INTERACTIONS
// ========================================
function toggleChangelog(header) {
    const body = header.nextElementSibling;
    const icon = header.querySelector('.changelog-toggle-icon i');
    const isExpanded = body.classList.contains('expanded');

    body.classList.toggle('expanded', !isExpanded);
    icon.classList.toggle('fa-chevron-down', isExpanded);
    icon.classList.toggle('fa-chevron-up', !isExpanded);
}

function filterChangelog(type, btn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide entries
    document.querySelectorAll('.changelog-entry').forEach(entry => {
        const entryType = entry.dataset.type;
        const show = type === 'all' || entryType === type;
        entry.classList.toggle('hidden-entry', !show);
    });
}

window.toggleChangelog = toggleChangelog;
window.filterChangelog = filterChangelog;

function closeUpdateModal() {
    const modal = document.getElementById('updateModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

window.openUpdateModal = openUpdateModal;
window.closeUpdateModal = closeUpdateModal;

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeUpdateModal();
    }
});

// Export functions for onclick handlers
window.showHome = showHome;
window.showItemDetail = showItemDetail;
window.filterCategory = filterCategory;

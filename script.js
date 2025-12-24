/* ========================================
   APOLLORPG WIKI - JAVASCRIPT (JSON VERSION)
   ======================================== */

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
    materials: []
};

let ALL_ITEMS = [];

// ========================================
// DATA LOADING
// ========================================
async function loadCategoryData(category) {
    try {
        const response = await fetch(`data/${category}.json`);
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
    const categories = ['bosses', 'equipment', 'armor', 'accessories', 'locations', 'questlines', 'enemies', 'materials'];
    
    console.log('Loading wiki data...');
    
    // Show loading indicator
    showLoadingIndicator();
    
    try {
        // Load all categories in parallel
        await Promise.all(categories.map(cat => loadCategoryData(cat)));
        
        // Combine all items
        ALL_ITEMS = [
            ...WIKI_DATA.bosses,
            ...WIKI_DATA.equipment,
            ...WIKI_DATA.armor,
            ...WIKI_DATA.accessories,
            ...WIKI_DATA.locations,
            ...WIKI_DATA.questlines,
            ...WIKI_DATA.enemies,
            ...WIKI_DATA.materials
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
    return ALL_ITEMS.find(item => item.id === id);
}

function getItemsByCategory(category) {
    if (category === 'all') return ALL_ITEMS;
    return ALL_ITEMS.filter(item => item.category === category);
}

function searchItems(query) {
    if (!query) return ALL_ITEMS;
    const lowerQuery = query.toLowerCase();
    return ALL_ITEMS.filter(item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
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
// COLLAPSIBLE CATEGORY SIDEBAR (SIMPLER)
// ========================================
function toggleCategoryDropdown(categoryElement) {
    const children = categoryElement.nextElementSibling;
    
    if (children && children.classList.contains('category-children')) {
        // Close all other expanded categories
        document.querySelectorAll('.category-children.expanded').forEach(el => {
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
    const allCategories = document.querySelectorAll('.category-item[data-category]');
    
    allCategories.forEach(categoryItem => {
        const nextElement = categoryItem.nextElementSibling;
        
        if (nextElement && nextElement.classList.contains('category-children')) {
            categoryItem.classList.add('has-children');
            
            // Get the icon and span elements
            const icon = categoryItem.querySelector('i');
            const span = categoryItem.querySelector('span');
            
            // Remove default onclick
            categoryItem.removeAttribute('onclick');
            
            // Clicking the main item toggles dropdown
            categoryItem.addEventListener('click', function(e) {
                // If clicking the category item itself (not icon or span)
                if (e.target === this) {
                    e.preventDefault();
                    toggleCategoryDropdown(this);
                }
            });
            
            // Clicking icon or span navigates
            if (icon) {
                icon.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const category = categoryItem.getAttribute('data-category');
                    if (category && category !== 'home') {
                        filterCategory(category, null);
                    }
                });
            }
            
            if (span) {
                span.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const category = categoryItem.getAttribute('data-category');
                    if (category && category !== 'home') {
                        filterCategory(category, null);
                    }
                });
            }
        }
    });
}

window.toggleCategoryDropdown = toggleCategoryDropdown;

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
    
    grid.innerHTML = items.map(item => {
        
        return `
            <div class="wiki-card fade-in" onclick="showItemDetail('${item.id}')">
                <div class="wiki-card-header">
                    <div class="wiki-card-icon" style="background: ${item.gradient};">
                        <i class="fas ${item.icon}"></i>
                    </div>
                    <div class="wiki-card-title">
                        <h3>${item.name}</h3>
                        <div class="wiki-card-category">${item.category}</div>
                    </div>
                </div>
                <div class="wiki-card-description">
                    ${item.description}
                </div>
                <div class="wiki-card-footer">
                    ${item.tags ? item.tags.map(tag => `<span class="wiki-card-tag">${tag}</span>`).join('') : ''}
                </div>
            </div>
        `;
    }).join('');
}

function renderItemDetail(item) {
    const homeView = document.getElementById('homeView');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');
    
    homeView.classList.add('hidden');
    listView.classList.add('hidden');
    detailView.classList.remove('hidden');
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumb');
    breadcrumb.innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome()">Home</a>
        <span>›</span>
        <a onclick="filterCategory('${item.category}')">${item.category}</a>
        <span>›</span>
        <span>${item.name}</span>
    `;
    
    // Render header
    document.getElementById('detailIcon').style.background = item.gradient;
    document.getElementById('detailIcon').innerHTML = `<i class="fas ${item.icon}"></i>`;
    document.getElementById('detailTitle').textContent = item.name;
    document.getElementById('detailMeta').innerHTML = item.tags ? item.tags.map(tag => 
        `<span class="detail-badge">${tag}</span>`
    ).join('') : '';
    
    // Render stats
    const statsHTML = Object.entries(item.stats).map(([key, value]) => `
        <div class="stat-item">
            <div class="stat-label">${key}</div>
            <div class="stat-value">${value}</div>
        </div>
    `).join('');
    document.getElementById('detailStats').innerHTML = statsHTML;
    
    // Render description
    document.getElementById('detailDescription').innerHTML = `
        <h2>About</h2>
        <p>${item.fullDescription}</p>
    `;
    
    // Render sections
    const sectionsHTML = item.sections.map(section => `
        <div class="detail-section">
            <h3>${section.title}</h3>
            <ul>
                ${section.content.map(line => `<li>${line}</li>`).join('')}
            </ul>
        </div>
    `).join('');
    document.getElementById('detailSections').innerHTML = sectionsHTML;
    
    // Render related items
    const relatedItems = item.related
        .map(id => getItemById(id))
        .filter(Boolean);
    
    const relatedHTML = relatedItems.length > 0 ? relatedItems.map(related => `
        <div class="wiki-card fade-in" onclick="showItemDetail('${related.id}')">
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
    `).join('') : '<p style="color: var(--text-secondary);">No related items</p>';
    
    document.getElementById('relatedItems').innerHTML = relatedHTML;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// NAVIGATION FUNCTIONS
// ========================================
function showHome() {
    STATE.currentView = 'home';
    STATE.currentCategory = 'home';
    STATE.currentItem = null;
    
    const homeView = document.getElementById('homeView');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');
    
    homeView.classList.remove('hidden');
    listView.classList.add('hidden');
    detailView.classList.add('hidden');
    
    // Update breadcrumb
    document.getElementById('breadcrumb').innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome()">Home</a>
    `;
    
    // Update active category in sidebar
    document.querySelectorAll('.category-item').forEach(item => {
        const category = item.dataset.category;
        if (category) {
            item.classList.toggle('active', category === 'home');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterCategory(category, subcategory = null) {
    if (!STATE.dataLoaded) {
        console.log('Data not loaded yet');
        return;
    }
    
    STATE.currentView = 'list';
    STATE.currentCategory = category;
    STATE.searchQuery = '';
    document.getElementById('searchInput').value = '';
    
    const homeView = document.getElementById('homeView');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');
    
    homeView.classList.add('hidden');
    listView.classList.remove('hidden');
    detailView.classList.add('hidden');
    
    // Update active category in sidebar
    // Update active category in sidebar
document.querySelectorAll('.category-item').forEach(item => {
    const itemCategory = item.dataset.category;
    const itemSubcategory = item.dataset.subcategory;
    if (itemCategory) {
        const isActive = itemCategory === category && 
                (subcategory === null || subcategory === undefined || itemSubcategory === subcategory);
        item.classList.toggle('active', isActive);
    }
});
    
    // Update breadcrumb
    document.getElementById('breadcrumb').innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome()">Home</a>
        <span>›</span>
        <span>${category}</span>
    `;
    
    // Category names and descriptions
    const categoryNames = {
        'bosses': 'Bosses',
        'equipment': 'Equipment',
        'armor': 'Armor',
        'accessories': 'Accessories',
        'locations': 'Locations',
        'questlines': 'Questlines',
        'enemies': 'Enemies',
        'materials': 'Materials'
    };
    
    const categoryDescriptions = {
        'bosses': 'Face legendary foes in epic battles',
        'equipment': 'Weapons, tools, and combat gear',
        'armor': 'Protect yourself with powerful equipment',
        'accessories': 'Enhance your character with special items',
        'locations': 'Explore diverse worlds and dungeons',
        'questlines': 'Embark on epic adventures',
        'enemies': 'Know your foes and their weaknesses',
        'materials': 'Crafting materials and upgrade components'
    };
    
    document.getElementById('categoryTitle').textContent = categoryNames[category] || category;
    document.getElementById('categoryDescription').textContent = categoryDescriptions[category] || '';
    
    // Render items
    const items = getItemsByCategory(category);

// Filter by subcategory if provided
let filteredItems = items;
if (subcategory) {
    filteredItems = items.filter(item => item.subcategory === subcategory);
}

renderWikiGrid(filteredItems);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSearch(query) {
    if (!STATE.dataLoaded) {
        console.log('Data not loaded yet');
        return;
    }
    
    STATE.searchQuery = query;
    STATE.currentView = 'list';
    
    const homeView = document.getElementById('homeView');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');
    
    homeView.classList.add('hidden');
    listView.classList.remove('hidden');
    detailView.classList.add('hidden');
    
    // Update breadcrumb
    document.getElementById('breadcrumb').innerHTML = `
        <i class="fas fa-home"></i>
        <a onclick="showHome()">Home</a>
        <span>›</span>
        <span>Search Results</span>
    `;
    
    // Update category header
    const results = searchItems(query);
    document.getElementById('categoryTitle').textContent = `Search: "${query}"`;
    document.getElementById('categoryDescription').textContent = 
        query ? `Found ${results.length} result${results.length !== 1 ? 's' : ''}` : 'Showing all items';
    
    // Clear active category in sidebar
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Render search results
    renderWikiGrid(results);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showItemDetail(itemId) {
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
}

// ========================================
// EVENT LISTENERS & INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('ApolloRPG Wiki initializing...');
    
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
                showHome();
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
        
        // Show home by default
        showHome();
        
        console.log('ApolloRPG Wiki loaded successfully!');
    }
});

// ========================================
// UPDATE MODAL FUNCTIONS
// ========================================
function openUpdateModal() {
    const modal = document.getElementById('updateModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUpdateModal() {
    const modal = document.getElementById('updateModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeUpdateModal();
    }
});

// Export functions
window.openUpdateModal = openUpdateModal;
window.closeUpdateModal = closeUpdateModal;

// Export functions for onclick handlers
window.showHome = showHome;
window.showItemDetail = showItemDetail;
window.filterCategory = filterCategory;
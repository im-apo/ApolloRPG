/* ========================================
   APOLLORPG WIKI - JAVASCRIPT (FIXED)
   ======================================== */

// ========================================
// GLOBAL STATE MANAGEMENT
// ========================================
const STATE = {
    currentView: 'home',
    currentCategory: 'all',
    currentItem: null,
    searchQuery: ''
};

// ========================================
// WIKI DATA
// ========================================
const WIKI_DATA = {
    // BOSSES
    bosses: [
        {
            id: 'boss-1',
            name: 'Boss 1',
            category: 'bosses',
            icon: 'fa-dragon',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            description: 'Description for Boss 1',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Health': '1,000,000 HP',
                'Damage': '1,000-2,000',
                'Armor': '100',
                'Difficulty': 'Hard'
            },
            fullDescription: 'Full description for Boss 1. Add detailed information here.',
            sections: [
                {
                    title: 'Abilities',
                    content: [
                        'Ability 1 - Description',
                        'Ability 2 - Description',
                        'Ability 3 - Description'
                    ]
                },
                {
                    title: 'Strategy',
                    content: [
                        'Strategy tip 1',
                        'Strategy tip 2',
                        'Strategy tip 3'
                    ]
                },
                {
                    title: 'Loot',
                    content: [
                        'Item 1',
                        'Item 2',
                        'Item 3'
                    ]
                }
            ],
            related: []
        },
        {
            id: 'boss-2',
            name: 'Boss 2',
            category: 'bosses',
            icon: 'fa-dragon',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            description: 'Description for Boss 2',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Health': '1,000,000 HP',
                'Damage': '1,000-2,000',
                'Armor': '100',
                'Difficulty': 'Hard'
            },
            fullDescription: 'Full description for Boss 2. Add detailed information here.',
            sections: [
                {
                    title: 'Abilities',
                    content: [
                        'Ability 1 - Description',
                        'Ability 2 - Description',
                        'Ability 3 - Description'
                    ]
                },
                {
                    title: 'Strategy',
                    content: [
                        'Strategy tip 1',
                        'Strategy tip 2',
                        'Strategy tip 3'
                    ]
                }
            ],
            related: []
        }
    ],

    // WEAPONS
    weapons: [
        {
            id: 'weapon-1',
            name: 'Weapon 1',
            category: 'weapons',
            icon: 'fa-sword',
            gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            description: 'Description for Weapon 1',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Damage': '+100',
                'Critical': '+10%',
                'Speed': 'Fast',
                'Rarity': 'Epic'
            },
            fullDescription: 'Full description for Weapon 1. Add detailed information here.',
            sections: [
                {
                    title: 'Special Abilities',
                    content: [
                        'Ability 1 - Description',
                        'Ability 2 - Description'
                    ]
                },
                {
                    title: 'How to Obtain',
                    content: [
                        'Method 1',
                        'Method 2'
                    ]
                }
            ],
            related: []
        },
        {
            id: 'weapon-2',
            name: 'Weapon 2',
            category: 'weapons',
            icon: 'fa-wand-magic-sparkles',
            gradient: 'linear-gradient(135deg, #9333ea 0%, #4c1d95 100%)',
            description: 'Description for Weapon 2',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Damage': '+150',
                'Critical': '+15%',
                'Speed': 'Medium',
                'Rarity': 'Legendary'
            },
            fullDescription: 'Full description for Weapon 2. Add detailed information here.',
            sections: [
                {
                    title: 'Special Abilities',
                    content: [
                        'Ability 1 - Description',
                        'Ability 2 - Description'
                    ]
                }
            ],
            related: []
        },
        {
            id: 'weapon-3',
            name: 'Weapon 3',
            category: 'weapons',
            icon: 'fa-crosshairs',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            description: 'Description for Weapon 3',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Damage': '+120',
                'Critical': '+20%',
                'Speed': 'Very Fast',
                'Rarity': 'Epic'
            },
            fullDescription: 'Full description for Weapon 3. Add detailed information here.',
            sections: [
                {
                    title: 'Special Abilities',
                    content: [
                        'Ability 1 - Description',
                        'Ability 2 - Description'
                    ]
                }
            ],
            related: []
        }
    ],

    // ARMOR
    armor: [
        {
            id: 'armor-1',
            name: 'Armor Set 1',
            category: 'armor',
            icon: 'fa-shield-alt',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            description: 'Description for Armor Set 1',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Armor': '+200',
                'Health': '+500',
                'Resistance': '+20%',
                'Set Pieces': '5'
            },
            fullDescription: 'Full description for Armor Set 1. Add detailed information here.',
            sections: [
                {
                    title: 'Set Bonuses',
                    content: [
                        '2 pieces: Bonus 1',
                        '3 pieces: Bonus 2',
                        '4 pieces: Bonus 3',
                        '5 pieces: Bonus 4'
                    ]
                }
            ],
            related: []
        },
        {
            id: 'armor-2',
            name: 'Armor Set 2',
            category: 'armor',
            icon: 'fa-hat-wizard',
            gradient: 'linear-gradient(135deg, #9333ea 0%, #4c1d95 100%)',
            description: 'Description for Armor Set 2',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Armor': '+100',
                'Magic Power': '+150',
                'Mana': '+300',
                'Set Pieces': '4'
            },
            fullDescription: 'Full description for Armor Set 2. Add detailed information here.',
            sections: [
                {
                    title: 'Set Bonuses',
                    content: [
                        '2 pieces: Bonus 1',
                        '3 pieces: Bonus 2',
                        '4 pieces: Bonus 3'
                    ]
                }
            ],
            related: []
        },
        {
            id: 'armor-3',
            name: 'Armor Set 3',
            category: 'armor',
            icon: 'fa-user-ninja',
            gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
            description: 'Description for Armor Set 3',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Armor': '+80',
                'Agility': '+30',
                'Critical': '+10%',
                'Stealth': 'Enabled'
            },
            fullDescription: 'Full description for Armor Set 3. Add detailed information here.',
            sections: [
                {
                    title: 'Special Abilities',
                    content: [
                        'Ability 1 - Description',
                        'Ability 2 - Description'
                    ]
                }
            ],
            related: []
        }
    ],

    // ACCESSORIES
    accessories: [
        {
            id: 'accessory-1',
            name: 'Accessory 1',
            category: 'accessories',
            icon: 'fa-ring',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            description: 'Description for Accessory 1',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'All Stats': '+25',
                'Health': '+250',
                'Damage': '+50',
                'Rarity': 'Epic'
            },
            fullDescription: 'Full description for Accessory 1. Add detailed information here.',
            sections: [
                {
                    title: 'Special Effect',
                    content: [
                        'Effect 1 - Description',
                        'Effect 2 - Description'
                    ]
                }
            ],
            related: []
        },
        {
            id: 'accessory-2',
            name: 'Accessory 2',
            category: 'accessories',
            icon: 'fa-ring',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            description: 'Description for Accessory 2',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'All Stats': '+30',
                'Health': '+300',
                'Damage': '+60',
                'Rarity': 'Legendary'
            },
            fullDescription: 'Full description for Accessory 2. Add detailed information here.',
            sections: [
                {
                    title: 'Special Effect',
                    content: [
                        'Effect 1 - Description',
                        'Effect 2 - Description'
                    ]
                }
            ],
            related: []
        }
    ],

    // LOCATIONS
    locations: [
        {
            id: 'location-1',
            name: 'Location 1',
            category: 'locations',
            icon: 'fa-mountain',
            gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            description: 'Description for Location 1',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Level Range': '50-100',
                'Bosses': '3',
                'Loot Quality': 'Epic',
                'Players': '5-10'
            },
            fullDescription: 'Full description for Location 1. Add detailed information here.',
            sections: [
                {
                    title: 'Boss Encounters',
                    content: [
                        'Boss 1 - Description',
                        'Boss 2 - Description',
                        'Boss 3 - Description'
                    ]
                },
                {
                    title: 'Notable Features',
                    content: [
                        'Feature 1',
                        'Feature 2',
                        'Feature 3'
                    ]
                }
            ],
            related: []
        },
        {
            id: 'location-2',
            name: 'Location 2',
            category: 'locations',
            icon: 'fa-dungeon',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            description: 'Description for Location 2',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Level Range': '75-125',
                'Bosses': '5',
                'Loot Quality': 'Legendary',
                'Players': '10-20'
            },
            fullDescription: 'Full description for Location 2. Add detailed information here.',
            sections: [
                {
                    title: 'Boss Encounters',
                    content: [
                        'Boss 1 - Description',
                        'Boss 2 - Description'
                    ]
                }
            ],
            related: []
        }
    ],

    // QUESTLINES
    questlines: [
        {
            id: 'quest-1',
            name: 'Questline 1',
            category: 'questlines',
            icon: 'fa-scroll',
            gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
            description: 'Description for Questline 1',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Required Level': '50',
                'Duration': '1-2 hours',
                'Difficulty': 'Medium',
                'Chapters': '3'
            },
            fullDescription: 'Full description for Questline 1. Add detailed information here.',
            sections: [
                {
                    title: 'Quest Steps',
                    content: [
                        'Step 1 - Description',
                        'Step 2 - Description',
                        'Step 3 - Description'
                    ]
                },
                {
                    title: 'Rewards',
                    content: [
                        'Reward 1',
                        'Reward 2',
                        'Reward 3'
                    ]
                }
            ],
            related: []
        },
        {
            id: 'quest-2',
            name: 'Questline 2',
            category: 'questlines',
            icon: 'fa-scroll',
            gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
            description: 'Description for Questline 2',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Required Level': '75',
                'Duration': '2-3 hours',
                'Difficulty': 'Hard',
                'Chapters': '5'
            },
            fullDescription: 'Full description for Questline 2. Add detailed information here.',
            sections: [
                {
                    title: 'Quest Steps',
                    content: [
                        'Step 1 - Description',
                        'Step 2 - Description'
                    ]
                },
                {
                    title: 'Rewards',
                    content: [
                        'Reward 1',
                        'Reward 2'
                    ]
                }
            ],
            related: []
        }
    ],

    // ENEMIES
    enemies: [
        {
            id: 'enemy-1',
            name: 'Enemy 1',
            category: 'enemies',
            icon: 'fa-skull',
            gradient: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)',
            description: 'Description for Enemy 1',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Health': '500 HP',
                'Damage': '20-30',
                'Armor': '10',
                'Experience': '50 XP'
            },
            fullDescription: 'Full description for Enemy 1. Add detailed information here.',
            sections: [
                {
                    title: 'Drops',
                    content: [
                        'Item 1',
                        'Item 2',
                        'Item 3'
                    ]
                },
                {
                    title: 'Locations',
                    content: [
                        'Location 1',
                        'Location 2'
                    ]
                }
            ],
            related: []
        },
        {
            id: 'enemy-2',
            name: 'Enemy 2',
            category: 'enemies',
            icon: 'fa-skull-crossbones',
            gradient: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)',
            description: 'Description for Enemy 2',
            tags: ['Tag1', 'Tag2', 'Tag3'],
            stats: {
                'Health': '1000 HP',
                'Damage': '40-60',
                'Armor': '25',
                'Experience': '100 XP'
            },
            fullDescription: 'Full description for Enemy 2. Add detailed information here.',
            sections: [
                {
                    title: 'Drops',
                    content: [
                        'Item 1',
                        'Item 2'
                    ]
                },
                {
                    title: 'Locations',
                    content: [
                        'Location 1'
                    ]
                }
            ],
            related: []
        }
    ]
};

// ========================================
// DATA UTILITIES
// ========================================
const ALL_ITEMS = [
    ...WIKI_DATA.bosses,
    ...WIKI_DATA.weapons,
    ...WIKI_DATA.armor,
    ...WIKI_DATA.accessories,
    ...WIKI_DATA.locations,
    ...WIKI_DATA.questlines,
    ...WIKI_DATA.enemies
];

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
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
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
    
    grid.innerHTML = items.map(item => `
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
                ${item.tags.map(tag => `<span class="wiki-card-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
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
    document.getElementById('detailMeta').innerHTML = item.tags.map(tag => 
        `<span class="detail-badge">${tag}</span>`
    ).join('');
    
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
    
    const relatedHTML = relatedItems.map(related => `
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
    `).join('');
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

function filterCategory(category) {
    console.log('filterCategory called with:', category);
    
    STATE.currentView = 'list';
    STATE.currentCategory = category;
    STATE.searchQuery = '';
    document.getElementById('searchInput').value = '';
    
    const homeView = document.getElementById('homeView');
    const listView = document.getElementById('listView');
    const detailView = document.getElementById('detailView');
    
    console.log('Views found:', { homeView, listView, detailView });
    
    homeView.classList.add('hidden');
    listView.classList.remove('hidden');
    detailView.classList.add('hidden');
    
    // Update active category in sidebar
    document.querySelectorAll('.category-item').forEach(item => {
        const itemCategory = item.dataset.category;
        if (itemCategory) {
            item.classList.toggle('active', itemCategory === category);
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
        'weapons': 'Weapons',
        'armor': 'Armor',
        'accessories': 'Accessories',
        'locations': 'Locations',
        'questlines': 'Questlines',
        'enemies': 'Enemies'
    };
    
    const categoryDescriptions = {
        'bosses': 'Face legendary foes in epic battles',
        'weapons': 'Arm yourself with legendary gear',
        'armor': 'Protect yourself with powerful equipment',
        'accessories': 'Enhance your character with special items',
        'locations': 'Explore diverse worlds and dungeons',
        'questlines': 'Embark on epic adventures',
        'enemies': 'Know your foes and their weaknesses'
    };
    
    document.getElementById('categoryTitle').textContent = categoryNames[category] || category;
    document.getElementById('categoryDescription').textContent = categoryDescriptions[category] || '';
    
    // Render items
    const items = getItemsByCategory(category);
    console.log('Items to render:', items);
    renderWikiGrid(items);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSearch(query) {
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
    document.getElementById('categoryTitle').textContent = `Search: "${query}"`;
    document.getElementById('categoryDescription').textContent = 
        query ? `Found ${searchItems(query).length} results` : 'Showing all items';
    
    // Clear active category in sidebar
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Render search results
    const results = searchItems(query);
    renderWikiGrid(results);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// EVENT LISTENERS & INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
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
    console.log(`Total items: ${ALL_ITEMS.length}`);
});

// Export functions for onclick handlers
window.showHome = showHome;
window.showItemDetail = showItemDetail;
window.filterCategory = filterCategory;

// ========================================
// ITEM DETAIL FUNCTION
// ========================================
function showItemDetail(itemId) {
    const item = getItemById(itemId);
    if (!item) {
        console.error('Item not found:', itemId);
        return;
    }
    
    STATE.currentView = 'detail';
    STATE.currentItem = item;
    
    renderItemDetail(item);
}

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
            id: 'dragon-lord',
            name: 'Dragon Lord',
            category: 'bosses',
            icon: 'fa-dragon',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            description: 'Ancient dragon overlord who guards legendary treasures.',
            tags: ['Raid Boss', 'Level 100+', 'Fire'],
            stats: {
                'Health': '5,000,000 HP',
                'Damage': '5,000-10,000',
                'Armor': '500',
                'Difficulty': 'Mythic'
            },
            fullDescription: 'The Dragon Lord is the ultimate challenge, requiring a full raid group and perfect coordination to defeat. His flames can melt the strongest armor.',
            sections: [
                {
                    title: 'Abilities',
                    content: [
                        'Inferno Breath - Massive fire cone attack',
                        'Wing Buffet - Knockback all nearby players',
                        'Summon Drakes - Calls lesser dragons to aid',
                        'Cataclysm - Room-wide fire damage'
                    ]
                },
                {
                    title: 'Strategy',
                    content: [
                        'Tank must face boss away from raid',
                        'Kill adds immediately when summoned',
                        'Spread out during Cataclysm phase',
                        'Use fire resistance potions'
                    ]
                },
                {
                    title: 'Loot',
                    content: [
                        'Titan Sword (Legendary Weapon)',
                        'Dragon Scale Armor (Legendary Set)',
                        'Dragon Mount (Rare Drop)',
                        'Ancient Artifacts'
                    ]
                }
            ],
            related: ['titan-sword', 'dragons-peak', 'dragon-quest']
        }
    ],

    // WEAPONS
    weapons: [
        {
            id: 'titan-sword',
            name: 'Titan Sword',
            category: 'weapons',
            icon: 'fa-gavel',
            gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            description: 'A legendary blade forged in dragon fire.',
            tags: ['Legendary', 'Two-Handed', 'Melee'],
            stats: {
                'Damage': '+350',
                'Critical': '+20%',
                'Speed': 'Fast',
                'Rarity': 'Legendary'
            },
            fullDescription: 'The Titan Sword is said to have been crafted by the ancient dragon smiths in the heart of Mount Inferno. Its blade glows with an eternal flame.',
            sections: [
                {
                    title: 'Special Abilities',
                    content: [
                        'Dragon\'s Fury - Every 10th hit unleashes a fire wave',
                        'Flame Aura - Burns nearby enemies for 50 damage/sec',
                        'Phoenix Rebirth - Revive once per battle at 50% HP'
                    ]
                },
                {
                    title: 'How to Obtain',
                    content: [
                        'Defeat the Dragon Lord in Dragon\'s Peak',
                        '2% drop rate from Dragon Lord',
                        'Requires level 100+'
                    ]
                }
            ],
            related: ['dragon-lord', 'dragons-peak']
        },
        {
            id: 'staff-of-eternity',
            name: 'Staff of Eternity',
            category: 'weapons',
            icon: 'fa-wand-magic-sparkles',
            gradient: 'linear-gradient(135deg, #9333ea 0%, #4c1d95 100%)',
            description: 'An ancient staff channeling infinite magical power.',
            tags: ['Legendary', 'Two-Handed', 'Magic'],
            stats: {
                'Magic Power': '+400',
                'Mana Regen': '+50/sec',
                'Cooldown': '-25%',
                'Rarity': 'Legendary'
            },
            fullDescription: 'Created by the Archmage Council, the Staff of Eternity contains a fragment of pure magical essence.',
            sections: [
                {
                    title: 'Special Abilities',
                    content: [
                        'Infinite Mana - Never run out of mana',
                        'Spell Echo - 30% chance to cast spells twice',
                        'Time Warp - Rewind all cooldowns once per minute'
                    ]
                }
            ],
            related: ['mystic-robes']
        },
        {
            id: 'phoenix-bow',
            name: 'Phoenix Bow',
            category: 'weapons',
            icon: 'fa-crosshairs',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            description: 'A bow blessed by the legendary Phoenix.',
            tags: ['Epic', 'Two-Handed', 'Ranged'],
            stats: {
                'Damage': '+280',
                'Critical': '+25%',
                'Speed': 'Very Fast',
                'Rarity': 'Epic'
            },
            fullDescription: 'This bow was crafted from the feathers of a Phoenix and never runs out of arrows.',
            sections: [
                {
                    title: 'Special Abilities',
                    content: [
                        'Infinite Arrows - Never need to refill',
                        'Phoenix Fire - Arrows ignite targets',
                        'Wing Shot - Fire while jumping'
                    ]
                }
            ],
            related: ['shadow-cloak']
        }
    ],

    // ARMOR
    armor: [
        {
            id: 'titan-armor',
            name: 'Titan Armor Set',
            category: 'armor',
            icon: 'fa-shield-alt',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            description: 'Legendary armor set forged from dragon scales.',
            tags: ['Legendary', 'Heavy Armor', 'Set'],
            stats: {
                'Armor': '+500',
                'Health': '+1000',
                'Resistance': '+30%',
                'Set Pieces': '5'
            },
            fullDescription: 'The Titan Armor Set is the pinnacle of defensive equipment, providing unmatched protection.',
            sections: [
                {
                    title: 'Set Bonuses',
                    content: [
                        '2 pieces: +200 Health',
                        '3 pieces: +10% damage reduction',
                        '4 pieces: Thorns damage reflect',
                        '5 pieces: Immune to fire damage'
                    ]
                }
            ],
            related: ['titan-sword', 'dragon-lord']
        },
        {
            id: 'mystic-robes',
            name: 'Mystic Robes',
            category: 'armor',
            icon: 'fa-hat-wizard',
            gradient: 'linear-gradient(135deg, #9333ea 0%, #4c1d95 100%)',
            description: 'Enchanted robes that amplify magical power.',
            tags: ['Epic', 'Light Armor', 'Set'],
            stats: {
                'Armor': '+150',
                'Magic Power': '+200',
                'Mana': '+500',
                'Set Pieces': '4'
            },
            fullDescription: 'These robes are woven with arcane threads that enhance spell casting abilities.',
            sections: [
                {
                    title: 'Set Bonuses',
                    content: [
                        '2 pieces: +100 Mana',
                        '3 pieces: +15% spell damage',
                        '4 pieces: Cast time reduced by 20%'
                    ]
                }
            ],
            related: ['staff-of-eternity']
        },
        {
            id: 'shadow-cloak',
            name: 'Shadow Cloak',
            category: 'armor',
            icon: 'fa-user-ninja',
            gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
            description: 'A cloak that grants stealth and agility.',
            tags: ['Epic', 'Light Armor', 'Stealth'],
            stats: {
                'Armor': '+100',
                'Agility': '+50',
                'Critical': '+15%',
                'Stealth': 'Enabled'
            },
            fullDescription: 'Wear this cloak to move unseen through the shadows.',
            sections: [
                {
                    title: 'Special Abilities',
                    content: [
                        'Shadow Walk - Turn invisible for 5 seconds',
                        'Increased movement speed',
                        'Critical strikes from stealth deal 2x damage'
                    ]
                }
            ],
            related: ['phoenix-bow']
        }
    ],

    // ACCESSORIES
    accessories: [
        {
            id: 'ring-of-power',
            name: 'Ring of Power',
            category: 'accessories',
            icon: 'fa-ring',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            description: 'A ring that amplifies all stats.',
            tags: ['Legendary', 'Ring', 'Universal'],
            stats: {
                'All Stats': '+50',
                'Health': '+500',
                'Damage': '+100',
                'Rarity': 'Legendary'
            },
            fullDescription: 'This ancient ring was worn by the first king and grants immense power to its wearer.',
            sections: [
                {
                    title: 'Special Effect',
                    content: [
                        'Increases all stats by 10%',
                        'Grants immunity to crowd control once per minute',
                        'Passive health regeneration'
                    ]
                }
            ],
            related: []
        }
    ],

    // LOCATIONS
    locations: [
        {
            id: 'dragons-peak',
            name: 'Dragon\'s Peak',
            category: 'locations',
            icon: 'fa-mountain',
            gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            description: 'A treacherous mountain inhabited by ancient dragons.',
            tags: ['Dungeon', 'High Level', 'Raid'],
            stats: {
                'Level Range': '100-150',
                'Bosses': '5',
                'Loot Quality': 'Legendary',
                'Players': '10-20'
            },
            fullDescription: 'Dragon\'s Peak stands as the tallest mountain in the realm, shrouded in mystery and danger.',
            sections: [
                {
                    title: 'Boss Encounters',
                    content: [
                        'Flame Drake - Fire breathing dragon',
                        'Frost Wyrm - Ice elemental dragon',
                        'Storm Dragon - Lightning attacks',
                        'Shadow Serpent - Poison and stealth',
                        'Dragon Lord - Final boss with all elements'
                    ]
                }
            ],
            related: ['dragon-lord', 'titan-sword', 'dragon-quest']
        }
    ],

    // QUESTLINES
    questlines: [
        {
            id: 'dragon-quest',
            name: 'The Dragon\'s Challenge',
            category: 'questlines',
            icon: 'fa-scroll',
            gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
            description: 'Prove your worth by defeating the Dragon Lord.',
            tags: ['Main Quest', 'Epic', 'Level 100+'],
            stats: {
                'Required Level': '100',
                'Duration': '2-3 hours',
                'Difficulty': 'Epic',
                'Chapters': '5'
            },
            fullDescription: 'The Dragon Lord has challenged the strongest warriors in the realm to face him at Dragon\'s Peak.',
            sections: [
                {
                    title: 'Quest Steps',
                    content: [
                        'Speak to the Elder in the village',
                        'Collect 5 Dragon Artifacts',
                        'Reach the summit of Dragon\'s Peak',
                        'Defeat all guardian dragons',
                        'Face the Dragon Lord in final combat'
                    ]
                },
                {
                    title: 'Rewards',
                    content: [
                        'Titan Sword (Legendary Weapon)',
                        '500,000 Gold',
                        'Dragon Mount',
                        'Title: Dragon Slayer'
                    ]
                }
            ],
            related: ['dragons-peak', 'dragon-lord', 'titan-sword']
        }
    ],

    // ENEMIES
    enemies: [
        {
            id: 'goblin-warrior',
            name: 'Goblin Warrior',
            category: 'enemies',
            icon: 'fa-skull',
            gradient: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)',
            description: 'Common enemy found in forests and caves.',
            tags: ['Common', 'Melee', 'Level 1-10'],
            stats: {
                'Health': '500 HP',
                'Damage': '20-30',
                'Armor': '10',
                'Experience': '50 XP'
            },
            fullDescription: 'Goblin Warriors are the foot soldiers of goblin tribes, often found in groups.',
            sections: [
                {
                    title: 'Drops',
                    content: [
                        'Goblin Sword (Common)',
                        'Leather Scraps',
                        '5-10 Gold',
                        'Health Potion (Rare)'
                    ]
                },
                {
                    title: 'Locations',
                    content: [
                        'Dark Forest',
                        'Goblin Caves',
                        'Mountain Paths'
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
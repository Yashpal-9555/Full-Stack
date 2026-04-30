// ===== DOM Elements =====
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const reportForm = document.getElementById('report-form');
const itemImageInput = document.getElementById('item-image');
const imagePreview = document.getElementById('image-preview');
const imagePreviewContainer = document.getElementById('image-preview-container');
const fileName = document.getElementById('file-name');
const recentItemsContainer = document.getElementById('recent-items');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

// ===== Sample Data =====
const sampleItems = [
    {
        id: 1,
        type: 'Wallet',
        location: 'Library',
        date: '2 hours ago',
        image: 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?w=300',
        description: 'Black leather wallet with 3 credit cards inside',
        verification: 'What is the brand of the cards?'
    },
    {
        id: 2,
        type: 'Phone',
        location: 'Cafeteria',
        date: '5 hours ago',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300',
        description: 'iPhone 13 with blue case',
        verification: 'What color is the case?'
    },
    {
        id: 3,
        type: 'Keys',
        location: 'Computer Lab',
        date: '1 day ago',
        image: 'https://images.unsplash.com/photo-1604671805448-5a4c640ee0d5?w=300',
        description: 'Keychain with 4 keys and a small teddy bear',
        verification: 'How many keys are there?'
    }
];

// ===== Theme Toggle =====
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Set initial theme from localStorage
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

// ===== Mobile Menu =====
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('active');
});

// ===== Image Upload Preview =====
itemImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = file.name;
        imagePreview.src = URL.createObjectURL(file);
        imagePreviewContainer.classList.remove('hidden');
        
        // Revoke object URL when image is loaded to free memory
        imagePreview.onload = function() {
            URL.revokeObjectURL(imagePreview.src);
        }
    } else {
        fileName.textContent = 'No file chosen';
        imagePreviewContainer.classList.add('hidden');
    }
});

// ===== Form Submission =====
reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        itemType: document.getElementById('item-type').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value,
        verification: document.getElementById('verification').value,
        image: itemImageInput.files[0] ? itemImageInput.files[0].name : null
    };
    
    console.log('Form submitted:', formData);
    
    // In a real app, you would send this to your backend
    // fetch('/api/report', { method: 'POST', body: JSON.stringify(formData) })
    
    // Show success message
    alert('Item reported successfully! Our team will review it shortly.');
    reportForm.reset();
    imagePreviewContainer.classList.add('hidden');
    fileName.textContent = 'No file chosen';
});

// ===== Load Recent Items =====
function loadRecentItems(items = sampleItems) {
    recentItemsContainer.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md card-hover transition duration-300 animate-fade-in';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.type}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold text-primary dark:text-white">${item.type}</h3>
                <p class="text-gray-600 dark:text-gray-300 flex items-center">
                    <i class="fas fa-map-marker-alt mr-2"></i>${item.location}
                </p>
                <p class="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                    <i class="far fa-clock mr-2"></i>${item.date}
                </p>
                <button class="mt-3 bg-secondary text-white py-1 px-3 rounded-md text-sm hover:bg-accent transition duration-300 view-details" data-id="${item.id}">
                    View Details
                </button>
            </div>
        `;
        recentItemsContainer.appendChild(itemElement);
    });
    
    // Add event listeners to detail buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const item = sampleItems.find(i => i.id === itemId);
            showItemDetails(item);
        });
    });
}

// ===== Show Item Details =====
function showItemDetails(item) {
    // In a real app, this would be a modal
    alert(`Item Details:\n\nType: ${item.type}\nLocation: ${item.location}\nDescription: ${item.description}\n\nVerification Question: ${item.verification}`);
}

// ===== Search Functionality =====
function performSearch(query) {
    const results = sampleItems.filter(item => 
        item.type.toLowerCase().includes(query.toLowerCase()) || 
        item.location.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-search fa-3x text-gray-400 mb-4"></i>
                <p class="text-gray-600 dark:text-gray-300">No items found matching your search</p>
            </div>
        `;
        return;
    }
    
    results.forEach(item => {
        const resultElement = document.createElement('div');
        resultElement.className = 'bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm';
        resultElement.innerHTML = `
            <div class="flex items-start">
                <img src="${item.image}" alt="${item.type}" class="w-16 h-16 object-cover rounded-md mr-4">
                <div>
                    <h3 class="font-medium text-primary dark:text-white">${item.type}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                        <i class="fas fa-map-marker-alt mr-1"></i> ${item.location}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${item.description}</p>
                    <button class="mt-2 text-sm text-accent hover:underline claim-btn" data-id="${item.id}">
                        Is this yours? Claim it
                    </button>
                </div>
            </div>
        `;
        searchResults.appendChild(resultElement);
    });
    
    // Add event listeners to claim buttons
    document.querySelectorAll('.claim-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const item = sampleItems.find(i => i.id === itemId);
            initiateClaimProcess(item);
        });
    });
}

// ===== Claim Process =====
function initiateClaimProcess(item) {
    const answer = prompt(`To claim this ${item.type}, please answer:\n\n${item.verification}`);
    
    if (answer) {
        // In a real app, you would verify with backend
        alert(`Thank you! Your answer has been submitted. The owner will contact you if it matches.`);
    }
}

// ===== Event Listeners =====
searchButton.addEventListener('click', () => {
    performSearch(searchInput.value.trim());
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value.trim());
    }
});

// ===== Initialize Page =====
document.addEventListener('DOMContentLoaded', () => {
    loadRecentItems();
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card-hover').forEach(card => {
        observer.observe(card);
    });
});


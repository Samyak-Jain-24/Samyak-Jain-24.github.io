// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Update active link
      document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
      });
      link.classList.add('active');
      
      // Close mobile menu if open
      document.querySelector('.nav-container').classList.remove('active');
    });
  });
  
  // Update active link on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
            
            // Move indicator
            const indicator = document.querySelector('.nav-indicator');
            indicator.style.width = `${link.offsetWidth}px`;
            indicator.style.left = `${link.offsetLeft}px`;
          }
        });
      }
    });
  });
  
  // Mobile Menu Toggle
  document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
    document.querySelector('.nav-container').classList.toggle('active');
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const navContainer = document.querySelector('.nav-container');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!navContainer.contains(e.target) && e.target !== menuBtn) {
      navContainer.classList.remove('active');
    }
  });

// Lightbox functionality
function openLightbox(imageSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = imageSrc;
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Scroll to top button
window.addEventListener('scroll', () => {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Theme toggle functionality
document.getElementById('darkToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
  particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Particles.js loaded successfully');
  });
});

function analyzeEnhancedText() {
  const text = document.getElementById('text-input').value.trim();
  if (!text) {
    alert('Please enter some text to analyze');
    return;
  }

  // Basic Statistics
  const letters = text.replace(/[^a-zA-Z]/g, '').length;
  const words = text.split(/\s+/).filter(word => word.length > 0).length;
  const spaces = (text.match(/ /g) || []).length;
  const newlines = (text.match(/\n/g) || []).length;
  const specialChars = text.replace(/[a-zA-Z0-9\s\n]/g, '').length;

  // Display Basic Stats
  document.getElementById('basic-stats').innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${letters}</div>
      <div class="stat-label">Letters</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${words}</div>
      <div class="stat-label">Words</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${spaces}</div>
      <div class="stat-label">Spaces</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${newlines}</div>
      <div class="stat-label">Newlines</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${specialChars}</div>
      <div class="stat-label">Special Characters</div>
    </div>
  `;

  // Process other stats
  const tokens = text.toLowerCase().match(/[a-z']+/g) || [];
  
  const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
                   'my', 'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs'];
  const prepositions = ['about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'at',
                       'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by',
                       'down', 'during', 'for', 'from', 'in', 'inside', 'into', 'near', 'of', 'off',
                       'on', 'out', 'over', 'through', 'to', 'toward', 'under', 'until', 'up', 'upon',
                       'with', 'within', 'without'];
  const articles = ['a', 'an', 'the'];

  showTokenCounts(tokens, pronouns, 'pronouns-stats');
  showTokenCounts(tokens, prepositions, 'prepositions-stats');
  showTokenCounts(tokens, articles, 'articles-stats');
}

function showTokenCounts(tokens, targetWords, elementId) {
  const counts = {};
  targetWords.forEach(word => counts[word] = 0);
  
  tokens.forEach(token => {
    if (targetWords.includes(token)) {
      counts[token]++;
    }
  });

  const results = Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  const container = document.getElementById(elementId);
  container.innerHTML = results.length > 0 
    ? results.map(([word, count]) => `
        <div class="stat-card">
          <div class="stat-value">${count}</div>
          <div class="stat-label">${word}</div>
        </div>
      `).join('')
    : '<div class="stat-card">No matches found</div>';
}

// Enhanced Event Tracking System
document.addEventListener('DOMContentLoaded', function() {
  // Track all clicks with enhanced details
  document.addEventListener('click', function(e) {
    const target = e.target;
    const timestamp = new Date().toISOString();
    
    // Skip tracking if element has no-track class
    if (target.classList.contains('no-track')) return;
    
    let elementInfo = '';
    
    // Determine element type and details
    if (target.tagName === 'IMG') {
      elementInfo = `image: ${target.src.split('/').pop()}`;
    } 
    else if (target.tagName === 'A') {
      elementInfo = `link: ${target.innerText.trim() || target.getAttribute('href')}`;
    }
    else if (target.tagName === 'BUTTON') {
      elementInfo = `button: ${target.innerText.trim() || target.id}`;
    }
    else {
      elementInfo = `${target.tagName.toLowerCase()}`;
      if (target.id) elementInfo += `#${target.id}`;
      if (target.className && typeof target.className === 'string') {
        elementInfo += `.${target.className.split(' ').join('.')}`;
      }
    }
    
    console.log(`${timestamp}, click, ${elementInfo}`);
  });

  // Track section views with Intersection Observer
// In your existing "Enhanced Event Tracking System" code
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const timestamp = new Date().toISOString();
      console.log(`${timestamp}, view, section: ${entry.target.id}`);
    }
  });
}, { 
  threshold: 0.1, // Trigger when 10% visible instead of 50%
  rootMargin: "0px 0px -100px 0px" // Adjust viewport calculation
});
  // Observe all main sections
  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
  });

  // Special tracking for CV download
  const cvLink = document.querySelector('a[href$=".pdf"]');
  if (cvLink) {
    cvLink.addEventListener('click', function() {
      const timestamp = new Date().toISOString();
      console.log(`${timestamp}, click, CV download: ${this.getAttribute('href')}`);
    });
  }
});
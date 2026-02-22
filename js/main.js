// AeroAcademy - Main JavaScript

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

// API Base URL
const API_BASE = '/php_backend/api';

// Fetch API wrapper
async function apiFetch(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
}

// Get courses
async function getCourses(category = null) {
    const url = category ? `/courses.php?category=${category}` : '/courses.php';
    return apiFetch(url);
}

// Get course by ID
async function getCourse(id) {
    return apiFetch(`/course.php?id=${id}`);
}

// Get articles
async function getArticles(category = null, featured = false) {
    let url = '/articles.php';
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (featured) params.append('featured', 'true');
    if (params.toString()) url += '?' + params.toString();
    return apiFetch(url);
}

// Get article by ID
async function getArticle(id) {
    return apiFetch(`/article.php?id=${id}`);
}

// Get testimonials
async function getTestimonials(featured = false) {
    const url = featured ? '/testimonials.php?featured=true' : '/testimonials.php';
    return apiFetch(url);
}

// Get team members
async function getTeamMembers() {
    return apiFetch('/team.php');
}

// Submit contact form
async function submitContactForm(data) {
    return apiFetch('/contact.php', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// Submit consultancy form
async function submitConsultancyForm(data) {
    return apiFetch('/consultancy.php', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// Form submission handler
function handleFormSubmit(formId, submitFn, successMessage) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            await submitFn(data);
            
            alert(successMessage || 'Form submitted successfully!');
            form.reset();
        } catch (error) {
            alert('Error submitting form. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Initialize forms on page load
document.addEventListener('DOMContentLoaded', () => {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        handleFormSubmit('contactForm', submitContactForm, 'Thank you! We will get back to you within 24 hours.');
    }

    // Consultancy form
    const consultancyForm = document.getElementById('consultancyForm');
    if (consultancyForm) {
        handleFormSubmit('consultancyForm', submitConsultancyForm, 'Thank you! We will get back to you within 24 hours.');
    }
});


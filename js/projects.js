/*
* Portfolio Website - Projects Logic
* Created: 2025
*/

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const modalTitle = document.querySelector('.modal-title');
const modalImage = document.querySelector('.modal-image img');
const modalDescription = document.querySelector('.modal-description p');
const modalSiteLink = document.querySelector('.modal-links .primary-btn');
const modalCodeLink = document.querySelector('.modal-links .secondary-btn');
const closeModalBtn = document.querySelector('.close-modal');
const viewProjectLinks = document.querySelectorAll('.view-project');

// Project Data
const projectsData = [
  {
    id: 1,
    title: 'Personal Portfolio',
    category: 'web',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A web-based portfolio showcasing my skills and projects. Built with HTML, CSS, and JavaScript, this responsive design highlights my work in web development and design. It includes sections for about me, projects, skills, and contact information.',
    siteLink: '#',
    codeLink: '#'
  },
  {
    id: 2,
    title: 'Note App',
    category: 'app',
    image: 'images/project2.png',
    description: 'An application created in Android Studio using Java. This note-taking app allows users to create, edit, and delete notes. It features a simple and intuitive user interface, with options for categorizing notes and searching through them.',
    siteLink: '#',
    codeLink: '#'
  },
  {
    id: 3,
    title: 'E-commerce for computer parts',
    category: 'design',
    image: 'images/project3.png',
    description: 'web-based e-commerce platform designed for computer parts. Built with HTML, CSS, and JavaScript, this template includes product listings, a shopping cart, and user authentication. It is fully responsive and optimized for both desktop and mobile devices.',
    siteLink: '#',
    codeLink: '#'
  },
  {
    id: 4,
    title: 'Grade Management System',
    category: 'web',
    image: 'images/project4.png',
    description: 'A web application for managing student grades. Built with HTML, CSS, and JavaScript, this system allows teachers to input grades, calculate averages, and generate reports. It features a user-friendly interface and is designed to handle multiple classes and students.',
    siteLink: '#',
    codeLink: '#'
  }
];

// Filter Projects
const filterProjects = (category) => {
  projectCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
};

// Open Project Modal
const openProjectModal = (projectId) => {
  const project = projectsData.find(p => p.id === projectId);
  
  if (!project) return;
  
  // Set modal content
  modalTitle.textContent = project.title;
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalDescription.textContent = project.description;
  modalSiteLink.href = project.siteLink;
  modalCodeLink.href = project.codeLink;
  
  // Show modal
  projectModal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
};

// Close Project Modal
const closeProjectModal = () => {
  projectModal.classList.remove('show');
  document.body.style.overflow = 'auto'; // Re-enable scrolling
};

// Add Projects Dynamically
const renderProjects = () => {
  const projectsGrid = document.querySelector('.projects-grid');
  
  // Clear existing content
  projectsGrid.innerHTML = '';
  
  // Loop through projects data and create cards
  projectsData.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.setAttribute('data-category', project.category);
    
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
        <div class="project-overlay">
          <a href="#" class="view-project" data-id="${project.id}">View Project</a>
        </div>
      </div>
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description.substring(0, 80)}...</p>
        <div class="project-tech">
          ${getProjectTechTags(project.category)}
        </div>
      </div>
    `;
    
    projectsGrid.appendChild(projectCard);
  });
  
  // Add event listeners to new view project links
  document.querySelectorAll('.view-project').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = parseInt(link.getAttribute('data-id'));
      openProjectModal(projectId);
    });
  });
};

// Helper function to generate tech tags based on project category
const getProjectTechTags = (category) => {
  switch (category) {
    case 'web':
      return '<span>HTML</span><span>CSS</span><span>JavaScript</span>';
    case 'app':
      return '<span>Android Studio</span><span>Java</span>';
    case 'design':
      return '<span>HTML</span><span>CSS</span><span>Javascript</span>';
    default:
      return '';
  }
};

// Event Listeners
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Filter projects
    const category = button.getAttribute('data-filter');
    filterProjects(category);
  });
});

// Event listeners for view project links
viewProjectLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Get parent card to identify which project
    const projectCard = link.closest('.project-card');
    const index = Array.from(projectCards).indexOf(projectCard);
    
    // Open modal with corresponding project data
    openProjectModal(projectsData[index].id);
  });
});

// Close modal event listeners
closeModalBtn.addEventListener('click', closeProjectModal);

projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    closeProjectModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('show')) {
    closeProjectModal();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize with "all" filter
  filterProjects('all');
  
  // If we want to dynamically render projects instead of static HTML
  // renderProjects();
});

// Project hover interactions
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const overlay = card.querySelector('.project-overlay');
    const viewProject = card.querySelector('.view-project');
    
    overlay.style.opacity = '1';
    viewProject.style.opacity = '1';
    viewProject.style.transform = 'translateY(0)';
  });
  
  card.addEventListener('mouseleave', () => {
    const overlay = card.querySelector('.project-overlay');
    const viewProject = card.querySelector('.view-project');
    
    overlay.style.opacity = '0';
    viewProject.style.opacity = '0';
    viewProject.style.transform = 'translateY(20px)';
  });
});
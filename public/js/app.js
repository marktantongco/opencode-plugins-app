// OpenCode Plugins App - Main Application Logic

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize app
  await loadPlugins();
  setupEventListeners();
  initMobileMenu();
});

// Global state
let pluginsData = [];
let currentFilter = 'all';

// Fetch plugins from API
async function loadPlugins() {
  try {
    const response = await fetch('/api/plugins/top');
    const data = await response.json();
    pluginsData = data;
    renderPluginCards(pluginsData);
  } catch (error) {
    console.error('Failed to load plugins:', error);
    // Fallback: render from embedded data
    renderPluginCards(getEmbeddedPlugins());
  }
}

// Embedded fallback data
function getEmbeddedPlugins() {
  return [
    {
      rank: 1,
      name: "opencode-dynamic-context-pruning",
      displayName: "Dynamic Context Pruning (DCP)",
      shortName: "DCP",
      description: "Intelligently manages conversation context to optimize token usage. Automatically reduces token usage by pruning obsolete tool outputs.",
      stars: 2348,
      rating: 4.8,
      category: "token-optimization",
      categoryLabel: "Token Optimization",
      features: ["Automatic context compression", "Token usage analysis", "Slash commands", "Manual mode toggle"],
      installCommand: "npm install opencode-dynamic-context-pruning",
      useCase: "Essential for long coding sessions to reduce token costs by 40-60%"
    },
    {
      rank: 2,
      name: "opencode-morph-plugin",
      displayName: "Morph Fast Apply",
      shortName: "Morph",
      description: "Fast Apply editing with 10,500+ tok/s code merging, WarpGrep codebase search, and automatic context compaction.",
      stars: 500,
      rating: 4.9,
      category: "code-editing",
      categoryLabel: "Code Editing",
      features: ["Fast Apply (10,500+ tok/s)", "WarpGrep codebase search", "Public Repo Context", "Automatic compaction"],
      installCommand: "npm install opencode-morph-plugin",
      useCase: "Best for large files (300+ lines) and multiple scattered changes"
    },
    {
      rank: 3,
      name: "opencode-tool-search",
      displayName: "Tool Search",
      shortName: "Tool Search",
      description: "BM25 + regex search to discover tools on demand, reducing context usage by 69-85%.",
      stars: 120,
      rating: 4.6,
      category: "token-optimization",
      categoryLabel: "Token Optimization",
      features: ["BM25 keyword search", "Regex search", "Deferred tool descriptions", "Configurable search limit"],
      installCommand: "npm install opencode-tool-search",
      useCase: "Reduces context usage by 69-85% by deferring tool descriptions"
    },
    {
      rank: 4,
      name: "opencode-model-fallback",
      displayName: "Model Fallback",
      shortName: "Model Fallback",
      description: "Automatic model fallback when APIs fail. Transparently switches to the next model in your fallback chain.",
      stars: 85,
      rating: 4.7,
      category: "reliability",
      categoryLabel: "Reliability",
      features: ["Automatic fallback on rate limits", "Per-agent fallback chains", "Global model health tracking", "TTFT timeout"],
      installCommand: "npm install opencode-model-fallback",
      useCase: "Critical for production to prevent downtime from rate limits"
    },
    {
      rank: 5,
      name: "oh-my-opencode",
      displayName: "Oh My OpenCode",
      shortName: "Oh My OpenCode",
      description: "Full multi-agent orchestration harness with background agents, LSP/AST/MCP tools, and Claude Code compatibility.",
      stars: 420,
      rating: 4.8,
      category: "multi-agent",
      categoryLabel: "Multi-Agent",
      features: ["Specialized sub-agents", "Background task management", "LSP/AST tools", "tmux integration"],
      installCommand: "npm install oh-my-opencode",
      useCase: "Best for complex multi-agent workflows and parallel coding tasks"
    },
    {
      rank: 6,
      name: "opencode-background-agents",
      displayName: "Background Agents",
      shortName: "Bg Agents",
      description: "Claude Code-style background agents with async delegation and context persistence.",
      stars: 180,
      rating: 4.5,
      category: "multi-agent",
      categoryLabel: "Multi-Agent",
      features: ["Async delegation", "Context persistence", "Background task execution", "Claude Code style"],
      installCommand: "npm install opencode-background-agents",
      useCase: "Run background tasks without blocking main agent workflow"
    },
    {
      rank: 7,
      name: "claude-code-safety-net",
      displayName: "Safety Net",
      shortName: "Safety Net",
      description: "Safety net that catches destructive git and filesystem commands before they execute.",
      stars: 320,
      rating: 5.0,
      category: "safety",
      categoryLabel: "Safety",
      features: ["Catches destructive git commands", "Prevents accidental file deletions", "Blocks force pushes", "Confirmation prompts"],
      installCommand: "npm install claude-code-safety-net",
      useCase: "Essential for preventing catastrophic mistakes in production"
    },
    {
      rank: 8,
      name: "opencode-openai-codex-auth",
      displayName: "OpenAI Codex Auth",
      shortName: "Codex Auth",
      description: "Use your ChatGPT Plus/Pro subscription instead of API credits.",
      stars: 250,
      rating: 4.7,
      category: "authentication",
      categoryLabel: "Authentication",
      features: ["OAuth with OpenAI", "Use ChatGPT Plus/Pro", "No API credits needed", "Automatic token refresh"],
      installCommand: "npm install opencode-openai-codex-auth",
      useCase: "Save costs by using existing ChatGPT subscription"
    },
    {
      rank: 9,
      name: "opencode-copilot-plugin",
      displayName: "Copilot Integration",
      shortName: "Copilot",
      description: "Brings GitHub Copilot's custom instructions, skills, agents, and hooks system into OpenCode.",
      stars: 180,
      rating: 4.6,
      category: "integration",
      categoryLabel: "Integration",
      features: ["Repo-wide instructions", "Path-specific instructions", "Custom skills support", "Hook scripts execution"],
      installCommand: "npm install opencode-copilot-plugin",
      useCase: "Leverage existing Copilot customizations in OpenCode"
    },
    {
      rank: 10,
      name: "opencode-notify",
      displayName: "Native Notifications",
      shortName: "Notify",
      description: "Native OS desktop notifications for OpenCode — know when tasks complete.",
      stars: 95,
      rating: 4.4,
      category: "developer-experience",
      categoryLabel: "Developer Experience",
      features: ["Desktop notifications", "Sound alerts", "Task completion notifications", "Error notifications"],
      installCommand: "npm install opencode-notify",
      useCase: "Stay informed when long-running tasks complete"
    }
  ];
}

// Render plugin cards
function renderPluginCards(plugins) {
  const grid = document.getElementById('plugins-grid');
  const filtered = currentFilter === 'all' 
    ? plugins 
    : plugins.filter(p => p.category === currentFilter);
  
  grid.innerHTML = filtered.map(plugin => createPluginCard(plugin)).join('');
  
  // Re-trigger GSAP animation for new cards
  if (window.gsapCtx) {
    gsap.from('.plugin-card', {
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
}

// Create plugin card HTML
function createPluginCard(plugin) {
  const starsDisplay = plugin.stars >= 1000 
    ? `${(plugin.stars / 1000).toFixed(1)}k` 
    : plugin.stars;
  
  return `
    <article class="plugin-card rounded-2xl p-6 cursor-pointer" data-category="${plugin.category}" data-rank="${plugin.rank}">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-3">
          <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/30 to-purple-500/30 text-primary-400 font-bold text-lg">
            ${plugin.rank}
          </span>
          <div>
            <h3 class="font-semibold text-lg">${plugin.displayName}</h3>
            <p class="text-xs text-gray-500 font-mono">${plugin.name}</p>
          </div>
        </div>
        <span class="category-badge px-3 py-1 rounded-full text-xs font-medium">
          ${plugin.categoryLabel}
        </span>
      </div>
      
      <p class="text-gray-400 text-sm mb-4 line-clamp-3">
        ${plugin.description}
      </p>
      
      <div class="flex items-center justify-between pt-4 border-t border-dark-700">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-sm font-medium">${plugin.rating}</span>
          </div>
          <div class="flex items-center space-x-1 text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span class="text-sm">${starsDisplay}</span>
          </div>
        </div>
        
        <button class="text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors flex items-center space-x-1">
          <span>View</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </article>
  `;
}

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-primary-500/20', 'text-primary-400', 'border-primary-500/30');
        b.classList.add('bg-dark-700/50', 'text-gray-400', 'border-dark-600');
      });
      btn.classList.add('active', 'bg-primary-500/20', 'text-primary-400', 'border-primary-500/30');
      btn.classList.remove('bg-dark-700/50', 'text-gray-400', 'border-dark-600');
      
      // Filter plugins
      currentFilter = btn.dataset.filter;
      renderPluginCards(pluginsData.length ? pluginsData : getEmbeddedPlugins());
    });
  });
  
  // Plugin card click - expand details
  document.getElementById('plugins-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.plugin-card');
    if (card) {
      const rank = parseInt(card.dataset.rank, 10);
      const plugin = (pluginsData.length ? pluginsData : getEmbeddedPlugins()).find(p => p.rank === rank);
      if (plugin) {
        showPluginDetail(plugin);
      }
    }
  });
}

// Show plugin detail modal
function showPluginDetail(plugin) {
  // Create modal if not exists
  let modal = document.getElementById('plugin-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'plugin-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"></div>
      <div class="relative bg-dark-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 border border-dark-700">
        <button id="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div id="modal-content"></div>
      </div>
    `;
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('absolute')) {
        closeModal();
      }
    });
    
    document.getElementById('close-modal').addEventListener('click', closeModal);
  }
  
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div class="mb-6">
      <div class="flex items-center space-x-3 mb-4">
        <span class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/30 to-purple-500/30 text-primary-400 font-bold text-xl">
          ${plugin.rank}
        </span>
        <div>
          <h2 class="text-2xl font-bold">${plugin.displayName}</h2>
          <p class="text-sm text-gray-400 font-mono">${plugin.name}</p>
        </div>
      </div>
      
      <span class="category-badge px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
        ${plugin.categoryLabel}
      </span>
      
      <p class="text-gray-300 text-lg">${plugin.description}</p>
    </div>
    
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-3">Key Features</h3>
      <ul class="space-y-2">
        ${plugin.features.map(f => `
          <li class="flex items-start space-x-2">
            <svg class="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-gray-300">${f}</span>
          </li>
        `).join('')}
      </ul>
    </div>
    
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-3">Use Case</h3>
      <p class="text-gray-400">${plugin.useCase}</p>
    </div>
    
    <div class="code-block rounded-xl p-4 overflow-x-auto">
      <div class="text-xs text-gray-500 mb-2">Install Command</div>
      <code class="text-sm text-primary-400">${plugin.installCommand}</code>
    </div>
    
    <div class="flex items-center justify-between mt-6 pt-6 border-t border-dark-700">
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-1">
          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
          <span class="font-medium">${plugin.rating}</span>
        </div>
        <div class="flex items-center space-x-1 text-gray-400">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
          <span>${plugin.stars} stars</span>
        </div>
      </div>
    </div>
  `;
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('plugin-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

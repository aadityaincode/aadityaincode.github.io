// Content database for all sections and notes
const contentData = {
    // Example for future: 'terminal': { title: 'terminal', type: 'terminal', blocks: [] },
    'whoami': {
        title: 'whoami',
        type: 'landing',
        showHint: true,
        blocks: [
            'computer science student interested in data, systems, and how people organize complexity.',
            'i like building things slowly, thinking in markdown, and understanding <span class="card__highlight">why</span> systems work the way they do.',
            'also, i like prog music.'
        ]
    },
    'fts': {
        title: '01 - fts',
        type: 'project',
        blocks: ['fts: full-stack football training system (javafx frontend + java backend)',
                'first project, most enjoyable so far. went all out on login/signup flow + reports even though it was just coursework. intense learning experience.',
                'status: paused for now, may revisit later.'],
        github: 'https://github.com/aadityaincode/Football-Training-System.git',
        demo: null
    },
    'bmats': {
        title: '03 - bmats',
        type: 'project',
        blocks: ['bmats: bias mitigation for application tracking system',
                'hack the bias 2026 project — my first hackathon. we built a fastapi app in 36 intense hours (and slept maybe 4). it parses, anonymizes, and semantically matches resumes and job descriptions to reduce bias in hiring.',
                'status: completed, post-hackathon improvements planned.'],
        github: 'https://github.com/noahnghg/BMATS.git',
        demo: 'https://youtu.be/8LAM6OJYrgQ'
    },
    'deep-notes': {
        title: '02 - deep notes',
        type: 'project',
        blocks: ['deep notes: obsidian plugin + socratic tutor for your notes',
            'calgary hacks 2026 — built with a team of obsessed obsidian users. transforms passive notes into active recall + concept connections across your vault. production-ready, just needs publishing.',
            'status: completed hackathon project, working on publishing the plugin.'
        ],
        github: 'https://github.com/aadityaincode/Deep-Notes.git',
        demo: 'https://www.youtube.com/watch?v=2q-m6M6JjXI'
    },
    // 'simpltimer': {
    //     title: '04 - SimplTimer',
    //     type: 'project',
    //     blocks: ['SimplTimer project description goes here.'],
    //     github: 'https://github.com/buhariE/SimplTimer.git',
    //     demo: null
    // },
    'touchline': {
        title: '04 - touchline',
        type: 'project',
        blocks: [
            'a discord bot for football fans that provides team information and match updates through simple commands.',
            'status: paused for now, may revisit later.'
        ],
        github: 'https://github.com/aadityaincode/TouchLine.git',
        demo: null
    },
    'learning': {
        title: '01 - learning',
        type: 'note',
        blocks: [
            'active focus: networks, discrete mathematics, and whatever problem i\'m trying to solve that week.',
            'learning by breaking things: build something, watch it fail, figure out why. repeat until it makes sense.',
            'my "to-learn" list is longer than my "learned" list. working on being okay with that.'
        ]
    },
    'how-i-work': {
        title: '02 - how-i-work',
        type: 'note',
        blocks: [
            'planning first: diagram workflows, map systems, think through edge cases before writing a single line.',
            'process: brainstorm → understand → plan → build. no shortcuts.',
            'obsidian for everything — notes, brainstorming, workflows, learning. this site is just that system made public.',
            'slow start, attention to detail, patience over speed.',
            'monaspace krypton: found it in a random reddit thread. liked the look, kept it.'
        ]
    },
    'site-notes': {
        title: '03 - site-notes',
        type: 'note',
        blocks: [
            'got motivated after seeing a series of thoughtful personal sites. wanted to build something that reflects how i actually think.',
            'the vault structure came naturally — i already live in obsidian. why design something different?',
            'monaspace krypton: found it in a random reddit thread. liked the look, kept it.',
            'also: building it was a good excuse to learn by doing.'
        ]
    },
    'skills': {
        title: 'skills',
        type: 'skills',
        blocks: []
    },
};

// Highlight label before colon in concept descriptions
function processConceptLabels(text) {
    const colonIndex = text.indexOf(':');
    if (colonIndex === -1) return text;
    if (colonIndex > 40) return text;
    const label = text.slice(0, colonIndex + 1);
    const rest = text.slice(colonIndex + 1);
    return `<span class="label">${label}</span>${rest}`;
}

// Toggle sidebar folder open/close
function toggleFolder(folderId) {
    const items = document.getElementById(`folder-${folderId}`);
    const toggle = document.getElementById(`toggle-${folderId}`);
    items.classList.toggle('open');
    toggle.classList.toggle('open');
}

// Render main content area based on selected contentId
function renderContent(contentId) {
    const container = document.querySelector('.container');
    const data = contentData[contentId];

    // Render the floating skills section
    if (data.type === 'skills') {
        const skills = [
            { name: 'Python', logo: 'logos/python.svg' },
            { name: 'Java\nScript', logo: 'logos/js.svg' },
            { name: 'Java', logo: 'logos/java.svg' },
            { name: 'C', logo: 'logos/c.svg' },
            { name: 'HTML', logo: 'logos/html.svg' },
            { name: 'React', logo: 'logos/react.svg' },
            { name: 'CSS', logo: 'logos/css.svg' },
            { name: 'Type\nScript', logo: 'logos/typescript.svg' }
        ];
        container.innerHTML = `
            <div style="position:relative;width:100%;height:100%;min-height:350px;">
                <div class="skills-grid">
                    ${skills.map(skill => `
                        <div class="skill-card">
                            <span class="skill-swap" data-label="${skill.name}">
                                <img src="${skill.logo}" alt="${skill.name.replace(/\n/g, ' ')}" />
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        const cards = container.querySelectorAll('.skill-card');
        const positions = [];
        const minDist = 18;

        cards.forEach((card) => {
            let x, y, safe = false, tries = 0;
            while (!safe && tries < 50) {
                x = Math.random() * 80 + 5;
                y = Math.random() * 80 + 5;
                safe = true;
                for (const p of positions) {
                    const dx = x - p.x;
                    const dy = y - p.y;
                    if (Math.sqrt(dx * dx + dy * dy) < minDist) {
                        safe = false;
                        break;
                    }
                }
                tries++;
            }
            positions.push({ x, y });
            card.style.left = x + '%';
            card.style.top = y + '%';
            card.style.animationDelay = (Math.random() * 3) + 's';
        });
        return;
    }

    // Render the terminal UI (for secret game, etc.)
    if (data.type === 'terminal') {
        container.innerHTML = `
            <div class="card">
                <h2 class="card__title">terminal</h2>
                <div class="card__content">
                    <div class="card__text-block">
                        <pre class="card__text" id="terminal-ui">type \`help\` to begin.</pre>
                    </div>
                    <div class="card__text-block">
                        <input id="terminal-input"
                               placeholder="> enter command"
                               style="width:100%;background:#0a0a0a;border:1px solid #333;border-radius:6px;padding:10px;color:#22c55e;font-family:'Monaspace Krypton',monospace;">
                    </div>
                </div>
            </div>
        `;
        setTimeout(initTerminalUI, 50);
        return;
    }

    if (!data) return;

    // Render text blocks for notes/projects
    let blocksHTML = '';
    data.blocks.forEach(block => {
        blocksHTML += `
            <div class="card__text-block">
                <p class="card__text">${processConceptLabels(block)}</p>
            </div>
        `;
    });

    // Render project links (GitHub, Demo) if present
    let linksHTML = '';
    if (data.type === 'project' && (data.github || data.demo)) {
        linksHTML = '<div class="card__text-block" style="display: flex; gap: 1rem; align-items: center;">';
        if (data.github) {
            linksHTML += `
                <a href="${data.github}" target="_blank" rel="noopener noreferrer"
                   style="color: var(--accent-purple); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: var(--transition);"
                   onmouseover="this.style.color='var(--accent-green)'"
                   onmouseout="this.style.color='var(--accent-purple)'">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                </a>
            `;
        }
        if (data.demo) {
            linksHTML += `
                <a href="${data.demo}" target="_blank" rel="noopener noreferrer"
                   style="color: var(--accent-purple); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: var(--transition);"
                   onmouseover="this.style.color='var(--accent-green)'"
                   onmouseout="this.style.color='var(--accent-purple)'">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Demo
                </a>
            `;
        }
        linksHTML += '</div>';
    }

    // Render landing page header (typewriter)
    let headerHTML = '';
    if (data.type === 'landing') {
        headerHTML = `
            <header class="header">
                <h1 class="header__title">
                    <span id="typewriter"></span><span class="caret">|</span>
                </h1>
            </header>
        `;
    }

    // Render hint card (landing page only)
    let hintHTML = '';
    if (data.showHint) {
        hintHTML = `
            <aside class="hint">
                <h3 class="hint__title">
                    <span id="hint-text">hint</span>
                </h3>
                <div class="hint__body">
                    <a href="javascript:void(0)" class="hint__link" onclick="highlightSidebar()">explore vault</a>
                </div>
            </aside>
        `;
    }

    container.innerHTML = `
        ${headerHTML}
        <article class="card">
            <h2 class="card__title">${data.title}</h2>
            <div class="card__content">
                ${blocksHTML}
                ${linksHTML}
            </div>
        </article>
        ${hintHTML}
    `;

    if (data.type === 'landing') {
        requestAnimationFrame(() => { startTypewriter(); });
    }
    requestAnimationFrame(startTerminalHint);
}

// Load content by id and update sidebar highlighting
function loadContent(contentId) {
    document.body.classList.toggle('skills-active', contentId === 'skills');
    // Remove active from all sidebar items
    document.querySelectorAll('.sidebar__item, .sidebar__folder-skills').forEach(item => {
        item.classList.remove('active');
    });
    // Highlight the correct sidebar item if it exists
    const sidebarItem = Array.from(document.querySelectorAll('.sidebar__item, .sidebar__folder-skills'))
        .find(item => item.getAttribute('onclick')?.includes(`'${contentId}'`));
    if (sidebarItem) {
        sidebarItem.classList.add('active');
    }
    renderContent(contentId);
    if (contentId === 'socials') highlightSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Typewriter animation for landing page
const textToType = "it's aaditya.";
let charIndex = 0;
let typeTimeout = null;

function startTypewriter() {
    clearTimeout(typeTimeout);
    charIndex = 0;
    const element = document.getElementById('typewriter');
    if (!element) return;
    element.textContent = '';
    if (element.parentElement) element.parentElement.classList.remove('blinking-cursor');
    const caret = element.parentElement?.querySelector('.caret');
    if (caret) { caret.style.visibility = 'hidden'; caret.classList.remove('blink'); }
    typeNextChar();
}

function typeNextChar() {
    const element = document.getElementById('typewriter');
    if (!element) return;
    if (charIndex < textToType.length) {
        element.textContent += textToType.charAt(charIndex);
        charIndex++;
        typeTimeout = setTimeout(typeNextChar, 90);
    } else {
        setTimeout(() => {
            const el = document.getElementById('typewriter');
            if (!el || !el.parentElement) return;
            const caret = el.parentElement.querySelector('.caret');
            if (caret) { caret.style.visibility = 'visible'; caret.classList.add('blink'); }
        }, 350);
    }
}

// Boot animation for terminal (used for intro/secret game)
let isFirstCommand = true;

function runBootTerminal() {
    const terminal = document.getElementById('boot-terminal');
    const output = document.getElementById('terminal-output');
    const cursor = terminal.querySelector('.cursor');
    const PROMPT = 'guest@vault ~ % ';

    const steps = [
        { type: 'command', text: 'npm run aadityaimcode\b\b\b\b\bncode' },
        {
            type: 'output', lines: [
                '> aadityaincode@0.1.0 dev',
                '> vault',
                '',
                'initializing knowledge graph...',
                'loading markdown nodes...',
                'resolving links...',
                '',
                'ready in 312 ms',
                '',
                '➜  local:   http://localhost:5173',
                '➜  mode:    read-only',
                '➜  hint:    explore the vault'
            ]
        }
    ];

    let stepIndex = 0;
    let charIndex = 0;
    let lineIndex = 0;

    function getTypingSpeed(char, prevChar, afterError = false, isStartOfWord = false) {
        const baseSpeed = 130;
        const commonChars = 'etaoinshrdlu';
        const vowels = 'aeiou';
        const commonPairs = ['th', 'he', 'in', 'er', 'an', 'ed', 'nd', 'ha', 'en', 'es'];
        let speed = baseSpeed;
        if (afterError) return baseSpeed + 80 + Math.random() * 60;
        if (isStartOfWord) speed += 40;
        if (commonChars.includes(char.toLowerCase())) speed -= 25;
        const pair = (prevChar + char).toLowerCase();
        if (commonPairs.includes(pair)) speed -= 35;
        if (prevChar && !vowels.includes(prevChar.toLowerCase()) && vowels.includes(char.toLowerCase())) speed -= 15;
        if (char === ' ') speed += 60;
        if ('!@#$%^&*()_+-=[]{}|;:,.<>?/'.includes(char)) speed += 45;
        speed += (Math.random() - 0.5) * 50;
        return Math.max(65, speed);
    }

    function processNextStep() {
        if (stepIndex >= steps.length) {
            cursor.style.visibility = 'visible';
            cursor.style.display = 'inline';
            cursor.classList.add('idle');
            setTimeout(() => {
                terminal.classList.add('boot-fade');
                setTimeout(() => {
                    terminal.remove();
                    setTimeout(() => {
                        startTypewriter();
                        setTimeout(() => { startTerminalHint(); }, 500);
                    }, 400);
                }, 650);
            }, 1200);
            return;
        }
        const step = steps[stepIndex];
        cursor.style.display = 'none';
        if (step.type === 'command') {
            typeCommand(step.text, stepIndex > 0 && steps[stepIndex - 1].type === 'error');
        } else if (step.type === 'error') {
            output.innerHTML += `<span class="error">${step.text}</span>\n`;
            stepIndex++;
            setTimeout(processNextStep, 450);
        } else if (step.type === 'clear') {
            output.innerHTML = '';
            stepIndex++;
            setTimeout(processNextStep, 150);
        } else if (step.type === 'pause') {
            stepIndex++;
            setTimeout(processNextStep, step.duration);
        } else if (step.type === 'output') {
            lineIndex = 0;
            printOutput(step.lines);
        }
    }

    function typeCommand(command, afterError = false) {
        if (charIndex === 0) {
            output.innerHTML += `<span class="prompt">${PROMPT}</span>`;
            const delay = isFirstCommand ? 0 : 180;
            isFirstCommand = false;
            setTimeout(() => { typeNextCharBoot(command, afterError); }, delay);
            return;
        }
        typeNextCharBoot(command, afterError);
    }

    function typeNextCharBoot(command, afterError) {
        if (charIndex < command.length) {
            const char = command[charIndex];
            const prevChar = charIndex > 0 ? command[charIndex - 1] : '';
            const isStartOfWord = prevChar === ' ' || charIndex === 0;
            if (char === '\b') {
                output.innerHTML = output.innerHTML.slice(0, -1);
            } else {
                output.innerHTML += char;
            }
            charIndex++;
            const speed = getTypingSpeed(char, prevChar, afterError, isStartOfWord);
            setTimeout(() => typeNextCharBoot(command, afterError), speed);
        } else {
            output.innerHTML += '\n';
            charIndex = 0;
            stepIndex++;
            setTimeout(processNextStep, 700);
        }
    }

    function printOutput(lines) {
        if (lineIndex < lines.length) {
            const line = lines[lineIndex];
            output.innerHTML += line + '\n';
            lineIndex++;
            let speed = 180 + Math.random() * 90;
            if (line.startsWith('initializing') || line.startsWith('loading')) speed = 200 + Math.random() * 100;
            else if (line.startsWith('➜')) speed = 160 + Math.random() * 80;
            else if (line === '') speed = 25 + Math.random() * 20;
            else if (line.startsWith('ready')) speed = 320 + Math.random() * 120;
            setTimeout(() => printOutput(lines), speed);
        } else {
            stepIndex++;
            setTimeout(processNextStep, 400);
        }
    }

    setTimeout(() => { processNextStep(); }, 900);
}

// DOMContentLoaded: boot terminal or show typewriter
document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('booted')) {
        sessionStorage.setItem('booted', 'true');
        runBootTerminal();
    } else {
        const boot = document.getElementById('boot-terminal');
        if (boot) boot.remove();
        setTimeout(() => { startTypewriter(); }, 300);
    }
    setTimeout(() => { startTerminalHint(); }, 100);
});

// Add glow animation to sidebar
function highlightSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.classList.add('glow');
    setTimeout(() => { sidebar.classList.remove('glow'); }, 2200);
}

// Animated background grid for visual effect
(function initPerspectiveGrid() {
    const canvas = document.getElementById('wave-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width, height, mouseX = 0, mouseY = 0, time = 0;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        mouseX = width / 2;
        mouseY = height / 2;
    }

    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', (e) => {
        if (e.clientX < 300) return;
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function getVanishingPoint() {
        const centerX = width / 2;
        const centerY = height / 2;
        const offsetX = (mouseX - centerX) * 0.2;
        const offsetY = (mouseY - centerY) * 0.2;
        return { x: centerX + offsetX, y: centerY + offsetY - height * 0.1 };
    }

    function drawPerspectiveGrid() {
        const vp = getVanishingPoint();
        const gridSize = 12;
        const spacing = 110;
        const depth = 15;
        const sidebarWidth = 300;
        const centerX = sidebarWidth + (width - sidebarWidth) / 2;
        const isSkillsPage = document.body.classList.contains('skills-active');

        if (isSkillsPage) {
            const fadeDepth = height * 0.6;
            for (let i = -gridSize; i <= gridSize; i++) {
                const startX = centerX + i * spacing;
                const startY = height;
                const widthScale = 0.7;
                const endX = centerX + i * spacing * widthScale;
                const endY = height - fadeDepth;
                const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
                const distToMouse = Math.abs(mouseX - startX);
                const mouseProximity = Math.max(0, 1 - distToMouse / 250);
                const distFromCenter = Math.abs(i) / gridSize;
                const baseOpacity = (1 - distFromCenter * 0.5) * 0.2;
                const glowBoost = mouseProximity * 0.3;
                gradient.addColorStop(0, `rgba(167, 139, 250, ${baseOpacity + glowBoost})`);
                gradient.addColorStop(0.5, `rgba(167, 139, 250, ${(baseOpacity + glowBoost) * 0.5})`);
                gradient.addColorStop(1, `rgba(167, 139, 250, 0)`);
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.8 + mouseProximity * 0.8;
                ctx.stroke();
                if (mouseProximity > 0.2) {
                    const glowGradient = ctx.createLinearGradient(startX, startY, endX, endY);
                    glowGradient.addColorStop(0, `rgba(167, 139, 250, ${mouseProximity * 0.12})`);
                    glowGradient.addColorStop(0.5, `rgba(167, 139, 250, ${mouseProximity * 0.06})`);
                    glowGradient.addColorStop(1, `rgba(167, 139, 250, 0)`);
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.strokeStyle = glowGradient;
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }
            for (let d = 0; d < depth; d++) {
                const progress = d / depth;
                const yPos = height - (progress * fadeDepth);
                const widthScale = 1 - progress * 0.3;
                const distToMouseY = Math.abs(mouseY - yPos);
                const mouseProximityY = Math.max(0, 1 - distToMouseY / 200);
                ctx.beginPath();
                for (let i = -gridSize; i <= gridSize; i++) {
                    const baseX = centerX + i * spacing * widthScale;
                    if (i === -gridSize) ctx.moveTo(baseX, yPos);
                    else ctx.lineTo(baseX, yPos);
                }
                const baseOpacity = (1 - progress) * 0.2;
                ctx.strokeStyle = `rgba(167, 139, 250, ${baseOpacity + mouseProximityY * 0.25})`;
                ctx.lineWidth = (1 - progress * 0.5) * 0.8 + mouseProximityY * 0.7;
                ctx.stroke();
                if (mouseProximityY > 0.2) {
                    ctx.beginPath();
                    for (let i = -gridSize; i <= gridSize; i++) {
                        const baseX = centerX + i * spacing * widthScale;
                        if (i === -gridSize) ctx.moveTo(baseX, yPos);
                        else ctx.lineTo(baseX, yPos);
                    }
                    ctx.strokeStyle = `rgba(167, 139, 250, ${mouseProximityY * 0.15 * (1 - progress)})`;
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }
            for (let d = 3; d < depth; d += 2) {
                const progress = d / depth;
                const yPos = height - (progress * fadeDepth);
                const widthScale = 1 - progress * 0.3;
                for (let i = -gridSize; i <= gridSize; i += 2) {
                    const x = centerX + i * spacing * widthScale;
                    ctx.beginPath();
                    ctx.arc(x, yPos, (1 - progress * 0.5) * 1.5 + 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(167, 139, 250, ${(1 - progress) * 0.3})`;
                    ctx.fill();
                }
            }
        } else {
            for (let i = -gridSize; i <= gridSize; i++) {
                ctx.beginPath();
                const startX = sidebarWidth + (width - sidebarWidth) / 2 + i * spacing;
                ctx.moveTo(startX, height);
                ctx.lineTo(vp.x, vp.y);
                const distToMouse = Math.abs(mouseX - startX);
                const mouseProximity = Math.max(0, 1 - distToMouse / 250);
                const distFromCenter = Math.abs(i) / gridSize;
                const baseOpacity = (1 - distFromCenter * 0.5) * 0.2;
                ctx.strokeStyle = `rgba(167, 139, 250, ${baseOpacity + mouseProximity * 0.3})`;
                ctx.lineWidth = 0.8 + mouseProximity * 0.8;
                ctx.stroke();
                if (mouseProximity > 0.2) {
                    ctx.beginPath();
                    ctx.moveTo(startX, height);
                    ctx.lineTo(vp.x, vp.y);
                    ctx.strokeStyle = `rgba(167, 139, 250, ${mouseProximity * 0.12})`;
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }
            for (let d = 0; d < depth; d++) {
                const progress = d / depth;
                const scale = 1 - progress * 0.95;
                const ringY = vp.y + (height - vp.y) * scale;
                const distToMouseY = Math.abs(mouseY - ringY);
                const mouseProximityY = Math.max(0, 1 - distToMouseY / 200);
                ctx.beginPath();
                for (let i = -gridSize; i <= gridSize; i++) {
                    const baseX = sidebarWidth + (width - sidebarWidth) / 2 + i * spacing;
                    const x1 = vp.x + (baseX - vp.x) * scale;
                    if (i === -gridSize) ctx.moveTo(x1, ringY);
                    else ctx.lineTo(x1, ringY);
                }
                ctx.strokeStyle = `rgba(167, 139, 250, ${(1 - progress) * 0.2 + mouseProximityY * 0.25})`;
                ctx.lineWidth = 0.8 + mouseProximityY * 0.7;
                ctx.stroke();
                if (mouseProximityY > 0.2) {
                    ctx.beginPath();
                    for (let i = -gridSize; i <= gridSize; i++) {
                        const baseX = sidebarWidth + (width - sidebarWidth) / 2 + i * spacing;
                        const x1 = vp.x + (baseX - vp.x) * scale;
                        if (i === -gridSize) ctx.moveTo(x1, ringY);
                        else ctx.lineTo(x1, ringY);
                    }
                    ctx.strokeStyle = `rgba(167, 139, 250, ${mouseProximityY * 0.15})`;
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }
            for (let d = 3; d < depth; d += 2) {
                const progress = d / depth;
                const scale = 1 - progress * 0.95;
                const ringY = vp.y + (height - vp.y) * scale;
                for (let i = -gridSize; i <= gridSize; i += 2) {
                    const baseX = sidebarWidth + (width - sidebarWidth) / 2 + i * spacing;
                    const x = vp.x + (baseX - vp.x) * scale;
                    ctx.beginPath();
                    ctx.arc(x, ringY, 1 + (1 - progress) * 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(167, 139, 250, ${(1 - progress) * 0.3})`;
                    ctx.fill();
                }
            }
        }
    }

    function animate() {
        time += 1;
        ctx.clearRect(0, 0, width, height);
        drawPerspectiveGrid();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    requestAnimationFrame(animate);
})();

// Knowledge Graph: Render and animate SVG in sidebar, mapping 10 unique notes to interactive nodes
(function () {
    const svg = document.getElementById('knowledge-graph');
    if (!svg) return;

    // Map each node key to its sidebar/content target and folder (if any)
    const nodeTargetMap = {
        whoami:   { type: 'file', target: 'whoami', folder: null },
        fts:      { type: 'file', target: 'fts', folder: 'projects' },
        deepnotes: { type: 'file', target: 'deep-notes', folder: 'projects' },
        bmats:    { type: 'file', target: 'bmats', folder: 'projects' },
        touchline: { type: 'file', target: 'touchline', folder: 'projects' },
        skills:   { type: 'file', target: 'skills', folder: null },
        learning: { type: 'file', target: 'learning', folder: 'notes' },
        howiwork: { type: 'file', target: 'how-i-work', folder: 'notes' },
        sitenotes: { type: 'file', target: 'site-notes', folder: 'notes' }
    };

    svg.innerHTML = '';
    svg.setAttribute('viewBox', '0 0 260 180');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Arrange nodes in a circle for visual clarity and even spacing
    const nodeKeys = [
        'whoami', 'fts', 'deepnotes', 'bmats', 'touchline',
        'skills', 'learning', 'howiwork', 'sitenotes'
    ];
    const nodes = nodeKeys.map((id, i) => {
        const angle = (2 * Math.PI * i) / nodeKeys.length;
        const r = 65;
        const cx = 130 + r * Math.cos(angle - Math.PI/2);
        const cy = 90 + r * Math.sin(angle - Math.PI/2);
        return { id, x: cx, y: cy };
    });

    // Edges:
    // - Circular: Each node connects to the next, forming a loop
    // - 'whoami' connects to all other nodes
    // - 'skills' connects to all project nodes
    const edges = [];
    // Circular edges
    for (let i = 0; i < nodes.length; i++) {
        edges.push([nodes[i].id, nodes[(i+1)%nodes.length].id]);
    }
    // whoami connects to all others (except itself)
    nodes.forEach(n => {
        if (n.id !== 'whoami') edges.push(['whoami', n.id]);
    });
    // skills connects to all projects
    ['fts', 'deepnotes', 'bmats', 'touchline'].forEach(pid => {
        edges.push(['skills', pid]);
    });

    // Map node id to node object for quick lookup
    const nodeMap = {};
    nodes.forEach(n => nodeMap[n.id] = n);

    // Draw edges as SVG lines (skip if node missing)
    const edgeEls = edges.map(([a, b]) => {
        const n1 = nodeMap[a];
        const n2 = nodeMap[b];
        if (!n1 || !n2) return null;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', n1.x); line.setAttribute('y1', n1.y);
        line.setAttribute('x2', n2.x); line.setAttribute('y2', n2.y);
        line.classList.add('graph-edge');
        svg.appendChild(line);
        return { line, a: n1, b: n2 };
    }).filter(Boolean);

    // Render each node as an interactive SVG circle
    const nodeEls = nodes.map((node) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', 4.5);
        circle.classList.add('graph-node');
        circle.style.cursor = 'pointer';
        circle.style.pointerEvents = 'all';

        // Get sidebar/content mapping for this node
        let config = nodeTargetMap[node.id];

        // Highlight sidebar item on node hover
        circle.addEventListener('mouseenter', () => {
            if (!config || config.type !== 'file' || !config.target) return;
            const target = config.target;
            document.querySelectorAll('.sidebar__item, .sidebar__folder-skills').forEach(item => {
                const onclick = item.getAttribute('onclick') || '';
                // Match loadContent('target') regardless of whitespace
                if (/loadContent\(['"]\s*([^'"]+)\s*['"]\)/.test(onclick)) {
                    const match = onclick.match(/loadContent\(['"]\s*([^'"]+)\s*['"]\)/);
                    if (match && match[1].replace(/\s+/g, '') === target.replace(/\s+/g, '')) {
                        item.classList.add('active');
                    }
                }
            });
        });

        // Remove highlight on mouse leave
        circle.addEventListener('mouseleave', () => {
            document.querySelectorAll('.sidebar__item, .sidebar__folder-skills').forEach(item => item.classList.remove('active'));
        });

        // Click node: open sidebar folder if needed, trigger sidebar item click
        circle.addEventListener('click', () => {
            if (!config) return;
            if (config.folder) {
                const folderEl = document.getElementById(`folder-${config.folder}`);
                const toggleEl = document.getElementById(`toggle-${config.folder}`);
                if (folderEl && !folderEl.classList.contains('open')) {
                    folderEl.classList.add('open');
                    toggleEl?.classList.add('open');
                }
            }
            if (config.type === 'file' && config.target) {
                const target = config.target;
                const targetItem = [...document.querySelectorAll('.sidebar__item, .sidebar__folder-skills')]
                    .find(el => {
                        const onclick = el.getAttribute('onclick') || '';
                        if (/loadContent\(['"]\s*([^'"]+)\s*['"]\)/.test(onclick)) {
                            const match = onclick.match(/loadContent\(['"]\s*([^'"]+)\s*['"]\)/);
                            return match && match[1].replace(/\s+/g, '') === target.replace(/\s+/g, '');
                        }
                        return false;
                    });
                if (targetItem) {
                    // Add glow effect for skills node
                    if (config.target === 'skills' && targetItem.classList.contains('sidebar__folder-skills')) {
                        targetItem.classList.add('glow');
                        setTimeout(() => { targetItem.classList.remove('glow'); }, 1200);
                    }
                    targetItem.click();
                }
            }
        });

        svg.appendChild(circle);
        return { node, circle };
    });

    // Animate node and edge positions for a lively effect
    let t = 0;
    function animate() {
        t += 0.02;
        nodeEls.forEach(({ node, circle }, i) => {
            circle.setAttribute('cy', node.y + Math.sin(t - i * 0.6) * 1.4);
        });
        edgeEls.forEach(({ line, a, b }, i) => {
            const delayA = nodes.indexOf(a) * 0.6;
            const delayB = nodes.indexOf(b) * 0.6;
            line.setAttribute('y1', a.y + Math.sin(t - delayA) * 1.4);
            line.setAttribute('y2', b.y + Math.sin(t - delayB) * 1.4);
        });
        requestAnimationFrame(animate);
    }
    animate();
})();

// Animated binary 'hint' text on landing page
let hintInterval = null;

function startTerminalHint() {
    const hintEl = document.getElementById('hint-text');
    if (!hintEl) return;
    stopTerminalHint();
    hintInterval = setInterval(() => {
        const base = 'hint';
        let out = '';
        for (let i = 0; i < base.length; i++) {
            if (Math.random() < 0.4) out += Math.random() < 0.5 ? '0' : '1';
            else out += base[i];
        }
        hintEl.innerHTML = out.replace(/[01]/g, b => `<span class="binary">${b}</span>`);
    }, 550);
}

function stopTerminalHint() {
    if (hintInterval) { clearInterval(hintInterval); hintInterval = null; }
}

// Terminal lock/unlock logic for secret/escape game
let terminalUnlocked = localStorage.getItem('terminalUnlocked') === 'true';

function openTerminalNote(e) {
    if (!terminalUnlocked) {
        const key = prompt('Enter access key:');
        if (key !== 'vault-1973') { alert('Invalid key'); return; }
        window.unlockTerminal(key);
    }
    openTerminalOverlay();
}

window.unlockTerminal = function (key) {
    if (key === 'vault-1973') {
        localStorage.setItem('terminalUnlocked', 'true');
        terminalUnlocked = true;
        document.querySelectorAll('.terminal-locked').forEach(el => {
            el.classList.add('terminal-unlocked');
            el.innerHTML = '?? - terminal <span style="float:right">🔓</span>';
        });
    }
};

// Terminal overlay UI and command handling
const terminalOverlay = document.createElement('div');
terminalOverlay.id = 'terminal-overlay';
terminalOverlay.innerHTML = `
    <div id="terminal-window">
        <div id="terminal-header">
            <span>guest@vault:~$</span>
            <button id="terminal-close">×</button>
        </div>
        <pre id="overlay-output">Type 'help' for available commands\n</pre>
        <div id="terminal-line">
            <span id="prompt">guest@vault:~$</span>
            <span id="typed"></span><span id="overlay-cursor">█</span>
            <input id="overlay-input" autocomplete="off" />
        </div>
    </div>
`;
document.body.appendChild(terminalOverlay);

const files = {
    'README.txt': 'Welcome to my terminal, hacker.\nYour mission: find the secret I have been hiding from the world',
    'secrets/flag.txt': 'No secrets found. Mission pending.'
};

function printLine(t) {
    const o = document.getElementById('overlay-output');
    o.innerHTML += `<span class="out-line">${t}</span>\n`;
    o.scrollTop = o.scrollHeight;
}

function handleCommand(cmd) {
    const o = document.getElementById('overlay-output');
    if (cmd === 'help') {
        printLine('ls - list files'); printLine('cat <file> - read');
        printLine('whoami'); printLine('mission'); printLine('clear'); printLine('exit');
    } else if (cmd === 'whoami') {
        printLine('User: guest'); printLine('Access Level: visitor'); printLine('Objective: Find the secret');
    } else if (cmd === 'mission') {
        printLine('Find the secret hidden in the vault.');
    } else if (cmd === 'ls') {
        Object.keys(files).forEach(f => printLine(f));
    } else if (cmd.startsWith('cat')) {
        const f = cmd.split(' ')[1]; printLine(files[f] || 'file not found');
    } else if (cmd === 'clear') {
        o.textContent = '';
        return;
    } else if (cmd === 'exit') {
        closeTerminalOverlay(); return;
    } else {
        printLine('unknown command');
    }
    o.innerHTML += '\n';
}

function openTerminalOverlay() {
    terminalOverlay.style.display = 'block';
    document.getElementById('overlay-input').focus();
    document.getElementById('typed').textContent = '';
}

function closeTerminalOverlay() {
    terminalOverlay.style.display = 'none';
}

terminalOverlay.addEventListener('keydown', e => { if (e.key === 'Escape') closeTerminalOverlay(); });
document.getElementById('terminal-close').onclick = closeTerminalOverlay;

const inputEl = document.getElementById('overlay-input');
const typedEl = document.getElementById('typed');
inputEl.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
        typedEl.textContent = typedEl.textContent.slice(0, -1);
        e.preventDefault();
    } else if (e.key === 'Enter') {
        const v = typedEl.textContent;
        typedEl.textContent = '';
        document.getElementById('overlay-output').innerHTML += `<span class="cmd-line">guest@vault:~$ ${v}</span>\n`;
        handleCommand(v.trim());
        e.preventDefault();
    } else if (e.key.length === 1) {
        typedEl.textContent += e.key;
        e.preventDefault();
    }
});

// Binary animation for locked terminal note in sidebar
(function () {
    const terminalNote = document.querySelector('.terminal-locked.note-item');
    if (!terminalNote) return;
    const binSpan = terminalNote.querySelector('.bin-label');
    if (!binSpan) return;
    const baseText = binSpan.getAttribute('data-base') || '??';
    let intervalId;

    function randomBinary(len) {
        return Array.from({ length: len }, () => Math.random() < 0.5 ? '0' : '1').join('');
    }

    terminalNote.addEventListener('mouseenter', () => {
        binSpan.textContent = randomBinary(baseText.length);
        intervalId = setInterval(() => { binSpan.textContent = randomBinary(baseText.length); }, 150);
    });

    terminalNote.addEventListener('mouseleave', () => {
        clearInterval(intervalId);
        binSpan.textContent = baseText;
    });
})();
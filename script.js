// ==========================================
// RAJASTHAN GYAN SANGAM - Interactive Features
// ==========================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with scroll-animate class
document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// ==========================================
// Quiz Functionality
// ==========================================

const quizQuestions = [
    {
        question: "Which Schedule of the Indian Constitution contains the 'Anti-Defection Law'?",
        options: ["9th Schedule", "10th Schedule", "11th Schedule", "12th Schedule"],
        correct: 1
    },
    {
        question: "The 'Doctrine of Basic Structure' was propounded by the Supreme Court in which case?",
        options: ["Golaknath Case", "Kesavananda Bharati Case", "Minerva Mills Case", "Maneka Gandhi Case"],
        correct: 1
    },
    {
        question: "Who among the following was the Chairman of the Drafting Committee of the Indian Constitution?",
        options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Dr. B.R. Ambedkar", "Sardar Patel"],
        correct: 2
    },
    {
        question: "Which of the following is NOT a tributary of the River Ganga?",
        options: ["Yamuna", "Son", "Gomti", "Chambal"],
        correct: 3
    },
    {
        question: "The 'Montreal Protocol' is related to the protection of:",
        options: ["Wetlands", "Ozone Layer", "Endangered Species", "Coral Reefs"],
        correct: 1
    },
    {
        question: "In which year was the NITI Aayog established?",
        options: ["2014", "2015", "2016", "2017"],
        correct: 1
    },
    {
        question: "The 'Fiscal Responsibility and Budget Management (FRBM) Act' was enacted in which year?",
        options: ["2000", "2003", "2005", "2010"],
        correct: 1
    },
    {
        question: "Who was the first Governor-General of Bengal?",
        options: ["Robert Clive", "Warren Hastings", "Lord Cornwallis", "Lord Wellesley"],
        correct: 1
    },
    {
        question: "The 'Satyashodhak Samaj' was founded by:",
        options: ["Raja Ram Mohan Roy", "Jyotiba Phule", "Swami Dayanand Saraswati", "Ishwar Chandra Vidyasagar"],
        correct: 1
    },
    {
        question: "Which article of the Constitution deals with the 'Uniform Civil Code'?",
        options: ["Article 40", "Article 44", "Article 45", "Article 50"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizScore = document.getElementById('quizScore');
const scoreValue = document.getElementById('scoreValue');
const nextButton = document.getElementById('nextQuestion');

function loadQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showFinalScore();
        return;
    }

    answered = false;
    const question = quizQuestions[currentQuestion];

    quizQuestion.textContent = `Question ${currentQuestion + 1}: ${question.question}`;
    quizOptions.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.id = `option${index + 1}`;
        optionDiv.addEventListener('click', () => selectAnswer(index));
        quizOptions.appendChild(optionDiv);
    });

    nextButton.style.display = 'none';
    quizScore.style.display = 'block';
    scoreValue.textContent = score;
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;
    const question = quizQuestions[currentQuestion];
    const options = quizOptions.querySelectorAll('.quiz-option');

    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
        option.style.pointerEvents = 'none';
    });

    if (selectedIndex === question.correct) {
        score++;
        scoreValue.textContent = score;
    }

    nextButton.style.display = 'block';
}

function showFinalScore() {
    quizQuestion.textContent = '🎉 Quiz Completed!';
    quizOptions.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h3 style="color: var(--accent-gold); font-size: 2rem; margin-bottom: 1rem;">
                Your Final Score: ${score}/${quizQuestions.length}
            </h3>
            <p style="color: var(--text-secondary); font-size: 1.2rem; margin-bottom: 2rem;">
                ${getScoreMessage(score)}
            </p>
            <button class="btn btn-primary" id="restartQuiz">Restart Quiz</button>
        </div>
    `;

    nextButton.style.display = 'none';

    document.getElementById('restartQuiz').addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        loadQuestion();
    });
}

function getScoreMessage(finalScore) {
    const percentage = (finalScore / quizQuestions.length) * 100;

    if (percentage >= 90) return "Outstanding! You're well-prepared! 🏆";
    if (percentage >= 70) return "Great job! Keep up the good work! 👏";
    if (percentage >= 50) return "Good effort! Practice more to improve! 📚";
    return "Don't worry! Keep studying and try again! 💪";
}

nextButton.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
});

// Initialize quiz
loadQuestion();

// ==========================================
// Card Hover Effects Enhancement
// ==========================================

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

// ==========================================
// Dynamic Gradient Animation
// ==========================================

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==========================================
// Performance Optimization
// ==========================================

// Lazy load images (if more images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Console Message
// ==========================================

console.log('%c🇮🇳 Gyan Sangam', 'color: #fbbf24; font-size: 24px; font-weight: bold;');
console.log('%cYour Pathway to LBSNAA!', 'color: #3b82f6; font-size: 14px;');
console.log('%cJai Hind! 📚', 'color: #10b981; font-size: 14px;');

// ==========================================
// Previous Year Questions (PYQ) Logic
// ==========================================

const pyqData = {
    history: [
        {
            year: 2022,
            question: "In the Government of India Act 1919, the functions of Provincial Government were divided into 'Reserved' and 'Transferred' subjects. Which of the following were treated as 'Reserved' subjects?",
            options: ["Administration of Justice", "Local Self-Government", "Land Revenue", "Police"],
            answer: 2,
            explanation: "Reserved subjects included Police, Jails, Land Revenue, Irrigation, and Forests. Transferred subjects included Education, Local Self-Government, Public Health, and Sanitation."
        },
        {
            year: 2021,
            question: "With reference to the history of ancient India, which of the following was/were common to both Buddhism and Jainism?",
            options: ["Avoidance of extremities of penance and enjoyment", "Indifference to the authority of the Vedas", "Denial of efficacy of rituals", "Both 2 and 3"],
            answer: 3,
            explanation: "Both Buddhism and Jainism rejected the authority of the Vedas and the efficacy of rituals. However, Jainism advocated extreme penance, while Buddhism followed the 'Middle Path'."
        },
        {
            year: 2020,
            question: "The Gandhi-Irwin Pact included which of the following?",
            options: ["Invitation to Congress to participate in the Round Table Conference", "Withdrawal of Ordinances promulgated in connection with the Civil Disobedience Movement", "Acceptance of Gandhiji's suggestion for enquiry into police excesses", "Release of only those prisoners who were not charged with violence"],
            answer: 0,
            explanation: "The pact included the immediate release of all political prisoners not convicted of violence, remission of all fines not yet collected, return of confiscated lands not yet sold to third parties, and lenient treatment to those government servants who had resigned."
        },
        {
            year: 2019,
            question: "With reference to the British colonial rule in India, consider the following statements: Mahatma Gandhi was instrumental in the abolition of the system of 'indentured labour'.",
            options: ["True", "False"],
            answer: 0,
            explanation: "Mahatma Gandhi played a pivotal role in the campaign against the indenture system, which was finally abolished in 1917."
        },
        {
            year: 1995,
            question: "Who among the following was the first Governor-General of Bengal?",
            options: ["Robert Clive", "Warren Hastings", "Lord Mayo", "Lord Dalhousie"],
            answer: 1,
            explanation: "Warren Hastings became the first Governor-General of Bengal in 1773 under the Regulating Act of 1773."
        }
    ],
    geography: [
        {
            year: 2023,
            question: "Consider the following trees: 1. Jackfruit 2. Mahua 3. Teak. How many of the above are deciduous trees?",
            options: ["Only one", "Only two", "All three", "None"],
            answer: 2,
            explanation: "Jackfruit is an evergreen tree. Mahua and Teak are deciduous trees found in moist deciduous forests."
        },
        {
            year: 2010,
            question: "Which one of the following is the largest committee of the Parliament?",
            options: ["The Committee on Public Accounts", "The Committee on Estimates", "The Committee on Public Undertakings", "The Committee on Petitions"],
            answer: 1,
            explanation: "The Estimates Committee is the largest committee of the Parliament, consisting of 30 members, all from the Lok Sabha."
        }
    ],
    polity: [
        {
            year: 2017,
            question: "One of the implications of equality in society is the absence of:",
            options: ["Privileges", "Restraints", "Competition", "Ideology"],
            answer: 0,
            explanation: "Equality implies the absence of special privileges to any section of society and the provision of adequate opportunities for all individuals without any discrimination."
        },
        {
            year: 2015,
            question: "The ideal of 'Welfare State' in the Indian Constitution is enshrined in its:",
            options: ["Preamble", "Directive Principles of State Policy", "Fundamental Rights", "Seventh Schedule"],
            answer: 1,
            explanation: "The Directive Principles of State Policy (Part IV, Articles 36-51) embody the concept of a Welfare State."
        }
    ],
    economy: [
        {
            year: 2022,
            question: "Rapid Financing Instrument' and 'Rapid Credit Facility' are related to the provisions of lending by which one of the following?",
            options: ["Asian Development Bank", "International Monetary Fund", "United Nations Environment Programme Finance Initiative", "World Bank"],
            answer: 1,
            explanation: "The RFI and RCF are lending facilities of the International Monetary Fund (IMF) to provide rapid financial assistance to member countries facing urgent balance of payments needs."
        },
        {
            year: 2013,
            question: "Disguised unemployment generally means",
            options: ["Large number of people remain unemployed", "Alternative employment is not available", "Marginal productivity of labour is zero", "Productivity of workers is low"],
            answer: 2,
            explanation: "Disguised unemployment occurs when more people are employed than actually needed, so the marginal productivity of the extra workers is zero."
        }
    ],
    environment: [
        {
            year: 2021,
            question: "The 'Common Carbon Metric', supported by UNEP, has been developed for",
            options: ["Assessing the carbon footprint of building operations around the world", "Enabling commercial farming entities around the world to enter carbon emission trading", "Enabling governments to assess the overall carbon footprint caused by their countries", "Assessing the overall carbon footprint caused by the use of fossil fuels by the world in a unit time"],
            answer: 0,
            explanation: "The Common Carbon Metric is a protocol for measuring energy use and reporting greenhouse gas emissions from building operations."
        }
    ],
    science: [
        {
            year: 2020,
            question: "Which of the following statements is/are correct regarding the general difference between plant and animal cells?",
            options: ["Plant cells have cellulose cell walls whilst animal cells do not", "Plant cells do not have plasma membrane unlike animal cells", "Mature plant cell has one large vacuole whilst animal cell has many small vacuoles", "1 and 3 only"],
            answer: 3,
            explanation: "Plant cells have a rigid cell wall made of cellulose and a large central vacuole. Animal cells lack a cell wall and have small, temporary vacuoles."
        }
    ]
};

let currentPYQSubject = 'history';
let currentPYQIndex = 0;
let pyqScore = 0;

function loadPYQSubject(subject) {
    currentPYQSubject = subject;
    currentPYQIndex = 0;
    pyqScore = 0;

    // Update active button
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.subject === subject) {
            btn.classList.add('active');
        }
    });

    loadPYQQuestion();
}

function loadPYQQuestion() {
    const container = document.getElementById('pyq-container');
    const questions = pyqData[currentPYQSubject];

    if (!questions || questions.length === 0) {
        container.innerHTML = '<p>No questions available for this subject yet.</p>';
        return;
    }

    if (currentPYQIndex >= questions.length) {
        container.innerHTML = `
            <div style="text-align: center;">
                <h3>Subject Completed!</h3>
                <p>Your Score: ${pyqScore}/${questions.length}</p>
                <button class="btn btn-primary" onclick="loadPYQSubject('${currentPYQSubject}')">Restart ${currentPYQSubject.charAt(0).toUpperCase() + currentPYQSubject.slice(1)}</button>
            </div>
        `;
        return;
    }

    const q = questions[currentPYQIndex];

    let html = `
        <div class="pyq-header">
            <span class="pyq-year">UPSC Prelims ${q.year}</span>
            <span>Question ${currentPYQIndex + 1}/${questions.length}</span>
        </div>
        <div class="pyq-question">${q.question}</div>
        <div class="pyq-options">
    `;

    q.options.forEach((opt, idx) => {
        html += `<div class="pyq-option" onclick="checkPYQAnswer(${idx}, this)">${opt}</div>`;
    });

    html += `</div>
        <div class="pyq-controls" id="pyq-controls" style="display:none; flex-direction: column; gap: 1rem;">
            <div id="pyq-feedback" style="font-weight:bold;"></div>
            <div id="pyq-explanation" style="background: #f8fafc; padding: 1rem; border-radius: 8px; border-left: 4px solid var(--primary-color); font-size: 0.9rem; color: var(--text-secondary);"></div>
            <button class="btn btn-primary" onclick="nextPYQ()">Next Question</button>
        </div>
    `;

    container.innerHTML = html;
}

function checkPYQAnswer(selectedIdx, element) {
    const questions = pyqData[currentPYQSubject];
    const q = questions[currentPYQIndex];
    const controls = document.getElementById('pyq-controls');
    const feedback = document.getElementById('pyq-feedback');
    const explanation = document.getElementById('pyq-explanation');
    const options = document.querySelectorAll('.pyq-option');

    // Disable further clicks
    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (selectedIdx === q.answer) {
        element.style.background = '#dcfce7';
        element.style.borderColor = '#22c55e';
        feedback.textContent = "Correct! ✅";
        feedback.style.color = '#15803d';
        pyqScore++;
    } else {
        element.style.background = '#fee2e2';
        element.style.borderColor = '#ef4444';
        feedback.textContent = "Incorrect ❌";
        feedback.style.color = '#b91c1c';
        // Highlight correct answer
        options[q.answer].style.background = '#dcfce7';
        options[q.answer].style.borderColor = '#22c55e';
    }

    explanation.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
    controls.style.display = 'flex';
}

function nextPYQ() {
    currentPYQIndex++;
    loadPYQQuestion();
}

// Initialize PYQ section
document.addEventListener('DOMContentLoaded', () => {
    loadPYQSubject('history');
});

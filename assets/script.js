// נתונים גלובליים
let currentTaskIndex = 0;
let completedTasks = 0;
const totalTasks = 7;
let timerInterval;
let timerMinutes = 60; // שינוי לשעה
let timerSeconds = 0;
let timerSound; // לקובץ ה-MP3

// משימות המשחק - קונספט חדש מלא
const tasks = [
    {
        title: "🎯 שלב 1: התחלת המשימה הראשונה",
        description: "על מנת למצוא את המטמון, עלייך לבצע משימות. את המשימות תוכלי להטיל גם על עמית!\n\n📋 המשימות:\n• משימה ראשונה - לסדר את השולחן ואת המרפסת\n• משימה שנייה - ניקיון כללי\n\n🎁 אחרי ביצוע 2 המשימות תוכלי לקבל פרס קטן לפני המטמון!",
        type: "normal"
    },
    {
        title: "🏆 שלב 2: אתגר המריו קארט הגדול!",
        description: "אחרי מנוחה קטנה, קיבלת אתגר חדש! 💪\n\n🎮 המשימה: לנצח את עמית במריו קארט!\n⏰ יש לך שעה שלמה לביצוע האתגר\n\n🚬 כללי הניצחון:\n• אם את ניצחת → עמית מגלגל סיגריה לשניכם\n• אם עמית ניצח → את מגלגלת סיגריה לשניכם",
        type: "timer"
    },
    {
        title: "🚨 אזהרת ניצחון - הפסקת המפסיד! 🚨",
        description: "על המפסיד לגלגל סיגריה ולצאת להפסקה! 🔥\n\n⚡ בזמן ההפסקה על המפסיד לבצע כל בקשה של המנצח!\n\n💨 תיהני מההפסקה הזאת...",
        type: "emergency"
    },
    {
        title: "🔍 שלב 3: המטמון כמעט נמצא!",
        description: "המטמון כמעט נמצא, אבל יש עוד משימה! 🕵️‍♀️\n\n📺 תחילה: בחרי סדרה או סרט לראות יחד\n🍷 כדי למצוא את המטמון, עמית צריך לתת לך הוראות!\n\n📝 ההוראות שלו:\n• להוציא יין\n• להוציא בירה\n\n🎉 המטמון כמעט מגיע! הגבר המעצבן שלך עמית ימצא לך אותו!",
        type: "normal"
    },
    {
        title: "💕 שלב 4: משחק השאלות הזוגיות!",
        description: "הדייט עדיין לא נגמר! עכשיו האתגר האמיתי! 🎯\n\n📝 עליכם לשאול אחד את השני 4 שאלות ולרשום את התשובות על דף!\n\n❓ השאלות:\n1️⃣ אם היינו זוג מפורסם, מי היינו?\n2️⃣ אם הכל היה רגוע ורגיל, איפה היינו רוצים לטייל עכשיו בעולם?\n3️⃣ איזה הרגל של עמית זיו הכי שונאת?\n4️⃣ איזה הרגל של זיו עמית הכי שונא?\n\n🏆 אם התשובה זהה = נקודה!\n\n🎁 3 נקודות = ניצחתם! הפסקת סיגריה!\n😅 פחות מ-3 = קמו מיידי לסדר ולנקות הבית ולזרוק זבל!",
        type: "quiz"
    },
    {
        title: "💖 שלב 5: רגעי אמת - מה שגורם לנו לנצח!",
        description: "השלב הכי חשוב במשחק! 💎\n\n📱 כל אחד רושם בפתק בטלפון (בנפרד!):\n\n💕 מה לדעתך 2 הדברים שגורמים לזוגיות שלכם לנצח את הכל?\n\n✍️ תנסו להרחיב כמה שיותר ולתת דוגמאות!\n\n🐕 אחרי שכתבתם:\n• קחו את קלי לטיול\n• תוך כדי הטיול שתפו אחד את השני במה שכתבתם\n\nזה הרגע הכי משמעותי במשחק! 🌟",
        type: "final"
    },
    {
        title: "🚨 הפסקה אחרונה לפני הסיום! 🚨",
        description: "רגע אחרון של נשימה לפני שסוגרים את המשחק! 💨\n\n🚬 סיגרייה אחרונה להורדת הפאניקה\n🎊 מתכוננים לחגיגת הסיום!\n\nהמשחק כמעט הסתיים! 🎉",
        type: "emergency"
    }
];

// אתחול הדף
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundAnimation();
    initializeAudio();
});

// יצירת אנימציית רקע
function createBackgroundAnimation() {
    const container = document.getElementById('backgroundAnimation');
    
    // יצירת לבבות מרחפים
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heart.style.animationDuration = (3 + Math.random() * 2) + 's';
        container.appendChild(heart);
    }
    
    // יצירת נצנוצים
    for (let i = 0; i < 18; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (2 + Math.random() * 1) + 's';
        container.appendChild(sparkle);
    }
}

// אתחול אודיו
function initializeAudio() {
    // כאן תוסיף את קובץ ה-MP3 שלך
    // timerSound = new Audio('timer-end.mp3');
    // timerSound.volume = 0.7;
}

// מעבר למסך חוקים
function showRules() {
    switchScreen('welcomeScreen', 'rulesScreen');
}

// מעבר למסך משימות
function showTasks() {
    switchScreen('rulesScreen', 'tasksScreen');
    showFixedProgressBar();
    showCurrentTask();
}

// הצגת פרוגרס בר קבוע
function showFixedProgressBar() {
    document.getElementById('fixedProgressBar').style.display = 'block';
    updateFixedProgress();
}

// הסתרת פרוגרס בר קבוע
function hideFixedProgressBar() {
    document.getElementById('fixedProgressBar').style.display = 'none';
}

// מעבר בין מסכים
function switchScreen(fromScreen, toScreen) {
    document.getElementById(fromScreen).classList.remove('active');
    setTimeout(() => {
        document.getElementById(toScreen).classList.add('active');
    }, 300);
}

// הצגת המשימה הנוכחית
function showCurrentTask() {
    const currentTaskContainer = document.getElementById('currentTask');
    
    if (currentTaskIndex >= tasks.length) {
        showFinalScreen();
        return;
    }
    
    const task = tasks[currentTaskIndex];
    
    // אפקט מיוחד למשימות חשובות
    if (task.type === 'quiz') {
        createSpecialEffect('quiz');
    } else if (task.type === 'final') {
        createSpecialEffect('love');
    }
    
    let taskHTML = `
        <div class="task-item ${task.type}" id="current-task">
            <div class="task-title">${task.title}</div>
            <div class="task-description">${task.description}</div>
    `;
    
    // אם זו משימת טיימר
    if (task.type === 'timer') {
        taskHTML += `
            <div class="timer-section">
                <div class="timer-display" id="timerDisplay">60:00</div>
                <div class="timer-controls">
                    <button class="timer-btn" onclick="startTimer()">התחל אתגר! 🎮</button>
                    <button class="timer-btn" onclick="stopTimer()">עצור טיימר</button>
                    <button class="timer-btn" onclick="resetTimer()">אפס טיימר</button>
                </div>
                <div class="timer-sound-info">
                    🎵 צליל סיום האתגר: 
                    <br>
                    <input type="file" accept="audio/*" onchange="loadTimerSound(this)" style="margin-top: 10px;">
                    <br>
                    <small>העלה קובץ MP3 לצליל סיום השעה</small>
                </div>
            </div>
        `;
    }
    
    // כפתור השלמת המשימה
    let buttonText = 'המשימה הושלמה! ✅';
    if (task.type === 'emergency') {
        buttonText = 'סיימתי את ההפסקה! 🚬';
    } else if (task.type === 'final') {
        buttonText = 'חזרנו מהטיול והשתפנו! 💕';
    } else if (task.type === 'timer') {
        buttonText = 'האתגר הושלם! מי ניצח? 🏆';
    } else if (task.type === 'quiz') {
        buttonText = 'סיימנו את משחק השאלות! 🎯';
    }
    
    taskHTML += `
            <div class="task-buttons">
                <button class="task-button complete-btn" onclick="completeCurrentTask()">
                    ${buttonText}
                </button>
            </div>
        </div>
    `;
    
    currentTaskContainer.innerHTML = taskHTML;
    
    // אם זו משימת טיימר, אתחל את הטיימר
    if (task.type === 'timer') {
        resetTimer();
    }
}

// השלמת המשימה הנוכחית
function completeCurrentTask() {
    const task = tasks[currentTaskIndex];
    
    // בקשת אישור מעמית
    const confirmation = confirm(`האם עמית המלך אישר שהמשימה "${task.title}" הושלמה?`);
    
    if (confirmation) {
        // סימון השלמת המשימה
        const taskElement = document.getElementById('current-task');
        const button = taskElement.querySelector('.complete-btn');
        
        taskElement.classList.add('completed');
        button.disabled = true;
        button.textContent = 'המשימה הושלמה! ✅';
        button.style.background = '#4caf50';
        
        // עדכון הספירה
        completedTasks++;
        currentTaskIndex++;
        
        // עדכון הפרוגרס
        updateProgress();
        updateFixedProgress();
        
        // מעבר למשימה הבאה אחרי 2 שניות
        setTimeout(() => {
            if (currentTaskIndex >= tasks.length) {
                showFinalScreen();
            } else {
                showCurrentTask();
            }
        }, 2000);
        
        // הודעת עידוד
        showEncouragementMessage();
    }
}

// הודעת עידוד
function showEncouragementMessage() {
    const task = tasks[currentTaskIndex - 1]; // המשימה שהושלמה
    let messages = [
        "מדהים! 🔥",
        "כל הכבוד לוחמת! 💪", 
        "את שולטת! ⚡",
        "כמו אלופה! 🏆",
        "מושלמת! 💎",
        "המשיכי להדליק! 🌟"
    ];
    
    // הודעות מיוחדות לכל סוג משימה
    if (task && task.type === 'quiz') {
        messages = [
            "איזה משחק שאלות מדהים! 💕",
            "הכרתם אחד את השני יותר! 🎯",
            "רגעים יפים ביחד! 💖",
            "זוגיות מנצחת! 🏆"
        ];
    } else if (task && task.type === 'final') {
        messages = [
            "איזה טיול משמעותי! 💕",
            "שיתוף כזה יפה! 🌟",
            "הלב מתרגש! 💖",
            "אהבה אמיתית! 💎"
        ];
    }
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // יצירת הודעה מרחפת מותאמת לטלפון
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.style.cssText = `
        position: fixed;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff69b4, #ffd700);
        color: white;
        padding: 12px 25px;
        border-radius: 25px;
        font-size: 18px;
        font-weight: bold;
        z-index: 1001;
        animation: slideIn 0.5s ease-out;
        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        max-width: 90%;
        text-align: center;
    `;
    
    // התאמה לטלפונים קטנים
    if (window.innerWidth <= 480) {
        messageDiv.style.fontSize = '16px';
        messageDiv.style.padding = '10px 20px';
        messageDiv.style.top = '10%';
    }
    
    document.body.appendChild(messageDiv);
    
    // הסרת ההודעה אחרי 2 שניות
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// עדכון הפרוגרס
function updateProgress() {
    updateFixedProgress(); // אפקט מיוחד למשימות חשובות
function createSpecialEffect(type) {
    const container = document.getElementById('backgroundAnimation');
    
    if (type === 'quiz') {
        // אפקט שאלונים מרחפים
        for (let i = 0; i < 8; i++) {
            const question = document.createElement('div');
            question.className = 'special-effect quiz-effect';
            question.innerHTML = '❓';
            question.style.left = Math.random() * 100 + '%';
            question.style.top = Math.random() * 100 + '%';
            question.style.animationDelay = Math.random() * 2 + 's';
            question.style.cssText += `
                position: absolute;
                color: #e91e63;
                font-size: 25px;
                animation: quizFloat 4s ease-in-out infinite;
                opacity: 0.7;
                z-index: 1;
            `;
            container.appendChild(question);
            
            // הסרה אחרי 10 שניות
            setTimeout(() => {
                if (question.parentNode) {
                    question.remove();
                }
            }, 10000);
        }
    } else if (type === 'love') {
        // אפקט לבבות מיוחד
        for (let i = 0; i < 12; i++) {
            const love = document.createElement('div');
            love.className = 'special-effect love-effect';
            love.innerHTML = '💖';
            love.style.left = Math.random() * 100 + '%';
            love.style.top = Math.random() * 100 + '%';
            love.style.animationDelay = Math.random() * 3 + 's';
            love.style.cssText += `
                position: absolute;
                color: #e17055;
                font-size: 30px;
                animation: loveFloat 5s ease-in-out infinite;
                opacity: 0.8;
                z-index: 1;
            `;
            container.appendChild(love);
            
            // הסרה אחרי 15 שניות
            setTimeout(() => {
                if (love.parentNode) {
                    love.remove();
                }
            }, 15000);
        }
    }
}
}

// פונקציות טיימר
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                // הטיימר הסתיים
                clearInterval(timerInterval);
                timerInterval = null;
                playTimerSound();
                showTimerEndMessage();
                return;
            }
            timerMinutes--;
            timerSeconds = 59;
        } else {
            timerSeconds--;
        }
        
        updateTimerDisplay();
    }, 1000);
    
    // שינוי צבע הטיימר לפעיל
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.style.color = '#4caf50';
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        
        // שינוי צבע הטיימר לעצור
        const timerDisplay = document.getElementById('timerDisplay');
        timerDisplay.style.color = '#ff9800';
    }
}

function resetTimer() {
    stopTimer();
    timerMinutes = 60; // שינוי לשעה
    timerSeconds = 0;
    updateTimerDisplay();
    
    // החזרת צבע הטיימר למקורי
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
        timerDisplay.style.color = '#ff69b4';
    }
}

function updateTimerDisplay() {
    const display = document.getElementById('timerDisplay');
    if (display) {
        const minutes = timerMinutes.toString().padStart(2, '0');
        const seconds = timerSeconds.toString().padStart(2, '0');
        display.textContent = `${minutes}:${seconds}`;
    }
}

function loadTimerSound(input) {
    const file = input.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        timerSound = new Audio(url);
        timerSound.volume = 0.7;
        
        // הודעת אישור
        const info = input.parentElement;
        info.innerHTML = `
            ✅ קובץ צליל נטען בהצלחה: ${file.name}
            <br>
            <button class="timer-btn" onclick="testTimerSound()" style="margin-top: 10px;">בדוק צליל</button>
        `;
    }
}

function testTimerSound() {
    if (timerSound) {
        timerSound.play().catch(e => {
            alert('שגיאה בהשמעת הצליל. ודא שהקובץ תקין.');
        });
    } else {
        alert('אנא העלה קובץ צליל תחילה');
    }
}

function playTimerSound() {
    if (timerSound) {
        timerSound.play().catch(e => {
            console.log('לא ניתן להשמיע את הצליל:', e);
        });
    }
}

function showTimerEndMessage() {
    alert('🏆 הזמן הסתיים! שעה של מריו קארט הושלמה! מי ניצח באתגר? עכשיו זמן להכריז על המנצח! 🎉');
    
    // הופך את הטיימר לאדום
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.style.color = '#f44336';
    timerDisplay.textContent = 'האתגר הסתיים! 🏁';
}

// עדכון הפרוגרס הקבוע
function updateFixedProgress() {
    const progressFillFixed = document.getElementById('progressFillFixed');
    const eeveeCountFixed = document.getElementById('eeveeCountFixed');
    const currentTaskNumber = document.getElementById('currentTaskNumber');
    
    if (progressFillFixed && eeveeCountFixed && currentTaskNumber) {
        const progressPercent = (completedTasks / totalTasks) * 100;
        progressFillFixed.style.width = progressPercent + '%';
        eeveeCountFixed.textContent = completedTasks;
        currentTaskNumber.textContent = currentTaskIndex + 1;
        
        // אפקט מיוחד כשמתקדמים
        progressFillFixed.style.animation = 'shimmer 1s ease-in-out, progressPulse 1s ease-in-out';
        setTimeout(() => {
            progressFillFixed.style.animation = 'shimmer 3s linear infinite, progressPulse 2s ease-in-out infinite';
        }, 1000);
    }
}

// מעבר למסך הסיום
function showFinalScreen() {
    hideFixedProgressBar();
    switchScreen('tasksScreen', 'finalScreen');
    
    // אפקט חגיגי
    createCelebrationEffect();
}

// אפקט חגיגי מותאם לטלפון
function createCelebrationEffect() {
    const colors = ['#ff69b4', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    const confettiCount = window.innerWidth <= 768 ? 30 : 50; // פחות קונפטי בטלפון
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: ${window.innerWidth <= 480 ? '8px' : '10px'};
                height: ${window.innerWidth <= 480 ? '8px' : '10px'};
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                z-index: 1000;
                border-radius: 50%;
                animation: float 3s ease-out forwards;
                transform: translateY(0);
            `;
            
            document.body.appendChild(confetti);
            
            // הסרת הקונפטי אחרי האנימציה
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

// הצגת פופאפ הסיום
function showFinalPopup() {
    document.getElementById('popupOverlay').classList.add('show');
    document.getElementById('finalPopup').classList.add('show');
    
    // אפקט נוסף
    createCelebrationEffect();
}

// סגירת פופאפ הסיום
function closeFinalPopup() {
    document.getElementById('popupOverlay').classList.remove('show');
    document.getElementById('finalPopup').classList.remove('show');
    
    // הודעת סיום
    setTimeout(() => {
        alert('🎉 תודה שיחקת! עכשיו תהני מהדייט המושלם! ❤️');
    }, 500);
}
import { loadStudentData, computeStatistics, loadLeaderboardData } from './utils.js';
import { createCharts, destroyCharts } from './charts.js';
import { updateLeaderboard } from './leaderboard.js';
import { updatePDFContent, generatePDF } from './pdf.js';

let studentData = {};
let computedData = {};
let leaderboardData = {};
let currentStudent = null;

async function init() {
    try {
        console.log('🚀 Initializing Student Result Portal...');
        
        // Load all data
        studentData = await loadStudentData();
        leaderboardData = await loadLeaderboardData();
        computedData = computeStatistics(studentData);
        
        // Hide loading screen
        document.getElementById('loading').style.display = 'none';
        document.getElementById('mainContainer').style.display = 'block';
        
        setupEventListeners();
        console.log('✅ App initialized successfully');
        
    } catch (error) {
        console.error('❌ Failed to initialize app:', error);
        showError(`Failed to load data: ${error.message}`);
    }
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('rollNumber').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // PDF download
    document.getElementById('downloadPdfBtn').addEventListener('click', () => {
    if (currentStudent) {
        generatePDF(currentStudent, leaderboardData); // ← Add leaderboardData
    }
});
}

function handleSearch() {
    const rollNumber = document.getElementById('rollNumber').value.trim().toUpperCase();
    
    if (!rollNumber) {
        showError('Please enter a roll number');
        return;
    }
    
    if (!studentData[rollNumber]) {
        showError('Roll number not found. Please check and try again.');
        return;
    }
    
    // Get student data
    currentStudent = studentData[rollNumber];
    
    // Display student information
    displayStudentInfo(currentStudent);
    
    // Show student card
    document.getElementById('studentCard').style.display = 'block';
    
    // Create charts
    createCharts(currentStudent, computedData);
    
    // Update leaderboard
    updateLeaderboard(currentStudent, leaderboardData);
    
    // Switch to charts tab
    switchTab('charts');
    
    // Scroll to student card
    document.getElementById('studentCard').scrollIntoView({ behavior: 'smooth' });
    
    console.log('👤 Student loaded:', currentStudent.NAME);
}

function displayStudentInfo(student) {
    // Basic info
    document.getElementById('studentName').textContent = student.NAME;
    document.getElementById('studentRoll').textContent = student.ROLL;
    document.getElementById('studentClass').textContent = student.CLASS;
    document.getElementById('studentSchool').textContent = student.SCHOOL;
    
    // Total marks and result
    const total = parseInt(student.TOTAL) || 0;
    document.getElementById('studentTotal').textContent = `${total}/100`;
    
    const result = total >= 50 ? 'PASS' : 'FAIL';
    const resultColor = total >= 50 ? '#27ae60' : '#e74c3c';
    document.getElementById('studentResult').textContent = result;
    document.getElementById('studentResult').style.color = resultColor;
    
    // Check for congratulations
    checkCongratulations(student);
    
    // Update marks table
    const marksTableBody = document.getElementById('marksTableBody');
    marksTableBody.innerHTML = '';
    
    const subjects = [
        { code: 'BEN', name: 'Bengali' },
        { code: 'MATH', name: 'Mathematics' },
        { code: 'ENG', name: 'English' },
        { code: 'GK', name: 'General Knowledge' }
    ];
    
    subjects.forEach(subject => {
        const marks = parseInt(student[subject.code]) || 0;
        const percentage = ((marks / 25) * 100).toFixed(1);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${subject.name}</strong></td>
            <td>${marks}</td>
            <td>25</td>
            <td>${percentage}%</td>
        `;
        marksTableBody.appendChild(row);
    });
}

function checkCongratulations(student) {
    // Remove existing congratulations
    const existing = document.getElementById('congratulationsContainer');
    existing.innerHTML = '';
    existing.style.display = 'none';
    
    const className = student.CLASS;
    const classLeaderboard = leaderboardData[className] || {};
    
    // Find student's rank
    let studentRank = null;
    for (const rank in classLeaderboard) {
        const students = classLeaderboard[rank] || [];
        if (students.some(s => s.name === student.NAME)) {
            studentRank = parseInt(rank);
            break;
        }
    }
    
    if (studentRank && studentRank <= 10) {
        // Add congratulations message
        const congratsHTML = `
            <div class="congratulations-message">
                <div class="congratulations-content">
                    <div class="congratulations-icon">
                        <i class="fas fa-trophy"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-medal"></i>
                    </div>
                    <div class="congratulations-text">
                        <h3>🎉 Congratulations! 🎉</h3>
                        <p>You have achieved <strong>Rank #${studentRank}</strong> in Class ${className}!</p>
                        <p class="sub-message">Outstanding performance! Keep up the great work!</p>
                    </div>
                    <div class="confetti">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-heart"></i>
                        <i class="fas fa-certificate"></i>
                    </div>
                </div>
            </div>
        `;
        
        existing.innerHTML = congratsHTML;
        existing.style.display = 'block';
    }
}

function switchTab(tabId) {
    // Update active tab button
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabId) {
            tab.classList.add('active');
        }
    });
    
    // Show active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId + 'Tab') {
            content.classList.add('active');
        }
    });
}

function showError(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
const fs = require('fs');

// Load your student data
const studentData = require('./data/students.json');

// Group by class and compute leaderboard
const leaderboard = {};

Object.values(studentData).forEach(student => {
    const className = student.CLASS;
    if (!leaderboard[className]) {
        leaderboard[className] = {};
    }
    
    const rank = parseInt(student.RANK) || 0;
    if (rank >= 1 && rank <= 10) {
        if (!leaderboard[className][rank]) {
            leaderboard[className][rank] = [];
        }
        
        leaderboard[className][rank].push({
            name: student.NAME,
            school: student.SCHOOL,
            total: parseInt(student.TOTAL) || 0
        });
    }
});

// Sort each rank by total descending
Object.keys(leaderboard).forEach(className => {
    Object.keys(leaderboard[className]).forEach(rank => {
        leaderboard[className][rank].sort((a, b) => b.total - a.total);
    });
});

// Save to file
fs.writeFileSync('./data/leaderboard.json', JSON.stringify(leaderboard, null, 2));
console.log('✅ Leaderboard JSON generated successfully!');
console.log('Classes found:', Object.keys(leaderboard));
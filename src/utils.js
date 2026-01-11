// Utility functions

export async function loadStudentData() {
    try {
        const response = await fetch('/data/students.json');
        if (!response.ok) throw new Error('Failed to load student data');
        const data = await response.json();
        
        // Convert string numbers to integers
        Object.values(data).forEach(student => {
            student.BEN = parseInt(student.BEN) || 0;
            student.MATH = parseInt(student.MATH) || 0;
            student.ENG = parseInt(student.ENG) || 0;
            student.GK = parseInt(student.GK) || 0;
            student.TOTAL = parseInt(student.TOTAL) || 0;
        });
        
        console.log(`✅ Loaded ${Object.keys(data).length} student records`);
        return data;
    } catch (error) {
        console.error('Error loading student data:', error);
        throw error;
    }
}

export async function loadLeaderboardData() {
    try {
        const response = await fetch('/data/leaderboard.json');
        if (!response.ok) throw new Error('Failed to load leaderboard');
        return await response.json();
    } catch (error) {
        console.warn('Using empty leaderboard:', error);
        return {};
    }
}

export function computeStatistics(studentData) {
    console.log('Computing statistics...');
    
    const students = Object.values(studentData);
    const classAverages = {};
    const allTotals = [];
    
    // Group by class
    const classGroups = {};
    students.forEach(student => {
        const className = student.CLASS;
        if (!classGroups[className]) {
            classGroups[className] = [];
        }
        classGroups[className].push(student);
        allTotals.push(student.TOTAL);
    });
    
    // Compute averages for each class
    for (const [className, classStudents] of Object.entries(classGroups)) {
        const totals = classStudents.map(s => s.TOTAL);
        const benMarks = classStudents.map(s => s.BEN);
        const mathMarks = classStudents.map(s => s.MATH);
        const engMarks = classStudents.map(s => s.ENG);
        const gkMarks = classStudents.map(s => s.GK);
        
        classAverages[className] = {
            total: average(totals),
            subjects: {
                BEN: average(benMarks),
                MATH: average(mathMarks),
                ENG: average(engMarks),
                GK: average(gkMarks)
            },
            count: classStudents.length
        };
    }
    
    // Compute histogram
    const histogram = {};
    for (let i = 0; i <= 90; i += 10) {
        histogram[`${i}-${i+10}`] = 0;
    }
    histogram['91-100'] = 0;
    
    allTotals.forEach(total => {
        if (total <= 10) histogram['0-10']++;
        else if (total <= 20) histogram['11-20']++;
        else if (total <= 30) histogram['21-30']++;
        else if (total <= 40) histogram['31-40']++;
        else if (total <= 50) histogram['41-50']++;
        else if (total <= 60) histogram['51-60']++;
        else if (total <= 70) histogram['61-70']++;
        else if (total <= 80) histogram['71-80']++;
        else if (total <= 90) histogram['81-90']++;
        else histogram['91-100']++;
    });
    
    return {
        classAverages,
        histogram,
        allTotals,
        totalStudents: students.length
    };
}

function average(arr) {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return Math.round((sum / arr.length) * 10) / 10;
}

export function getDistributionInsight(studentTotal, allTotals) {
    const totalStudents = allTotals.length;
    const betterThan = allTotals.filter(t => t < studentTotal).length;
    const percentageBetter = ((betterThan / totalStudents) * 100).toFixed(1);
    
    if (percentageBetter > 90) {
        return `Outstanding! You scored better than ${percentageBetter}% of students.`;
    } else if (percentageBetter > 75) {
        return `Excellent! You scored better than ${percentageBetter}% of students.`;
    } else if (percentageBetter > 60) {
        return `Great job! You scored better than ${percentageBetter}% of students.`;
    } else if (percentageBetter > 40) {
        return `Good! You scored better than ${percentageBetter}% of students.`;
    } else if (percentageBetter > 20) {
        return `You scored better than ${percentageBetter}% of students. Keep improving!`;
    } else {
        return `You're in the bottom ${(100 - percentageBetter).toFixed(1)}%. Don't give up!`;
    }
}
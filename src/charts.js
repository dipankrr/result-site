// Chart.js functionality
let charts = {};

export function createCharts(student, computedData) {
    // Destroy existing charts
    destroyCharts();
    
    // Create charts
    createSubjectChart(student, computedData);
    createContributionChart(student);
    createDistributionChart(student, computedData);
    createDensityChart(student, computedData);
}

export function destroyCharts() {
    Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
    });
    charts = {};
}

function createSubjectChart(student, computedData) {
    const ctx = document.getElementById('subjectChart');
    if (!ctx) return;
    
    const chartCtx = ctx.getContext('2d');
    const className = student.CLASS;
    const classAvg = computedData.classAverages[className] || {
        subjects: { BEN: 0, MATH: 0, ENG: 0, GK: 0 }
    };
    
    charts.subject = new Chart(chartCtx, {
        type: 'bar',
        data: {
            labels: ['Bengali', 'Mathematics', 'English', 'GK'],
            datasets: [
                {
                    label: 'Your Marks',
                    data: [
                        student.BEN || 0,
                        student.MATH || 0,
                        student.ENG || 0,
                        student.GK || 0
                    ],
                    backgroundColor: 'rgba(52, 152, 219, 0.8)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1,
                    barPercentage: 0.6
                },
                {
                    label: 'Class Average',
                    data: [
                        classAvg.subjects.BEN || 0,
                        classAvg.subjects.MATH || 0,
                        classAvg.subjects.ENG || 0,
                        classAvg.subjects.GK || 0
                    ],
                    backgroundColor: 'rgba(149, 165, 166, 0.6)',
                    borderColor: 'rgba(149, 165, 166, 1)',
                    borderWidth: 1,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 25,
                    title: {
                        display: true,
                        text: 'Marks (out of 25)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

function createContributionChart(student) {
    const ctx = document.getElementById('contributionChart');
    if (!ctx) return;
    
    const chartCtx = ctx.getContext('2d');
    const total = student.TOTAL || 1;
    
    charts.contribution = new Chart(chartCtx, {
        type: 'doughnut',
        data: {
            labels: ['Bengali', 'Mathematics', 'English', 'GK'],
            datasets: [{
                data: [
                    ((student.BEN || 0) / total * 100).toFixed(1),
                    ((student.MATH || 0) / total * 100).toFixed(1),
                    ((student.ENG || 0) / total * 100).toFixed(1),
                    ((student.GK || 0) / total * 100).toFixed(1)
                ],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(241, 196, 15, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function createDistributionChart(student, computedData) {
    const ctx = document.getElementById('distributionChart');
    if (!ctx) return;
    
    const chartCtx = ctx.getContext('2d');
    const studentTotal = student.TOTAL || 0;
    const histogram = computedData.histogram;
    
    // Determine which range the student falls into
    const ranges = Object.keys(histogram);
    const studentRangeIndex = ranges.findIndex(range => {
        const [min, max] = range.split('-').map(Number);
        return studentTotal >= min && studentTotal <= max;
    });
    
    const backgroundColors = ranges.map((_, index) => 
        index === studentRangeIndex ? 'rgba(52, 152, 219, 0.8)' : 'rgba(149, 165, 166, 0.6)'
    );
    
    charts.distribution = new Chart(chartCtx, {
        type: 'bar',
        data: {
            labels: ranges,
            datasets: [{
                label: 'Number of Students',
                data: Object.values(histogram),
                backgroundColor: backgroundColors,
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Students'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Score Range'
                    }
                }
            }
        }
    });
    
    // Update insight
    const insight = getDistributionInsight(studentTotal, computedData.allTotals || []);
    document.getElementById('distributionInsight').innerHTML = `
        <p><i class="fas fa-lightbulb"></i> <strong>Insight:</strong> ${insight}</p>
    `;
}

function createDensityChart(student, computedData) {
    const ctx = document.getElementById('densityChart');
    if (!ctx) return;
    
    const chartCtx = ctx.getContext('2d');
    const studentTotal = student.TOTAL || 0;
    const allTotals = computedData.allTotals || [];
    
    // Count students for each mark (0-100)
    const densityData = new Array(101).fill(0);
    allTotals.forEach(total => {
        if (total >= 0 && total <= 100) {
            densityData[total]++;
        }
    });
    
    charts.density = new Chart(chartCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 101}, (_, i) => i),
            datasets: [
                {
                    label: 'Number of Students',
                    data: densityData,
                    borderColor: 'rgba(52, 152, 219, 1)',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: 'Your Score',
                    data: densityData.map((_, index) => index === studentTotal ? densityData[studentTotal] : null),
                    borderColor: 'rgba(231, 76, 60, 1)',
                    backgroundColor: 'rgba(231, 76, 60, 0.8)',
                    pointRadius: 6,
                    showLine: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Students'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Total Marks'
                    }
                }
            }
        }
    });
}

function getDistributionInsight(studentTotal, allTotals) {
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
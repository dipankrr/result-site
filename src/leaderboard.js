// Leaderboard functionality

export function updateLeaderboard(student, leaderboardData) {
    const leaderboardList = document.getElementById('leaderboardList');
    if (!leaderboardList) return;
    
    leaderboardList.innerHTML = '';
    
    const className = student.CLASS;
    const classLeaderboard = leaderboardData[className] || {};
    
    if (Object.keys(classLeaderboard).length === 0) {
        leaderboardList.innerHTML = `
            <div class="no-data">
                <i class="fas fa-info-circle"></i>
                <p>No leaderboard data available for Class ${className}</p>
            </div>
        `;
        return;
    }
    
    // Show ranks 1 to 10
    for (let rank = 1; rank <= 10; rank++) {
        const students = classLeaderboard[rank] || [];
        
        const leaderboardItem = document.createElement('div');
        leaderboardItem.className = `leaderboard-item rank-${rank}`;
        
        // Check if current student is in this rank
        const isCurrentStudent = students.some(s => s.name === student.NAME && s.school === student.SCHOOL);
        
        leaderboardItem.innerHTML = `
            <div class="rank-header">
                <div>
                    <span class="rank-number">Rank #${rank}</span>
                    <span class="rank-marks">${students.length > 0 ? students[0].total + ' marks' : 'No students'}</span>
                </div>
                <div class="rank-count">
                    ${students.length} student${students.length !== 1 ? 's' : ''}
                    ${students.length > 0 ? '<i class="fas fa-chevron-down"></i>' : ''}
                </div>
            </div>
            ${students.length > 0 ? `
                <div class="rank-students" style="display: none;">
                    <div class="student-list">
                        ${students.map(s => `
                            <div class="student-item ${s.name === student.NAME && s.school === student.SCHOOL ? 'current' : ''}">
                                <div class="student-name">
                                    ${s.name}
                                    ${s.name === student.NAME && s.school === student.SCHOOL ? '<span class="you-badge">(You)</span>' : ''}
                                </div>
                                <div class="student-school">${s.school}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
        
        // Add click event to expand/collapse
        if (students.length > 0) {
            const header = leaderboardItem.querySelector('.rank-header');
            const studentsDiv = leaderboardItem.querySelector('.rank-students');
            const icon = leaderboardItem.querySelector('.fa-chevron-down');
            
            header.addEventListener('click', () => {
                if (studentsDiv.style.display === 'none') {
                    studentsDiv.style.display = 'block';
                    if (icon) icon.className = 'fas fa-chevron-up';
                } else {
                    studentsDiv.style.display = 'none';
                    if (icon) icon.className = 'fas fa-chevron-down';
                }
            });
        }
        
        leaderboardList.appendChild(leaderboardItem);
    }
}
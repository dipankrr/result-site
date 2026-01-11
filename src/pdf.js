// SIMPLE PDF Generation - Works Guaranteed

export function generatePDF(student, leaderboardData) {
    if (!student) {
        alert('Please search for a student first');
        return;
    }

    console.log('Generating PDF for:', student.ROLL);

    // Get student's rank
    let studentRank = 'Not Ranked';
    if (leaderboardData) {
        const className = student.CLASS;
        const classLeaderboard = leaderboardData[className] || {};
        for (const rank in classLeaderboard) {
            if (classLeaderboard[rank].some(s => s.name === student.NAME)) {
                studentRank = `Rank #${rank}`;
                break;
            }
        }
    }

    // Create HTML content
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Marksheet - ${student.ROLL}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    color: #000;
                    background: white;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 3px solid #000;
                    padding-bottom: 20px;
                }
                .logo {
                    font-size: 48px;
                    color: #2c3e50;
                    margin-bottom: 10px;
                }
                h1 {
                    font-size: 24px;
                    margin: 5px 0;
                }
                h2 {
                    font-size: 18px;
                    color: #333;
                    margin: 5px 0;
                }
                .student-info {
                    margin-bottom: 30px;
                    padding: 15px;
                    background: #f5f5f5;
                    border: 1px solid #ddd;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                th {
                    background: #2c3e50;
                    color: white;
                    padding: 12px;
                    text-align: left;
                    border: 1px solid #000;
                }
                td {
                    padding: 10px;
                    border: 1px solid #000;
                }
                .total-row {
                    background: #f0f0f0;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">🎓</div>
                <h1>DAKSHIN DINAJPUR Zela MEDHA ANNESHAN 2025</h1>
                <h2>Organised by Sister Nivedita Welfare Foundation</h2>
                <h2>Student Result Marksheet</h2>
            </div>

            <div class="student-info">
                <table>
                    <tr>
                        <td><strong>Name:</strong> ${student.NAME}</td>
                        <td><strong>Roll No:</strong> ${student.ROLL}</td>
                    </tr>
                    <tr>
                        <td><strong>Class:</strong> ${student.CLASS}</td>
                        <td><strong>School:</strong> ${student.SCHOOL}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Marks:</strong> ${student.TOTAL}/100</td>
                        <td><strong>Rank:</strong> ${studentRank}</td>
                    </tr>
                </table>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Marks Obtained</th>
                        <th>Maximum Marks</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    ${getSubjectRows(student)}
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td><strong>Total</strong></td>
                        <td><strong>${student.TOTAL}</strong></td>
                        <td><strong>100</strong></td>
                        <td><strong>${((parseInt(student.TOTAL) / 100) * 100).toFixed(1)}%</strong></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align: center;">
                            <strong>Result:</strong> ${parseInt(student.TOTAL) >= 50 ? 'PASS' : 'FAIL'}
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div class="footer">
                <p><strong>Date Generated:</strong> ${new Date().toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</p>
                <p>This digital result system is developed by RM DIGITAL WORKS.</p>
                <p>Contact: rmdigitalworks.in@gmail.com | 9735868805 / 9064651620</p>
            </div>

            <div class="no-print" style="margin-top: 20px; text-align: center; padding: 10px; background: #f0f0f0; border: 1px solid #ccc;">
                <p><strong>Instructions:</strong> Use Ctrl+P (or Cmd+P on Mac) to print this page, then select "Save as PDF" in your browser's print dialog.</p>
            </div>
        </body>
        </html>
    `;

    // Open in new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Focus the window and show print dialog
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
    }, 500);
}

function getSubjectRows(student) {
    const subjects = [
        { code: 'BEN', name: 'Bengali' },
        { code: 'MATH', name: 'Mathematics' },
        { code: 'ENG', name: 'English' },
        { code: 'GK', name: 'General Knowledge' }
    ];
    
    return subjects.map(subject => {
        const marks = parseInt(student[subject.code]) || 0;
        const percentage = ((marks / 25) * 100).toFixed(1);
        return `
            <tr>
                <td>${subject.name}</td>
                <td>${marks}</td>
                <td>25</td>
                <td>${percentage}%</td>
            </tr>
        `;
    }).join('');
}

// Keep updatePDFContent if needed elsewhere
export function updatePDFContent(student, leaderboardData) {
    // Simple implementation if needed
    console.log('PDF content updated for:', student.NAME);
}


// Add this function for emergency fallback
function emergencyPDFFallback(student, studentRank) {
    const html = `
        <html>
        <head><title>Marksheet - ${student.ROLL}</title></head>
        <body style="font-family: Arial; padding: 20px;">
            <center>
                <h1>Student Marksheet</h1>
                <h2>${student.SCHOOL}</h2>
                <hr>
                <table border="1" cellpadding="10" cellspacing="0" width="100%">
                    <tr>
                        <td><strong>Name:</strong> ${student.NAME}</td>
                        <td><strong>Roll:</strong> ${student.ROLL}</td>
                    </tr>
                    <tr>
                        <td><strong>Class:</strong> ${student.CLASS}</td>
                        <td><strong>Rank:</strong> ${studentRank}</td>
                    </tr>
                </table>
                <br>
                <table border="1" cellpadding="10" cellspacing="0" width="100%">
                    <tr bgcolor="#f0f0f0">
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Out of 25</th>
                        <th>%</th>
                    </tr>
                    <tr><td>Bengali</td><td>${student.BEN}</td><td>25</td><td>${((student.BEN/25)*100).toFixed(1)}%</td></tr>
                    <tr><td>Mathematics</td><td>${student.MATH}</td><td>25</td><td>${((student.MATH/25)*100).toFixed(1)}%</td></tr>
                    <tr><td>English</td><td>${student.ENG}</td><td>25</td><td>${((student.ENG/25)*100).toFixed(1)}%</td></tr>
                    <tr><td>GK</td><td>${student.GK}</td><td>25</td><td>${((student.GK/25)*100).toFixed(1)}%</td></tr>
                    <tr bgcolor="#e0e0e0">
                        <td><strong>Total</strong></td>
                        <td><strong>${student.TOTAL}</strong></td>
                        <td><strong>100</strong></td>
                        <td><strong>${((student.TOTAL/100)*100).toFixed(1)}%</strong></td>
                    </tr>
                </table>
                <br>
                <p><strong>Result:</strong> ${parseInt(student.TOTAL) >= 50 ? 'PASS' : 'FAIL'}</p>
                <p><em>Generated on: ${new Date().toLocaleString()}</em></p>
            </center>
        </body>
        </html>
    `;
    
    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    win.print();
}


function printMarksheet(student, leaderboardData) {
    // Create a simple print-friendly page
    const printWindow = window.open('', '_blank');
    
    // Get student rank
    let rank = 'Not Ranked';
    if (leaderboardData && student) {
        const classData = leaderboardData[student.CLASS] || {};
        for (const r in classData) {
            if (classData[r].some(s => s.name === student.NAME)) {
                rank = `Rank #${r}`;
                break;
            }
        }
    }
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Marksheet - ${student.ROLL}</title>
            <style>
                @media print {
                    @page { margin: 20mm; }
                    body { margin: 0; font-family: Arial; }
                }
                body { padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background: #f0f0f0; }
                .total-row { background: #e0e0e0; font-weight: bold; }
                .header { text-align: center; margin-bottom: 30px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Student Marksheet</h1>
                <h2>${student.SCHOOL}</h2>
            </div>
            
            <table>
                <tr>
                    <td><strong>Name:</strong> ${student.NAME}</td>
                    <td><strong>Roll No:</strong> ${student.ROLL}</td>
                </tr>
                <tr>
                    <td><strong>Class:</strong> ${student.CLASS}</td>
                    <td><strong>Rank:</strong> ${rank}</td>
                </tr>
            </table>
            
            <table>
                <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Out of 25</th>
                    <th>Percentage</th>
                </tr>
                <tr><td>Bengali</td><td>${student.BEN}</td><td>25</td><td>${((student.BEN/25)*100).toFixed(1)}%</td></tr>
                <tr><td>Mathematics</td><td>${student.MATH}</td><td>25</td><td>${((student.MATH/25)*100).toFixed(1)}%</td></tr>
                <tr><td>English</td><td>${student.ENG}</td><td>25</td><td>${((student.ENG/25)*100).toFixed(1)}%</td></tr>
                <tr><td>GK</td><td>${student.GK}</td><td>25</td><td>${((student.GK/25)*100).toFixed(1)}%</td></tr>
                <tr class="total-row">
                    <td><strong>Total</strong></td>
                    <td><strong>${student.TOTAL}/100</strong></td>
                    <td><strong>100</strong></td>
                    <td><strong>${((student.TOTAL/100)*100).toFixed(1)}%</strong></td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: center;">
                        <strong>Result:</strong> ${parseInt(student.TOTAL) >= 50 ? 'PASS' : 'FAIL'}
                    </td>
                </tr>
            </table>
            
            <p style="text-align: center; margin-top: 40px;">
                <strong>Date:</strong> ${new Date().toLocaleDateString()}
            </p>
            
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => window.close(), 1000);
                }
            </script>
        </body>
        </html>
    `);
    
    printWindow.document.close();
}



// // PDF generation functionality

// export function updatePDFContent(student, leaderboardData) {
//     if (!student) return;
    
//     const total = parseInt(student.TOTAL) || 0;
//     const percentage = ((total / 100) * 100).toFixed(1);
//     const result = total >= 50 ? 'PASS' : 'FAIL';
    
//     // Set basic info
//     document.getElementById('pdfName').textContent = student.NAME || '-';
//     document.getElementById('pdfRoll').textContent = student.ROLL || '-';
//     document.getElementById('pdfClass').textContent = student.CLASS || '-';
//     document.getElementById('pdfSchool').textContent = student.SCHOOL || '-';
//     document.getElementById('pdfTotal').textContent = total;
//     document.getElementById('pdfPercentage').textContent = percentage;
//     document.getElementById('pdfResult').textContent = result;
    
// // Set rank
//     const className = student.CLASS;
//     const classLeaderboard = leaderboardData[className] || {};
//     let studentRank = 'Not Ranked';
    
//     // Find student's rank
//     for (const rank in classLeaderboard) {
//         const students = classLeaderboard[rank] || [];
//         if (students.some(s => s.name === student.NAME)) {
//             studentRank = `Rank #${rank}`;
//             break;
//         }
//     }
    
//     document.getElementById('pdfRank').textContent = studentRank;

//     // Set date
//     document.getElementById('pdfDate').textContent = new Date().toLocaleDateString('en-IN', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//     });
    
//     // Set marks table
//     const pdfMarksBody = document.getElementById('pdfMarksBody');
//     pdfMarksBody.innerHTML = '';
    
//     const subjects = [
//         { code: 'BEN', name: 'Bengali', marks: parseInt(student.BEN) || 0, max: 25 },
//         { code: 'MATH', name: 'Mathematics', marks: parseInt(student.MATH) || 0, max: 25 },
//         { code: 'ENG', name: 'English', marks: parseInt(student.ENG) || 0, max: 25 },
//         { code: 'GK', name: 'General Knowledge', marks: parseInt(student.GK) || 0, max: 25 }
//     ];
    
//     subjects.forEach(subject => {
//         const subjectPercentage = ((subject.marks / subject.max) * 100).toFixed(1);
        
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${subject.name}</td>
//             <td>${subject.marks}</td>
//             <td>${subject.max}</td>
//             <td>${subjectPercentage}%</td>
//         `;
//         pdfMarksBody.appendChild(row);
//     });
// }

// export function generatePDF(student, leaderboardData) {
//      if (!student) {
//         alert('Please search for a student first');
//         return;
//     }
    
//     // Update PDF content with rank
//     //updatePDFContent(student, leaderboardData);
    
//     console.log('Starting PDF generation for:', student.ROLL);
    
//     // Update PDF content first
//     updatePDFContent(student, leaderboardData);
    
//     // Get PDF container
//     const element = document.getElementById('pdfContainer');
    
//     // Show element temporarily
//     element.style.display = 'block';
    
//     // PDF options
//     const opt = {
//     margin: [10, 10, 10, 10], // [top, right, bottom, left]
//     filename: `Marksheet_${student.ROLL}.pdf`,
//     image: { 
//         type: 'jpeg', 
//         quality: 0.98 
//     },
//     html2canvas: { 
//         scale: 2, // Higher scale for better quality
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff',
//         windowWidth: 794, // A4 width
//         width: 794, // Explicit width
//         x: 0,
//         y: 0
//     },
//     jsPDF: { 
//         unit: 'mm', 
//         format: 'a4', 
//         orientation: 'portrait',
//         compress: true
//     },
//     pagebreak: {
//         mode: ['avoid-all', 'css', 'legacy']
//     }
// };
    
//     // Show loading state
//     const btn = document.getElementById('downloadPdfBtn');
//     const originalHTML = btn.innerHTML;
//     btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
//     btn.disabled = true;
    
//     // Small delay to ensure rendering
//     // Add this timeout to ensure DOM is ready
// setTimeout(() => {
//     html2pdf().set(opt).from(element).save()
//         .then(() => {
//             console.log('PDF generated successfully');
//             // Hide element
//             element.style.display = 'none';
//         })
//         .catch(error => {
//             console.error('PDF error:', error);
//             // Fallback: open print dialog
//             window.print();
//         });
// }, 1000); // Wait 1 second for rendering
// }
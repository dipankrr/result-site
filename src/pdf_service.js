// export function generatePDF(student, leaderboardData) {
//     if (!student) {
//         alert('Please search for a student first');
//         return;
//     }

//     console.log('Generating PDF for:', student.ROLL);

//     // Get student's rank
//     let studentRank = 'Not Ranked';
//     if (leaderboardData) {
//         const className = student.CLASS;
//         const classLeaderboard = leaderboardData[className] || {};
//         for (const rank in classLeaderboard) {
//             if (classLeaderboard[rank].some(s => s.name === student.NAME)) {
//                 studentRank = `Rank #${rank}`;
//                 break;
//             }
//         }
//     }

//     // Create HTML content
//    const htmlContent = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8" />
// <title>Marksheet - ${student.ROLL}</title>

// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

// <style>
//     * { box-sizing: border-box; }

//     body {
//         font-family: 'Poppins', sans-serif;
//         background: #f4f6f9;
//         margin: 0;
//         padding: 30px;
//         color: #2c3e50;
//     }

//     .marksheet {
//         max-width: 900px;
//         margin: auto;
//         background: #fff;
//         border-radius: 14px;
//         box-shadow: 0 20px 40px rgba(0,0,0,0.08);
//         overflow: hidden;
//     }

//     /* HEADER */
//     .header {
//         background: linear-gradient(135deg, #1d2671, #c33764);
//         color: white;
//         padding: 30px;
//         text-align: center;
//     }

//     .header h1 {
//         margin: 0;
//         font-size: 26px;
//         letter-spacing: 0.5px;
//     }

//     .header h2 {
//         font-size: 15px;
//         font-weight: 300;
//         margin-top: 8px;
//         opacity: 0.9;
//     }

//     .header .logo {
//         font-size: 48px;
//         margin-bottom: 10px;
//     }

//     /* STUDENT INFO */
//     .info {
//         padding: 25px;
//         display: grid;
//         grid-template-columns: repeat(2, 1fr);
//         gap: 15px;
//         background: #f9fafc;
//         border-bottom: 1px solid #eee;
//     }

//     .info div {
//         font-size: 14px;
//     }

//     .info span {
//         font-weight: 600;
//         color: #000;
//     }

//     /* TABLE */
//     table {
//         width: 100%;
//         border-collapse: collapse;
//     }

//     th {
//         background: #1d2671;
//         color: white;
//         padding: 14px;
//         text-align: left;
//         font-size: 14px;
//     }

//     td {
//         padding: 14px;
//         border-bottom: 1px solid #eee;
//         font-size: 14px;
//     }

//     /* PROGRESS BAR */
//     .bar {
//         height: 8px;
//         background: #e0e0e0;
//         border-radius: 10px;
//         overflow: hidden;
//         margin-top: 6px;
//     }

//     .bar span {
//         display: block;
//         height: 100%;
//         background: linear-gradient(90deg, #1d2671, #c33764);
//     }

//     /* TOTAL */
//     .total-row {
//         background: #f1f3f8;
//         font-weight: 700;
//     }

//     /* RESULT */
//     .result {
//         text-align: center;
//         padding: 25px;
//         font-size: 18px;
//     }

//     .pass {
//         color: #2ecc71;
//         font-weight: 700;
//     }

//     .fail {
//         color: #e74c3c;
//         font-weight: 700;
//     }

//     /* FOOTER */
//     .footer {
//         text-align: center;
//         padding: 20px;
//         font-size: 12px;
//         color: #777;
//         background: #fafafa;
//     }

//     @media print {
//         body { background: white; padding: 0; }
//         .marksheet { box-shadow: none; border-radius: 0; }
//     }
// </style>
// </head>

// <body>

// <div class="marksheet">

//     <div class="header">
//         <div class="logo">🎓</div>
//         <h1>দক্ষিণ দিনাজপুর জেলা মেধা অন্নেষণ 2025</h1>
//         <h2>Sister Nivedita Welfare Foundation</h2>
//         <h2>Govt. Regd. UDYAM-WB-19-0024504</h2>
//     </div>

//     <div class="info">
//         <div><span>Name:</span> ${student.NAME}</div>
//         <div><span>Roll No:</span> ${student.ROLL}</div>
//         <div><span>Class:</span> ${student.CLASS}</div>
//         <div><span>School:</span> ${student.SCHOOL}</div>
//         <div><span>Total Marks:</span> ${student.TOTAL} / 100</div>
//         <div><span>Rank:</span> ${studentRank}</div>
//     </div>

//     <table>
//         <thead>
//             <tr>
//                 <th>Subject</th>
//                 <th>Marks</th>
//                 <th>Out of</th>
//                 <th>Performance</th>
//             </tr>
//         </thead>
//         <tbody>
//             ${getSubjectRows(student)}
//         </tbody>
//         <tfoot>
//             <tr class="total-row">
//                 <td>Total</td>
//                 <td>${student.TOTAL}</td>
//                 <td>100</td>
//                 <td>${((student.TOTAL / 100) * 100).toFixed(1)}%</td>
//             </tr>
//         </tfoot>
//     </table>

//     <div class="result">
//         Result:
//         <span class="${parseInt(student.TOTAL) >= 50 ? 'pass' : 'fail'}">
//             ${parseInt(student.TOTAL) >= 50 ? 'PASS' : 'FAIL'}
//         </span>
//     </div>

//     <div class="footer">
//         <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
//         <p>Developed by RM DIGITAL WORKS | 9735868805</p>
//     </div>

// </div>

// </body>
// </html>
// `;


//     // Open in new window for printing
//     const printWindow = window.open('', '_blank', 'width=800,height=600');
//     printWindow.document.write(htmlContent);
//     printWindow.document.close();

//     // Focus the window and show print dialog
//     printWindow.focus();
//     setTimeout(() => {
//         printWindow.print();
//     }, 500);
// }

// function getSubjectRows(student) {
//     const subjects = [
//         { code: 'BEN', name: 'Bengali' },
//         { code: 'MATH', name: 'Mathematics' },
//         { code: 'ENG', name: 'English' },
//         { code: 'GK', name: 'General Knowledge' }
//     ];
    
//     return subjects.map(subject => {
//     const marks = parseInt(student[subject.code]) || 0;
//     const percent = (marks / 25) * 100;

//     return `
//         <tr>
//             <td>${subject.name}</td>
//             <td>${marks}</td>
//             <td>25</td>
//             <td>
//                 ${percent.toFixed(1)}%
//                 <div class="bar">
//                     <span style="width:${percent}%"></span>
//                 </div>
//             </td>
//         </tr>
//     `;
// }).join('');

// }



// Keep updatePDFContent if needed elsewhere


/* =========================================================
   PDF SERVICE – PRINT & DOWNLOAD MARKSHEET
   Dependency:
   <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
========================================================= */

/* ================= PRINT ================= */

/* =========================================================
   pdf_service.js
   PRINT + DOWNLOAD MARKSHEET
   Dependency (already added by you):
   https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js
========================================================= */


const LEFT_LOGO = '/assets/medha.png';
const RIGHT_LOGO = '/assets/nivedita.jpeg';
const WATERMARK_LOGO = 'assets/medha.png';
const PRESIDENT_SIGN = '/assets/president-sign.png';
const SECRETARY_SIGN = '/assets/secretary-sign.png';



/* ===================== PRINT ===================== */

export function printMarksheet(student, leaderboardData) {
    if (!student) {
        alert('Please search for a student first');
        return;
    }

    const win = window.open('', '_blank', 'width=900,height=650');
    win.document.write(getPrintHTML(student, leaderboardData));
    win.document.close();
    win.focus();

    setTimeout(() => win.print(), 500);
}


/* ===================== DOWNLOAD PDF ===================== */

export function downloadMarksheetPDF(student, leaderboardData) {
    if (!student) {
        alert('Please search for a student first');
        return Promise.reject('No student');
    }

    const pdfRoot = document.getElementById('pdf-root');
    pdfRoot.innerHTML = ''; // reset
    pdfRoot.style.display = 'block';

    // CREATE REAL MARKSHEET NODE
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
    <style>${getStyles()}</style>
    <div class="pdf-mode">
        ${getMarksheetBody(student, leaderboardData)}
    </div>
`;


    pdfRoot.appendChild(wrapper);
    wrapper.getBoundingClientRect();

    //wrapper.style.width = '794px'; //try 794/780
    wrapper.style.margin = '0 auto';
    wrapper.style.background = '#fff';


    return html2pdf().set({
            filename: `Marksheet_${student.ROLL}.pdf`,
            margin: [0, 0, 0, 0],
            image: { type: 'jpeg', quality: 1 },

            html2canvas: {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: 210 * 3.78, // EXACT A4 width in px
            },

            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        })

        .from(wrapper)
        .save()
        .then(() => {
            pdfRoot.innerHTML = '';
            pdfRoot.style.display = 'none';
        });
}




/* ===================== PRINT HTML ===================== */

function getPrintHTML(student, leaderboardData) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Marksheet - ${student.ROLL}</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

<style>
${getStyles()}
</style>
</head>

<body>
${getMarksheetBody(student, leaderboardData)}
</body>
</html>
`;
}


/* ===================== STYLES ===================== */

function getStyles() {
return `
* { box-sizing: border-box; }

body {
    font-family: 'Poppins', sans-serif;
    background: #ffffff;
    margin: 0;
    padding: 10px;
    color: #2c3e50;
}

.marksheet {
    width: 210mm;
    margin: 0 auto;
    background: #fff;
    border-radius: 14px;
    overflow: hidden;

    position: relative;   /* ⬅ REQUIRED */
}


/* HEADER */
.header {
    position: relative;
    background: linear-gradient(135deg, #6b2c1a, #8b3a1f, #6b2c1a);
    color: #fff;
    padding: 28px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-text {
    text-align: center;
    flex: 1;
}

.header-text h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 0;

    /* FORCE WHITE TEXT (canvas-safe) */
    color: #ffd966 !important;
    fill: #ffd966;

    /* BLACK STROKE (canvas-safe method) */
    text-shadow:
        -1px -1px 0 #000,
         1px -1px 0 #000,
        -1px  1px 0 #000,
         1px  1px 0 #000;

    /* VERY IMPORTANT */
    letter-spacing: 0;
}


.header-text h3 {
    font-size: 14px;
    margin: 6px 0 2px;
    font-weight: 400;
}

.header-text h2 {
    font-size: 20px;
    margin: 2px 0;
    font-weight: 600;
    color: #ffd966;
}

.header-text p {
    font-size: 14px;
    margin-top: 4px;
}

.header-logo {
    width: 90px;
    height: 90px;
    object-fit: contain;
    background: #fff;
    border-radius: 50%;
    padding: 6px;
}

.header-logo.left { margin-right: 10px; }
.header-logo.right { margin-left: 10px; }

/* WATERMARK */
.watermark {
    position: absolute;
    top: 55%;      /* move it slightly down */
    left: 50%;     /* horizontal center */
    transform: translateX(-50%);  /* only shift horizontally, no vertical transform */
    
    opacity: 0.06;
    z-index: 0;
    pointer-events: none;
    display: block; /* safer for PDF rendering */
}

.watermark img {
    width: 300px; /* or smaller if needed */
}



/* Ensure content stays above watermark */
.info, table, .result, .footer {
    position: relative;
    z-index: 1;
}


/* INFO */
.info {
    padding: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    background: #f9fafc;
    border-bottom: 1px solid #eee;
}

.info div { font-size: 18px; }
.info span { font-weight: 700; color: #000; }

/* TABLE */
table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background: #1d2671;
    color: white;
    padding: 14px;
    font-size: 18px;
    text-align: left;
}

td {
    padding: 14px;
    border-bottom: 1px solid #eee;
    font-size: 20px;      /* ⬅ increase size */
    font-weight: 600;    /* ⬅ bolder digits & text */
}


/* BAR */
.bar {
    height: 8px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 6px;
}

.bar span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #1d2671, #c33764);
}87

/* TOTAL */
.total-row {
    background: #f1f3f8;
    font-weight: 700;
}

/* RESULT */
.result {
    text-align: center;
    padding: 15px 0; /* reduced from 25px */
    font-size: 18px;
}

.pass { color: #2ecc71; font-weight: 700; }
.fail { color: #e74c3c; font-weight: 700; }

/* FOOTER */
.footer {
    text-align: center;
    10px 0;  /* reduced from 20px */
    font-size: 12px;
    color: #777;
    background: #fafafa;
}

/* SIGNATURES */
.signatures {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 15px 30px 5px; /* smaller than 30px 40px 10px */
    margin-top: 0px;       /* reduced from 20px */
}

.sign {
    text-align: center;
}

.sign img {
    height: 30px;
    object-fit: contain;
}

.sign-label {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #000;
}


`;
}


/* ===================== BODY ===================== */

function getMarksheetBody(student, leaderboardData) {

    let studentRank = 'Not Ranked';
    if (leaderboardData) {
        const classBoard = leaderboardData[student.CLASS] || {};
        for (const rank in classBoard) {
            if (classBoard[rank].some(s => s.name === student.NAME)) {
                studentRank = `Rank ${rank}`;
                break;
            }
        }
    }

    return `
<div class="marksheet">

    <div class="header">
    <img class="header-logo left" src="${LEFT_LOGO}" />
    
    <div class="header-text">
        <h1>দক্ষিণ দিনাজপুর জেলা মেধা অন্নেষণ ২০২৫</h1>
        <h3>ORGANISED BY</h3>
        <h2>SISTER NIVEDITA WELFARE FOUNDATION</h2>
        <p>GOVT. REGD. NO : UDYAM-WB-19-0024504</p>
    </div>

    <img class="header-logo right" src="${RIGHT_LOGO}" />
</div>

    <div class="watermark">
    <img src="${WATERMARK_LOGO}" />
</div>


    <div class="info">
        <div><span>Name:</span> ${student.NAME}</div>
        <div><span>Roll No:</span> ${student.ROLL}</div>
        <div><span>Class:</span> ${student.CLASS}</div>
        <div><span>School:</span> ${student.SCHOOL}</div>
        <div><span>Total Marks:</span> ${student.TOTAL} / 100</div>
        <div><span>Rank:</span> ${studentRank}</div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Out of</th>
                <th>Performance</th>
            </tr>
        </thead>
        <tbody>
            ${getSubjectRows(student)}
        </tbody>
        <tfoot>
            <tr class="total-row">
                <td>Total</td>
                <td>${student.TOTAL}</td>
                <td>100</td>
                <td>${student.TOTAL}%</td>
            </tr>
        </tfoot>
    </table>

    <div class="result">
        Result:
        <span class="${student.TOTAL >= 50 ? 'pass' : 'fail'}">
            ${student.TOTAL >= 50 ? 'PASS' : 'FAIL'}
        </span>
    </div>

    <div class="signatures">
    <div class="sign left">
        <img src="${PRESIDENT_SIGN}" />
        <div class="sign-label">President</div>
    </div>

    <div class="sign right">
        <img src="${SECRETARY_SIGN}" />
        <div class="sign-label">Secretary</div>
    </div>
</div>

    <div class="footer">
        <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
        <p>Developed by RM DIGITAL WORKS | 9735868805</p>
    </div>

</div>
`;
}


/* ===================== SUBJECT ROWS ===================== */

function getSubjectRows(student) {
    const subjects = [
        { code: 'BEN', name: 'Bengali' },
        { code: 'MATH', name: 'Mathematics' },
        { code: 'ENG', name: 'English' },
        { code: 'GK', name: 'General Knowledge' }
    ];

    return subjects.map(sub => {
        const marks = parseInt(student[sub.code]) || 0;
        const percent = (marks / 25) * 100;

        return `
<tr>
    <td>${sub.name}</td>
    <td>${marks}</td>
    <td>25</td>
    <td>
        ${percent.toFixed(1)}%
        <div class="bar">
            <span style="width:${percent}%"></span>
        </div>
    </td>
</tr>
`;
    }).join('');
}




//===============================================================================================================================================================================================================

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


function printMarksheetOld(student, leaderboardData) {
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
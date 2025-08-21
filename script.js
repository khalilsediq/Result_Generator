// Class-specific subjects configuration
const classSubjects = {
    'PlayGroup': ['English', 'Urdu', 'Math', 'Islamiat', 'Nazra', 'General-Knowledge'],
    'Nursery': ['English', 'Urdu', 'Math', 'Computer', 'Islamiat', 'Nazra', 'General-knowledge'],
    'KinderGarden': ['English', 'Urdu', 'Math', 'Computer', 'Islamiat', 'Nazra', 'General-Knowledge'],
    'One': ['English', 'Urdu', 'Math', 'Computer', 'General-Knowledge', 'Islamiat', 'Tadres-e-Quran'],
    'Two': ['English', 'Urdu', 'Math', 'Computer', 'General-Knowledge', 'Islamiat', 'Tadres-e-Quran'],
    'Three': ['English', 'Urdu', 'Math', 'General-Knowledge', 'Computer', 'Islamiat', 'Tadres-e-Quran'],
    'Four': ['English', 'Urdu', 'Math', 'General Science', 'Islamiat', 'Computer', 'Social Studies', 'Tadres-e-Quran'],
    'Five': ['English', 'Urdu', 'Math', 'Islamiat', 'Social Studies', 'General Science', 'Computer', 'Tadres-e-Quran'],
    'Six': ['English', 'Urdu', 'Math', 'History', 'Computer', 'Islamiat', 'Geography', 'Nazra', 'General Science'],
    'Seven': ['English', 'Urdu', 'Math', 'History', 'Computer', 'Islamiat', 'Geography', 'Nazra', 'General Science'],
    'Eight': ['English', 'Urdu', 'Math', 'History', 'Computer', 'Islamiat', 'Geography', 'Nazra', 'General Science'],
    'Nine': ['English', 'Urdu', 'Math', 'Physics', 'Biology', 'Chemistry', 'Islamiat', 'Pakistan Studies'],
    'Ten': ['English', 'Urdu', 'Math', 'Physics', 'Biology', 'Chemistry', 'Islamiat', 'Pakistan Studies']
};

// Grade calculation function
function calculateGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
}

// Calculate average percentage
function calculateAverage(marks) {
    const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
    return Math.round((totalMarks / marks.length) * 100) / 100;
}

// Generate subject input fields
function generateSubjectInputs(className) {
    const subjects = classSubjects[className] || [];
    const container = document.getElementById('subjectsContainer');
    
    if (subjects.length === 0) {
        container.innerHTML = '<p>Please select a class first.</p>';
        return;
    }

    let html = `
        <div class="subject-input">
            <h3>Enter Marks for Each Subject</h3>
            <div class="marks-header">
                <span>Subject</span>
                <span>Term (Obt/Total)</span>
                <span>Exam (Obt/Total)</span>
            </div>
    `;

    subjects.forEach(subject => {
        html += `
            <div class="subject-row">
                <label>${subject}:</label>
                <div class="pair-inputs">
                    <input type="number" min="0" class="term-obtained" data-subject="${subject}" placeholder="obtained" required>
                    <input type="number" min="0" class="term-total" data-subject="${subject}" placeholder="total" required>
                </div>
                <div class="pair-inputs">
                    <input type="number" min="0" class="exam-obtained" data-subject="${subject}" placeholder="obtained" required>
                    <input type="number" min="0" class="exam-total" data-subject="${subject}" placeholder="total" required>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// Generate result card HTML
function generateResultCard(formData) {
    const subjects = classSubjects[formData.class] || [];
    const totalMarks = parseFloat(formData.totalMarks) || 0;
    
    // Collect term and exam marks for each subject
    const subjectMarks = subjects.map(subject => {
        const termTotalEl = document.querySelector(`[data-subject="${subject}"].term-total`);
        const termObtEl = document.querySelector(`[data-subject="${subject}"].term-obtained`);
        const examTotalEl = document.querySelector(`[data-subject="${subject}"].exam-total`);
        const examObtEl = document.querySelector(`[data-subject="${subject}"].exam-obtained`);

        const termTotal = termTotalEl ? parseFloat(termTotalEl.value) || 0 : 0;
        const termObtained = termObtEl ? parseFloat(termObtEl.value) || 0 : 0;
        const examTotal = examTotalEl ? parseFloat(examTotalEl.value) || 0 : 0;
        const examObtained = examObtEl ? parseFloat(examObtEl.value) || 0 : 0;

        const termPercent = termTotal > 0 ? (termObtained / termTotal) * 100 : 0;
        const examPercent = examTotal > 0 ? (examObtained / examTotal) * 100 : 0;
        const combinedTotal = termTotal + examTotal;
        const combinedObtained = termObtained + examObtained;
        const averagePercent = combinedTotal > 0 ? (combinedObtained / combinedTotal) * 100 : 0;

        return {
            subject,
            termTotal,
            termObtained,
            termPercent,
            examTotal,
            examObtained,
            examPercent,
            averagePercent
        };
    });

    // Calculate overall statistics
    const totalTermObtained = subjectMarks.reduce((sum, item) => sum + item.termObtained, 0);
    const totalTermTotal = subjectMarks.reduce((sum, item) => sum + item.termTotal, 0);
    const totalExamObtained = subjectMarks.reduce((sum, item) => sum + item.examObtained, 0);
    const totalExamTotal = subjectMarks.reduce((sum, item) => sum + item.examTotal, 0);
    const grandObtained = totalTermObtained + totalExamObtained;
    const grandTotal = totalTermTotal + totalExamTotal;
    const overallPercentage = grandTotal > 0 ? (grandObtained / grandTotal) * 100 : 0;
    const overallGrade = calculateGrade(overallPercentage);

    // Calculate highest and lowest marks
    const averagePercents = subjectMarks.map(item => item.averagePercent);
    const highestMark = averagePercents.length ? Math.max(...averagePercents) : 0;
    const lowestMark = averagePercents.length ? Math.min(...averagePercents) : 0;
    const classHighest = Math.round(highestMark);
    const classLowest = Math.round(lowestMark);

    return `
        <div class="result-card-content">
            <!-- Header Section -->
            <div class="result-header">
                <div class="school-name-large">The Smart school</div>
            </div>

            <!-- Result Details -->
            <div class="result-details">
                <h3>Sample Result Card - Term ${formData.term}</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Campus Name:</label>
                        <span>${formData.campusName}</span>
                    </div>
                    <div class="detail-item">
                        <label>Academic Year:</label>
                        <span>20${formData.academicYear}, Term ${formData.term}</span>
                    </div>
                    <div class="detail-item">
                        <label>Class ${formData.class} Result Card</label>
                        <span></span>
                    </div>
                    <div class="detail-item">
                        <label>Name:</label>
                        <span>${formData.studentName}</span>
                    </div>
                    <div class="detail-item">
                        <label>Class/Section:</label>
                        <span>${formData.class}/${formData.section}</span>
                    </div>
                    <div class="detail-item">
                        <label>Roll No:</label>
                        <span>${formData.rollNo}</span>
                    </div>
                    <div class="detail-item">
                        <label>Total Marks:</label>
                        <span>${totalMarks}</span>
                    </div>
                </div>
            </div>

            <!-- Academic Performance -->
            <div class="academic-performance">
                <h3>Academic Performance</h3>
                <table class="performance-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Term (Obt/Total)</th>
                            <th>Exam (Obt/Total)</th>
                            <th>Average %</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subjectMarks.map(item => {
                            const grade = calculateGrade(item.averagePercent);
                            return `
                                <tr>
                                    <td>${item.subject}</td>
                                    <td>${item.termObtained} / ${item.termTotal} (${item.termPercent.toFixed(2)}%)</td>
                                    <td>${item.examObtained} / ${item.examTotal} (${item.examPercent.toFixed(2)}%)</td>
                                    <td>${item.averagePercent.toFixed(2)}%</td>
                                    <td>${grade}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>

                <table class="overall-summary">
                    <tr>
                        <th>Total Term</th>
                        <th>Total Exam</th>
                        <th>Overall %</th>
                        <th>Overall Grade</th>
                    </tr>
                    <tr>
                        <td>${totalTermObtained} / ${totalTermTotal}</td>
                        <td>${totalExamObtained} / ${totalExamTotal}</td>
                        <td>${overallPercentage.toFixed(2)}%</td>
                        <td>${overallGrade}</td>
                    </tr>
                    <tr>
                        <th>Class Highest %</th>
                        <th>Class Lowest %</th>
                        <th>Class Average %</th>
                        <th>Position in Class</th>
                    </tr>
                    <tr>
                        <td>${classHighest}%</td>
                        <td>${classLowest}%</td>
                        <td>${overallPercentage.toFixed(2)}%</td>
                        <td>-</td>
                    </tr>
                </table>
            </div>

            <!-- General Progress -->
            <div class="general-progress">
                <h3>General Progress</h3>
                <table class="progress-table">
                    <tr>
                        <th>Art</th>
                        <th>Attendance</th>
                        <th>Conduct</th>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <th>Effort</th>
                        <th>PE/Games</th>
                        <th>Punctuality</th>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table>
                <div class="grading-key">
                    <span>A = Excellent</span>
                    <span>B = Good</span>
                    <span>S = Satisfactory</span>
                    <span>NI = Needs Improvement</span>
                </div>
            </div>

            <!-- Co-Curricular Activities -->
            <div class="comments-section">
                <h3>Clubs, Societies & Other Co-Curricular Activities - Overall Comments</h3>
                <div class="comment-box"></div>
            </div>

            <!-- Values Education -->
            <div class="comments-section">
                <h3>Values Education - Overall Comments</h3>
                <div class="comment-box"></div>
            </div>

            <!-- Comments and Signatures -->
            <div class="comments-signatures">
                <div class="comment-line">
                    <label>Class Teacher's Comments:</label>
                    <span></span>
                </div>
                <div class="comment-line">
                    <label>School Head's Comments:</label>
                    <span></span>
                </div>
                <div class="signatures">
                    <div class="signature-item">
                        <div class="signature-line"></div>
                        <div class="signature-label">Class Teacher</div>
                    </div>
                    <div class="signature-item">
                        <div class="signature-line"></div>
                        <div class="signature-label">Campus Stamp</div>
                    </div>
                    <div class="signature-item">
                        <div class="signature-line"></div>
                        <div class="signature-label">Head of School</div>
                    </div>
                    <div class="signature-item">
                        <div class="signature-line"></div>
                        <div class="signature-label">Date</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Download PDF function
function downloadPDF() {
    const element = document.getElementById('resultCard');
    const opt = {
        margin: [0.2, 0.2, 0.2, 0.2],
        filename: 'student_result_card.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();
}

// Download DOCX function
async function downloadDOCX() {
    const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType } = docx;
    
    const resultCard = document.getElementById('resultCard');
    const studentName = document.getElementById('studentName').value;
    const className = document.getElementById('studentClass').value;
    
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Student Result Card - ${studentName}`,
                            bold: true,
                            size: 24
                        })
                    ],
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Class: ${className}`,
                            size: 18
                        })
                    ],
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "This is a generated result card from The Smart School Result Generator.",
                            size: 14
                        })
                    ],
                    alignment: AlignmentType.CENTER
                })
            ]
        }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `student_result_card_${studentName}.docx`);
}

// Print result function
function printResult() {
    window.print();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const studentClassSelect = document.getElementById('studentClass');
    const resultForm = document.getElementById('resultForm');

    // Handle class selection
    studentClassSelect.addEventListener('change', function() {
        const selectedClass = this.value;
        if (selectedClass) {
            generateSubjectInputs(selectedClass);
        } else {
            document.getElementById('subjectsContainer').innerHTML = '';
        }
    });

    // Handle form submission
    resultForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            studentName: document.getElementById('studentName').value,
            class: document.getElementById('studentClass').value,
            rollNo: document.getElementById('rollNo').value,
            totalMarks: document.getElementById('totalMarks').value,
            campusName: document.getElementById('campusName').value,
            academicYear: document.getElementById('academicYear').value,
            section: document.getElementById('section').value,
            term: document.getElementById('term').value
        };

        // Validate that all subject marks are entered (obtained <= total and totals > 0)
        const termTotals = document.querySelectorAll('.term-total');
        const termObtained = document.querySelectorAll('.term-obtained');
        const examTotals = document.querySelectorAll('.exam-total');
        const examObtained = document.querySelectorAll('.exam-obtained');
        let allMarksEntered = true;
        
        // Validate term totals and obtained
        termTotals.forEach((input, idx) => {
            const total = parseFloat(input.value);
            const obt = parseFloat(termObtained[idx].value);
            if (!input.value || total <= 0 || isNaN(total) || !termObtained[idx].value || isNaN(obt) || obt < 0 || obt > total) {
                allMarksEntered = false;
                input.style.borderColor = 'red';
                termObtained[idx].style.borderColor = 'red';
            } else {
                input.style.borderColor = '#e1e5e9';
                termObtained[idx].style.borderColor = '#e1e5e9';
            }
        });

        // Validate exam totals and obtained
        examTotals.forEach((input, idx) => {
            const total = parseFloat(input.value);
            const obt = parseFloat(examObtained[idx].value);
            if (!input.value || total <= 0 || isNaN(total) || !examObtained[idx].value || isNaN(obt) || obt < 0 || obt > total) {
                allMarksEntered = false;
                input.style.borderColor = 'red';
                examObtained[idx].style.borderColor = 'red';
            } else {
                input.style.borderColor = '#e1e5e9';
                examObtained[idx].style.borderColor = '#e1e5e9';
            }
        });

        if (!allMarksEntered) {
            alert('Please enter valid totals and obtained marks for all subjects. Obtained must be 0 to Total, and Totals must be greater than 0.');
            return;
        }

        // Show mobile loader for better UX
        const mobileLoader = document.getElementById('mobileLoader');
        if (window.innerWidth <= 768) {
            mobileLoader.style.display = 'flex';
        }
        
        // Generate result with slight delay for mobile
        setTimeout(() => {
            const resultCard = document.getElementById('resultCard');
            resultCard.innerHTML = generateResultCard(formData);
            
            // Hide loader
            mobileLoader.style.display = 'none';
            
            // Show result section
            document.getElementById('resultSection').style.display = 'block';
            
            // Scroll to result
            document.getElementById('resultSection').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }, window.innerWidth <= 768 ? 500 : 100);
    });

    // Handle form reset
    resultForm.addEventListener('reset', function() {
        document.getElementById('subjectsContainer').innerHTML = '';
        document.getElementById('resultSection').style.display = 'none';
    });
});

// Add some utility functions for better user experience
function validateTotal(input) {
    const total = parseFloat(input.value);
    const isValid = !isNaN(total) && total > 0;
    input.style.borderColor = isValid ? '#e1e5e9' : 'red';
    return isValid;
}

function validateObtained(input) {
    const obtained = parseFloat(input.value);
    const subject = input.getAttribute('data-subject');
    const isTerm = input.classList.contains('term-obtained');
    const totalSelector = isTerm ? `.term-total[data-subject="${subject}"]` : `.exam-total[data-subject="${subject}"]`;
    const totalInput = document.querySelector(totalSelector);
    const total = totalInput ? parseFloat(totalInput.value) : NaN;
    const isValid = !isNaN(obtained) && !isNaN(total) && total > 0 && obtained >= 0 && obtained <= total;
    input.style.borderColor = isValid ? '#e1e5e9' : 'red';
    if (totalInput) {
        totalInput.style.borderColor = (!isNaN(total) && total > 0) ? '#e1e5e9' : 'red';
    }
    return isValid;
}

// Add real-time validation for mark inputs
document.addEventListener('input', function(e) {
    const target = e.target;
    if (target.classList.contains('term-total') || target.classList.contains('exam-total')) {
        validateTotal(target);
        // Also revalidate the corresponding obtained field if present
        const subject = target.getAttribute('data-subject');
        const obtainedSelector = target.classList.contains('term-total') ? `.term-obtained[data-subject="${subject}"]` : `.exam-obtained[data-subject="${subject}"]`;
        const obtainedInput = document.querySelector(obtainedSelector);
        if (obtainedInput) validateObtained(obtainedInput);
    }
    if (target.classList.contains('term-obtained') || target.classList.contains('exam-obtained')) {
        validateObtained(target);
    }
});

// Mobile-specific enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input[type="number"], input[type="text"], select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '16px';
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '';
            }
        });
    });

    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layout after orientation change
            const resultSection = document.getElementById('resultSection');
            if (resultSection.style.display !== 'none') {
                resultSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    });

    // Add swipe gesture support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - could be used for navigation
                console.log('Swipe left detected');
            } else {
                // Swipe right - could be used for navigation
                console.log('Swipe right detected');
            }
        }
    }

    // Optimize for mobile performance
    if (window.innerWidth <= 768) {
        // Reduce animations on mobile for better performance
        document.body.style.setProperty('--transition-duration', '0.2s');
        
        // Add mobile-specific scroll behavior
        const smoothScrollElements = document.querySelectorAll('a[href^="#"]');
        smoothScrollElements.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}); 
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
            <h3>Enter Marks for Each Subject (out of 100)</h3>
    `;

    subjects.forEach(subject => {
        html += `
            <div class="subject-row">
                <label>${subject}:</label>
                <input type="number" min="0" max="100" class="subject-mark" data-subject="${subject}" placeholder="Enter marks" required>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// Generate result card HTML
function generateResultCard(formData) {
    const subjects = classSubjects[formData.class] || [];
    const marks = subjects.map(subject => {
        const input = document.querySelector(`[data-subject="${subject}"]`);
        return input ? parseFloat(input.value) || 0 : 0;
    });

    const averagePercentage = calculateAverage(marks);
    const overallGrade = calculateGrade(averagePercentage);

    // Calculate highest and lowest marks
    const highestMark = Math.max(...marks);
    const lowestMark = Math.min(...marks);
    const classHighest = Math.round(highestMark);
    const classLowest = Math.round(lowestMark);

    return `
        <div class="result-card-content">
            <!-- Header Section -->
            <div class="result-header">
                <div class="school-branding">
                    <div class="school-logo">@</div>
                    <div class="school-info">
                        <h2>The Smart School</h2>
                        <p>Tomorrow is our Destiny</p>
                        <p>A Project of The City School</p>
                    </div>
                </div>
                <div class="school-name-large">The Smart School</div>
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
                        <label>Age:</label>
                        <span>${formData.age}</span>
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
                            <th>Term %</th>
                            <th>Examination %</th>
                            <th>Average %</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subjects.map((subject, index) => {
                            const mark = marks[index];
                            const percentage = mark;
                            const grade = calculateGrade(percentage);
                            return `
                                <tr>
                                    <td>${subject}</td>
                                    <td>${percentage}%</td>
                                    <td>${percentage}%</td>
                                    <td>${percentage}%</td>
                                    <td>${grade}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>

                <table class="overall-summary">
                    <tr>
                        <th>Overall %</th>
                        <th>Overall Grade</th>
                        <th>Position in Class</th>
                    </tr>
                    <tr>
                        <td>${averagePercentage}%</td>
                        <td>${overallGrade}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <th>Class Highest %</th>
                        <th>Class Lowest %</th>
                        <th>Class Average %</th>
                    </tr>
                    <tr>
                        <td>${classHighest}%</td>
                        <td>${classLowest}%</td>
                        <td>${averagePercentage}%</td>
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
        margin: 1,
        filename: 'student_result_card.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
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
            age: document.getElementById('age').value,
            campusName: document.getElementById('campusName').value,
            academicYear: document.getElementById('academicYear').value,
            section: document.getElementById('section').value,
            term: document.getElementById('term').value
        };

        // Validate that all subject marks are entered
        const subjectInputs = document.querySelectorAll('.subject-mark');
        let allMarksEntered = true;
        
        subjectInputs.forEach(input => {
            if (!input.value || input.value < 0 || input.value > 100) {
                allMarksEntered = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#e1e5e9';
            }
        });

        if (!allMarksEntered) {
            alert('Please enter valid marks (0-100) for all subjects.');
            return;
        }

        // Generate and display result
        const resultCard = document.getElementById('resultCard');
        resultCard.innerHTML = generateResultCard(formData);
        
        // Show result section
        document.getElementById('resultSection').style.display = 'block';
        
        // Scroll to result
        document.getElementById('resultSection').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    // Handle form reset
    resultForm.addEventListener('reset', function() {
        document.getElementById('subjectsContainer').innerHTML = '';
        document.getElementById('resultSection').style.display = 'none';
    });
});

// Add some utility functions for better user experience
function validateMarks(input) {
    const value = parseFloat(input.value);
    if (value < 0 || value > 100) {
        input.style.borderColor = 'red';
        return false;
    } else {
        input.style.borderColor = '#e1e5e9';
        return true;
    }
}

// Add real-time validation for mark inputs
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('subject-mark')) {
        validateMarks(e.target);
    }
}); 
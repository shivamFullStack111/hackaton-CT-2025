export const DB_URL = "https://hackaton-ct-2025.onrender.com/api"



export const downloadQuizReportPDF = (resultData) => {
  if (!resultData) {
    alert("No result data found");
    return;
  }

  const {
    quizDetails,
    percentage,
    totalScore,
    totalQuestions,
    correctAnswers,
    passed,
    timeTaken,
    createdAt,
    questionAnswerExplanations = [],
    performance = {},
    rank,
    totalParticipants
  } = resultData;

  // Helper function to format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Calculate incorrect answers
  const incorrectAnswers = totalQuestions - correctAnswers;

  // Create HTML content
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz Report - ${quizDetails?.title || 'Quiz'}</title>
  <style>
    /* Basic Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f8f9fa;
      padding: 20px;
    }
    
    .report-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    /* Header */
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 28px;
      margin-bottom: 10px;
      font-weight: 600;
    }
    
    .header p {
      opacity: 0.9;
      font-size: 14px;
    }
    
    /* Main Content */
    .content {
      padding: 30px;
    }
    
    /* Quiz Info */
    .quiz-info {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eaeaea;
    }
    
    .quiz-title {
      font-size: 24px;
      color: #2d3748;
      margin-bottom: 10px;
      font-weight: 600;
    }
    
    .quiz-meta {
      display: flex;
      gap: 20px;
      color: #718096;
      font-size: 14px;
      margin-bottom: 15px;
    }
    
    .status-badge {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
      background: ${passed ? '#c6f6d5' : '#fed7d7'};
      color: ${passed ? '#22543d' : '#742a2a'};
    }
    
    /* Stats Cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    
    .stat-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .stat-value {
      font-size: 36px;
      font-weight: 700;
      color: #4a5568;
      margin-bottom: 5px;
    }
    
    .stat-value.score {
      color: ${passed ? '#38a169' : '#e53e3e'};
    }
    
    .stat-label {
      color: #718096;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    /* Performance Section */
    .section-title {
      font-size: 20px;
      color: #2d3748;
      margin: 30px 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
      font-weight: 600;
    }
    
    .metrics {
      background: #f7fafc;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
    }
    
    .metric-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .metric-row:last-child {
      border-bottom: none;
    }
    
    .metric-name {
      color: #4a5568;
      font-weight: 500;
    }
    
    .metric-value {
      color: #2d3748;
      font-weight: 600;
    }
    
    /* Questions Table */
    .questions-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 14px;
    }
    
    .questions-table th {
      background: #f7fafc;
      color: #4a5568;
      text-align: left;
      padding: 12px 15px;
      font-weight: 600;
      border-bottom: 2px solid #e2e8f0;
    }
    
    .questions-table td {
      padding: 12px 15px;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .questions-table tr:last-child td {
      border-bottom: none;
    }
    
    .correct {
      color: #38a169;
      font-weight: 600;
    }
    
    .incorrect {
      color: #e53e3e;
      font-weight: 600;
    }
    
    .question-number {
      color: #4a5568;
      font-weight: 600;
      width: 50px;
    }
    
    /* Answer Columns */
    .answer-cell {
      max-width: 200px;
      word-wrap: break-word;
    }
    
    /* Summary Section */
    .summary {
      background: ${passed ? '#f0fff4' : '#fff5f5'};
      border: 1px solid ${passed ? '#c6f6d5' : '#fed7d7'};
      border-radius: 10px;
      padding: 20px;
      margin: 30px 0;
    }
    
    .summary-title {
      color: ${passed ? '#22543d' : '#742a2a'};
      font-size: 18px;
      margin-bottom: 15px;
      font-weight: 600;
    }
    
    .summary-content {
      color: #4a5568;
      line-height: 1.8;
    }
    
    .improvement-list {
      list-style-position: inside;
      margin-top: 10px;
    }
    
    .improvement-list li {
      margin: 5px 0;
      padding-left: 10px;
    }
    
    /* Footer */
    .footer {
      text-align: center;
      padding: 20px;
      color: #718096;
      font-size: 14px;
      border-top: 1px solid #eaeaea;
      margin-top: 30px;
    }
    
    .footer p {
      margin: 5px 0;
    }
    
    /* Print Styles */
    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .report-container {
        box-shadow: none;
        border-radius: 0;
      }
      
      .header {
        background: #667eea !important;
        -webkit-print-color-adjust: exact;
      }
      
      .stat-card {
        break-inside: avoid;
      }
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .quiz-meta {
        flex-direction: column;
        gap: 5px;
      }
      
      .questions-table {
        display: block;
        overflow-x: auto;
      }
    }
  </style>
</head>
<body>
  <div class="report-container">
    <!-- Header -->
    <div class="header">
      <h1>Quiz Result Report</h1>
      <p>SkillSync Learning Platform • Performance Analysis</p>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <!-- Quiz Information -->
      <div class="quiz-info">
        <h2 class="quiz-title">${quizDetails?.title || 'Quiz Report'}</h2>
        <div class="quiz-meta">
          <span>Date: ${new Date(createdAt).toLocaleDateString()}</span>
          <span>Topic: ${quizDetails?.topic || 'General Knowledge'}</span>
          <span>Difficulty: ${quizDetails?.difficulty || 'Medium'}</span>
        </div>
        <div class="status-badge">
          ${passed ? '✅ PASSED' : '❌ FAILED'} • Score: ${percentage}%
        </div>
      </div>
      
      <!-- Stats Overview -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value score">${percentage}%</div>
          <div class="stat-label">Overall Score</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">${correctAnswers}/${totalQuestions}</div>
          <div class="stat-label">Correct Answers</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">${formatTime(timeTaken)}</div>
          <div class="stat-label">Time Taken</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">${totalScore}</div>
          <div class="stat-label">Total Marks</div>
        </div>
      </div>
      
      <!-- Performance Metrics -->
      <h3 class="section-title">Performance Details</h3>
      <div class="metrics">
        <div class="metric-row">
          <span class="metric-name">Accuracy Rate</span>
          <span class="metric-value">${performance.accuracy || 0}%</span>
        </div>
        
        <div class="metric-row">
          <span class="metric-name">Correct Answers</span>
          <span class="metric-value">${correctAnswers} out of ${totalQuestions}</span>
        </div>
        
        <div class="metric-row">
          <span class="metric-name">Incorrect Answers</span>
          <span class="metric-value">${incorrectAnswers}</span>
        </div>
        
        <div class="metric-row">
          <span class="metric-name">Average Speed</span>
          <span class="metric-value">${performance.speed || 0} questions/minute</span>
        </div>
        
        ${rank && totalParticipants ? `
        <div class="metric-row">
          <span class="metric-name">Rank</span>
          <span class="metric-value">${rank} out of ${totalParticipants}</span>
        </div>
        ` : ''}
      </div>
      
      <!-- Question-by-Question Analysis -->
      <h3 class="section-title">Question Analysis</h3>
      <table class="questions-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${questionAnswerExplanations.map((question, index) => `
            <tr>
              <td class="question-number">${index + 1}</td>
              <td class="answer-cell">${question.question}</td>
              <td class="answer-cell">${question.userAnswer || 'Not answered'}</td>
              <td class="answer-cell">${question.correctAnswer}</td>
              <td class="${question.isCorrect ? 'correct' : 'incorrect'}">
                ${question.isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <!-- Summary & Recommendations -->
      <div class="summary">
        <h4 class="summary-title">${passed ? 'Performance Summary' : 'Areas for Improvement'}</h4>
        <div class="summary-content">
          <p>
            You ${passed ? 'successfully passed' : 'did not pass'} the quiz with a score of ${percentage}%.
            ${passed ? 
              'Great work! Your understanding of the material is solid.' :
              'Review the questions you got wrong to improve your score.'
            }
          </p>
          
          ${performance.improvementAreas && performance.improvementAreas.length > 0 ? `
          <p style="margin-top: 10px; font-weight: 500;">Focus on these areas:</p>
          <ul class="improvement-list">
            ${performance.improvementAreas.map(area => `<li>${area}</li>`).join('')}
          </ul>
          ` : ''}
          
          <p style="margin-top: 15px;">
            <strong>Recommendations:</strong>
            ${passed ?
              'Continue practicing to maintain your knowledge. Try more advanced quizzes.' :
              'Review the material and retake this quiz after studying.'
            }
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <p>Report generated by SkillSync Learning Platform</p>
        <p>${new Date().toLocaleDateString()} • ${new Date().toLocaleTimeString()}</p>
        <p style="margin-top: 10px; font-size: 12px; color: #a0aec0;">
          This report is for personal reference. Scores may vary in different attempts.
        </p>
      </div>
    </div>
  </div>
  
  <script>
    // Auto-print after load
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 1000);
    };
  </script>
</body>
</html>
`;

  // Create a new window and write HTML
  const printWindow = window.open('', '_blank');
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  
  // Return the HTML for potential other uses
  return html;
};

// Export both methods
export default {
  downloadQuizReportPDF,
  
};
// Tách văn bản thành các phần dựa trên tiêu đề "KỸ NĂNG:"
export function splitTextBySections(text) {
  const sections = text.split(/\nKỸ NĂNG:/);
  return sections.slice(1); // Bỏ qua phần trống đầu tiên nếu có
}

// Xử lý mỗi phần và trích xuất thông tin liên quan
export function processSections(sections) {
  const formattedSections = {};
  sections.forEach(section => {
      const skillType = section.match(/^[\s\S]*?\n/)[0].trim();
      let type;
      let content;
      if (skillType === "NGHE HIỂU") {
          type = "Listening";
          content = extractListening(section);

      }
      else if (skillType === "ĐỌC HIỂU") {
          type = "Reading";
          content = extractReading(section);
      }
      else if (skillType === "NÓI") {
          type = "Speaking";
          content = extractSpeaking(section);
      }
      else if (skillType === "VIẾT") {
          type = "Writing";
          content = extractWriting(section);
      }
      formattedSections[type] = content;
  });
  return formattedSections;
}

// Hàm trích xuất câu hỏi từ một phần văn bản
export function extractListening(text) {
  // Biểu thức chính quy để tìm câu hỏi và các đáp án liên tiếp
  const questionRegex = /Câu hỏi \d+\.\s*(.*?)\n([A-D]\..*?)(?=\nCâu hỏi \d+|\n----- Hết)/gs;

  // Mảng để lưu trữ các câu hỏi và đáp án
  let extractedData = [];

  // Biến để lưu các kết quả tìm kiếm
  let match;

  // Biến để lưu thứ tự câu hỏi
  let idx = 1;

  // Duyệt qua tất cả các kết quả tìm được
  while ((match = questionRegex.exec(text)) !== null) {
      // Lấy câu hỏi
      const question = match[1].trim().split(`\nCâu hỏi ${++idx}`)[0];

      // Lấy đáp án và chia nó thành từng dòng
      const answers = match[0].trim().split('\n').map(line => line.trim()).filter(line => line.match(/^[A-D]\./));

      // Thêm câu hỏi và đáp án vào mảng
      extractedData.push({ question, answers });
  }

  return extractedData;
}

export function extractSpeaking(text) {
  // Biểu thức chính quy để tìm bài số
  const questionRegex = /Bài số \d+\.\s*(.*?)(?=\nBài số \d+|\n----- Hết)/gs;

  //Mảng để lưu trữ các bài số trong kĩ năng nói
  let extractedData = [];

  // Biến để lưu thứ tự câu hỏi
  let idx = 1;

  let match;

  // Duyệt qua tất cả các kết quả tìm được
  while ((match = questionRegex.exec(text)) !== null) {
      // Lấy câu hỏi
      console.log(match);
      const question = match[1].trim().split(`\nBài số ${++idx}`)[0];
      extractedData.push({ question: question });
  }

  return extractedData;
}

export function extractWriting(text) {
  // Biểu thức chính quy để tìm kiếm mỗi "Bài số" và nội dung liên quan
  const sectionRegex = /Bài số (\d+):\s*(.*?)(?=\nBài số \d+|$)/gs;

  // Mảng để lưu trữ các bài viết
  let extractedData = [];

  let match;
  // Duyệt qua tất cả các kết quả tìm được từ regex
  while ((match = sectionRegex.exec(text)) !== null) {
      // Lấy số bài và mô tả bài
      const content = match[2].trim();

      // Tìm các từ để chọn nếu có
      const wordsMatch = content.match(/Các từ để chọn\s*(.*)/s);
      let words = [];
      if (wordsMatch) {
          // Tách các từ và lưu vào mảng
          words = wordsMatch[1].trim().split(/,\s*/);
      }

      // Thêm vào mảng kết quả
      extractedData.push({
          description: content.replace(/Các từ để chọn\s*.*$/s, '').trim(), // Loại bỏ phần các từ để chọn khỏi mô tả
          words: words
      });
  }

  return extractedData;
}

export function extractReading(text) {
  // Regex tách ra từng bài đọc bao gồm tiêu đề và nội dung
  const readingRegex = /Bài số \d+: (.*?)\n(.*?)(?=Bài số \d+|----- Hết)/gs;
  let extractedData = [];

  let match;
  let idx = 0;
  // Duyệt qua từng phần tử khớp với regex
  while ((match = readingRegex.exec(text)) !== null) {
      const sectionTitle = match[1].trim();
      const sectionContent = match[2].trim();

      // Lưu trữ các câu hỏi và câu trả lời
      let questions = [];
      const questionRegex = /Câu hỏi (\d+)\. (.*?)(?=\nCâu hỏi \d+|$)/gs;
      let questionMatch;
      let lastIndex = 0;

      while ((questionMatch = questionRegex.exec(sectionContent)) !== null) {
          const questionText = questionMatch[2];
          const questionParts = questionText.split('\n');
          const question = questionParts[0].trim();
          const answers = questionMatch[0].trim().split('\n').map(line => line.trim()).filter(line => line.match(/^[A-D]\./));

          const contentEnd = questionMatch.index;
          const content = sectionContent.substring(lastIndex, contentEnd).trim();
          lastIndex = questionRegex.lastIndex;

          questions.push({
              content: content,
              question: question,
              answers: answers
          });
      }

      const content = questions.filter(question => {
          return question.content !== "" && question.content;
      });

      // Thêm vào mảng kết quả
      extractedData.push({
          content: content[0].content,
          title: sectionTitle,
          questions: questions
      });
  }

  return extractedData;
}

// Main function to handle the workflow
export async function processPDF(text) {
  // console.log("Extracted Text: ", text); // In ra 500 ký tự đầu tiên để kiểm tra
  const sections = splitTextBySections(text);
  const formattedQuestions = processSections(sections);
  const results = JSON.stringify(formattedQuestions, null, 2);
  return results;
}

export function extractAnswers(text) {
  const sections = text.split('KỸ NĂNG:');
  let results = [];

  sections.forEach(section => {
      if (section.trim() !== '') {
          const lines = section.split('\n');
          const sectionType = lines[0].trim(); // Lấy loại kỹ năng
          let type;
          const answers = [];

          for (let i = 1; i < lines.length; i++) {
              const line = lines[i].trim();
              if (line !== '') {
                  const parts = line.split('.');
                  if (parts.length > 1) {
                      answers.push(parts[1].trim());
                  }
              }
          }
          if (sectionType === 'NGHE HIỂU') {
              type = 'listening'
          }
          if (sectionType === 'ĐỌC HIỂU') {
              type = 'reading'
          }
          if (sectionType === 'VIẾT') {
              type = 'writing'
          }

          results.push({
              sectionType: type,
              results: answers
          });
      }
  });

  return results;
}
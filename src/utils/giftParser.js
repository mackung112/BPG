export const parseQuestions = (text) => {
  const lines = text.split('\n');
  let noComments = [];
  for (let line of lines) {
    const idx = line.indexOf('//');
    if (idx !== -1) {
      noComments.push(line.substring(0, idx).trim());
    } else {
      noComments.push(line.trim());
    }
  }
  const cleanText = noComments.join('\n');

  const questionRegex = /([^{]+)\{([^}]+)\}/g;
  let match;
  const parsed = [];

  while ((match = questionRegex.exec(cleanText)) !== null) {
    let qText = match[1].trim();
    qText = qText.replace(/\\([=~{}])/g, '$1');

    const body = match[2].trim();
    let currentToken = '';
    let isCorrect = false;
    const choices = [];
    let correctAnswerIndex = 0;

    for (let i = 0; i < body.length; i++) {
      const char = body[i];
      if (char === '\\' && i + 1 < body.length && ['=','~','{','}'].includes(body[i+1])) {
        currentToken += body[i+1];
        i++;
      } else if (char === '=' || char === '~') {
        if (currentToken.trim()) {
          choices.push({ text: currentToken.trim(), is_correct: isCorrect });
          if (isCorrect) correctAnswerIndex = choices.length - 1;
        }
        currentToken = '';
        isCorrect = (char === '=');
      } else {
        currentToken += char;
      }
    }
    if (currentToken.trim()) {
      choices.push({ text: currentToken.trim(), is_correct: isCorrect });
      if (isCorrect) correctAnswerIndex = choices.length - 1;
    }

    if (qText && choices.length > 0) {
      parsed.push({
        question_text: qText,
        choices: choices,
        correct_answer_index: correctAnswerIndex
      });
    }
  }
  return parsed;
};

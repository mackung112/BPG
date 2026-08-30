const fs = require('fs');
const path = require('path');

const filePath = path.join('d:', 'BPG', 'src', 'pages', 'admin', 'TeacherSubjects.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Imports
content = content.replace("import ReactMarkdown from 'react-markdown';\n", "");
content = content.replace("import remarkGfm from 'remark-gfm';\n", "");
content = content.replace("import SubjectAIAssistant from '../../components/admin/SubjectAIAssistant';\n", "");
content = content.replace(", Sparkles, Eye, Code }", " }");

// 2. State variables
content = content.replace("  const [showAIAssistant, setShowAIAssistant] = useState(false);\n", "");
content = content.replace("  const [isPreviewSyllabus, setIsPreviewSyllabus] = useState(false);\n", "");

// 3. handleSaveEdit removals
content = content.replace(/,\s*syllabus_markdown:\s*editData\.syllabus_markdown/, "");

content = content.replace(/ setShowAIAssistant\(false\); /g, " ");
content = content.replace(/; setShowAIAssistant\(false\)/g, "");
content = content.replace(/ setShowAIAssistant\(false\)/g, "");
content = content.replace(/setShowAIAssistant\(false\);/g, "");

// 4. Remove JSX sections
const startStr = /<div>\s*<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">/;
const endStr = /<\/SubjectAIAssistant>\s*<\/div>\s*\)\}\s*<\/div>\s*<\/div>/;

const pattern1 = new RegExp(startStr.source + '[\\s\\S]*?' + endStr.source);
content = content.replace(pattern1, '');

const pattern2 = /\{\s*subject\.syllabus_markdown && \(\s*<div className="mt-4 border-t pt-4">[\s\S]*?<\/div>\s*\)\}/;
content = content.replace(pattern2, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Done');

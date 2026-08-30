import sys
import re

file_path = r'd:\BPG\src\pages\admin\TeacherSubjects.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
content = content.replace("import ReactMarkdown from 'react-markdown';\n", "")
content = content.replace("import remarkGfm from 'remark-gfm';\n", "")
content = content.replace("import SubjectAIAssistant from '../../components/admin/SubjectAIAssistant';\n", "")
content = content.replace(", Sparkles, Eye, Code }", " }")

# 2. State variables
content = content.replace("  const [showAIAssistant, setShowAIAssistant] = useState(false);\n", "")
content = content.replace("  const [isPreviewSyllabus, setIsPreviewSyllabus] = useState(false);\n", "")

# 3. handleSaveEdit removals
# Remove syllabus_markdown from updates
content = re.sub(r',\s*syllabus_markdown:\s*editData\.syllabus_markdown', '', content)

# Remove setShowAIAssistant(false) calls
content = content.replace(" setShowAIAssistant(false); ", " ")
content = content.replace("; setShowAIAssistant(false)", "")
content = content.replace(" setShowAIAssistant(false)", "")
content = content.replace("setShowAIAssistant(false);", "")


# 4. Remove JSX sections

# Find the block starting with the syllabus preview section
start_str = r'<div>\s*<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">'
end_str = r'</SubjectAIAssistant>\s*</div>\s*\)\}\s*</div>\s*</div>'

pattern1 = re.compile(start_str + r'.*?' + end_str, re.DOTALL)
content = re.sub(pattern1, '', content)

# Remove the view mode markdown
pattern2 = re.compile(r'\{\s*subject\.syllabus_markdown && \(\s*<div className="mt-4 border-t pt-4">.*?</div>\s*\)\}', re.DOTALL)
content = re.sub(pattern2, '', content)

# Fix empty setEditingId cleanup
content = content.replace("{ setEditingId(null); setEditData(null);  }", "{ setEditingId(null); setEditData(null); }")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')

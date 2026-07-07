/**
 * SQLSyntaxEngine - SQL Syntax Highlighting Utility
 * Provides static highlight() method for SQL code strings.
 * Returns HTML string with syntax-colored spans.
 */
export const SQLSyntaxEngine = {
  highlight(sql) {
    if (!sql) return '';

    // Escape HTML first
    let escaped = sql
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // SQL Keywords (DDL/DML/DCL)
    const keywords = [
      'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'TRUNCATE TABLE',
      'ADD COLUMN', 'DROP COLUMN', 'MODIFY COLUMN', 'RENAME COLUMN',
      'IF EXISTS', 'IF NOT EXISTS',
      'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES', 'UNIQUE', 'INDEX',
      'ON DELETE CASCADE', 'ON DELETE RESTRICT', 'ON DELETE SET NULL',
      'ON UPDATE CASCADE', 'ON UPDATE RESTRICT',
      'NOT NULL', 'NULL', 'DEFAULT', 'AUTO_INCREMENT',
      'INSERT INTO', 'VALUES', 'SELECT', 'FROM', 'WHERE',
      'UPDATE', 'SET', 'DELETE FROM',
      'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT',
      'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'ON',
      'AND', 'OR', 'IN', 'BETWEEN', 'LIKE', 'IS',
      'AS', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
      'SHOW', 'DESCRIBE', 'DESC', 'ASC',
      'FIRST', 'AFTER', 'TO',
      'CONSTRAINT', 'CHECK', 'ENGINE', 'CHARSET',
      'CURRENT_TIMESTAMP', 'NOW\\(\\)',
    ];

    // Data types
    const types = [
      'INT', 'INTEGER', 'BIGINT', 'SMALLINT', 'TINYINT', 'MEDIUMINT',
      'FLOAT', 'DOUBLE', 'DECIMAL',
      'VARCHAR\\(\\d+\\)', 'CHAR\\(\\d+\\)', 'TEXT', 'MEDIUMTEXT', 'LONGTEXT',
      'DATE', 'DATETIME', 'TIMESTAMP', 'TIME', 'YEAR',
      'BOOLEAN', 'BOOL', 'ENUM', 'BLOB',
      'DECIMAL\\(\\d+,\\s*\\d+\\)',
    ];

    // Process comments first (-- line comments)
    escaped = escaped.replace(/(--[^\n]*)/g, '<span style="color:#5c6370;font-style:italic">$1</span>');

    // Process strings ('...')
    escaped = escaped.replace(/('(?:[^'\\]|\\.)*')/g, '<span style="color:#98c379">$1</span>');

    // Process numbers (standalone)
    escaped = escaped.replace(/\b(\d+)\b/g, (match, num, offset, str) => {
      // Don't highlight numbers inside already-processed spans or VARCHAR(n)
      const before = str.substring(Math.max(0, offset - 30), offset);
      if (before.includes('style=') || before.includes('color:') || before.includes('VARCHAR') || before.includes('CHAR') || before.includes('DECIMAL')) {
        return match;
      }
      return `<span style="color:#d19a66">${num}</span>`;
    });

    // Process data types (before keywords to avoid conflicts)
    types.forEach(type => {
      const regex = new RegExp(`\\b(${type})\\b`, 'gi');
      escaped = escaped.replace(regex, (match, offset) => {
        // Skip if inside a span already
        if (typeof offset === 'string') return match;
        return `<span style="color:#e5c07b">${match}</span>`;
      });
    });

    // Process keywords (longest first to avoid partial matches)
    const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
    sortedKeywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
      escaped = escaped.replace(regex, (match) => {
        // Check if it's already inside a span
        return `<span style="color:#c678dd;font-weight:600">${match}</span>`;
      });
    });

    // Process identifiers after keywords (table/column names not caught above)
    // Punctuation
    escaped = escaped.replace(/([();,])/g, '<span style="color:#abb2bf">$1</span>');

    // Convert newlines to <br>
    escaped = escaped.replace(/\n/g, '<br>');

    return escaped;
  }
};

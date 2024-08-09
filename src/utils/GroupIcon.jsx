export function groupIcon(input) {
    input = input.trim();
  
    const words = input.split(/\s+/);
  
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    } else if (words.length === 2) {
      return words.map(word => word[0].toUpperCase()).join('');
    } else if (words.length > 2) {
      return words.slice(0, 2).map(word => word[0].toUpperCase()).join('');
    } else {
      return '';
    }
  }
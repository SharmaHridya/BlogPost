export function stripHtml(value = '') {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function estimateReadingTime(content = '') {
    const wordCount = stripHtml(content).split(' ').filter(Boolean).length;
    return `${Math.max(1, Math.ceil(wordCount / 220))} min read`;
}

export function formatPostDate(value) {
    if (!value) return 'Recently published';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Recently published';

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
}

export function getInitials(value = 'Writer') {
    return value
        .split(' ')
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'W';
}

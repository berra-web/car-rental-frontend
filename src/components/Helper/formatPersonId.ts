export const formatPersonId = (personId: string): string => {
    const cleaned = personId.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return cleaned.slice(0, 6) + '-' + cleaned.slice(6);
    }
    return personId;
};
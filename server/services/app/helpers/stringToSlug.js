module.exports = function stringToSlug(str) {
    return str
        .toLowerCase()
        .normalize('NFD') // normalize string
        .replace(/[\u0300-\u036f]/g, '') // remove diacritics
        .replace(/[^a-z0-9 ]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // replace multiple hyphens with a single one
}
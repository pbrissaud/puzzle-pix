export const upperFirstLetter = (phrase: string) => {
    return phrase.split(" ").map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
};

export const extractCapitals = (phrase: string, length = 2) => {
    return phrase
        .split(" ")
        .slice(0, length)
        .map((word) => word[0])
        .join("");
};

export const formatName = (name: string) => {
    // replace space with dash
    // replace non-alphanumeric characters with ASCII equivalent
    return name
        .trim()
        .replace(/ /g, "-")
        .replace(/[^a-zA-Z0-9-]/g, (char) => {
            return char.charCodeAt(0).toString();
        })
        .toLowerCase();
};

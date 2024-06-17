export const extractCapitals = (phrase: string, length = 2) => {
    return phrase
        .split(" ")
        .slice(0, length)
        .map((word) => word[0])
        .join("");
};

export function formatBytes(
    bytes: number,
    opts: {
        decimals?: number
        sizeType?: "accurate" | "normal"
    } = {}
) {
    const {decimals = 0, sizeType = "normal"} = opts

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
    if (bytes === 0) return "0 Byte"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
        sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
    }`
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}
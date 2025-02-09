export const formatNoTelepon = (value) => {
    if (typeof value !== "string") return "";
    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length === 0) {
        return "";
    } else if (cleanedValue.length === 1 && cleanedValue[0] !== "0") {
        return "";
    }
    if (!cleanedValue.startsWith("0")) {
        return "";
    }

    const safeValue = cleanedValue.substring(0, 13);

    return safeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

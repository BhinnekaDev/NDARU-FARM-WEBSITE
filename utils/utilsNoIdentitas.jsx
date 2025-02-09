export const formatNoIdentitas = (value) => {
    if (typeof value !== "string") return "";
    const cleanedValue = value.replace(/\D/g, "");
    const safeValue = cleanedValue.substring(0, 16);
    return safeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

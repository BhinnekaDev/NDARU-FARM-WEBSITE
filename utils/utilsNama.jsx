export const formatNama = (value) => {
    if (typeof value !== "string") return "";
    const cleanValue = value.replace(/[^a-zA-Z\s]/g, "");
    return cleanValue.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

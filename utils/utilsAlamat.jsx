export const formatAlamat = (value) => {
    const Alamat = value.replace(/[^a-zA-Z0-9\s.,/]/g, "");
    const escapeHtml = (str) => {
        return str.replace(/[&<>"']/g, (char) => {
            switch (char) {
                case "&":
                    return "&amp;";
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case '"':
                    return "&quot;";
                case "'":
                    return "&#39;";
                default:
                    return char;
            }
        });
    };

    return escapeHtml(Alamat);
};

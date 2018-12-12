const base64js = require('base64-js');

export const Base64Decode = (str, encoding = 'utf-8') => {
    const bytes = base64js.toByteArray(str);
    return new (TextDecoder)(encoding).decode(bytes);
};

export const isEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
export const required = (v) => v !== undefined && v !== null && String(v).trim() !== '';

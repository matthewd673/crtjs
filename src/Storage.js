import { Buffer } from 'buffer';

export const loadObject = (name) => {
  const objString = localStorage.getItem(name);
  if (objString === null) {
    return null; // TODO: does this really need to be handled?
  }
  return JSON.parse(objString);
}

export const saveObject = (name, obj) => {
  const jsonString = JSON.stringify(obj);
  localStorage.setItem(name, jsonString);
}

export const promptDownloadText = (text, filename) => {
  const blob = new Blob([text], { type: 'application/javascript'});
  const url = window.URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export const generateShareUrl = (text) => {
  const urlTemplate = 'http://mattdaly.xyz/crt/?share=';
  const b64 = encodeURIComponent(Buffer.from(text).toString('base64'));
  return urlTemplate + b64;
}

export const decodeB64 = (b64) => {
  return Buffer.from(decodeURIComponent(b64), 'base64').toString('utf-8');
}
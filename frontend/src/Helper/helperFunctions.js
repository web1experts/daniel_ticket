function isValidValue(value) {
  const invalidValues = [undefined, null, '', 'undefined', 'null'];

  // Check direct matches
  if (invalidValues.includes(value)) return false;

  // Check empty array
  if (Array.isArray(value) && value.length === 0) return false;

  return true;
}


function isArray(value) {
  return Array.isArray(value);
}


// src/utils/classNames.js
function classNames(...args) {
  return args.filter(Boolean).join(' ');
}


// src/utils/slugify.js
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

// src/utils/sleep.js
function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// src/utils/debounce.js
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}


// src/utils/truncateText.js
function truncateText(text, maxLength = 100) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}


// src/utils/capitalize.js
function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// // src/utils/validateEmail.js
// function validateEmail(email) {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(email);
// }



const Email = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); 

export const removeExtraSpaces = (string) => {
    return string.replace(/\s{2,}/g, ' ').trim()
}

export const notValid = string => {
  return [null, undefined, 'null', 'undefined', ''].includes(removeExtraSpaces(string))
}

export function checkHTML (param){
  return new RegExp(/(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/gm).test(param)
}

export function convertToPlainText(html){
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, 'text/html');
  return parsedDocument.body.textContent || '';
};

export const validateNumber = (value) => {
  if (!value) return value;
  const number = value.replace(/[^\d]/g, '');
  return number;
}

export const capitalizeFirstLetterEachWord = (str) => {
    if(!str) return '';
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const valid = string => {
    const check = [null, undefined, 'null', 'undefined', ''] ; 
    if(!check.includes(string)){
        return true
    }else{
        return false
    }
    
}



export const emailValidation = email => Email.test(email);




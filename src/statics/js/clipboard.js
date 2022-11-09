/**
 * Copyright (c) 2017 - 2018 - Yev Vlasenko
 */
/* eslint-disable */

function clipboard (input) {
  var textarea = document.createElement("textarea");
  var value;

  if (typeof input !== "string") {
    try {
      value = JSON.stringify(input);
    } catch (e) {
      throw 'Failed to copy value to clipboard. Unknown type.'
    }
  } else {
    value = input;
  }

  textarea.value = input;
  textarea.setAttribute("value",input);
  textarea.setAttribute("readonly", "");
  textarea.style = 'position:fixed;pointer-events:none;z-index:-9999;opacity:0;';

  document.body.appendChild(textarea);

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = textarea.contentEditable;
    var readOnly = textarea.readOnly;

    textarea.contentEditable = true;
    textarea.readOnly = true;

    var range = document.createRange();

    range.selectNodeContents(textarea);

    var selection = window.getSelection();

    selection.removeAllRanges();
    selection.addRange(range);
    textarea.setSelectionRange(0, 999999);

    textarea.contentEditable = editable;
    textarea.readOnly = readOnly;
  } else {
    textarea.select();
  }

  var success = false;

  try {
    success = document.execCommand("copy");
  } catch (err) {
    console.log(err);
  }

  document.body.removeChild(textarea);

  return success;
};
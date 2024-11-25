(function () {
	'use strict';

	const niceList = array => {
	  if (!array || array.length === 0) {
	    return '';
	  }
	  var clone = array.slice(0);
	  return function build() {
	    if (clone.length === 1) {
	      return clone[0];
	    }
	    if (clone.length === 2) {
	      return clone[0] + ' and ' + clone[1];
	    }
	    return clone.shift() + ', ' + build();
	  }();
	};

	const formatGear = gearArray => {
	  return niceList(gearArray);
	};
	const arrayTrim = array => {
	  const newArray = [];
	  for (const item of array) {
	    newArray.push(item.trim());
	  }
	  return newArray;
	};
	const getCheckedRadio = groupName => {
	  const radioEls = document.querySelectorAll(`input[name="${groupName}"]`);
	  for (const radioEl of radioEls) {
	    if (radioEl.checked) {
	      return radioEl.value;
	    }
	  }
	  return '';
	};
	const getFormData = () => {
	  const theForm = document.querySelector('form');
	  const md = {};
	  md.name = theForm.querySelector('#name').value.trim();
	  md.level = theForm.querySelector('#level').value.trim();
	  md.gender = getCheckedRadio('gender');
	  md.raceModifier = getCheckedRadio('raceModifier');
	  const raceValue = theForm.querySelector('#races').value.trim();
	  if (raceValue === '') {
	    md.races = ['Human'];
	  } else {
	    md.races = arrayTrim(theForm.querySelector('#races').value.split('\n'));
	  }
	  md.classModifier = getCheckedRadio('classModifier');
	  const classesValue = theForm.querySelector('#classes').value.trim();
	  if (classesValue === '') {
	    md.classes = undefined;
	  } else {
	    md.classes = arrayTrim(theForm.querySelector('#classes').value.split('\n'));
	  }
	  const gearValue = theForm.querySelector('#gear').value.trim();
	  if (gearValue === '') {
	    md.gear = undefined;
	  } else {
	    md.gear = arrayTrim(theForm.querySelector('#gear').value.split('\n'));
	  }
	  md.steed = theForm.querySelector('#steed').value.trim();
	  md.foe = theForm.querySelector('#foe').value.trim();
	  console.log(md);
	  return md;
	};
	const createOutputFromForm = () => {
	  const formData = getFormData();
	  console.log(formData);
	  const outputDiv = document.createElement('div');
	  outputDiv.id = 'generated-output';
	  let htmlStr = '';
	  htmlStr += `<p>`;
	  htmlStr += `The winner was <strong>${formData.name}</strong>, a`;
	  htmlStr += ` level ${formData.level} `;
	  htmlStr += ` ${formData.gender}`;
	  if (formData.raceModifier) {
	    htmlStr += ` ${formData.raceModifier}`;
	  }
	  htmlStr += ` ${formData.races.join('/')}`;
	  if (formData.classModifier) {
	    htmlStr += ` ${formData.classModifier}`;
	  }
	  if (formData.classes) {
	    htmlStr += ` ${formData.classes.join('/')}`;
	  }
	  if (formData.gear) {
	    htmlStr += `, using their ${formatGear(formData.gear)}`;
	  }
	  if (formData.steed) {
	    htmlStr += `, riding a ${formData.steed}`;
	  }
	  htmlStr += `.</p>`;
	  if (formData.foe) {
	    htmlStr += `<p>${formData.name} vanquished <strong>${formData.foe}</strong> to gain the final level and win!</p>`;
	  }
	  outputDiv.innerHTML = htmlStr;
	  document.querySelector('#output').replaceChildren(outputDiv);
	};
	const init = () => {
	  const theForm = document.querySelector('form');
	  console.log('load');
	  createOutputFromForm();
	  const eventList = ['change', 'keyup', 'paste', 'input', 'propertychange', 'click'];
	  const textInputs = theForm.querySelectorAll('input[type="text"], input[type="radio"], textarea');
	  for (const textInput of textInputs) {
	    for (const event of eventList) {
	      textInput.addEventListener(event, createOutputFromForm);
	    }
	  }
	};
	window.addEventListener('load', init);
	// window.addEventListener('keyup', createOutputFromForm);

})();
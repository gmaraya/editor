const BASE_URL = 'https://www.sefaria.org/api/texts/';
const DAF_URL = 'https://www.sefaria.org/api/calendars/';
//const DAF_URL = 'https://www.sefaria.org/api/texts/Bava_Kamma.2a';


class GmarayaApi {
	static dafYomi() {
		fetch(DAF_URL)
		.then(
		  function(response) {
			if (response.status !== 200) {
			  console.log('Looks like there was a problem. Status Code: ' +
				response.status);
			  return;
			}
	  
			// Examine the text in the response
			response.json().then(function(data) {
			  console.log(data);
			});
		  }
		)
		.catch(function(err) {
		  console.log('Fetch Error :-S', err);
		});
	}

	static LoadText(path) {
		return fetch(BASE_URL + path, {
			method: 'GET',
		}).then(res => res.json());
	}

	static CreateGmarayaObj(loadText, lang) {
		if (lang == 'en')
			lang = 'text';

		return {
			path: loadText.ref,
			lang,
			text: loadText[lang],
			markers: {},
		}
	}

	static AddMarker(newMarker, gmarayaObj) {
		const id = `${newMarker.startOffset}_${newMarker.endOffset}`;
		gmarayaObj.markers[id] = newMarker;
	}

	static RemoveMarker(newMarker, markerList) {
		// doesnt work
		markerList[0] = newMarker;
	}

	static RunderMarkers(selector, gmarayaObj) {
// needs work
		var sel = window.getSelection();
		var range = document.createRange();

		Object.keys(gmarayaObj.markers).forEach(markerKey => {
			let newNode = document.createElement("span");
			newNode.setAttribute('class', gmarayaObj.markers[markerKey].type);

			range.selectNodeContents(selector);

// 		debugger;
			range.setStart(selector, 0);//gmarayaObj.markers[markerKey].startOffset);
			range.setEnd(selector, 1);//gmarayaObj.markers[markerKey].endOffset);

			range.surroundContents(newNode);
		})

		return selector;
	}

}
